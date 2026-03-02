"use client";

import { useEffect, useRef } from "react";

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,./<>?";
    const isMobile = window.innerWidth < 640;
    const fontSize = isMobile ? 18 : 14;
    let columns = 0;
    let drops: number[] = [];
    let speeds: number[] = [];
    let animationId: number;
    let lastTime = 0;
    let lastClear = 0;
    let cleaningFrames = 0;
    const frameInterval = 80;
    const clearInterval = 20000; // clean every 20s
    const cleaningDuration = 15; // spread over 15 frames (~1.2s)

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      columns = Math.floor(canvas!.width / fontSize);
      const newDrops = new Array(columns);
      const newSpeeds = new Array(columns);
      for (let i = 0; i < columns; i++) {
        newDrops[i] = drops[i] ?? Math.floor(Math.random() * canvas!.height / fontSize);
        newSpeeds[i] = speeds[i] ?? (0.3 + Math.random() * 0.8);
      }
      drops = newDrops;
      speeds = newSpeeds;
    }

    function draw(timestamp: number) {
      animationId = requestAnimationFrame(draw);

      if (timestamp - lastTime < frameInterval) {
        return;
      }
      lastTime = timestamp;

      if (timestamp - lastClear > clearInterval) {
        cleaningFrames = cleaningDuration;
        lastClear = timestamp;
      }

      if (cleaningFrames > 0) {
        // Gradually stronger fade over several frames — imperceptible
        ctx!.fillStyle = "rgba(0, 0, 0, 0.3)";
        ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
        cleaningFrames--;
      } else {
        ctx!.fillStyle = "rgba(0, 0, 0, 0.12)";
        ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
      }
      ctx!.fillStyle = "rgba(0, 255, 0, 0.15)";
      ctx!.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx!.fillText(text, i * fontSize, Math.floor(drops[i]) * fontSize);

        if (drops[i] * fontSize > canvas!.height && Math.random() > 0.95) {
          drops[i] = 0;
          speeds[i] = 0.3 + Math.random() * 0.8;
        }
        drops[i] += speeds[i];
      }
    }

    resize();
    animationId = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}
