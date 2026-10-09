'use client';

import { useCallback } from 'react';
import {
  Mail,
  Phone,
  ArrowUp,
  Heart,
  MapPin,
  MessageCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';

/* ================================================================== */
/*  Data Constants                                                     */
/* ================================================================== */

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const EXPLORE_LINKS = [
  { label: 'Education', href: '#education' },
  { label: 'Experience', href: '#experience' },
  { label: 'Journey', href: '#journey' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Resume', href: '#cv' },
];

const SERVICES = [
  'Front-End Development',
  'Responsive Design',
  'Landing Pages',
  'Portfolio Websites',
  'API Integration',
  'SEO Best Practices',
];

/* ================================================================== */
/*  Custom SVG Social Icons (text logos)                                */
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
/*  Helpers                                                            */
/* ================================================================== */

function smoothScrollTo(href: string) {
  const id = href.replace('#', '');
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

/* ================================================================== */
/*  Sub-Components                                                     */
/* ================================================================== */

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-[family-name:var(--font-inter)] text-sm font-bold uppercase tracking-widest text-gold">
        {title}
      </h3>
      {children}
    </div>
  );
}

function SocialIconBtn({
  social,
  size = 16,
  className = '',
}: {
  social: (typeof SOCIAL_LINKS)[number];
  size?: number;
  className?: string;
}) {
  const { Icon } = social;
  return (
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.label}
      className={`
        flex items-center justify-center rounded-full
        border border-gold/30 bg-gold/5 text-foreground/60
        transition-all duration-300
        hover:border-gold hover:bg-gold/15 hover:text-gold
        hover:shadow-[0_0_16px_rgba(212,175,55,0.35)]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-gold
        ${className}
      `}
    >
      <Icon size={size} />
    </a>
  );
}

/* ================================================================== */
/*  Framer Motion Variants                                             */
/* ================================================================== */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' as const },
  },
};

/* ================================================================== */
/*  Main Footer Component                                              */
/* ================================================================== */

