'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { School, Briefcase, Laptop, Layers, TrendingUp } from 'lucide-react';

const milestones = [
  { year: '2022', title: 'Started as a Junior Web Developer', description: 'Joined Tech Solutions in Nowshera, building interactive UI components with HTML, CSS and vanilla JavaScript.', icon: Briefcase },
  { year: '2022', title: 'Began Freelancing', description: 'Started building and maintaining responsive websites for clients using React.js and Tailwind CSS.', icon: Laptop },
  { year: '2023', title: 'Cross-Browser Fixes & Legacy Migrations', description: 'Fixed cross-browser compatibility issues and helped senior developers migrate legacy sites to modern frameworks.', icon: Layers },
  { year: '2024', title: 'Started BS Computer Science', description: 'Began my BS in Computer Science at Northern University Nowshera while continuing to freelance.', icon: School },
  { year: 'Today', title: 'Freelance Front-End Developer', description: 'Building responsive, high-performance web applications with API integration, SEO best practices and clean UI/UX.', icon: TrendingUp },
];

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const sectionInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' });

  return (
    <section
      id="journey"
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
            How It All Started
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-[family-name:var(--font-poppins)] text-4xl md:text-5xl font-bold gradient-text-gold gold-glow-text"
          >
            My Journey
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mx-auto mt-4 h-[2px] w-24 bg-gradient-to-r from-transparent via-gold to-transparent origin-center"
          />
        </div>

        {/* ── Timeline ── */}
        <div ref={timelineRef} className="relative">
          {/* Vertical Line */}
          <div className="timeline-line" />

          <div className="space-y-12">
            {milestones.map((milestone, index) => {
              const isLeft = index % 2 === 0;
              const Icon = milestone.icon;

              return (
                <TimelineItem
                  key={index}
                  milestone={milestone}
                  icon={Icon}
                  isLeft={isLeft}
                  index={index}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────── Timeline Item Component ──────────────── */
function TimelineItem({
  milestone,
  icon: Icon,
  isLeft,
  index,
}: {
  milestone: (typeof milestones)[number];
  icon: React.ComponentType<{ className?: string }>;
  isLeft: boolean;
  index: number;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, margin: '-60px' });

  return (
    <div ref={itemRef} className="relative">
      {/* Timeline Dot */}
      <div className="timeline-dot top-6" />

      {/* Desktop: alternate left/right */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-12">
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
          className={isLeft ? '' : 'flex justify-end'}
        >
          {isLeft && (
            <div className="glass gradient-border rounded-xl p-5 card-hover w-full">
              <TimelineContent milestone={milestone} icon={Icon} />
            </div>
          )}
        </motion.div>

        {/* Right column */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
          className={!isLeft ? '' : 'flex justify-end'}
        >
          {!isLeft && (
            <div className="glass gradient-border rounded-xl p-5 card-hover w-full">
              <TimelineContent milestone={milestone} icon={Icon} />
            </div>
          )}
        </motion.div>
      </div>

      {/* Mobile: all left-aligned */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' }}
        className="md:hidden pl-12"
      >
        <div className="glass gradient-border rounded-xl p-5 card-hover">
          <TimelineContent milestone={milestone} icon={Icon} />
        </div>
      </motion.div>
    </div>
  );
}

/* ──────────────── Timeline Content ──────────────── */
function TimelineContent({
  milestone,
  icon: Icon,
}: {
  milestone: (typeof milestones)[number];
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-gold/20 to-gold-accent/10 border border-gold/20 flex items-center justify-center mt-0.5">
        <Icon className="w-5 h-5 text-gold" />
      </div>
      <div className="flex-1 min-w-0">
        <span className="inline-block font-[family-name:var(--font-inter)] text-xs font-bold uppercase tracking-wider text-gold/80 bg-gold/10 px-2.5 py-0.5 rounded-full mb-2">
          {milestone.year}
        </span>
        <h3 className="font-[family-name:var(--font-poppins)] text-base font-semibold text-foreground mb-1">
          {milestone.title}
        </h3>
        <p className="font-[family-name:var(--font-inter)] text-sm text-muted-foreground leading-relaxed">
          {milestone.description}
        </p>
      </div>
    </div>
  );
}