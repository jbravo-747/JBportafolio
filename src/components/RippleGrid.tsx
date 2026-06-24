"use client";

import { useEffect, useRef } from "react";

/*
  Malla "líquida" full-page. Un canvas WebGL fijo dibuja la cuadrícula obsidiana;
  al mover el mouse se emiten anillos de onda (ripples) que se expanden y resaltan
  la malla en lima (#bef264), solo dentro de un radio, dejando estela en el recorrido.
*/

const MAX_RIPPLES = 16;

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;

uniform vec2  u_res;          // tamaño del drawing buffer (px de dispositivo)
uniform float u_dpr;          // device pixel ratio
uniform vec3  u_ripples[${MAX_RIPPLES}]; // x,y en px CSS (origen arriba-izq), z = edad en seg (<0 = inactivo)
uniform int   u_count;

const float CELL        = 48.0;   // px CSS por celda
const float WAVE_SPEED  = 330.0;  // px/seg de expansión del anillo
const float RING_WIDTH  = 28.0;   // grosor del anillo
const float LIFE        = 1.7;    // seg de vida del ripple
const float MAX_R       = 260.0;  // radio de influencia

void main() {
  // gl_FragCoord tiene origen abajo-izq; lo paso a arriba-izq y a px CSS
  vec2 frag = vec2(gl_FragCoord.x, u_res.y - gl_FragCoord.y) / u_dpr;

  // --- cuadrícula ---
  vec2 f = fract(frag / CELL);
  vec2 d2 = min(f, 1.0 - f) * CELL;       // distancia a la línea más cercana por eje
  float line = min(d2.x, d2.y);
  float grid = 1.0 - smoothstep(0.0, 1.3, line);

  // --- campo de ondas ---
  float energy = 0.0;
  for (int i = 0; i < ${MAX_RIPPLES}; i++) {
    if (i >= u_count) break;
    vec3 r = u_ripples[i];
    if (r.z < 0.0) continue;
    float dist = distance(frag, r.xy);
    if (dist > MAX_R) continue;
    float ringR  = r.z * WAVE_SPEED;                                  // radio actual del anillo
    float ring   = exp(-pow(dist - ringR, 2.0) / (2.0 * RING_WIDTH * RING_WIDTH));
    float decay  = exp(-r.z / LIFE);                                  // se desvanece con el tiempo
    float radial = smoothstep(MAX_R, 0.0, dist);                      // limita al radio
    energy += ring * decay * radial;
  }
  energy = clamp(energy, 0.0, 1.5);

  vec3 obsidian = vec3(0.0549);              // #0e0e0e
  vec3 lime     = vec3(0.745, 0.949, 0.392); // #bef264

  float baseGrid = grid * 0.05;     // malla tenue siempre visible
  float glow     = grid * energy;   // malla brillante donde pasa la onda

  vec3 col = obsidian;
  col += lime * baseGrid;
  col += lime * glow * 1.35;
  col += lime * energy * 0.045;     // leve tinte del "líquido" dentro de la onda

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error("Shader error:", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export function RippleGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", { antialias: true, alpha: false }) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return; // sin WebGL: queda el fondo oscuro del body

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    // triángulo a pantalla completa
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uDpr = gl.getUniformLocation(prog, "u_dpr");
    const uRipples = gl.getUniformLocation(prog, "u_ripples");
    const uCount = gl.getUniformLocation(prog, "u_count");

    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
      }
      gl!.viewport(0, 0, w, h);
      gl!.uniform2f(uRes, w, h);
      gl!.uniform1f(uDpr, dpr);
    }
    resize();
    window.addEventListener("resize", resize);

    // estela de ripples (px CSS, origen arriba-izq)
    type R = { x: number; y: number; t0: number };
    const ripples: R[] = [];
    let lastX = -999;
    let lastY = -999;

    function onMove(e: PointerEvent) {
      const x = e.clientX;
      const y = e.clientY;
      const moved = Math.hypot(x - lastX, y - lastY);
      if (moved < 16) return; // emite por distancia recorrida -> estela uniforme
      lastX = x;
      lastY = y;
      ripples.push({ x, y, t0: performance.now() });
      if (ripples.length > MAX_RIPPLES) ripples.shift();
    }

    const data = new Float32Array(MAX_RIPPLES * 3);

    function frame(now: number) {
      // purga expirados y arma el buffer de uniforms
      let count = 0;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const age = (now - ripples[i].t0) / 1000;
        if (age > 2.0) {
          ripples.splice(i, 1);
        }
      }
      for (let i = 0; i < ripples.length && count < MAX_RIPPLES; i++) {
        const age = (now - ripples[i].t0) / 1000;
        data[count * 3] = ripples[i].x;
        data[count * 3 + 1] = ripples[i].y;
        data[count * 3 + 2] = age;
        count++;
      }
      for (let i = count; i < MAX_RIPPLES; i++) {
        data[i * 3 + 2] = -1;
      }
      gl!.uniform3fv(uRipples, data);
      gl!.uniform1i(uCount, count);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(frame);
    }

    let raf = 0;
    if (reduce) {
      // sin movimiento: solo la malla tenue estática
      gl.uniform1i(uCount, 0);
      gl.uniform3fv(uRipples, data);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    } else {
      window.addEventListener("pointermove", onMove, { passive: true });
      raf = requestAnimationFrame(frame);
    }

    function onVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!reduce) {
        raf = requestAnimationFrame(frame);
      }
    }
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