export default function Footer() {
  const handleLinkClick = useCallback((href: string) => {
    smoothScrollTo(href);
  }, []);

  return (
    <footer
      id="footer"
      className="relative w-full font-[family-name:var(--font-inter)]"
      role="contentinfo"
    >
      {/* Gold accent line at very top */}
      <div
        className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold to-transparent"
        aria-hidden="true"
      />

      {/* Main footer body (glassmorphism) */}
      <div className="glass">
        <div className="mx-auto max-w-7xl px-4 pt-14 pb-8 sm:px-6 lg:px-8">
          {/* 5-Column Grid (responsive: 1 -> 2 -> 5 columns) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="
              grid grid-cols-1 gap-10
              sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10
              lg:grid-cols-5 lg:gap-8
            "
          >
            {/* Column 1 - Brand */}
            <motion.div
              variants={itemVariants}
              className="sm:col-span-2 lg:col-span-1"
            >
              <div className="flex flex-col gap-4">
                {/* Logo + Name */}
                <div className="flex items-center gap-3">
                  <span
                    className="
                      flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full
                      border-2 border-gold bg-gradient-to-br from-gold/20 to-gold/5
                      shadow-[0_0_14px_rgba(212,175,55,0.25)]
                    "
                  >
                    <span className="gradient-text-gold font-[family-name:var(--font-space-grotesk)] text-lg font-bold select-none">
                      TS
                    </span>
                  </span>
                  <div className="flex flex-col">
                    <span className="font-[family-name:var(--font-poppins)] text-base font-semibold text-foreground">
                      Tayyaba Saddique
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Front-End Web Developer
                    </span>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-sm leading-relaxed text-foreground/65">
                  Building responsive, high-performance web
                  experiences with React.js and Tailwind CSS.
                </p>
              </div>
            </motion.div>

            {/* Column 2 - Quick Links */}
            <motion.div variants={itemVariants}>
              <FooterColumn title="Quick Links">
                <ul className="flex flex-col gap-2.5">
                  {QUICK_LINKS.map((link) => (
                    <li key={link.href}>
                      <button
                        onClick={() => handleLinkClick(link.href)}
                        className="
                          text-left text-sm text-foreground/70 transition-colors duration-200
                          hover:text-gold focus:outline-none focus-visible:text-gold
                        "
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </FooterColumn>
            </motion.div>

            {/* Column 3 - Explore */}
            <motion.div variants={itemVariants}>
              <FooterColumn title="Explore">
                <ul className="flex flex-col gap-2.5">
                  {EXPLORE_LINKS.map((link) => (
                    <li key={link.href}>
                      <button
                        onClick={() => handleLinkClick(link.href)}
                        className="
                          text-left text-sm text-foreground/70 transition-colors duration-200
                          hover:text-gold focus:outline-none focus-visible:text-gold
                        "
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </FooterColumn>
            </motion.div>

            {/* Column 4 - Services */}
            <motion.div variants={itemVariants}>
              <FooterColumn title="Services">
                <ul className="flex flex-col gap-2.5">
                  {SERVICES.map((service) => (
                    <li
                      key={service}
                      className="flex items-start gap-2 text-sm text-foreground/70"
                    >
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-gold/60" />
                      {service}
                    </li>
                  ))}
                </ul>
              </FooterColumn>
            </motion.div>

            {/* Column 5 - Connect */}
            <motion.div variants={itemVariants}>
              <FooterColumn title="Connect">
                <ul className="flex flex-col gap-3.5">
                  {/* Email */}
                  <li>
                    <a
                      href="mailto:tayyaba.saddique.cs@gmail.com"
                      className="
                        group flex items-center gap-2.5 text-sm text-foreground/70
                        transition-colors duration-200 hover:text-gold
                        focus:outline-none focus-visible:text-gold
                      "
                    >
                      <Mail
                        size={15}
                        className="flex-shrink-0 text-gold/60 transition-colors duration-200 group-hover:text-gold"
                      />
                      <span className="break-all">tayyaba.saddique.cs@gmail.com</span>
                    </a>
                  </li>

                  {/* Phone */}
                  <li>
                    <a
                      href="tel:+923321952862"
                      className="
                        group flex items-center gap-2.5 text-sm text-foreground/70
                        transition-colors duration-200 hover:text-gold
                        focus:outline-none focus-visible:text-gold
                      "
                    >
                      <Phone
                        size={15}
                        className="flex-shrink-0 text-gold/60 transition-colors duration-200 group-hover:text-gold"
                      />
                      <span>+92 332 1952862</span>
                    </a>
                  </li>

                  {/* Location */}
                  <li>
                    <span className="flex items-start gap-2.5 text-sm text-foreground/70">
                      <MapPin
                        size={15}
                        className="mt-0.5 flex-shrink-0 text-gold/60"
                      />
                      <span>Nowshera, Pakistan</span>
                    </span>
                  </li>

                  {/* Social icons grid */}
                  <li className="pt-2">
                    <div className="flex flex-wrap items-center gap-2.5">
                      {SOCIAL_LINKS.map((social) => (
                        <SocialIconBtn
                          key={social.label}
                          social={social}
                          size={16}
                          className="h-9 w-9"
                        />
                      ))}
                    </div>
                  </li>
                </ul>
              </FooterColumn>
            </motion.div>
          </motion.div>

          {/* Bottom Bar */}
          {/* Gold gradient divider */}
          <div
            className="my-8 h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent"
            aria-hidden="true"
          />

          <div
            className="
              flex flex-col items-center gap-4
              sm:flex-row sm:justify-between sm:gap-4
            "
          >
            {/* Left - Copyright with Heart icon */}
            <p className="flex flex-wrap items-center justify-center gap-1.5 text-center text-xs text-foreground/50 sm:text-left">
              <span>&copy; 2026 Tayyaba Saddique. All Rights Reserved. Made with</span>
              <Heart
                size={12}
                className="inline-block text-gold"
                aria-label="love"
              />
              <span>and lots of coffee</span>
            </p>

            {/* Center - Subtle social icon row */}
            <div className="flex items-center gap-2.5">
              {SOCIAL_LINKS.map((social) => (
                <SocialIconBtn
                  key={social.label}
                  social={social}
                  size={13}
                  className="h-7 w-7 text-foreground/35 hover:text-gold"
                />
              ))}
            </div>

            {/* Right - Back to Top button */}
            <motion.button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="
                flex items-center gap-2 rounded-full border border-gold/30
                bg-gold/5 px-4 py-2 text-xs font-medium text-gold
                transition-all duration-300 hover:border-gold/60 hover:bg-gold/10
                hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]
                focus:outline-none focus-visible:ring-2 focus-visible:ring-gold
              "
              aria-label="Back to top"
            >
              <ArrowUp size={14} />
              Back to Top
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}