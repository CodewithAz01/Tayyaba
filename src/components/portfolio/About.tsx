'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Code2,
  Zap,
  Palette,
  Plug,
  Search,
  Monitor,
  Puzzle,
  BookOpen,
  FolderGit2,
  Cpu,
  Clock,
  GitCommitHorizontal,
} from 'lucide-react';

/* ──────────────── Animated Counter Hook ──────────────── */
function useAnimatedCounter(end: number, duration = 2000, startOnView = false, inView = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (startOnView && !inView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo for a satisfying deceleration
      const eased = 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, startOnView, inView]);

  return count;
}

/* ──────────────── Data ──────────────── */
const highlights = [
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Writing readable, maintainable, and well-structured code that stands the test of time.',
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Optimizing every layer — from asset delivery to rendering — for lightning-fast experiences.',
  },
  {
    icon: Palette,
    title: 'Modern UI',
    description: 'Crafting pixel-perfect interfaces with modern design principles and smooth interactions.',
  },
  {
    icon: Plug,
    title: 'API Integration',
    description: 'Connecting RESTful APIs and third-party services such as payment gateways and maps.',
  },
  {
    icon: Search,
    title: 'SEO',
    description: 'Implementing semantic markup and best practices so content reaches the right audience.',
  },
  {
    icon: Monitor,
    title: 'Cross-Browser',
    description: 'Ensuring consistent, flawless rendering across every major browser and device.',
  },
  {
    icon: Puzzle,
    title: 'Responsive Design',
    description: 'Creating fluid layouts that look stunning on screens from mobile to ultra-wide.',
  },
  {
    icon: BookOpen,
    title: 'Continuous Learning',
    description: 'Staying ahead of the curve by constantly exploring new tools, frameworks, and techniques.',
  },
];

const stats = [
  { icon: Clock, value: 2, suffix: ' Yrs', label: 'Experience', color: 'from-amber-500 to-yellow-300' },
  { icon: FolderGit2, value: 4, suffix: '', label: 'Key Projects', color: 'from-yellow-400 to-amber-300' },
  { icon: Cpu, value: 7, suffix: '', label: 'Technologies', color: 'from-amber-400 to-yellow-200' },
  { icon: GitCommitHorizontal, value: 5, suffix: '', label: 'Tools', color: 'from-yellow-500 to-amber-400' },
];

/* ──────────────── Sub-Components ──────────────── */
function StatCard({
  icon: Icon,
  value,
  suffix,
  label,
  color,
  inView,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  suffix: string;
  label: string;
  color: string;
  inView: boolean;
}) {
  const count = useAnimatedCounter(value, 2200, true, inView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="glass gradient-border rounded-xl p-6 flex flex-col items-center gap-3 text-center min-w-[140px]"
    >
      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
        <Icon className="w-5 h-5 text-background" />
      </div>
      <div className="font-[family-name:var(--font-poppins)] text-3xl font-bold gradient-text-gold">
        <span className="counter-value">{count}</span>
        <span className="text-xl">{suffix}</span>
      </div>
      <span className="font-[family-name:var(--font-inter)] text-sm text-muted-foreground font-medium tracking-wide uppercase">
        {label}
      </span>
    </motion.div>
  );
}

function HighlightCard({
  icon: Icon,
  title,
  description,
  index,
  inView,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      className="glass card-hover rounded-xl p-5 flex gap-4 items-start"
    >
      <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-gradient-to-br from-gold/20 to-gold-accent/10 border border-gold/20 flex items-center justify-center">
        <Icon className="w-5 h-5 text-gold" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-[family-name:var(--font-poppins)] text-base font-semibold text-foreground mb-1">
          {title}
        </h3>
        <p className="font-[family-name:var(--font-inter)] text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

/* ──────────────── Main About Section ──────────────── */
export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const sectionInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' });
  const descInView = useInView(descRef, { once: true, margin: '-40px' });
  const statsInView = useInView(statsRef, { once: true, margin: '-40px' });
  const gridInView = useInView(gridRef, { once: true, margin: '-40px' });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding animated-bg relative"
    >
      <div className="max-w-6xl mx-auto">
        {/* ── Section Heading ── */}
        <div ref={headingRef} className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-[family-name:var(--font-inter)] text-sm uppercase tracking-[0.25em] text-gold font-semibold mb-3"
          >
            Get To Know Me
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-[family-name:var(--font-poppins)] text-4xl md:text-5xl font-bold gradient-text-gold gold-glow-text"
          >
            About Me
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mx-auto mt-4 h-[2px] w-24 bg-gradient-to-r from-transparent via-gold to-transparent origin-center"
          />
        </div>

        {/* ── Professional Description ── */}
        <div ref={descRef} className="max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={descInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass gradient-border rounded-2xl p-6 md:p-8"
          >
            <p className="font-[family-name:var(--font-inter)] text-base md:text-lg text-foreground/90 leading-relaxed text-center">
              I&apos;m <span className="font-semibold text-gold">Tayyaba Saddique</span>, a detail-oriented
              Front-End Web Developer from <span className="font-semibold text-gold">Nowshera, Pakistan</span>{' '}
              with 2 years of hands-on experience designing and building responsive,
              high-performance web applications. I work with
              <span className="text-gold/80"> React.js</span> and{' '}
              <span className="text-gold/80">Tailwind CSS</span>, with a strong foundation in{' '}
              <span className="text-gold/80">API integration</span>,{' '}
              <span className="text-gold/80">SEO optimization</span> and{' '}
              <span className="text-gold/80">UI/UX best practices</span>. I&apos;m committed to
              writing clean, maintainable code and delivering exceptional user experiences.
            </p>
          </motion.div>
        </div>

        {/* ── Key Stats Row ── */}
        <div ref={statsRef} className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} inView={statsInView} />
            ))}
          </div>
        </div>

        {/* ── Highlights Grid ── */}
        <div ref={gridRef}>
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            animate={gridInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-foreground text-center mb-8"
          >
            What I <span className="gradient-text-gold">Bring</span> to the Table
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {highlights.map((item, idx) => (
              <HighlightCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
                index={idx}
                inView={gridInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}