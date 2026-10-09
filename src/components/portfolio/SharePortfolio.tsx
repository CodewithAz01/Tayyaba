'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { toast } from 'sonner';
import {
  Linkedin,
  MessageCircle,
  Facebook,
  Twitter,
  Send,
  Mail,
  Link as LinkIcon,
  Copy,
  Check,
  Heart,
  Share2,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Share platform config                                              */
/* ------------------------------------------------------------------ */

interface SharePlatform {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  getUrl: (url: string, title: string) => string;
  color: string;
  glowColor: string;
  hoverBg: string;
  description: string;
}

const sharePlatforms: SharePlatform[] = [
  {
    name: 'LinkedIn',
    icon: Linkedin,
    getUrl: (url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    color: '#0A66C2',
    glowColor: 'rgba(10, 102, 194, 0.35)',
    hoverBg: 'rgba(10, 102, 194, 0.1)',
    description: 'Share on LinkedIn',
  },
  {
    name: 'WhatsApp',
    icon: MessageCircle,
    getUrl: (url, title) =>
      `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`,
    color: '#25D366',
    glowColor: 'rgba(37, 211, 102, 0.35)',
    hoverBg: 'rgba(37, 211, 102, 0.1)',
    description: 'Share on WhatsApp',
  },
  {
    name: 'Facebook',
    icon: Facebook,
    getUrl: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    color: '#1877F2',
    glowColor: 'rgba(24, 119, 242, 0.35)',
    hoverBg: 'rgba(24, 119, 242, 0.1)',
    description: 'Share on Facebook',
  },
  {
    name: 'Twitter / X',
    icon: Twitter,
    getUrl: (url, title) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    color: '#1DA1F2',
    glowColor: 'rgba(29, 161, 242, 0.35)',
    hoverBg: 'rgba(29, 161, 242, 0.1)',
    description: 'Tweet about this',
  },
  {
    name: 'Telegram',
    icon: Send,
    getUrl: (url, title) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    color: '#2AABEE',
    glowColor: 'rgba(42, 171, 238, 0.35)',
    hoverBg: 'rgba(42, 171, 238, 0.1)',
    description: 'Share via Telegram',
  },
  {
    name: 'Email',
    icon: Mail,
    getUrl: (url, title) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out my portfolio:\n\n${url}\n\n— Tayyaba Saddique, Front-End Web Developer`)}`,
    color: '#EA4335',
    glowColor: 'rgba(234, 67, 53, 0.35)',
    hoverBg: 'rgba(234, 67, 53, 0.1)',
    description: 'Send via email',
  },
  {
    name: 'Reddit',
    icon: Share2,
    getUrl: (url, title) =>
      `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    color: '#FF4500',
    glowColor: 'rgba(255, 69, 0, 0.35)',
    hoverBg: 'rgba(255, 69, 0, 0.1)',
    description: 'Post on Reddit',
  },
  {
    name: 'Copy Link',
    icon: Copy,
    getUrl: () => '',
    color: '#D4AF37',
    glowColor: 'rgba(212, 175, 55, 0.35)',
    hoverBg: 'rgba(212, 175, 55, 0.1)',
    description: 'Copy to clipboard',
  },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const headingVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: 'easeOut' as const },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: 'easeOut' as const },
  },
};

/* ------------------------------------------------------------------ */
/*  ShareButton component                                              */
/* ------------------------------------------------------------------ */

function ShareButton({
  platform,
  index,
  inView,
  onCopy,
  copied,
  portfolioUrl,
  portfolioTitle,
}: {
  platform: SharePlatform;
  index: number;
  inView: boolean;
  onCopy: () => Promise<void>;
  copied: boolean;
  portfolioUrl: string;
  portfolioTitle: string;
}) {
  const isCopy = platform.name === 'Copy Link';

  const handleClick = async () => {
    if (isCopy) {
      await onCopy();
    }
    toast.success('Thank you for sharing!', {
      description: `You shared via ${platform.name}`,
      duration: 3000,
    });
  };

  const IconComponent = isCopy && copied ? Check : platform.icon;

  return (
    <motion.a
      href={isCopy ? undefined : platform.getUrl(portfolioUrl, portfolioTitle)}
      target={isCopy ? undefined : '_blank'}
      rel={isCopy ? undefined : 'noopener noreferrer'}
      onClick={handleClick}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.45,
        delay: 0.15 + index * 0.08,
        ease: 'easeOut' as const,
      }}
      className="share-btn group relative flex items-center gap-3 rounded-xl px-4 py-3.5 cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.04] active:scale-[0.98]"
      style={{
        borderColor: 'var(--glass-border)',
        background: 'var(--glass-bg)',
      }}
      whileHover={{
        boxShadow: `0 0 24px ${platform.glowColor}, 0 4px 20px rgba(0,0,0,0.1)`,
      }}
      aria-label={`Share on ${platform.name}`}
      title={`Share on ${platform.name}`}
    >
      {/* Color accent bar on left */}
      <motion.span
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl transition-all duration-300 group-hover:w-[4px]"
        style={{ background: platform.color }}
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
      />

      {/* Hover background glow */}
      <span
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: platform.hoverBg }}
      />

      {/* Icon container */}
      <span
        className="relative z-10 flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
        style={{
          background: `${platform.color}15`,
          color: platform.color,
        }}
      >
        <IconComponent className="w-5 h-5" />
      </span>

      {/* Text content */}
      <span className="relative z-10 flex flex-col min-w-0">
        <span
          className="font-[family-name:var(--font-poppins)] text-sm font-semibold truncate transition-colors duration-300 group-hover:text-foreground"
          style={{ color: platform.color }}
        >
          {platform.name}
        </span>
        <span className="font-[family-name:var(--font-inter)] text-[11px] text-muted-foreground truncate leading-tight">
          {platform.description}
        </span>
      </span>

      {/* Arrow hint on hover */}
      <motion.span
        className="relative z-10 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ color: platform.color }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 17L17 7" />
          <path d="M7 7h10v10" />
        </svg>
      </motion.span>
    </motion.a>
  );
}

/* ------------------------------------------------------------------ */
/*  Main SharePortfolio component                                      */
/* ------------------------------------------------------------------ */

export default function SharePortfolio() {
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const sectionInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' });
  const mainCardInView = useInView(mainCardRef, { once: true, margin: '-40px' });
  const gridInView = useInView(gridRef, { once: true, margin: '-30px' });

  const [portfolioUrl, setPortfolioUrl] = useState('');
  const portfolioTitle = 'Tayyaba Saddique — Front-End Web Developer Portfolio';

  useEffect(() => {
    setPortfolioUrl(window.location.href);
  }, []);

  const handleCopyLink = async () => {
    const urlToCopy = portfolioUrl || (typeof window !== 'undefined' ? window.location.href : '');
    try {
      await navigator.clipboard.writeText(urlToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = urlToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section
      id="share"
      ref={sectionRef}
      className="section-padding animated-bg relative"
    >
      <div className="max-w-5xl mx-auto">
        {/* ── Section Heading ── */}
        <div ref={headingRef} className="text-center mb-12">
          <motion.p
            custom={0}
            variants={headingVariants}
            initial="hidden"
            animate={headingInView ? 'visible' : 'hidden'}
            className="font-[family-name:var(--font-inter)] text-sm uppercase tracking-[0.25em] text-gold font-semibold mb-3"
          >
            Spread the Word
          </motion.p>

          <motion.h2
            custom={1}
            variants={headingVariants}
            initial="hidden"
            animate={headingInView ? 'visible' : 'hidden'}
            className="font-[family-name:var(--font-poppins)] text-4xl md:text-5xl font-bold gradient-text-gold gold-glow-text"
          >
            Share My Portfolio
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' as const }}
            className="mx-auto mt-4 h-[2px] w-24 bg-gradient-to-r from-transparent via-gold to-transparent origin-center"
          />

          <motion.p
            custom={2}
            variants={headingVariants}
            initial="hidden"
            animate={headingInView ? 'visible' : 'hidden'}
            className="font-[family-name:var(--font-inter)] text-base text-muted-foreground mt-5 max-w-2xl mx-auto leading-relaxed"
          >
            If you find my work valuable, sharing it with your network means the world to me.
            Help others discover what I can build.
          </motion.p>
        </div>

        {/* ── Main Premium Card ── */}
        <motion.div
          ref={mainCardRef}
          variants={cardVariants}
          initial="hidden"
          animate={mainCardInView ? 'visible' : 'hidden'}
          className="glass gradient-border rounded-2xl p-6 md:p-10"
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
            {/* ── Left Side: Info Content ── */}
            <div className="flex-1 flex flex-col justify-center min-w-0">
              {/* Heart + heading */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={mainCardInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-3 mb-4"
              >
                <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-gold/20 to-gold-light/10">
                  <Heart className="w-6 h-6 text-gold" />
                </span>
                <div>
                  <h3 className="font-[family-name:var(--font-poppins)] text-xl font-bold text-gold gold-glow-text">
                    Share the Love
                  </h3>
                  <p className="font-[family-name:var(--font-inter)] text-sm text-muted-foreground">
                    Every share makes a difference
                  </p>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={mainCardInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="font-[family-name:var(--font-inter)] text-sm text-muted-foreground leading-relaxed mb-6"
              >
                Whether it is a quick retweet, a LinkedIn recommendation, or sharing with a colleague
                over WhatsApp — your support helps me reach more opportunities and connect with amazing people.
              </motion.p>

              {/* ── Portfolio URL Preview Card ── */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={mainCardInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-gold/5 border border-gold/15 transition-all duration-300 hover:border-gold/30 hover:bg-gold/10"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gold/15 flex-shrink-0">
                  <LinkIcon className="w-4 h-4 text-gold" />
                </span>
                <span className="font-[family-name:var(--font-inter)] text-sm text-muted-foreground truncate flex-1 select-all">
                  {portfolioUrl}
                </span>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="btn-gold-outline !py-1.5 !px-3 !text-xs !rounded-lg !border !border-gold/40 flex items-center gap-1.5 cursor-pointer flex-shrink-0 transition-all duration-300 hover:scale-105"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </motion.div>
            </div>

            {/* ── Right Side: Share Buttons Grid ── */}
            <div ref={gridRef} className="flex-1 min-w-0">
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={gridInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-[family-name:var(--font-poppins)] text-base font-semibold mb-4 text-foreground/80"
              >
                Choose a platform
              </motion.p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sharePlatforms.map((platform, index) => (
                  <ShareButton
                    key={platform.name}
                    platform={platform}
                    index={index}
                    inView={gridInView}
                    onCopy={handleCopyLink}
                    copied={copied}
                    portfolioUrl={portfolioUrl}
                    portfolioTitle={portfolioTitle}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}