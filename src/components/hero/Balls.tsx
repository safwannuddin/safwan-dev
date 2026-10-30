"use client";

import { useEffect, useRef } from "react";
import s from "./Hero.module.css";

/**
 * Glossy balls with a little physics. They gather toward an anchor, get
 * pushed by the cursor, bump into each other, and burst on click.
 * three.js is loaded on demand so it never blocks the first paint.
 */

type Ball = {
  r: number;
  p: [number, number, number];
  v: [number, number, number];
  mesh: import("three").Mesh;
};

export default function Balls() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let disposed = false;
    let raf = 0;
    const cleanups: (() => void)[] = [];

    (async () => {
      const THREE = await import("three");
      const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");
      if (disposed) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
      camera.position.set(0, 0, 24);

      const key = new THREE.DirectionalLight(0xffffff, 1.6);
      key.position.set(-6, 10, 8);
      scene.add(key);
      const rim = new THREE.PointLight(0xff6a3d, 60, 40);
      rim.position.set(8, -6, 6);
      scene.add(rim);
      const fill = new THREE.PointLight(0x4d6bff, 80, 40);
      fill.position.set(-8, 4, -2);
      scene.add(fill);

      const mats = [
        new THREE.MeshPhysicalMaterial({ color: 0x3d5cff, roughness: 0.18, metalness: 0.05, clearcoat: 1, clearcoatRoughness: 0.08 }),
        new THREE.MeshPhysicalMaterial({ color: 0x3d5cff, roughness: 0.18, metalness: 0.05, clearcoat: 1, clearcoatRoughness: 0.08 }),
        new THREE.MeshPhysicalMaterial({ color: 0xf2f4fb, roughness: 0.22, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.1 }),
        new THREE.MeshPhysicalMaterial({ color: 0xff6a3d, roughness: 0.2, metalness: 0.05, clearcoat: 1, clearcoatRoughness: 0.1 }),
        new THREE.MeshPhysicalMaterial({ color: 0x0c0f1a, roughness: 0.12, metalness: 0.9, clearcoat: 1 }),
      ];
      const geo = new THREE.SphereGeometry(1, 40, 40);

      const balls: Ball[] = [];
      const COUNT = 24;
      for (let i = 0; i < COUNT; i++) {
        const r = 0.45 + Math.pow(Math.random(), 1.8) * 1.05;
        const mesh = new THREE.Mesh(geo, mats[i % mats.length]);
        mesh.scale.setScalar(r);
        scene.add(mesh);
        const a = Math.random() * Math.PI * 2;
        const d = 6 + Math.random() * 6;
        balls.push({ r, p: [Math.cos(a) * d, Math.sin(a) * d, (Math.random() - 0.5) * 4], v: [0, 0, 0], mesh });
      }

      // anchor: right side on wide screens, lower centre on narrow ones
      const anchor: [number, number] = [0, 0];
      const mouse = { x: 999, y: 999, active: false };
      let viewW = 1;
      let viewH = 1;

      const resize = () => {
        const w = el.clientWidth;
        const h = el.clientHeight;
        renderer.setSize(w, h, false);
        camera.position.z = w >= 900 ? 24 : 44;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        viewH = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
        viewW = viewH * camera.aspect;
        if (w >= 900) {
          anchor[0] = viewW * 0.25;
          anchor[1] = -viewH * 0.02;
        } else {
          anchor[0] = 0;
          anchor[1] = -viewH * 0.36;
        }
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(el);
      cleanups.push(() => ro.disconnect());

      const toWorld = (cx: number, cy: number) => {
        const b = el.getBoundingClientRect();
        return [((cx - b.left) / b.width - 0.5) * viewW, -((cy - b.top) / b.height - 0.5) * viewH] as const;
      };

      const onMove = (e: PointerEvent) => {
        const [x, y] = toWorld(e.clientX, e.clientY);
        mouse.x = x;
        mouse.y = y;
        mouse.active = true;
      };
      const onLeave = () => (mouse.active = false);
      const onDown = (e: PointerEvent) => {
        const [x, y] = toWorld(e.clientX, e.clientY);
        for (const b of balls) {
          const dx = b.p[0] - x;
          const dy = b.p[1] - y;
          const d = Math.hypot(dx, dy) + 0.5;
          const f = 9 / d;
          b.v[0] += (dx / d) * f;
          b.v[1] += (dy / d) * f;
          b.v[2] += (Math.random() - 0.5) * 2;
        }
      };
      const zone = el.parentElement ?? el;
      zone.addEventListener("pointermove", onMove);
      zone.addEventListener("pointerleave", onLeave);
      zone.addEventListener("pointerdown", onDown);
      cleanups.push(() => {
        zone.removeEventListener("pointermove", onMove);
        zone.removeEventListener("pointerleave", onLeave);
        zone.removeEventListener("pointerdown", onDown);
      });

      let visible = true;
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
      io.observe(el);
      cleanups.push(() => io.disconnect());

      const step = (dt: number) => {
        const k = 7; // pull to anchor
        const damp = Math.pow(0.02, dt);
        for (const b of balls) {
          b.v[0] += (anchor[0] - b.p[0]) * k * dt;
          b.v[1] += (anchor[1] - b.p[1]) * k * dt;
          b.v[2] += (0 - b.p[2]) * k * dt;
          if (mouse.active) {
            const dx = b.p[0] - mouse.x;
            const dy = b.p[1] - mouse.y;
            const d = Math.hypot(dx, dy);
            const R = 2.6 + b.r;
            if (d < R && d > 0.0001) {
              const push = ((R - d) / R) * 110 * dt;
              b.v[0] += (dx / d) * push;
              b.v[1] += (dy / d) * push;
            }
          }
          b.v[0] *= damp;
          b.v[1] *= damp;
          b.v[2] *= damp;
          b.p[0] += b.v[0] * dt;
          b.p[1] += b.v[1] * dt;
          b.p[2] += b.v[2] * dt;
        }
        // collisions
        for (let i = 0; i < balls.length; i++) {
          for (let j = i + 1; j < balls.length; j++) {
            const a = balls[i];
            const c = balls[j];
            const dx = c.p[0] - a.p[0];
            const dy = c.p[1] - a.p[1];
            const dz = c.p[2] - a.p[2];
            const d = Math.hypot(dx, dy, dz);
            const min = a.r + c.r;
            if (d < min && d > 0.0001) {
              const o = (min - d) / 2;
              const nx = dx / d, ny = dy / d, nz = dz / d;
              a.p[0] -= nx * o; a.p[1] -= ny * o; a.p[2] -= nz * o;
              c.p[0] += nx * o; c.p[1] += ny * o; c.p[2] += nz * o;
              const rv = (c.v[0] - a.v[0]) * nx + (c.v[1] - a.v[1]) * ny + (c.v[2] - a.v[2]) * nz;
              if (rv < 0) {
                const imp = -rv * 0.6;
                a.v[0] -= nx * imp; a.v[1] -= ny * imp; a.v[2] -= nz * imp;
                c.v[0] += nx * imp; c.v[1] += ny * imp; c.v[2] += nz * imp;
              }
            }
          }
        }
        for (const b of balls) b.mesh.position.set(b.p[0], b.p[1], b.p[2]);
      };

      let last = performance.now();
      const loop = (now: number) => {
        raf = requestAnimationFrame(loop);
        const dt = Math.min(0.033, (now - last) / 1000);
        last = now;
        if (!visible || document.hidden) return;
        step(dt);
        renderer.render(scene, camera);
      };

      // settle most of the way before the first frame, so the cluster is
      // already there on slow devices; the last bit of settling is visible
      for (let i = 0; i < (reduce ? 400 : 70); i++) step(1 / 60);
      if (reduce) {
        renderer.render(scene, camera);
      } else {
        raf = requestAnimationFrame(loop);
      }
      el.dataset.ready = "";

      cleanups.push(() => {
        cancelAnimationFrame(raf);
        geo.dispose();
        mats.forEach((m) => m.dispose());
        pmrem.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      });
    })();

    return () => {
      disposed = true;
      cleanups.forEach((c) => c());
    };
  }, []);

  return <div ref={host} className={s.balls} aria-hidden="true" />;
}
