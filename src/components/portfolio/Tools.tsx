'use client';

import { useRef, useEffect, useState, type ReactNode } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Code2,
  Github,
  Chrome,
  Figma,
  Send,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type ToolCategory = 'all' | 'development' | 'design';

interface Tool {
  name: string;
  /** Lucide icon component for dev/design tools */
  icon?: LucideIcon;
  /** Custom SVG logo for AI tools (rendered as JSX) */
  logo?: ReactNode;
  description: string;
  color: string;
  category: Exclude<ToolCategory, 'all'>;
}

// ─── Filter Tabs ──────────────────────────────────────────────────────────────

const FILTER_TABS: { label: string; value: ToolCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Development', value: 'development' },
  { label: 'Design', value: 'design' },
];

// ─── Tools Data ───────────────────────────────────────────────────────────────

const toolsData: Tool[] = [
  { name: 'VS Code', icon: Code2, description: 'My main code editor for writing and debugging front-end code.', color: '#007ACC', category: 'development' },
  { name: 'GitHub', icon: Github, description: 'Version control and code hosting for my projects.', color: '#8B5CF6', category: 'development' },
  { name: 'Chrome DevTools', icon: Chrome, description: 'Debugging, responsive testing and cross-browser compatibility checks.', color: '#4285F4', category: 'development' },
  { name: 'Postman', icon: Send, description: 'Testing and debugging the REST APIs I integrate into my projects.', color: '#FF6C37', category: 'development' },
  { name: 'Figma', icon: Figma, description: 'Working from client mockups to build pixel-perfect interfaces.', color: '#A259FF', category: 'design' },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: 'easeOut' as const },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: 10,
    transition: { duration: 0.25 },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function Tools() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [activeFilter, setActiveFilter] = useState<ToolCategory>('all');
  const [visible, setVisible] = useState(false);

  // Delay visibility for smooth entry
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  // Filtered tools based on active tab
  const filteredTools =
    activeFilter === 'all'
      ? toolsData
      : toolsData.filter((t) => t.category === activeFilter);

  // Determine if the brand color is very dark (need light text/icon fallback)
  const isDarkColor = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    // Perceived luminance
    return (r * 0.299 + g * 0.587 + b * 0.114) < 80;
  };

  return (
    <section id="tools" ref={sectionRef} className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        {/* ── Section Heading ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-gold text-sm sm:text-base font-[family-name:var(--font-poppins)] font-medium uppercase tracking-widest mb-2">
            Tools I Use
          </p>
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            My Tech <span className="gradient-text-gold">Arsenal</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] mx-auto rounded-full" />
          <p className="mt-5 text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base font-[family-name:var(--font-inter)]">
            The tools I use every day to write, test and ship responsive web interfaces.
          </p>
        </motion.div>

        {/* ── Category Filter Tabs ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10"
        >
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`
                  px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium
                  font-[family-name:var(--font-poppins)] transition-all duration-300
                  ${
                    isActive
                      ? 'btn-gold text-white shadow-lg shadow-[#D4AF37]/20'
                      : 'btn-gold-outline text-gold hover:bg-[#D4AF37]/10'
                  }
                `}
              >
                {tab.label}
                {/* Show count badge */}
                <span
                  className={`ml-1.5 inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold
                    ${isActive ? 'bg-white/20 text-white' : 'bg-[#D4AF37]/15 text-gold'}`}
                >
                  {tab.value === 'all'
                    ? toolsData.length
                    : toolsData.filter((t) => t.category === tab.value).length}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* ── Tools Grid with AnimatePresence ─────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={visible ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool) => {
              const IconComponent = tool.icon ?? null;
              const dark = isDarkColor(tool.color);

              return (
                <motion.div
                  key={tool.name}
                  layoutId={tool.name}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ y: -6, scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="group relative"
                >
                  <div className="glass card-hover rounded-2xl p-5 h-full flex flex-col gap-3 relative overflow-hidden">
                    {/* ── Hover glow in brand color ──────────────────────── */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                      style={{
                        boxShadow: `0 0 30px ${tool.color}30, 0 0 60px ${tool.color}15, inset 0 0 30px ${tool.color}08`,
                      }}
                    />

                    {/* ── Top gradient accent line on hover ──────────────── */}
                    <div
                      className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${tool.color}, transparent)`,
                      }}
                    />

                    {/* ── Gold border glow on hover ─────────────────────── */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        border: `1px solid #D4AF3760`,
                        boxShadow: `inset 0 0 20px #D4AF370a`,
                      }}
                    />

                    {/* ── Icon / Logo & Name ─────────────────────────────── */}
                    <div className="flex items-center gap-3 relative z-10">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                        style={{
                          background: dark
                            ? `${tool.color}25`
                            : `${tool.color}15`,
                          border: `1px solid ${tool.color}30`,
                        }}
                      >
                        {IconComponent ? (
                          <IconComponent
                            className="w-5 h-5 transition-colors duration-300"
                            style={{ color: tool.color }}
                          />
                        ) : (
                          tool.logo
                        )}
                      </div>
                      <h3 className="font-[family-name:var(--font-poppins)] text-base font-semibold text-foreground group-hover:text-[#D4AF37] transition-colors duration-300 truncate">
                        {tool.name}
                      </h3>
                    </div>

                    {/* ── Description ────────────────────────────────────── */}
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed relative z-10 flex-1 font-[family-name:var(--font-inter)]">
                      {tool.description}
                    </p>

                    {/* ── Bottom decorative bars ────────────────────────── */}
                    <div className="flex items-center gap-1 mt-auto pt-1 relative z-10">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="h-1 rounded-full transition-all duration-500 group-hover:w-full"
                          style={{
                            width: `${8 - i * 2}px`,
                            background: `${tool.color}${
                              i === 0 ? '80' : i === 1 ? '50' : '30'
                            }`,
                            transitionDelay: `${i * 100}ms`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}