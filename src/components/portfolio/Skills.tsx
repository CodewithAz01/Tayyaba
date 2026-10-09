'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiJquery,
  SiReact,
  SiTailwindcss,
  SiBootstrap,
  SiPostman,
  SiFigma,
  SiGithub,
  SiGooglechrome,
} from 'react-icons/si';
import { Layers, Code2, Boxes, Wrench, Monitor, Plug, Search, FileCode, Sparkles } from 'lucide-react';
import type { IconType } from 'react-icons';
import type { LucideIcon } from 'lucide-react';

type SkillCategory = 'Languages & Markup' | 'Frameworks & Libraries' | 'Other Skills' | 'Tools';
type FilterTab = 'All' | SkillCategory;

interface Skill {
  name: string;
  category: SkillCategory;
  icon: IconType | LucideIcon;
  iconColor: string;
  description: string;
}

const skillsData: Skill[] = [
  { name: 'HTML5', category: 'Languages & Markup', icon: SiHtml5, iconColor: '#E34F26', description: 'Semantic, well-structured markup' },
  { name: 'CSS3', category: 'Languages & Markup', icon: SiCss, iconColor: '#1572B6', description: 'Responsive layouts and styling' },
  { name: 'JavaScript', category: 'Languages & Markup', icon: SiJavascript, iconColor: '#F7DF1E', description: 'Interactive UI and DOM work' },
  { name: 'jQuery', category: 'Languages & Markup', icon: SiJquery, iconColor: '#0769AD', description: 'DOM scripting and UI behaviour' },
  { name: 'React.js', category: 'Frameworks & Libraries', icon: SiReact, iconColor: '#61DAFB', description: 'Component-based web applications' },
  { name: 'Tailwind CSS', category: 'Frameworks & Libraries', icon: SiTailwindcss, iconColor: '#38BDF8', description: 'Utility-first, responsive styling' },
  { name: 'Bootstrap', category: 'Frameworks & Libraries', icon: SiBootstrap, iconColor: '#7952B3', description: 'Grid system and ready-made components' },
  { name: 'API Integration', category: 'Other Skills', icon: Plug, iconColor: '#10b981', description: 'RESTful APIs and third-party services' },
  { name: 'Responsive Design', category: 'Other Skills', icon: Monitor, iconColor: '#10b981', description: 'Layouts that adapt to every screen' },
  { name: 'SEO Basics', category: 'Other Skills', icon: Search, iconColor: '#10b981', description: 'Search-friendly structure and markup' },
  { name: 'GitHub', category: 'Tools', icon: SiGithub, iconColor: '#8b5cf6', description: 'Version control and collaboration' },
  { name: 'VS Code', category: 'Tools', icon: FileCode, iconColor: '#007ACC', description: 'Main code editor' },
  { name: 'Postman', category: 'Tools', icon: SiPostman, iconColor: '#FF6C37', description: 'Testing and debugging APIs' },
  { name: 'Figma', category: 'Tools', icon: SiFigma, iconColor: '#A259FF', description: 'Working from design mockups' },
  { name: 'Chrome DevTools', category: 'Tools', icon: SiGooglechrome, iconColor: '#4285F4', description: 'Debugging and cross-browser checks' },
];

const filterTabs: { label: string; value: FilterTab; icon: LucideIcon }[] = [
  { label: 'All', value: 'All', icon: Layers },
  { label: 'Languages', value: 'Languages & Markup', icon: Code2 },
  { label: 'Frameworks', value: 'Frameworks & Libraries', icon: Boxes },
  { label: 'Other Skills', value: 'Other Skills', icon: Sparkles },
  { label: 'Tools', value: 'Tools', icon: Wrench },
];

const categoryConfig: Record<SkillCategory, { badge: string; text: string; border: string; bg: string; short: string }> = {
  'Languages & Markup': {
    badge: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    text: 'text-emerald-400',
    bg: 'group-hover:bg-emerald-500/5',
    border: 'hover:border-emerald-500/40',
    short: 'Language',
  },
  'Frameworks & Libraries': {
    badge: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
    text: 'text-blue-400',
    bg: 'group-hover:bg-blue-500/5',
    border: 'hover:border-blue-500/40',
    short: 'Framework',
  },
  'Other Skills': {
    badge: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
    text: 'text-amber-400',
    bg: 'group-hover:bg-amber-500/5',
    border: 'hover:border-amber-500/40',
    short: 'Skill',
  },
  Tools: {
    badge: 'bg-violet-500/15 text-violet-400 border border-violet-500/30',
    text: 'text-violet-400',
    bg: 'group-hover:bg-violet-500/5',
    border: 'hover:border-violet-500/40',
    short: 'Tool',
  },
};

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const config = categoryConfig[skill.category];
  const SkillIcon = skill.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      transition={{ duration: 0.35, delay: index * 0.03, layout: { type: 'spring', stiffness: 300, damping: 28 } }}
      className="group"
    >
      <div className={`gradient-border rounded-2xl overflow-hidden transition-all duration-300 ${config.border}`}>
        <div className={`glass rounded-2xl p-5 flex flex-col items-center gap-3 text-center transition-all duration-300 ${config.bg}`}>
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]"
            style={{
              background: `linear-gradient(135deg, ${skill.iconColor}20, ${skill.iconColor}08)`,
              border: `1px solid ${skill.iconColor}30`,
            }}
          >
            <SkillIcon className="w-7 h-7" style={{ color: skill.iconColor }} />
          </div>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${config.badge}`}>{config.short}</span>
          <h3 className={`font-[family-name:var(--font-poppins)] text-sm font-semibold leading-tight ${config.text}`}>{skill.name}</h3>
          <p className="text-[11px] text-muted-foreground leading-relaxed">{skill.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const filteredSkills =
    activeFilter === 'All' ? skillsData : skillsData.filter((s) => s.category === activeFilter);

  return (
    <section id="skills" ref={sectionRef} className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-2">My Technical Skills</p>
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Skills &amp; <span className="gradient-text-gold">Expertise</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] mx-auto rounded-full" />
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base font-[family-name:var(--font-inter)]">
            The languages, frameworks, tools and soft skills I use to build responsive, high-performance web applications.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10"
        >
          {filterTabs.map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeFilter === tab.value;
            const count = tab.value === 'All' ? skillsData.length : skillsData.filter((s) => s.category === tab.value).length;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0B0B0B] shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                    : 'glass text-muted-foreground hover:text-foreground hover:border-[#D4AF37]/50'
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{tab.label}</span>
                {isActive && <span className="text-xs opacity-70">({count})</span>}
              </button>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-14 max-w-3xl mx-auto glass gradient-border rounded-2xl p-6 text-center">
          <h3 className="font-[family-name:var(--font-poppins)] text-base font-semibold text-foreground mb-3">Soft Skills</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {['Problem Solving', 'Team Collaboration', 'Attention to Detail', 'Time Management', 'Creative Thinking'].map((s) => (
              <span key={s} className="text-xs font-medium px-3 py-1.5 rounded-full bg-[#D4AF37]/10 text-gold border border-[#D4AF37]/20">
                {s}
              </span>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Languages: English, Urdu, Pashto</p>
        </div>
      </div>
    </section>
  );
}
