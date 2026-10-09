'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Code2,
  Monitor,
  Rocket,
  UserCircle,
  Palette,
  RefreshCw,
  Gauge,
  Search,
  Globe,
  Bug,
  FileCode2,
  Settings,
  ShoppingCart,
  Wrench,
  MousePointerClick,
  LayoutGrid,
  Sparkles,
  Layers,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ServiceItem {
  name: string;
  description: string;
  icon: LucideIcon;
  badge?: string;       // optional "Available" / pricing badge
}

interface ServiceCategory {
  title: string;
  accent: string;       // a short label shown beside category heading
  items: ServiceItem[];
}

/* ------------------------------------------------------------------ */
/*  Data — services grouped in categories, each with a unique icon        */
/* ------------------------------------------------------------------ */

const categories: ServiceCategory[] = [
  {
    title: 'Web Development',
    accent: 'Core',
    items: [
      {
        name: 'Front-End Development',
        description:
          'Building pixel-perfect, interactive front-ends with React.js, Tailwind CSS, and modern web technologies.',
        icon: Code2,
      },
      {
        name: 'Responsive Website Design',
        description:
          'Crafting layouts that look flawless on every screen size — from mobile to ultra-wide displays.',
        icon: Monitor,
      },
      {
        name: 'Landing Pages',
        description:
          'High-converting, visually compelling landing pages designed to captivate and drive action.',
        icon: Rocket,
      },
      {
        name: 'Portfolio Websites',
        description:
          'Stunning personal portfolios that showcase your work, skills, and professional expertise.',
        icon: UserCircle,
      },
    ],
  },
  {
    title: 'Design & UX',
    accent: 'Creative',
    items: [
      {
        name: 'UI/UX Improvements',
        description:
          'Enhancing visual design, accessibility, and overall user experience to delight your visitors.',
        icon: Palette,
      },
      {
        name: 'Website Redesign',
        description:
          'Modernizing outdated websites with fresh design language and dramatically improved UX.',
        icon: RefreshCw,
      },
    ],
  },
  {
    title: 'Optimization',
    accent: 'Performance',
    items: [
      {
        name: 'Performance Optimization',
        description:
          'Boosting site speed, reducing load times, and improving Core Web Vitals for better rankings.',
        icon: Gauge,
      },
      {
        name: 'SEO-Friendly Front-End',
        description:
          'Implementing semantic markup, structured data, and best practices for search visibility.',
        icon: Search,
      },
      {
        name: 'Cross Browser Compatibility',
        description:
          'Ensuring pixel-perfect rendering and consistent functionality across all major browsers.',
        icon: Globe,
      },
    ],
  },
  {
    title: 'Maintenance',
    accent: 'Support',
    items: [
      {
        name: 'Bug Fixing',
        description:
          'Identifying and resolving bugs with clean, well-tested code patches and thorough QA.',
        icon: Bug,
      },
      {
        name: 'Code Refactoring',
        description:
          'Restructuring existing codebases for better readability, performance, and maintainability.',
        icon: FileCode2,
      },
      {
        name: 'Website Maintenance',
        description:
          'Ongoing support, updates, security patches, and monitoring to keep your site running smoothly.',
        icon: Settings,
      },
    ],
  },
  {
    title: 'Specialized',
    accent: 'Niche',
    items: [
      {
        name: 'E-Commerce Front-End',
        description:
          'Building engaging, conversion-optimized storefronts with smooth cart and checkout experiences.',
        icon: ShoppingCart,
      },
      {
        name: 'Website Fixes',
        description:
          'Quick diagnosis and resolution of layout, styling, and functionality issues — fast turnaround.',
        icon: Wrench,
      },
      {
        name: 'JavaScript Interactions',
        description:
          'Adding dynamic, interactive elements and smooth micro-animations that bring pages to life.',
        icon: MousePointerClick,
      },
      {
        name: 'Bootstrap Development',
        description:
          'Rapid, responsive development leveraging the Bootstrap framework for clean, consistent UIs.',
        icon: LayoutGrid,
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const sectionHeadingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

const categoryVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-padding relative"
    >
      <div className="max-w-7xl mx-auto">
        {/* ---- Section Heading ---- */}
        <motion.div
          initial="hidden"
          animate={visible ? 'visible' : 'hidden'}
          variants={sectionHeadingVariants}
          className="text-center mb-14 lg:mb-20"
        >
          {/* Subtitle */}
          <span className="inline-block text-gold font-[family-name:var(--font-poppins)] text-sm sm:text-base font-semibold tracking-widest uppercase mb-3">
            What I Offer
          </span>

          {/* Title */}
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
            Services &{' '}
            <span className="gradient-text-gold">Solutions</span>
          </h2>

          {/* Gold divider */}
          <div className="w-24 h-1 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] mx-auto rounded-full mb-5" />

          {/* Description */}
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-[family-name:var(--font-inter)]">
            Comprehensive front-end solutions tailored to bring your vision to life —
            from pixel-perfect interfaces to performance-optimized experiences that
            leave a lasting impression.
          </p>
        </motion.div>

        {/* ---- Service Categories ---- */}
        {categories.map((cat) => (
          <div key={cat.title} className="mb-14 last:mb-0">
            {/* Category Heading */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={visible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <Layers className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="font-[family-name:var(--font-poppins)] text-lg sm:text-xl font-semibold text-foreground">
                {cat.title}
              </h3>
              <span className="text-xs font-medium tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#D4AF37]/10 text-gold border border-[#D4AF37]/20">
                {cat.accent}
              </span>
              {/* Decorative line */}
              <div className="flex-1 h-px bg-gradient-to-r from-[#D4AF37]/30 to-transparent" />
            </motion.div>

            {/* Service Cards Grid — 1 col mobile, 2 col tablet, 3 col desktop */}
            <motion.div
              variants={categoryVariants}
              initial="hidden"
              animate={visible ? 'visible' : 'hidden'}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
            >
              {cat.items.map((service) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.name}
                    variants={cardVariants}
                    className="gradient-border group"
                  >
                    <div className="glass rounded-2xl p-6 sm:p-7 flex flex-col h-full relative overflow-hidden cursor-default transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:-translate-y-1">


                      {/* --- Hover Glow Overlay --- */}
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background:
                            'radial-gradient(circle at 50% 20%, rgba(212,175,55,0.1) 0%, transparent 70%)',
                        }}
                      />

                      {/* --- Top Row: Icon + Badge --- */}
                      <div className="flex items-start justify-between relative z-10 mb-4">
                        {/* Icon Container — 56px with gold gradient */}
                        <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 via-[#FFD700]/10 to-[#D4AF37]/5 border border-[#D4AF37]/25 group-hover:border-[#D4AF37]/60 group-hover:shadow-[0_0_24px_rgba(212,175,55,0.25)] transition-all duration-300">
                          <Icon className="w-6 h-6 text-[#D4AF37] group-hover:text-[#FFD700] transition-colors duration-300" />
                        </div>

                        {/* Optional Badge */}
                        {service.badge && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-[#D4AF37]/10 text-gold border border-[#D4AF37]/20">
                            <Sparkles className="w-3 h-3" />
                            {service.badge}
                          </span>
                        )}
                      </div>

                      {/* --- Gold Accent Line --- */}
                      <div className="w-8 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#FFD700]/40 rounded-full mb-4 relative z-10" />

                      {/* --- Service Name --- */}
                      <h4 className="font-[family-name:var(--font-poppins)] text-base sm:text-[17px] font-semibold text-foreground leading-snug mb-2 relative z-10 group-hover:text-[#D4AF37] transition-colors duration-300">
                        {service.name}
                      </h4>

                      {/* --- Description --- */}
                      <p className="text-sm text-muted-foreground leading-relaxed relative z-10 mb-4 flex-1 font-[family-name:var(--font-inter)]">
                        {service.description}
                      </p>

                      {/* --- Subtle CTA hint --- */}
                      <div className="flex items-center gap-1.5 text-gold/60 group-hover:text-gold transition-colors duration-300 relative z-10 mt-auto">
                        <span className="text-xs font-medium font-[family-name:var(--font-inter)]">
                          Learn more
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}