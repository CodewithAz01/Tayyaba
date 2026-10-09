'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Send, User, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ContactInfoItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

const contactInfo: ContactInfoItem[] = [
  {
    icon: Mail,
    label: 'Email',
    value: 'tayyaba.saddique.cs@gmail.com',
    href: 'mailto:tayyaba.saddique.cs@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+92 332 1952862',
    href: 'tel:+923321952862',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+92 332 1952862',
    href: 'https://wa.me/923321952862',
    external: true,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Nowshera, Pakistan',
    href: 'https://www.google.com/maps/search/?api=1&query=Nowshera,+Khyber+Pakhtunkhwa,+Pakistan',
    external: true,
  },
];

const leftVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const rightVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isInView) {
      const hash = window.location.hash;
      if (hash === '#contact') {
        const timer = setTimeout(() => {
          sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [isInView]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Please fill in all required fields.', {
        description: 'Name, email, and message are required.',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    const subject = formData.subject.trim() || `Portfolio inquiry from ${formData.name.trim()}`;
    const body = `${formData.message.trim()}\n\n— ${formData.name.trim()}\n${formData.email.trim()}`;
    window.location.href = `mailto:tayyaba.saddique.cs@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    toast.success('Opening your email app…', {
      description: 'Press send in your email app to deliver the message.',
    });

    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding relative animated-bg"
    >
      <div className="max-w-6xl mx-auto">
        {/* ── Section Heading ── */}
        <div ref={headingRef} className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-[family-name:var(--font-inter)] text-sm uppercase tracking-[0.25em] text-gold font-semibold mb-3"
          >
            Let&apos;s Connect
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text-gold gold-glow-text"
          >
            Get In Touch
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
            Have a project in mind or just want to say hello? I&apos;d love to hear from you. Reach out through any of the channels below or fill out the contact form.
          </motion.p>
        </div>

        {/* ── Two-Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* ── Left Column: Contact Info ── */}
          <motion.div
            variants={leftVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Contact Info Card */}
            <div className="glass gradient-border rounded-2xl p-6 sm:p-8">
              <h3 className="font-[family-name:var(--font-poppins)] text-lg sm:text-xl font-bold text-foreground mb-6">
                Contact <span className="gradient-text-gold">Information</span>
              </h3>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="space-y-5"
              >
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  const Wrapper = item.href ? 'a' : 'div';
                  return (
                    <motion.div key={item.label} variants={itemVariants}>
                      <Wrapper
                        {...(item.href
                          ? {
                              href: item.href,
                              target: item.external ? '_blank' : undefined,
                              rel: item.external ? 'noopener noreferrer' : undefined,
                            }
                          : {})}
                        className="flex items-start gap-4 group cursor-pointer"
                      >
                        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-[#D4AF37]/15 to-[#FFD700]/5 border border-[#D4AF37]/20 group-hover:border-[#D4AF37]/50 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-300 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-gold" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-wider text-muted-foreground mb-0.5">
                            {item.label}
                          </p>
                          <p className="font-[family-name:var(--font-poppins)] text-sm font-medium text-foreground group-hover:text-gold transition-colors duration-300 break-all">
                            {item.value}
                          </p>
                        </div>
                      </Wrapper>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Hire Me Button */}
              <div className="mt-8">
                <a href="mailto:tayyaba.saddique.cs@gmail.com" className="btn-gold inline-flex items-center gap-2 font-[family-name:var(--font-poppins)] text-sm sm:text-base">
                  <User className="w-4 h-4" />
                  Hire Me
                </a>
              </div>
            </div>

            {/* Availability Card */}
            <div className="glass gradient-border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="font-[family-name:var(--font-poppins)] text-sm font-semibold text-foreground">
                  Currently Available
                </span>
              </div>
              <p className="font-[family-name:var(--font-inter)] text-sm text-muted-foreground leading-relaxed">
                I&apos;m currently open for freelance projects and collaboration opportunities. Let&apos;s build something amazing together!
              </p>
            </div>
          </motion.div>

          {/* ── Right Column: Contact Form ── */}
          <motion.div
            variants={rightVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="lg:col-span-3"
          >
            <div className="glass gradient-border rounded-2xl p-6 sm:p-8">
              <h3 className="font-[family-name:var(--font-poppins)] text-lg sm:text-xl font-bold text-foreground mb-6">
                Send a <span className="gradient-text-gold">Message</span>
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block font-[family-name:var(--font-inter)] text-sm font-medium text-foreground mb-2"
                  >
                    Name <span className="text-gold">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className="contact-input"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block font-[family-name:var(--font-inter)] text-sm font-medium text-foreground mb-2"
                  >
                    Email <span className="text-gold">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    className="contact-input"
                  />
                </div>

                {/* Subject Field */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block font-[family-name:var(--font-inter)] text-sm font-medium text-foreground mb-2"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                    className="contact-input"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-[family-name:var(--font-inter)] text-sm font-medium text-foreground mb-2"
                  >
                    Message <span className="text-gold">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    rows={5}
                    required
                    className="contact-input resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold w-full flex items-center justify-center gap-2 font-[family-name:var(--font-poppins)] text-sm sm:text-base disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#0B0B0B]/30 border-t-[#0B0B0B] rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* ── My Location — Real Map + Description ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' as const }}
              className="glass gradient-border rounded-2xl p-6 sm:p-8 mt-6"
            >
              <h3 className="font-[family-name:var(--font-poppins)] text-lg sm:text-xl font-bold text-foreground mb-5">
                My <span className="gradient-text-gold">Location</span>
              </h3>

              {/* Embedded Google Map */}
              <div className="rounded-xl overflow-hidden border border-gold/20 shadow-[0_0_30px_rgba(212,175,55,0.08)]">
                <iframe
                  src="https://www.google.com/maps?q=Nowshera,+Khyber+Pakhtunkhwa,+Pakistan&output=embed"
                  className="w-full h-64 rounded-xl border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Nowshera, Pakistan on Google Maps"
                />
              </div>

              {/* Location Description */}
              <div className="mt-6">
                <h4 className="font-[family-name:var(--font-poppins)] text-base sm:text-lg font-bold gradient-text-gold mb-3">
                  Based in Nowshera, Pakistan
                </h4>
                <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed font-[family-name:var(--font-inter)]">
                  I work from Nowshera, Khyber Pakhtunkhwa, and collaborate with clients remotely.
                  Reach out by email, phone or WhatsApp and let&apos;s talk about your project.
                </p>
              </div>

              {/* Open in Maps Link */}
              <div className="mt-5">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Nowshera,+Khyber+Pakhtunkhwa,+Pakistan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold-outline inline-flex items-center gap-2 font-[family-name:var(--font-poppins)] text-sm"
                >
                  <MapPin className="w-4 h-4" />
                  Open in Google Maps
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}