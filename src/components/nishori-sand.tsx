"use client";

import React, { useRef, useEffect, useState } from "react";

export default function Component() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const isTouchingRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // -------------------------
    // LIGHT / DARK MODE CONTROL
    // -------------------------
    const checkDarkMode = () => {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
    };

    checkDarkMode();
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", checkDarkMode);

    // -------------------------
    // RESIZE HANDLER
    // -------------------------
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setIsMobile(window.innerWidth < 768);
    };
    updateCanvasSize();

    let particles: any[] = [];
    let textImageData: ImageData | null = null;

    // -------------------------
    // DRAW TEXT AT BOTTOM
    // -------------------------
    function createTextImage() {
      if (!ctx || !canvas) return;

      const fontSize = isMobile ? 180 : 260;
      const letterSpacing = isMobile ? 35 : 55;
      const text = "Nishori";

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.font = `bold ${fontSize}px system-ui, -apple-system, sans-serif`;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillStyle = isDarkMode ? "white" : "black";

      const textWidth =
        [...text].reduce((acc, char) => acc + ctx.measureText(char).width + letterSpacing, 0) -
        letterSpacing;

      const startX = canvas.width / 2 - textWidth / 2;

      // POSITION TEXT AT BOTTOM
      const startY = canvas.height - fontSize * 1.2;

      let x = startX;

      for (const char of text) {
        ctx.fillText(char, x, startY);
        x += ctx.measureText(char).width + letterSpacing;
      }

      textImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // -------------------------
    // CREATE PARTICLES
    // -------------------------
    function createParticle() {
      if (!ctx || !canvas || !textImageData) return null;

      const data = textImageData.data;

      for (let attempt = 0; attempt < 100; attempt++) {
        const x = Math.floor(Math.random() * canvas.width);
        const y = Math.floor(Math.random() * canvas.height);

        if (data[(y * canvas.width + x) * 4 + 3] > 128) {
          const scatteredColor = isDarkMode
            ? `hsl(${(Math.random() * 20 + 350) % 360}, ${Math.random() * 30 + 70}%, ${
                Math.random() * 20 + 40
              }%)`
            : `hsl(${Math.random() * 360}, ${Math.random() * 50 + 40}%, ${
                Math.random() * 20 + 10
              }%)`;

          return {
            x,
            y,
            baseX: x,
            baseY: y,
            size: Math.random() * 1 + 0.5,
            color: isDarkMode ? "black" : "black",
            scatteredColor,
            life: Math.random() * 100 + 50,
          };
        }
      }

      return null;
    }

    function createInitialParticles() {
      const baseCount = 7000;

      const count = Math.floor(
        baseCount * Math.sqrt((canvas!.width * canvas!.height) / (1920 * 1080))
      );

      particles = [];
      for (let i = 0; i < count; i++) {
        const p = createParticle();
        if (p) particles.push(p);
      }
    }

    // -------------------------
    // ANIMATION LOOP
    // -------------------------
    let animationFrameId = 0;

    function animate() {
      if (!ctx || !canvas) return;

      ctx.fillStyle = isDarkMode ? "#000" : "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const { x: mouseX, y: mouseY } = mousePositionRef.current;
      const maxDistance = 240;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const force = (maxDistance - dist) / maxDistance;
          const angle = Math.atan2(dy, dx);

          p.x = p.baseX - Math.cos(angle) * force * 60;
          p.y = p.baseY - Math.sin(angle) * force * 60;

          ctx.fillStyle = p.scatteredColor;
        } else {
          p.x += (p.baseX - p.x) * 0.1;
          p.y += (p.baseY - p.y) * 0.1;
          ctx.fillStyle = isDarkMode ? "white" : "black";
        }

        ctx.fillRect(p.x, p.y, p.size, p.size);

        p.life--;
        if (p.life <= 0) {
          const np = createParticle();
          particles[i] = np ?? particles[i];
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    // INIT
    createTextImage();
    createInitialParticles();
    animate();

    // -------------------------
    // EVENT HANDLERS
    // -------------------------
    const handleResize = () => {
      updateCanvasSize();
      createTextImage();
      createInitialParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      e.preventDefault();
      mousePositionRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
      mediaQuery.removeEventListener("change", checkDarkMode);
    };
  }, [isMobile, isDarkMode]);

  return (
    <div
      className={`relative w-full h-dvh overflow-hidden ${
        isDarkMode ? "bg-black" : "bg-white"
      }`}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full absolute top-0 left-0 touch-none"
      />

      {/* Bottom fade */}
      <div
        className={`absolute bottom-0 w-full h-40 pointer-events-none backdrop-blur-md ${
          isDarkMode
            ? "bg-gradient-to-t from-black/70 to-transparent"
            : "bg-gradient-to-t from-white/70 to-transparent"
        }`}
      />

      {/* Caption text */}
      <div className="absolute bottom-20 w-full text-center z-20 px-4">
        <p
          className={`font-mono text-xs sm:text-base md:text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          World's first collaborative speech to action automation platform
        </p>
      </div>
    </div>
  );
}
