'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Code2,
  Sparkles,
  Target,
  Users,
  Lightbulb,
  TrendingUp,
} from 'lucide-react';

/* ================================================================== */
/*  Data                                                               */
/* ================================================================== */

const PRINCIPLES = [
  {
    icon: Code2,
    title: 'Clean Code',
    description:
      'Writing readable, maintainable code that others can understand and build upon.',
  },
  {
    icon: Sparkles,
    title: 'Innovation',
    description:
      'Embracing modern frameworks like React.js and Tailwind CSS to build better web experiences.',
  },
  {
    icon: Target,
    title: 'Performance',
    description:
      'Every millisecond matters. Optimizing for speed and user experience.',
  },
  {
    icon: Users,
    title: 'Accessibility',
    description:
      'Building inclusive web experiences that work for everyone.',
  },
  {
    icon: Lightbulb,
    title: 'Problem Solving',
    description:
      'Breaking down complex challenges into elegant, efficient solutions.',
  },
  {
    icon: TrendingUp,
    title: 'Continuous Learning',
    description:
      'Always growing, always improving, never stopping.',
  },
];

/* ================================================================== */
/*  Animation Variants                                                 */
/* ================================================================== */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' as const },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="section-padding animated-bg relative"
      aria-label="Development Philosophy"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Heading */}
        <motion.div
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-gold">
            My Approach
          </span>
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold sm:text-4xl lg:text-5xl">
            Development{' '}
            <span className="gradient-text-gold">Philosophy</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            The core principles that guide every line of code I write and every project I build.
          </p>
        </motion.div>

        {/* Principle Cards Grid - 2x3 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PRINCIPLES.map((principle) => {
            const Icon = principle.icon;
            return (
              <motion.div key={principle.title} variants={itemVariants}>
                <div className="gradient-border h-full">
                  <div className="glass card-hover flex h-full flex-col items-center rounded-2xl p-8 text-center">
                    {/* Gold circle with icon */}
                    <div
                      className="
                        mb-5 flex h-16 w-16 items-center justify-center rounded-full
                        border-2 border-gold bg-gradient-to-br from-gold/20 to-gold/5
                        shadow-[0_0_20px_rgba(212,175,55,0.2)]
                      "
                    >
                      <Icon className="text-gold" size={28} />
                    </div>

                    {/* Title */}
                    <h3 className="font-[family-name:var(--font-poppins)] mb-3 text-lg font-bold text-foreground">
                      {principle.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}