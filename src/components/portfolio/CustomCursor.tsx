"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const posRef = useRef({ x: -100, y: -100 });
  const dotPosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      dotPosRef.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX - 3}px`;
        dotRef.current.style.top = `${e.clientY - 3}px`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target;
      if (target instanceof Element) {
        if (
          target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.closest("a") ||
          target.closest("button") ||
          target.classList?.contains("cursor-pointer") ||
          (target instanceof HTMLElement && target.style?.cursor === "pointer")
        ) {
          setHovering(true);
        }
      }
    };

    const handleMouseOut = () => {
      setHovering(false);
    };

    const handleMouseLeaveDoc = () => {
      setHovering(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mouseleave", handleMouseLeaveDoc);

    // Smooth cursor follow with requestAnimationFrame
    let animationId: number;
    const animate = () => {
      if (cursorRef.current) {
        const current = parseFloat(cursorRef.current.style.left) || -100;
        const target = posRef.current.x - 10;
        const newLeft = current + (target - current) * 0.15;

        const currentTop = parseFloat(cursorRef.current.style.top) || -100;
        const targetTop = posRef.current.y - 10;
        const newTop = currentTop + (targetTop - currentTop) * 0.15;

        cursorRef.current.style.left = `${newLeft}px`;
        cursorRef.current.style.top = `${newTop}px`;
      }
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseleave", handleMouseLeaveDoc);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor ${hovering ? "hovering" : ""}`}
        style={{ left: -100, top: -100 }}
      />
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{ left: -100, top: -100 }}
      />
    </>
  );
}