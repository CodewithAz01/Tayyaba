'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Mail,
  MessageCircle,
  Download,
} from 'lucide-react';

/* ================================================================== */
/*  Custom SVG Social Icons                                             */
/* ================================================================== */

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1zm5 0a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: 'Email', href: 'mailto:tayyaba.saddique.cs@gmail.com', Icon: Mail },
  { label: 'WhatsApp', href: 'https://wa.me/923321952862', Icon: WhatsAppIcon },
];

/* ================================================================== */
/*  Animation Variants                                                 */
/* ================================================================== */

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="section-padding animated-bg relative"
      aria-label="Call to Action"
    >
      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Main CTA Card with animated gold gradient border */}
        <div className="relative">
          {/* Animated border glow */}
          <div
            className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-gold/60 via-gold-light to-gold/60 opacity-60 blur-[1px]"
            aria-hidden="true"
          />

          {/* Card */}
          <motion.div
            variants={headingVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="glass relative rounded-3xl p-8 sm:p-12 lg:p-16"
          >
            {/* Floating decorative elements */}
            <div
              className="absolute -top-4 -left-4 h-24 w-24 rounded-full bg-gold/5 blur-2xl"
              aria-hidden="true"
            />
            <div
              className="absolute -right-4 -bottom-4 h-32 w-32 rounded-full bg-gold/5 blur-2xl"
              aria-hidden="true"
            />

            <div className="relative z-10 text-center">
              {/* Heading */}
              <motion.h2
                variants={itemVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="font-[family-name:var(--font-poppins)] text-3xl font-bold sm:text-4xl lg:text-5xl"
              >
                Ready to Build Something{' '}
                <span className="gradient-text-gold gold-glow-text">Amazing?</span>
              </motion.h2>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="mx-auto mt-6 max-w-2xl font-[family-name:var(--font-inter)] text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                Let&apos;s turn your ideas into reality. Whether you need a stunning website,
                a responsive web application, or a complete front-end overhaul &mdash; I&apos;m here
                to help.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
              >
                {/* Hire Me */}
                <a
                  href="mailto:tayyaba.saddique.cs@gmail.com"
                  className="btn-gold ripple-btn inline-flex items-center gap-2 font-[family-name:var(--font-inter)]"
                >
                  <Mail size={18} />
                  Hire Me
                </a>

                {/* WhatsApp Me */}
                <a
                  href="https://wa.me/923321952862"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold-outline ripple-btn inline-flex items-center gap-2 font-[family-name:var(--font-inter)]"
                >
                  <MessageCircle size={18} />
                  WhatsApp Me
                </a>

                {/* Download CV */}
                <a
                  href="/resume.pdf"
                  download="Tayyaba_Saddique_CV.pdf"
                  className="
                    inline-flex items-center gap-2 rounded-lg border border-foreground/20
                    bg-transparent px-6 py-3 text-sm font-semibold text-foreground
                    transition-all duration-300 hover:border-gold hover:text-gold
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-gold
                    font-[family-name:var(--font-inter)]
                  "
                >
                  <Download size={18} />
                  Download CV
                </a>
              </motion.div>

              {/* QR Code + Social Links Row */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="mt-12 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10"
              >

                {/* Social Links */}
                <div className="flex flex-col items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gold">
                    Get In Touch
                  </span>
                  <div className="flex items-center gap-3">
                    {SOCIAL_LINKS.map((social) => {
                      const { Icon } = social;
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          className="
                            flex h-11 w-11 items-center justify-center rounded-full
                            border border-gold/30 bg-gold/5 text-foreground/60
                            transition-all duration-300
                            hover:border-gold hover:bg-gold/15 hover:text-gold
                            hover:shadow-[0_0_16px_rgba(212,175,55,0.35)]
                            focus:outline-none focus-visible:ring-2 focus-visible:ring-gold
                          "
                        >
                          <Icon size={18} />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}