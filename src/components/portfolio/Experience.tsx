'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Briefcase, CheckCircle2, Clock } from 'lucide-react';

/* ──────────────────────────────────────────────
   Data Types
   ────────────────────────────────────────────── */
interface ExperienceEntry {
  icon: React.ElementType;
  title: string;
  role: string;
  duration: string;
  status: 'Current' | 'Completed';
  statusColor: 'green' | 'amber' | 'sky' | 'violet';
  description: string;
  achievements: string[];
  tech: string[];
}

/* ──────────────────────────────────────────────
   Experience Data (from CV)
   ────────────────────────────────────────────── */
const experiences: ExperienceEntry[] = [
  {
    icon: Code2,
    title: 'Front-End Web Developer',
    role: 'Freelance / Self-Employed',
    duration: '2022 — Present',
    status: 'Current',
    statusColor: 'green',
    description:
      'Building responsive websites for clients using React.js and Tailwind CSS, from Figma mockups to production.',
    achievements: [
      'Built and maintained responsive websites using React.js and Tailwind CSS',
      'Integrated RESTful APIs and third-party services (payment gateways, maps, etc.)',
      'Collaborated with clients using Figma mockups for pixel-perfect implementation',
      'Applied SEO best practices to improve organic search rankings',
    ],
    tech: ['React.js', 'Tailwind CSS', 'REST APIs', 'Figma', 'SEO'],
  },
  {
    icon: Briefcase,
    title: 'Junior Web Developer',
    role: 'Tech Solutions — Nowshera',
    duration: '2022 — 2023',
    status: 'Completed',
    statusColor: 'sky',
    description:
      'Worked alongside senior developers on client websites, focusing on UI components and maintenance.',
    achievements: [
      'Developed interactive UI components using HTML, CSS, and vanilla JavaScript',
      'Maintained and updated existing websites, fixing cross-browser compatibility issues',
      'Assisted senior developers in migrating legacy sites to modern frameworks',
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript'],
  },
];

/* ──────────────────────────────────────────────
   Status Badge Styles
   ────────────────────────────────────────────── */
const statusStyles: Record<
  string,
  { dot: string; bg: string; text: string; pulse: boolean }
> = {
  green: {
    dot: 'bg-emerald-400',
    bg: 'bg-emerald-500/15',
    text: 'text-emerald-400',
    pulse: true,
  },
  amber: {
    dot: 'bg-amber-400',
    bg: 'bg-amber-500/15',
    text: 'text-amber-400',
    pulse: false,
  },
  sky: {
    dot: 'bg-sky-400',
    bg: 'bg-sky-500/15',
    text: 'text-sky-400',
    pulse: false,
  },
  violet: {
    dot: 'bg-violet-400',
    bg: 'bg-violet-500/15',
    text: 'text-violet-400',
    pulse: false,
  },
};

/* ──────────────────────────────────────────────
   Framer Motion Variants
   ────────────────────────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.12,
      ease: 'easeOut' as const,
    },
  }),
};

const headingVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: 'easeOut' as const },
  }),
};

const lineVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 1.2, ease: 'easeOut' as const },
  },
};

const nodeVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      delay: 0.3 + i * 0.12,
      ease: 'easeOut' as const,
    },
  }),
};

/* ──────────────────────────────────────────────
   Single Experience Card
   ────────────────────────────────────────────── */
function ExperienceCard({
  entry,
  index,
  isInView,
}: {
  entry: ExperienceEntry;
  index: number;
  isInView: boolean;
}) {
  const Icon = entry.icon;
  const style = statusStyles[entry.statusColor];

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="glass gradient-border rounded-2xl p-5 sm:p-6 md:p-7 card-hover h-full group relative overflow-hidden">
        {/* ── Top Row: Icon (left) + Status Badge (right) ── */}
        <div className="flex items-start justify-between mb-5">
          {/* Icon Container */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold/20 to-gold-accent/10 border border-gold/20 flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_24px_rgba(212,175,55,0.35)] group-hover:scale-105">
            <Icon className="w-7 h-7 text-gold" />
          </div>

          {/* Status Badge */}
          <span
            className={`inline-flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-xs font-semibold uppercase tracking-wider ${style.bg} ${style.text} px-3 py-1.5 rounded-full border border-current/10`}
          >
            <span
              className={`w-2 h-2 rounded-full ${style.dot} ${
                style.pulse ? 'animate-pulse' : ''
              }`}
            />
            {entry.status}
          </span>
        </div>

        {/* ── Title & Role ── */}
        <h3 className="font-[family-name:var(--font-poppins)] text-lg sm:text-xl font-bold text-foreground mb-1 transition-colors duration-300 group-hover:text-gold">
          {entry.title}
        </h3>
        <p className="font-[family-name:var(--font-inter)] text-sm text-gold/80 font-medium mb-3">
          {entry.role}
        </p>

        {/* ── Duration ── */}
        <div className="flex items-center gap-1.5 mb-4 text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          <span className="font-[family-name:var(--font-inter)] text-xs font-medium">
            {entry.duration}
          </span>
        </div>

        {/* ── Description ── */}
        <p className="font-[family-name:var(--font-inter)] text-sm text-muted-foreground leading-relaxed mb-5">
          {entry.description}
        </p>

        {/* ── Key Responsibilities ── */}
        <div className="mb-5">
          <h4 className="font-[family-name:var(--font-poppins)] text-xs font-bold uppercase tracking-wider text-foreground/60 mb-3">
            Key Responsibilities
          </h4>
          <ul className="space-y-2">
            {entry.achievements.map((achievement, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span className="font-[family-name:var(--font-inter)] text-sm text-muted-foreground leading-snug">
                  {achievement}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Tech Tags ── */}
        <div>
          <h4 className="font-[family-name:var(--font-poppins)] text-xs font-bold uppercase tracking-wider text-foreground/60 mb-3">
            Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {entry.tech.map((tech, i) => (
              <span
                key={i}
                className="font-[family-name:var(--font-inter)] text-xs font-medium text-gold/90 bg-gold/10 border border-gold/15 px-2.5 py-1 rounded-lg transition-colors duration-200 hover:bg-gold/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* ── Decorative Corner Glow ── */}
        <div className="absolute -bottom-10 -right-10 w-28 h-28 rounded-full bg-gradient-to-tr from-gold/5 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-0" />
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Main Experience Section
   ────────────────────────────────────────────── */
export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const sectionInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' });
  const timelineInView = useInView(timelineRef, { once: true, margin: '-40px' });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-padding animated-bg relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* ════════════════════════════════════════
            Section Heading
            ════════════════════════════════════════ */}
        <div ref={headingRef} className="text-center mb-16">
          <motion.p
            custom={0}
            variants={headingVariants}
            initial="hidden"
            animate={headingInView ? 'visible' : 'hidden'}
            className="font-[family-name:var(--font-inter)] text-sm uppercase tracking-[0.25em] text-gold font-semibold mb-3"
          >
            What I&apos;ve Been Doing
          </motion.p>
          <motion.h2
            custom={0.1}
            variants={headingVariants}
            initial="hidden"
            animate={headingInView ? 'visible' : 'hidden'}
            className="font-[family-name:var(--font-poppins)] text-4xl md:text-5xl font-bold gradient-text-gold gold-glow-text"
          >
            Experience
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mx-auto mt-4 h-[2px] w-24 bg-gradient-to-r from-transparent via-gold to-transparent origin-center"
          />
          <motion.p
            custom={0.35}
            variants={headingVariants}
            initial="hidden"
            animate={headingInView ? 'visible' : 'hidden'}
            className="font-[family-name:var(--font-inter)] text-base text-muted-foreground mt-5 max-w-2xl mx-auto leading-relaxed"
          >
            My professional journey, from academic projects to freelance
            development and open-source contributions.
          </motion.p>
        </div>

        {/* ════════════════════════════════════════
            Timeline Container
            ════════════════════════════════════════ */}
        <div ref={timelineRef} className="relative">
          {/* ── Gold Gradient Vertical Line
               Mobile: left-aligned | Desktop: centered ── */}
          <div className="absolute left-[15px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px] z-0">
            <motion.div
              variants={lineVariants}
              initial="hidden"
              animate={timelineInView ? 'visible' : 'hidden'}
              className="w-full h-full bg-gradient-to-b from-gold via-gold-accent to-gold/15 origin-top rounded-full"
            />
          </div>

          {/* ── Timeline Entries ── */}
          <div className="relative z-10 space-y-10 md:space-y-14">
            {experiences.map((entry, index) => {
              const style = statusStyles[entry.statusColor];
              const isLeft = index % 2 === 0; /* Alternate sides on desktop */

              return (
                <div key={entry.title} className="relative">
                  {/* ── Timeline Node (centered dot on the line) ── */}
                  <motion.div
                    custom={index}
                    variants={nodeVariants}
                    initial="hidden"
                    animate={timelineInView ? 'visible' : 'hidden'}
                    className="absolute left-[9px] md:left-1/2 md:-translate-x-1/2 top-7 z-20"
                  >
                    <div className="w-[14px] h-[14px] rounded-full border-[3px] border-gold bg-background shadow-[0_0_14px_rgba(212,175,55,0.5)] flex items-center justify-center">
                      <span
                        className={`w-[6px] h-[6px] rounded-full ${style.dot} ${
                          style.pulse ? 'animate-pulse' : ''
                        }`}
                      />
                    </div>
                  </motion.div>

                  {/* ── Desktop: 2-column grid for alternating layout
                       Mobile: single column, all cards right of line ── */}
                  {/* ── Desktop: alternating left/right layout ── */}
                  <div className="hidden md:grid md:grid-cols-2 md:gap-12">
                    <div>
                      {isLeft && (
                        <ExperienceCard
                          entry={entry}
                          index={index}
                          isInView={timelineInView}
                        />
                      )}
                    </div>
                    <div>
                      {!isLeft && (
                        <ExperienceCard
                          entry={entry}
                          index={index}
                          isInView={timelineInView}
                        />
                      )}
                    </div>
                  </div>

                  {/* ── Mobile: all cards placed right of the vertical line ── */}
                  <div className="md:hidden pl-10">
                    <ExperienceCard
                      entry={entry}
                      index={index}
                      isInView={timelineInView}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Timeline End Cap ── */}
          <motion.div
            initial={{ scale: 0 }}
            animate={timelineInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.0, ease: 'easeOut' as const }}
            className="absolute left-[7px] md:left-1/2 md:-translate-x-1/2 bottom-[-4px] z-20"
          >
            <div className="w-[18px] h-[18px] rounded-full bg-gradient-to-br from-gold to-gold-accent shadow-[0_0_20px_rgba(212,175,55,0.6)] flex items-center justify-center">
              <Code2 className="w-2.5 h-2.5 text-background" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}