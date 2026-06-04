"use client";

import React, { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";

export default function CursorGlow() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  
  // Real mouse position
  const mouse = useRef({ x: -1000, y: -1000 });
  // Lerped cursor position
  const cursor = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (resolvedTheme !== "dark") return;
    
    // Check if it's a touch device
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;

    const render = () => {
      // Lerp factor
      const lerp = 0.08;
      cursor.current.x += (mouse.current.x - cursor.current.x) * lerp;
      cursor.current.y += (mouse.current.y - cursor.current.y) * lerp;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursor.current.x - 100}px, ${cursor.current.y - 100}px)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  if (!mounted || resolvedTheme !== "dark") return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-[200px] h-[200px] pointer-events-none z-[1]"
      style={{
        background: "radial-gradient(circle, rgba(108,99,255,0.04) 0%, rgba(108,99,255,0) 70%)",
        willChange: "transform",
      }}
    />
  );
}
