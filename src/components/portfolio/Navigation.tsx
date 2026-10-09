"use client";

import { useState, useEffect, useCallback, useRef, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, ChevronDown, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface NavItem {
  label: string;
  href: string;
}

interface DropdownItem {
  label: string;
  href: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const DROPDOWN_ITEMS: DropdownItem[] = [
  { label: "Tools", href: "#tools" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Resume", href: "#cv" },
  { label: "FAQ", href: "#faq" },
];

const ALL_SECTION_IDS = [
  ...NAV_ITEMS.map((item) => item.href.replace("#", "")),
  ...DROPDOWN_ITEMS.map((item) => item.href.replace("#", "")),
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Navigation() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  /* ---- State ---- */
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  /* ---- Hydration guard via useSyncExternalStore ---- */
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const dropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isClosingRef = useRef(false);

  /* ---- Scroll listener: glass effect + progress bar ---- */
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress((scrollY / docHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---- IntersectionObserver: detect active section ---- */
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Section crossing the thin band near the middle of the viewport is active
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);

      if (visibleEntries.length > 0) {
        setActiveSection(visibleEntries[0].target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "-40% 0px -55% 0px",
      threshold: 0,
    });

    // Small delay so sections from other components have time to mount
    const timer = setTimeout(() => {
      ALL_SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  /* ---- Close mobile menu on route/resize ---- */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ---- Lock body scroll when mobile menu is open ---- */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* ---- Helpers ---- */
  const scrollToSection = useCallback((href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleNavClick = useCallback(
    (href: string) => {
      scrollToSection(href);
      setMobileOpen(false);
      setDropdownOpen(false);
    },
    [scrollToSection],
  );

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  const handleDropdownEnter = useCallback(() => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
      dropdownTimerRef.current = null;
    }
    isClosingRef.current = false;
    setDropdownOpen(true);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    isClosingRef.current = true;
    dropdownTimerRef.current = setTimeout(() => {
      if (isClosingRef.current) {
        setDropdownOpen(false);
      }
    }, 200);
  }, []);

  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark");

  return (
    <>
      {/* ---- Scroll Progress Bar ---- */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* ---- Navbar ---- */}
      <header
        className={`
          fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ease-out
          ${scrolled ? "glass shadow-lg" : "bg-transparent"}
        `}
        style={
          scrolled
            ? undefined
            : { borderBottom: "1px solid transparent" }
        }
      >
        <nav
          className="
            relative mx-auto flex max-w-7xl items-center justify-between
            px-4 py-3 sm:px-6 lg:px-8
          "
          role="navigation"
          aria-label="Main navigation"
        >
          {/* ---- Logo ---- */}
          <button
            onClick={() => handleNavClick("#home")}
            className="
              relative z-10 flex items-center gap-2 transition-transform duration-300
              hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold
              rounded-md p-1
            "
            aria-label="Go to Home"
          >
            <span
              className="
                gradient-text-gold font-[family-name:var(--font-space-grotesk)]
                text-2xl font-bold tracking-tight sm:text-3xl select-none
              "
            >
              TS
            </span>
          </button>

          {/* ---- Desktop Nav Links ---- */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <li key={item.href}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={`
                      nav-link rounded-md px-3 py-2 text-sm font-medium
                      transition-colors duration-300
                      ${
                        isActive
                          ? "active text-gold"
                          : "text-foreground/80 hover:text-gold"
                      }
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-gold
                    `}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}

            {/* ---- More Dropdown ---- */}
            <li
              className="relative"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className={`
                  nav-link flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium
                  transition-colors duration-300
                  ${
                    DROPDOWN_ITEMS.some(
                      (d) => d.href.replace("#", "") === activeSection,
                    )
                      ? "active text-gold"
                      : "text-foreground/80 hover:text-gold"
                  }
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-gold
                `}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                More
                <ChevronDown
                  size={14}
                  className={`
                    transition-transform duration-300
                    ${dropdownOpen ? "rotate-180" : ""}
                  `}
                />
              </button>

              {/* ---- Dropdown Panel ---- */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="
                      absolute top-full right-0 mt-2 w-48 overflow-hidden rounded-xl
                      border border-gold/20 bg-background/95 shadow-xl
                      backdrop-blur-xl
                    "
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                    role="menu"
                  >
                    <ul className="py-1">
                      {DROPDOWN_ITEMS.map((item) => {
                        const sectionId = item.href.replace("#", "");
                        const isActive = activeSection === sectionId;

                        return (
                          <li key={item.href}>
                            <button
                              onClick={() => handleNavClick(item.href)}
                              className={`
                                flex w-full items-center gap-2 px-4 py-2.5 text-sm font-medium
                                transition-all duration-200
                                ${
                                  isActive
                                    ? "bg-gold/10 text-gold"
                                    : "text-foreground/70 hover:bg-gold/5 hover:text-gold"
                                }
                              `}
                              role="menuitem"
                            >
                              {/* Active indicator dot */}
                              <span
                                className={`
                                  h-1.5 w-1.5 rounded-full transition-all duration-200
                                  ${
                                    isActive
                                      ? "bg-gold shadow-[0_0_6px_rgba(212,175,55,0.6)]"
                                      : "bg-transparent"
                                  }
                                `}
                              />
                              {item.label}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          </ul>

          {/* ---- Right Side: Theme Toggle + Hamburger ---- */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="
                relative flex h-10 w-10 items-center justify-center rounded-full
                border border-gold/20 bg-gold/5 text-foreground/70
                transition-all duration-300 hover:border-gold/40 hover:bg-gold/10
                hover:text-gold hover:shadow-[0_0_15px_rgba(212,175,55,0.15)]
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
                    <Sun size={18} />
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
                    <Moon size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className={`
                relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px]
                rounded-full border border-gold/20 bg-gold/5 lg:hidden
                transition-all duration-300 hover:border-gold/40 hover:bg-gold/10
                focus:outline-none focus-visible:ring-2 focus-visible:ring-gold
              `}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <span
                className={`
                  ${mobileOpen ? "hamburger-open" : ""}
                  flex flex-col items-center justify-center gap-[5px]
                `}
              >
                <span className="hamburger-line" />
                <span className="hamburger-line" />
                <span className="hamburger-line" />
              </span>
            </button>
          </div>

          {/* ---- Golden bottom border (visible after scroll) ---- */}
          <div
            className={`
              absolute bottom-0 left-0 right-0 h-px
              bg-gradient-to-r from-transparent via-gold/50 to-transparent
              transition-opacity duration-500
              ${scrolled ? "opacity-100" : "opacity-0"}
            `}
            aria-hidden="true"
          />
        </nav>
      </header>

      {/* ---- Mobile Menu Overlay ---- */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[9997] bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-in panel */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="
                fixed top-0 right-0 z-[9998] flex h-full w-[min(320px,85vw)] flex-col
                border-l border-gold/20 bg-background/95 shadow-2xl backdrop-blur-xl
                lg:hidden
              "
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between border-b border-gold/10 px-6 py-4">
                <span
                  className="
                    gradient-text-gold font-[family-name:var(--font-space-grotesk)]
                    text-xl font-bold select-none
                  "
                >
                  TS
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="
                    flex h-9 w-9 items-center justify-center rounded-full
                    border border-gold/20 text-foreground/60 transition-all duration-300
                    hover:border-gold/40 hover:text-gold
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-gold
                  "
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex-1 overflow-y-auto px-4 py-6">
                <ul className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item) => {
                    const sectionId = item.href.replace("#", "");
                    const isActive = activeSection === sectionId;

                    return (
                      <li key={item.href}>
                        <button
                          onClick={() => handleNavClick(item.href)}
                          className={`
                            group flex w-full items-center gap-3 rounded-lg px-4 py-3
                            text-base font-medium transition-all duration-300
                            ${
                              isActive
                                ? "bg-gold/10 text-gold"
                                : "text-foreground/70 hover:bg-gold/5 hover:text-gold"
                            }
                          `}
                        >
                          {/* Active indicator */}
                          <span
                            className={`
                              h-2 w-2 rounded-full transition-all duration-300
                              ${
                                isActive
                                  ? "bg-gold shadow-[0_0_8px_rgba(212,175,55,0.5)]"
                                  : "bg-transparent group-hover:bg-gold/30"
                              }
                            `}
                          />
                          {item.label}
                        </button>
                      </li>
                    );
                  })}

                  {/* Divider */}
                  <li className="my-2 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

                  {/* "More" Section Label */}
                  <li>
                    <span className="px-4 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      More
                    </span>
                  </li>

                  {DROPDOWN_ITEMS.map((item) => {
                    const sectionId = item.href.replace("#", "");
                    const isActive = activeSection === sectionId;

                    return (
                      <li key={item.href}>
                        <button
                          onClick={() => handleNavClick(item.href)}
                          className={`
                            group flex w-full items-center gap-3 rounded-lg px-4 py-3
                            text-sm font-medium transition-all duration-300
                            ${
                              isActive
                                ? "bg-gold/10 text-gold"
                                : "text-foreground/60 hover:bg-gold/5 hover:text-gold"
                            }
                          `}
                        >
                          <span
                            className={`
                              h-2 w-2 rounded-full transition-all duration-300
                              ${
                                isActive
                                  ? "bg-gold shadow-[0_0_8px_rgba(212,175,55,0.5)]"
                                  : "bg-transparent group-hover:bg-gold/30"
                              }
                            `}
                          />
                          {item.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Panel Footer — theme toggle hint */}
              <div className="border-t border-gold/10 px-6 py-4">
                <button
                  onClick={() => {
                    toggleTheme();
                    setMobileOpen(false);
                  }}
                  className="
                    flex w-full items-center justify-center gap-2 rounded-lg
                    border border-gold/20 bg-gold/5 px-4 py-2.5 text-sm font-medium
                    text-foreground/70 transition-all duration-300
                    hover:border-gold/40 hover:bg-gold/10 hover:text-gold
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-gold
                  "
                >
                  {isDark ? (
                    <>
                      <Sun size={16} />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon size={16} />
                      Dark Mode
                    </>
                  )}
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}