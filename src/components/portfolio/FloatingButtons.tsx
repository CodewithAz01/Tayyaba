"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { ArrowUp, ArrowDown, Sun, Moon, MessageCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const SCROLL_TOP_THRESHOLD = 300;

/* ------------------------------------------------------------------ */
/*  Scroll subscription helpers                                        */
/* ------------------------------------------------------------------ */

let scrollYValue = 0;
let scrollListeners: Array<() => void> = [];

function subscribeToScroll(listener: () => void) {
  scrollListeners.push(listener);
  window.addEventListener("scroll", listener, { passive: true });
  return () => {
    scrollListeners = scrollListeners.filter((l) => l !== listener);
    window.removeEventListener("scroll", listener);
  };
}

function getScrollY() {
  return scrollYValue;
}

function getServerScrollY() {
  return 0;
}

// Keep scrollYValue up to date
if (typeof window !== "undefined") {
  window.addEventListener(
    "scroll",
    () => {
      scrollYValue = window.scrollY;
    },
    { passive: true },
  );
  scrollYValue = window.scrollY;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function FloatingButtons() {
  const { resolvedTheme, setTheme } = useTheme();

  /* ---- Hydration guard via useSyncExternalStore ---- */
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  /* ---- Scroll position via useSyncExternalStore ---- */
  const scrollY = useSyncExternalStore(
    subscribeToScroll,
    getScrollY,
    getServerScrollY,
  );

  const showScrollTop = scrollY > SCROLL_TOP_THRESHOLD;
  const isDark = mounted && (resolvedTheme === "dark");

  /* ---- Actions ---- */
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const scrollToBottom = useCallback(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  return (
    <div
      className="
        fixed bottom-6 right-6 z-[9990] flex flex-col items-center gap-2
      "
      role="group"
      aria-label="Floating actions"
    >
      {/* ---- WhatsApp Button ---- */}
      <motion.a
        href="https://wa.me/923321952862"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.6, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut", delay: 0.05 }}
        className="
          flex h-12 w-12 items-center justify-center
          rounded-full border border-green-500/40 bg-green-500/10 text-green-500
          backdrop-blur-md
          transition-all duration-300
          hover:border-green-500/70 hover:bg-green-500/20
          hover:shadow-[0_0_25px_rgba(34,197,94,0.35)]
          focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500
        "
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <MessageCircle size={20} />
      </motion.a>

      {/* ---- Scroll to Top ---- */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={scrollToTop}
            className="
              glass gold-glow flex h-12 w-12 items-center justify-center
              rounded-full border border-gold/30 text-foreground/70
              transition-all duration-300
              hover:border-gold/60 hover:text-gold
              hover:shadow-[0_0_25px_rgba(212,175,55,0.35)]
              focus:outline-none focus-visible:ring-2 focus-visible:ring-gold
            "
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ---- Scroll to Bottom ---- */}
      <motion.button
        initial={{ opacity: 0, scale: 0.6, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
        onClick={scrollToBottom}
        className="
          glass gold-glow flex h-12 w-12 items-center justify-center
          rounded-full border border-gold/30 text-foreground/70
          transition-all duration-300
          hover:border-gold/60 hover:text-gold
          hover:shadow-[0_0_25px_rgba(212,175,55,0.35)]
          focus:outline-none focus-visible:ring-2 focus-visible:ring-gold
        "
        aria-label="Scroll to bottom"
      >
        <ArrowDown size={20} />
      </motion.button>

      {/* ---- Theme Toggle ---- */}
      <motion.button
        initial={{ opacity: 0, scale: 0.6, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
        onClick={toggleTheme}
        className="
          glass gold-glow flex h-12 w-12 items-center justify-center
          rounded-full border border-gold/30 text-foreground/70
          transition-all duration-300
          hover:border-gold/60 hover:text-gold
          hover:shadow-[0_0_25px_rgba(212,175,55,0.35)]
          focus:outline-none focus-visible:ring-2 focus-visible:ring-gold
        "
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="sun"
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center justify-center"
            >
              <Sun size={20} />
            </motion.span>
          ) : (
            <motion.span
              key="moon"
              initial={{ rotate: 90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center justify-center"
            >
              <Moon size={20} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}