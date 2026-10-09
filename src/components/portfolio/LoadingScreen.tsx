"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [fadeOut, setFadeOut] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 800);
    const unmountTimer = setTimeout(() => setMounted(false), 1450);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className={`loading-screen ${fadeOut ? "hidden" : ""}`}>
      <div className="flex flex-col items-center gap-6">
        <div className="loading-spinner" />
        <p className="text-gold-accent text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-space-grotesk)]">
          Tayyaba Saddique
        </p>
      </div>
    </div>
  );
}