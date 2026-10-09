'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  { question: 'What services do you offer as a Front-End Developer?', answer: 'I build responsive websites and web applications, landing pages, e-commerce front-ends and dashboards. I also integrate RESTful APIs and third-party services (such as payment gateways and maps), fix cross-browser issues, maintain existing websites and help migrate legacy sites to modern frameworks.' },
  { question: 'What technologies do you work with?', answer: 'My core stack is HTML5, CSS3 and JavaScript, along with jQuery, React.js, Tailwind CSS and Bootstrap. For my workflow I use GitHub, VS Code, Postman, Figma and Chrome DevTools.' },
  { question: 'Do you build responsive websites?', answer: 'Yes. Responsive design is part of every project I build, so the website looks and works well on phones, tablets and desktops.' },
  { question: 'Can you work from Figma designs?', answer: 'Yes. I have worked with clients using Figma mockups to deliver pixel-perfect implementations of their designs.' },
  { question: 'Do you handle SEO?', answer: 'I apply SEO best practices while building — clean semantic structure, performance-conscious code and search-friendly markup — to help improve organic search rankings.' },
  { question: 'Can you integrate APIs into my website?', answer: 'Yes. I have experience integrating RESTful APIs and third-party services like payment gateways and maps, and I use Postman to test and debug API requests.' },
  { question: 'Can you fix or update an existing website?', answer: 'Yes. I have maintained and updated existing websites, fixed cross-browser compatibility problems and helped migrate legacy sites to modern frameworks.' },
  { question: 'How long will my project take and what will it cost?', answer: 'It depends on the scope, number of pages and features. Send me your requirements by email or WhatsApp and we can discuss the timeline and cost for your specific project.' },
  { question: 'What is your educational background?', answer: 'I am currently pursuing a BS in Computer Science at Northern University Nowshera (2024–2028), and I have been working as a front-end developer since 2022.' },
  { question: 'How can I contact you?', answer: 'You can email me at tayyaba.saddique.cs@gmail.com or reach me on WhatsApp / phone at +92 332 1952862. You can also use the contact form on this page.' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isInView) {
      const hash = window.location.hash;
      if (hash === '#faq') {
        const timer = setTimeout(() => {
          sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [isInView]);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="section-padding relative animated-bg"
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
            Common Questions
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text-gold gold-glow-text"
          >
            Frequently Asked Questions
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
            className="mt-4 text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base"
          >
            Find answers to the most common questions about my services, process, and how we can work together.
          </motion.p>
        </div>

        {/* ── FAQ Accordion List ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-3"
        >
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="gradient-border"
              >
                <div className="glass rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-[var(--gold-glow)]">
                  {/* Question Button */}
                  <button
                    onClick={() => handleToggle(index)}
                    className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <span className="font-[family-name:var(--font-poppins)] text-sm sm:text-base font-semibold text-foreground group-hover:text-gold transition-colors duration-300 leading-relaxed">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`faq-icon flex-shrink-0 w-5 h-5 text-gold ${isOpen ? 'open' : ''}`}
                    />
                  </button>

                  {/* Answer Content */}
                  <div className={`faq-content ${isOpen ? 'open' : ''}`}>
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                      <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-4" />
                      <p className="font-[family-name:var(--font-inter)] text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
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