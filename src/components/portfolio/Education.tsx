'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface EducationEntry {
  institution: string;
  degree: string;
  duration: string;
  location: string;
  status: 'current' | 'completed';
  statusLabel: string;
  description?: string;
  grade?: string;
  cgpa?: string;
  progress?: number;
  keySubjects?: string[];
  coursework?: string[];
  activities?: string[];
}

const entries: EducationEntry[] = [
  {
    institution: 'Northern University Nowshera',
    degree: 'Bachelor of Science in Computer Science (BS CS)',
    duration: '2024 — 2028 (Expected)',
    location: 'Nowshera, Pakistan',
    status: 'current',
    statusLabel: 'Currently Studying',
    description:
      'Pursuing a Bachelor of Science in Computer Science (in progress), building a strong academic foundation alongside hands-on front-end development work.',
  },
];

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

const cardVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    x: i % 2 === 0 ? -60 : 60,
    y: 30,
  }),
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.15 + i * 0.18,
      ease: 'easeOut' as const,
    },
  }),
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.04, ease: 'easeOut' as const },
  }),
};

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function StatusBadge({ entry }: { entry: EducationEntry }) {
  if (entry.status === 'current') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        {entry.statusLabel}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/5 border border-gold/20 text-gold text-xs font-semibold">
      <CheckCircle2 className="w-3.5 h-3.5" />
      {entry.statusLabel}
    </span>
  );
}

function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-[family-name:var(--font-inter)] text-xs font-medium text-muted-foreground">
          Degree Progress
        </span>
        <span className="font-[family-name:var(--font-inter)] text-xs font-bold text-gold">
          {percent}% Complete
        </span>
      </div>
      <div className="w-full h-2 rounded-full bg-gold/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' as const }}
          className="h-full rounded-full bg-gradient-to-r from-gold via-yellow-400 to-gold-accent"
        />
      </div>
    </div>
  );
}

function CourseTags({
  label,
  items,
  icon: Icon,
}: {
  label: string;
  items: string[];
  icon: React.ElementType;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <div ref={ref}>
      <h4 className="font-[family-name:var(--font-poppins)] text-xs font-semibold text-foreground mb-2.5 uppercase tracking-wider flex items-center gap-1.5">
        <Icon className="w-3.5 h-3.5 text-gold" />
        {label}
      </h4>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <motion.span
            key={item}
            custom={i}
            variants={tagVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border border-gold/20 text-gold/90 bg-gold/5 transition-colors duration-200 hover:bg-gold/15 hover:border-gold/40"
          >
            {item}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function EducationCard({ entry, index }: { entry: EducationEntry; index: number }) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="relative mb-12 last:mb-0 md:grid md:grid-cols-2 md:gap-x-12"
    >
      {/* Timeline Dot */}
      <div className="timeline-dot top-7 md:top-8" />

      {/* Left column (desktop: date side for right cards, empty for left cards) */}
      <div className={`${isLeft ? 'md:order-1' : 'md:order-2'} hidden md:flex flex-col justify-center items-end pr-8`}>
        {!isLeft && (
          <div className="text-right">
            <span className="font-[family-name:var(--font-inter)] text-sm font-semibold text-gold/80 flex items-center gap-1.5 justify-end">
              <Calendar className="w-4 h-4 text-gold/60" />
              {entry.duration}
            </span>
            <span className="font-[family-name:var(--font-inter)] text-xs text-muted-foreground mt-1 flex items-center gap-1 justify-end">
              <MapPin className="w-3 h-3 text-gold/50" />
              {entry.location}
            </span>
          </div>
        )}
      </div>

      {/* Right column (desktop: card side for left cards, empty for right cards) */}
      <div className={`${isLeft ? 'md:order-2' : 'md:order-1'} hidden md:block`} />

      {/* Mobile: always show card on right of timeline */}
      {/* Desktop: card always in column 2 position visually */}
      <div
        className={`${
          isLeft ? 'md:order-2 md:pl-8' : 'md:order-1 md:pr-8'
        } pl-12 md:pl-0`}
      >
        <div className="glass gradient-border rounded-2xl p-5 md:p-6 card-hover group">
          {/* Header: Icon + Title + Status */}
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-gold/20 to-gold-accent/10 border border-gold/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <GraduationCap className="w-6 h-6 text-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-[family-name:var(--font-poppins)] text-lg md:text-xl font-bold text-foreground leading-tight">
                {entry.institution}
              </h3>
              <p className="font-[family-name:var(--font-poppins)] text-sm md:text-base font-semibold text-gold/90 mt-0.5">
                {entry.degree}
              </p>
            </div>
          </div>

          {/* Meta row: duration, location, status */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-4 h-4 text-gold/70" />
              {entry.duration}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-4 h-4 text-gold/70" />
              {entry.location}
            </span>
          </div>

          {/* Status Badge */}
          <div className="mb-4">
            <StatusBadge entry={entry} />
          </div>

          {/* Description */}
          {entry.description && (
            <p className="font-[family-name:var(--font-inter)] text-sm text-muted-foreground leading-relaxed">
              {entry.description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const sectionInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' });

  return (
    <section
      id="education"
      ref={sectionRef}
      className="section-padding animated-bg relative"
    >
      <div className="max-w-5xl mx-auto">
        {/* ── Section Heading ── */}
        <div ref={headingRef} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-[family-name:var(--font-inter)] text-sm uppercase tracking-[0.25em] text-gold font-semibold mb-3"
          >
            Where I Studied
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-[family-name:var(--font-poppins)] text-4xl md:text-5xl font-bold gradient-text-gold gold-glow-text"
          >
            Academic Background
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mx-auto mt-4 h-[2px] w-24 bg-gradient-to-r from-transparent via-gold to-transparent origin-center"
          />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="font-[family-name:var(--font-inter)] text-base text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed"
          >
            My educational journey from school to university, building the foundation for my
            career in technology.
          </motion.p>
        </div>

        {/* ── Timeline ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={sectionInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Vertical Gold Line */}
          <div className="timeline-line" />

          {/* Timeline Entries */}
          {entries.map((entry, i) => (
            <EducationCard key={entry.degree} entry={entry} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}