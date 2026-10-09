'use client';

import { useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FileText,
  Download,
  ExternalLink,
  FileDown,
} from 'lucide-react';

const pdfInfo = {
  pageCount: 1,
  fileSize: '~114 KB',
  fileName: 'Tayyaba_Saddique_CV.pdf',
};

export default function CVSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const sectionInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' });
  const cardInView = useInView(cardRef, { once: true, margin: '-40px' });

  const handleDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = pdfInfo.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const handleOpenNewTab = useCallback(() => {
    window.open('/resume.pdf', '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <section
      id="cv"
      ref={sectionRef}
      className="section-padding animated-bg relative"
    >
      <div className="max-w-4xl mx-auto">
        {/* ── Section Heading ── */}
        <div ref={headingRef} className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-[family-name:var(--font-inter)] text-sm uppercase tracking-[0.25em] text-gold font-semibold mb-3"
          >
            Resume
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-[family-name:var(--font-poppins)] text-4xl md:text-5xl font-bold gradient-text-gold gold-glow-text"
          >
            My Resume
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
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-[family-name:var(--font-inter)] text-base text-muted-foreground mt-5 max-w-xl mx-auto leading-relaxed"
          >
            View or download my complete resume to learn more about my skills,
            education, and experience.
          </motion.p>
        </div>

        {/* ── CV Main Card ── */}
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 30 }}
          animate={cardInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass gradient-border rounded-2xl p-8 md:p-10 card-hover"
        >
          {/* Document Icon with animated gold pulse */}
          <div className="flex flex-col items-center gap-6 mb-8">
            <motion.div
              className="relative"
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(212,175,55,0.3)',
                  '0 0 20px 6px rgba(212,175,55,0.15)',
                  '0 0 0 0 rgba(212,175,55,0.3)',
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut' as const,
              }}
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold/20 to-gold-accent/10 border border-gold/25 flex items-center justify-center">
                <FileText className="w-10 h-10 text-gold" />
              </div>
            </motion.div>

            {/* File Info */}
            <div className="text-center space-y-2">
              <h3 className="font-[family-name:var(--font-poppins)] text-xl md:text-2xl font-semibold text-foreground">
                Tayyaba Saddique — Front-End Web Developer Resume
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground font-[family-name:var(--font-inter)]">
                <span className="flex items-center gap-1.5">
                  <FileDown className="w-3.5 h-3.5 text-gold/60" />
                  {pdfInfo.fileSize}
                </span>
                <span className="text-gold/30">•</span>
                <span>PDF Format</span>
                <span className="text-gold/30">•</span>
                <span className="text-gold/80 font-medium">
                  {pdfInfo.pageCount} page
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleOpenNewTab}
              className="btn-gold ripple-btn flex items-center gap-2.5 cursor-pointer w-full sm:w-auto justify-center"
            >
              <ExternalLink className="w-4 h-4" />
              View CV
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleDownload}
              className="btn-gold-outline flex items-center gap-2.5 cursor-pointer w-full sm:w-auto justify-center"
            >
              <Download className="w-4 h-4" />
              Download CV
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}