'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  MessageSquare,
  Lightbulb,
  Code2,
  Rocket,
  ArrowRight,
} from 'lucide-react';

/* ================================================================== */
/*  Data                                                               */
/* ================================================================== */

const STEPS = [
  {
    icon: MessageSquare,
    step: '01',
    title: 'Discovery',
    subtitle: 'Understanding Your Vision',
    description:
      'We start with a detailed conversation to understand your goals, target audience, and project requirements.',
  },
  {
    icon: Lightbulb,
    step: '02',
    title: 'Planning',
    subtitle: 'Strategy & Architecture',
    description:
      'I create a comprehensive plan including wireframes, technology choices, and project milestones.',
  },
  {
    icon: Code2,
    step: '03',
    title: 'Design & Development',
    subtitle: 'Building With Precision',
    description:
      'Clean, semantic code with pixel-perfect design implementation, responsive layouts, and smooth animations.',
  },
  {
    icon: Rocket,
    step: '04',
    title: 'Launch & Support',
    subtitle: 'Delivery & Beyond',
    description:
      'Thorough testing, deployment, and ongoing support to ensure everything works flawlessly.',
  },
];

/* ================================================================== */
/*  Animation Variants                                                 */
/* ================================================================== */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
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

export default function WorkProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      id="process"
      ref={sectionRef}
      className="section-padding animated-bg relative"
      aria-label="Work Process"
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
            My Process
          </span>
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold sm:text-4xl lg:text-5xl">
            How I{' '}
            <span className="gradient-text-gold">Work</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            A structured approach to turning your ideas into polished digital experiences.
          </p>
        </motion.div>

        {/* Desktop: Horizontal Steps with Connecting Line */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="hidden lg:block"
        >
          <div className="relative flex items-start justify-between">
            {/* Connecting gold line */}
            <div
              className="absolute left-0 right-0 top-14 h-px bg-gradient-to-r from-gold/20 via-gold to-gold/20"
              aria-hidden="true"
            />

            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  variants={itemVariants}
                  className="relative z-10 flex flex-1 flex-col items-center px-4"
                >
                  {/* Step number circle */}
                  <div
                    className="
                      mb-6 flex h-28 w-28 items-center justify-center rounded-full
                      border-2 border-gold/40 bg-background
                      shadow-[0_0_30px_rgba(212,175,55,0.15)]
                      transition-all duration-300
                      hover:border-gold hover:shadow-[0_0_40px_rgba(212,175,55,0.3)]
                    "
                  >
                    <div className="flex flex-col items-center gap-1">
                      <Icon className="text-gold" size={28} />
                      <span className="text-xs font-bold text-gold/60">{step.step}</span>
                    </div>
                  </div>

                  {/* Arrow between steps */}
                  {index < STEPS.length - 1 && (
                    <div
                      className="absolute -right-4 top-[4.5rem] z-20 text-gold/40"
                      aria-hidden="true"
                    >
                      <ArrowRight size={20} />
                    </div>
                  )}

                  {/* Card */}
                  <div className="gradient-border w-full max-w-[260px]">
                    <div className="glass card-hover rounded-2xl p-6 text-center">
                      <h3 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-foreground">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-gold">{step.subtitle}</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Mobile / Tablet: Vertical Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="lg:hidden"
        >
          <div className="relative ml-6">
            {/* Vertical connecting line */}
            <div
              className="absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-gold/20 via-gold to-gold/20"
              aria-hidden="true"
            />

            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  variants={itemVariants}
                  className="relative mb-10 pl-10 last:mb-0"
                >
                  {/* Step circle on the line */}
                  <div
                    className="
                      absolute -left-6 top-0 flex h-12 w-12 items-center justify-center rounded-full
                      border-2 border-gold/40 bg-background
                      shadow-[0_0_20px_rgba(212,175,55,0.15)]
                    "
                  >
                    <Icon className="text-gold" size={20} />
                  </div>

                  {/* Card */}
                  <div className="gradient-border">
                    <div className="glass card-hover rounded-2xl p-6">
                      <div className="mb-2 flex items-center gap-3">
                        <span className="text-xs font-bold text-gold/60">{step.step}</span>
                        <h3 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-foreground">
                          {step.title}
                        </h3>
                      </div>
                      <p className="mb-2 text-sm font-medium text-gold">{step.subtitle}</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}