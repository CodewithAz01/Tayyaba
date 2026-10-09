'use client';

import { useState, useEffect } from 'react';
import { Mail, MessageCircle } from 'lucide-react';

const titles = [
  'Front-End Web Developer',
  'React.js Developer',
  'Responsive Website Builder',
  'Tailwind CSS Developer',
];

interface ParticleConfig {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
}

function generateParticles(count: number): ParticleConfig[] {
  const particles: ParticleConfig[] = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.floor(Math.random() * 5) + 2, // 2-6px
      delay: Math.random() * 8, // 0-8s
      duration: Math.floor(Math.random() * 7) + 6, // 6-12s
    });
  }
  return particles;
}

export default function Hero() {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullTitle = titles[currentTitleIndex];
    let delay = isDeleting ? 50 : 100;
    if (!isDeleting && displayText === currentFullTitle) delay = 2000;
    if (isDeleting && displayText === '') delay = 300;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText === currentFullTitle) {
          setIsDeleting(true);
        } else {
          setDisplayText(currentFullTitle.slice(0, displayText.length + 1));
        }
      } else if (displayText === '') {
        setIsDeleting(false);
        setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
      } else {
        setDisplayText(currentFullTitle.slice(0, displayText.length - 1));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentTitleIndex]);

  const [particles, setParticles] = useState<ParticleConfig[]>([]);

  useEffect(() => {
    setParticles(generateParticles(25));
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="animated-bg min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8"
    >
      {/* Floating particles */}
      <div className="hero-bg-particles" aria-hidden="true">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-16 py-20">
        {/* ===== Left Side ===== */}
        <div className="flex-1 text-center lg:text-left">
          {/* Greeting */}
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-light tracking-wide mb-2">
            Hello, I&apos;m
          </p>

          {/* Name */}
          <h1 className="font-[family-name:var(--font-poppins)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4">
            <span className="gradient-text-gold">Tayyaba Saddique</span>
          </h1>

          {/* Typing effect */}
          <div className="h-8 sm:h-9 md:h-10 flex items-center justify-center lg:justify-start mb-5">
            <span className="text-lg sm:text-xl md:text-2xl font-[family-name:var(--font-poppins)] font-medium text-foreground typing-cursor">
              {displayText}
            </span>
          </div>

          {/* Tagline */}
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
            Building responsive, high-performance web interfaces with React.js
            and Tailwind CSS &mdash; clean code and a great user experience.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-8">
            <button
              onClick={() => handleScrollTo('contact')}
              className="btn-gold ripple-btn text-sm sm:text-base cursor-pointer"
            >
              Hire Me
            </button>
            <a
              href="/resume.pdf"
              download="Tayyaba_Saddique_CV.pdf"
              className="btn-gold-outline text-sm sm:text-base inline-block text-center no-underline"
            >
              Download CV
            </a>
            <button
              onClick={() => handleScrollTo('projects')}
              className="btn-gold-outline text-sm sm:text-base cursor-pointer"
            >
              View Projects
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-center lg:justify-start gap-3">
            <a
              href="mailto:tayyaba.saddique.cs@gmail.com"
              className="share-btn"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/923321952862"
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* ===== Right Side — Profile Image ===== */}
        <div className="flex-shrink-0 float-animation">
          <div className="profile-image-container w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
            <img
              src="/profile.jpg"
              alt="Tayyaba Saddique"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}