'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote, GraduationCap, Heart, Rocket, Eye, Sparkles } from 'lucide-react';

/* ──────────────── Animated Section Wrapper ──────────────── */
function FadeIn({
  children,
  inView,
  delay = 0,
  direction = 'up',
  className = '',
}: {
  children: React.ReactNode;
  inView: boolean;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
  className?: string;
}) {
  const dirMap = {
    up: { y: 30 },
    left: { x: -30 },
    right: { x: 30 },
  };
  return (
    <motion.div
      initial={{ opacity: 0, ...dirMap[direction] }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────── Main Who I Am Section ──────────────── */
export default function WhoIAm() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const sectionInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' });
  const leftInView = useInView(leftRef, { once: true, margin: '-50px' });
  const rightInView = useInView(rightRef, { once: true, margin: '-50px' });

  const paragraphs = [
    {
      icon: Heart,
      text: (
        <>
          I&apos;m a <span className="text-gold font-semibold">Front-End Web Developer</span>{' '}
          who enjoys turning designs into fast, responsive and user-friendly websites.
          I started my professional journey in 2022 and have been building for the web ever since.
        </>
      ),
    },
    {
      icon: GraduationCap,
      text: (
        <>
          I&apos;m currently pursuing a{' '}
          <span className="text-gold font-semibold">
            BS in Computer Science at Northern University Nowshera (2024–2028)
          </span>
          , building a strong academic foundation alongside my hands-on development work.
        </>
      ),
    },
    {
      icon: Rocket,
      text: (
        <>
          My day-to-day stack is{' '}
          <span className="text-gold font-semibold">React.js, Tailwind CSS, Bootstrap and JavaScript</span>
          , with HTML5, CSS3 and jQuery as the foundation. I also integrate RESTful APIs and
          third-party services like payment gateways and maps.
        </>
      ),
    },
    {
      icon: Sparkles,
      text: (
        <>
          I&apos;ve worked as a{' '}
          <span className="text-gold font-semibold">freelancer</span> collaborating with clients
          on Figma mockups for pixel-perfect implementation, and as a Junior Web Developer at
          Tech Solutions in Nowshera, where I fixed cross-browser issues and helped migrate
          legacy sites to modern frameworks.
        </>
      ),
    },
    {
      icon: Eye,
      text: (
        <>
          I care about{' '}
          <span className="text-gold font-semibold">SEO best practices and clean UI/UX</span>, so
          the sites I build are easy to find, easy to use and easy to maintain.
        </>
      ),
    },
    {
      icon: Heart,
      text: (
        <>
          I value{' '}
          <span className="text-gold font-semibold">problem solving, attention to detail,
          teamwork and good time management</span>
          {' '}— and I&apos;m always open to learning something new.
        </>
      ),
    },
  ];

  return (
    <section
      id="whoiam"
      ref={sectionRef}
      className="section-padding relative"
      style={{ background: 'var(--section-alt-bg)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* ── Section Heading ── */}
        <div ref={headingRef} className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-[family-name:var(--font-inter)] text-sm uppercase tracking-[0.25em] text-gold font-semibold mb-3"
          >
            The Person Behind The Code
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-[family-name:var(--font-poppins)] text-4xl md:text-5xl font-bold gradient-text-gold gold-glow-text"
          >
            Who I Am
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mx-auto mt-4 h-[2px] w-24 bg-gradient-to-r from-transparent via-gold to-transparent origin-center"
          />
        </div>

        {/* ── Two-Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* ── Left Column: Decorative Quote ── */}
          <div ref={leftRef} className="lg:col-span-2">
            <FadeIn inView={leftInView} direction="left" delay={0.1}>
              <div className="glass gradient-border rounded-2xl p-6 md:p-8 sticky top-28">
                {/* Decorative accent */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/25 to-gold-accent/10 border border-gold/20 flex items-center justify-center mb-6">
                  <Quote className="w-8 h-8 text-gold" />
                </div>

                <blockquote className="font-[family-name:var(--font-poppins)] text-xl md:text-2xl font-semibold text-foreground/90 leading-snug mb-6">
                  &ldquo;The best way to predict the future is to invent it.&rdquo;
                </blockquote>

                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
                  <span className="font-[family-name:var(--font-inter)] text-sm text-gold/70 font-medium">
                    Alan Kay
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-l from-gold/40 to-transparent" />
                </div>

                {/* Web dev quote */}
                <div className="border-t border-gold/15 pt-6">
                  <blockquote className="font-[family-name:var(--font-inter)] text-base text-foreground/80 leading-relaxed italic">
                    &ldquo;Web development is not about writing code. It&apos;s about solving
                    problems, telling stories, and creating experiences that resonate with
                    people across the globe.&rdquo;
                  </blockquote>
                  <p className="font-[family-name:var(--font-inter)] text-sm text-muted-foreground mt-3 font-medium">
                    — My guiding philosophy
                  </p>
                </div>

                {/* Decorative dots */}
                <div className="mt-6 flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-gold/40"
                      style={{ opacity: 1 - i * 0.25 }}
                    />
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* ── Right Column: Content ── */}
          <div ref={rightRef} className="lg:col-span-3 flex flex-col gap-5">
            {paragraphs.map((item, idx) => (
              <FadeIn key={idx} inView={rightInView} delay={idx * 0.1}>
                <div className="glass rounded-xl p-5 flex gap-4 items-start card-hover">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-gold/20 to-gold-accent/10 border border-gold/20 flex items-center justify-center mt-0.5">
                    <item.icon className="w-5 h-5 text-gold" />
                  </div>
                  <p className="font-[family-name:var(--font-inter)] text-[0.9375rem] text-foreground/85 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </FadeIn>
            ))}

            {/* Closing signature */}
            <FadeIn inView={rightInView} delay={paragraphs.length * 0.1 + 0.05}>
              <div className="glass gradient-border rounded-xl p-6 mt-2 text-center">
                <p className="font-[family-name:var(--font-poppins)] text-lg font-semibold text-foreground/90 mb-1">
                  Tayyaba Saddique
                </p>
                <p className="font-[family-name:var(--font-inter)] text-sm text-gold font-medium">
                  Front-End Developer · CS Student
                </p>
                <div className="flex justify-center gap-2 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-[2px] rounded-full bg-gradient-to-r from-gold to-gold-accent"
                      style={{ opacity: 1 - i * 0.15 }}
                    />
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}