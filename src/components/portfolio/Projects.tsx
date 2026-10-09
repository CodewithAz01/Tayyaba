'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Layout, ShoppingCart, Rocket, LineChart, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Category = 'Web App' | 'E-Commerce' | 'Landing Page' | 'Dashboard';
type FilterValue = 'All' | Category;

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  category: Category;
  gradient: string;
  iconGradient: string;
  icon: LucideIcon;
  featured?: boolean;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: 'Portfolio Website',
    description: 'Responsive personal portfolio built with React.js and Tailwind CSS.',
    tech: ['React.js', 'Tailwind CSS'],
    category: 'Web App',
    gradient: 'from-amber-600/40 via-yellow-500/30 to-orange-400/40',
    iconGradient: 'from-amber-500 to-yellow-400',
    icon: Layout,
    featured: true,
  },
  {
    id: 2,
    title: 'E-Commerce UI',
    description: 'Complete front-end for an online store with cart, filters and checkout.',
    tech: ['React.js', 'Tailwind CSS', 'JavaScript'],
    category: 'E-Commerce',
    gradient: 'from-emerald-600/40 via-teal-500/30 to-cyan-400/40',
    iconGradient: 'from-emerald-500 to-teal-400',
    icon: ShoppingCart,
  },
  {
    id: 3,
    title: 'Landing Page Suite',
    description: 'High-converting landing pages optimized for SEO and speed.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'SEO'],
    category: 'Landing Page',
    gradient: 'from-violet-600/40 via-purple-500/30 to-fuchsia-400/40',
    iconGradient: 'from-violet-500 to-purple-400',
    icon: Rocket,
  },
  {
    id: 4,
    title: 'API Dashboard',
    description: 'Dynamic data dashboard consuming REST APIs with real-time updates.',
    tech: ['React.js', 'REST APIs', 'JavaScript'],
    category: 'Dashboard',
    gradient: 'from-sky-600/40 via-blue-500/30 to-indigo-400/40',
    iconGradient: 'from-sky-500 to-blue-400',
    icon: LineChart,
  },
];

const filterOptions: { label: string; value: FilterValue }[] = [
  { label: 'All', value: 'All' },
  { label: 'Web App', value: 'Web App' },
  { label: 'E-Commerce', value: 'E-Commerce' },
  { label: 'Landing Page', value: 'Landing Page' },
  { label: 'Dashboard', value: 'Dashboard' },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = project.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: -20 }}
      transition={{ duration: 0.45, delay: index * 0.05, layout: { type: 'spring', stiffness: 280, damping: 28 } }}
      className="group relative"
    >
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-transparent via-[#D4AF37]/0 to-transparent group-hover:via-[#D4AF37]/60 transition-all duration-500" />

      <div className="glass rounded-2xl overflow-hidden h-full flex flex-col relative">
        <div className="relative h-48 sm:h-52 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-transform duration-700 ease-out group-hover:scale-110`} />
          <div className="absolute inset-0 opacity-[0.06]">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id={`grid-${project.id}`} width="24" height="24" patternUnits="userSpaceOnUse">
                  <path d="M 24 0 L 0 0 0 24" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#grid-${project.id})`} />
            </svg>
          </div>
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/5 transition-transform duration-700 group-hover:scale-125" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5 transition-transform duration-700 group-hover:scale-110" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${project.iconGradient} flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
              <Icon className="w-10 h-10 text-white drop-shadow-lg" />
            </div>
          </div>

          {project.featured && (
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full bg-[#D4AF37] text-[#0B0B0B] shadow-lg shadow-[#D4AF37]/30">
                <Sparkles className="w-3 h-3" />
                Featured
              </span>
            </div>
          )}
          <span className="absolute top-3 right-3 text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white/90 border border-white/10">
            {project.category}
          </span>
        </div>

        <div className="p-5 sm:p-6 flex flex-col flex-1 gap-3">
          <h3 className="font-[family-name:var(--font-poppins)] text-lg sm:text-xl font-bold text-foreground leading-tight">{project.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed flex-1 font-[family-name:var(--font-inter)]">{project.description}</p>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {project.tech.map((t) => (
              <span key={t} className="text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-full bg-[#D4AF37]/10 text-gold border border-[#D4AF37]/20">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>('All');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const filteredProjects = useMemo(
    () => projectsData.filter((p) => activeFilter === 'All' || p.category === activeFilter),
    [activeFilter],
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: projectsData.length };
    projectsData.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section-padding relative animated-bg">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase font-[family-name:var(--font-inter)]">My Work</span>
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 mb-4">
            Key <span className="gradient-text-gold">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] mx-auto rounded-full" />
          <p className="mt-5 text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-[family-name:var(--font-inter)]">
            A selection of the front-end projects I&apos;ve built. More projects will be added soon.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex items-center gap-2 sm:gap-2.5 flex-wrap justify-center mb-10 sm:mb-12"
        >
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setActiveFilter(option.value)}
              className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                activeFilter === option.value
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0B0B0B] shadow-[0_0_20px_rgba(212,175,55,0.35)]'
                  : 'glass text-muted-foreground hover:text-foreground hover:border-[#D4AF37]/50'
              }`}
            >
              {option.label}
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeFilter === option.value ? 'bg-black/15 text-[#0B0B0B]' : 'bg-muted/50 text-muted-foreground'}`}>
                {categoryCounts[option.value] || 0}
              </span>
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
