'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const technologies = [
  'HTML5',
  'CSS3',
  'JavaScript',
  'jQuery',
  'React.js',
  'Tailwind CSS',
  'Bootstrap',
  'API Integration',
  'Responsive Design',
  'SEO Basics',
  'GitHub',
  'VS Code',
  'Postman',
  'Figma',
  'Chrome DevTools',
];

function TechPill({ name }: { name: string }) {
  return (
    <span className="glass inline-flex items-center px-5 py-2.5 rounded-full font-[family-name:var(--font-inter)] text-sm font-medium text-foreground/80 whitespace-nowrap shrink-0 select-none">
      {name}
    </span>
  );
}

export default function SkillsMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const sectionInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' });
  const marqueeInView = useInView(marqueeRef, { once: true, margin: '-40px' });

  // Duplicate the list for seamless infinite loop
  const items = [...technologies, ...technologies];

  return (
    <section
      id="marquee"
      ref={sectionRef}
      className="section-padding animated-bg relative"
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
            Tech Stack
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-[family-name:var(--font-poppins)] text-4xl md:text-5xl font-bold gradient-text-gold gold-glow-text"
          >
            Skills & Technologies
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mx-auto mt-4 h-[2px] w-24 bg-gradient-to-r from-transparent via-gold to-transparent origin-center"
          />
        </div>

        {/* ── Marquee ── */}
        <motion.div
          ref={marqueeRef}
          initial={{ opacity: 0, y: 30 }}
          animate={marqueeInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="marquee-container">
            <div className="marquee-track">
              {items.map((tech, index) => (
                <div key={`${tech}-${index}`} className="flex items-center px-2.5 py-1">
                  <TechPill name={tech} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}