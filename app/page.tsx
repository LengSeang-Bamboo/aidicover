"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, Moon, ChevronLeft, ChevronRight, 
  ExternalLink, Brain, Search, Image as ImageIcon, 
  Mic, Zap, Bot, CheckCircle, Play, ArrowRight,
  Clock, Users, Target, BarChart3
} from 'lucide-react';

// --- Types & Data ---

const slideVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction * 150,
    filter: "blur(4px)"
  }),
  animate: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)"
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: -direction * 150,
    filter: "blur(4px)"
  })
};

const AILogo = ({ name, className = "w-6 h-6" }: { name: string, className?: string, key?: React.Key }) => {
  const logoMap: Record<string, string> = {
    "Claude": "anthropic-icon",
    "ChatGPT": "openai-icon",
    "Gemini": "google-gemini",
    "Perplexity": "perplexity-icon",
    "Make": "make-icon",
    "Zapier": "zapier-icon",
    "Notion": "notion-icon",
    "Canva": "canva",
    "Midjourney": "midjourney",
    "ElevenLabs": "elevenlabs",
    "Otter.ai": "otter",
    "Firefly": "adobe-firefly",
    "Relevance AI": "relevance-ai",
    "n8n": "n8n",
    "NotebookLM": "google-icon",
    "Claude.ai": "anthropic-icon",
    "Perplexity.ai": "perplexity-icon",
    "Make.com": "make-icon"
  };

  const logoId = logoMap[name] || name.toLowerCase().replace('.ai', '').replace('.com', '').replace(' ', '-');
  const src = `https://api.iconify.design/logos:${logoId}.svg`;
  
  return (
    <div className={`${className} flex items-center justify-center overflow-hidden rounded-2xl bg-white/10 p-2 backdrop-blur-xl border border-white/20 shadow-lg group-hover:border-indigo-500/50 group-hover:bg-white/20 transition-all duration-300`}>
      <img 
        src={src} 
        alt={name} 
        className="w-full h-full object-contain" 
        onError={(e) => {
          (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${name}`;
        }}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  type: 'title' | 'content' | 'grid' | 'contrast' | 'timeline' | 'closing';
  content: any;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    title: "Teaching AI to Business People",
    subtitle: "SESSION 1 · BUSINESS AI FUNDAMENTALS",
    type: 'title',
    content: {
      description: "A practical, demo-first guide to AI tools, prompting, and business workflows",
      stats: ["4 Modules", "14 AI Tools", "5 Live Exercises", "~3 Hours Total"],
      tools: [
        { name: "claude.ai", url: "https://claude.ai" },
        { name: "perplexity.ai", url: "https://perplexity.ai" },
        { name: "notebooklm.google.com", url: "https://notebooklm.google.com" },
        { name: "make.com", url: "https://make.com" }
      ]
    }
  },
  {
    id: 2,
    title: "What AI Actually Is (And Isn't)",
    subtitle: "MODULE 01 · Duration: 30 minutes",
    type: 'content',
    content: [
      { 
        label: "Pattern matcher, not thinker", 
        text: "LLMs predict the next best word based on human writing — they don't reason or feel.",
        icon: <Brain className="w-8 h-8" />
      },
      { 
        label: "AI never sleeps or judges", 
        text: "Think of it as a very well-read assistant available 24/7 — give it context, get results.",
        icon: <Clock className="w-8 h-8" />
      },
      { 
        label: "Where AI fails", 
        text: "Hallucination, no real-time data by default, no business context unless you provide it.",
        icon: <Zap className="w-8 h-8 text-amber-500" />
      },
      { 
        label: "The key business shift", 
        text: "AI doesn't replace thinking — it removes the cost of execution.",
        icon: <BarChart3 className="w-8 h-8 text-emerald-500" />
      }
    ]
  },
  {
    id: 3,
    title: "The 6 Types of AI You'll Actually Use",
    subtitle: "One tool for every business need",
    type: 'grid',
    content: [
      { type: "Language", tools: "Claude · ChatGPT · Gemini", use: "Writing, strategy, analysis", icon: <Brain /> },
      { type: "Search", tools: "Perplexity · NotebookLM", use: "Research with real sources", icon: <Search /> },
      { type: "Image", tools: "Midjourney · Firefly · Canva", use: "Visuals, ads, branding", icon: <ImageIcon /> },
      { type: "Voice", tools: "ElevenLabs · Otter.ai", use: "Transcription, speech gen", icon: <Mic /> },
      { type: "Automation", tools: "Make · Zapier AI", use: "Connect tools, trigger workflows", icon: <Zap /> },
      { type: "Agent", tools: "Relevance AI · n8n", use: "Multi-step autonomous tasks", icon: <Bot /> }
    ]
  },
  {
    id: 4,
    title: "AI Prompting Conceptual",
    subtitle: "MODULE 02 · The fundamentals of talking to AI",
    type: 'content',
    content: [
      { label: "Standard Prompt", text: "Normal straight forward prompt.", example: "What make oil price spikes upon the roaring conflict?" },
      { label: "Zero-Shot", text: "Tell AI to do one thing, direct prompt.", example: "Explain to me about AI." },
      { label: "One-Shot Prompt", text: "Tell AI to do a specific task with a structured output or example.", example: "What is the benefit of running, give me a list of pros, and cons." },
      { label: "Few-Shot Prompt", text: "Tell AI to do multiple tasks, basically a combination of prompts.", example: "Classify these emails: 1. [Email text] -> Spam, 2. [Email text] -> Important..." },
      { label: "Context Prompting", text: "Strategy, information, instruction, constraint = Structured output.", example: "Using the attached report, summarize the key findings for a CEO in 3 bullets." }
    ]
  },
  {
    id: 5,
    title: "Advanced Prompting",
    subtitle: "Techniques for complex tasks",
    type: 'content',
    content: [
      { label: "Structured Output", text: "Force AI to return data in a specific format (JSON, Table, Markdown).", icon: <Target className="w-8 h-8" /> },
      { label: "Chain of Thought", text: "Ask AI to 'think step-by-step' to improve reasoning and accuracy.", icon: <Brain className="w-8 h-8" /> },
      { label: "Delimiters", text: "Use symbols like ### or \"\"\" to clearly separate instructions from data.", icon: <Zap className="w-8 h-8" /> },
      { label: "Persona", text: "Assign a specific identity or expertise to the AI to set the tone and depth.", icon: <Users className="w-8 h-8" /> }
    ]
  },
  {
    id: 6,
    title: "The RACI Prompt Framework",
    subtitle: "MODULE 02 · Why vague prompts get vague results",
    type: 'content',
    content: [
      { label: "R — Role", text: "Tell AI who it is. A role changes the lens it uses.", example: "You are a senior marketing strategist with 15 years in B2B SaaS..." },
      { label: "A — Audience", text: "Who is this output for? Age, role, knowledge level.", example: "This is for a CFO who doesn't understand technical terms..." },
      { label: "C — Context", text: "Situation, tone, constraints, background.", example: "Our company sells inventory software to restaurants in SE Asia." },
      { label: "I — Instruction", text: "The exact task + format specified.", example: "Write a 3-paragraph follow-up email. Under 150 words." }
    ]
  },
  {
    id: 7,
    title: "Prompt Contrast Demo",
    subtitle: "Run both live in Claude — let the room see the difference",
    type: 'contrast',
    content: {
      weak: {
        title: "WEAK PROMPT",
        text: "\"Write me a marketing email.\"",
        points: ["Generic — could be for anyone", "No tone or length guide", "No context about product", "Output is completely unusable"]
      },
      raci: {
        title: "RACI PROMPT",
        text: "[Role] Senior B2B copywriter\n[Audience] Ops manager\n[Context] Post-demo follow-up\n[Instruction] 3-para email",
        points: ["Specific role and audience", "Clear constraints", "Exact format requested", "Specific, usable, sounds human"]
      }
    }
  },
  {
    id: 8,
    title: "Your AI Stack",
    subtitle: "MODULE 03 · Right tool, right job",
    type: 'grid',
    content: [
      { type: "Strategy", tools: "Claude · ChatGPT", use: "Writing, strategy, research" },
      { type: "Research", tools: "Perplexity", use: "Real-time research + citations" },
      { type: "Automation", tools: "Make · Zapier", use: "Workflow automation" },
      { type: "Voice", tools: "ElevenLabs", use: "Voice content + customer calls" },
      { type: "Creative", tools: "Midjourney", use: "Brand-level creative assets" },
      { type: "Agent", tools: "Relevance AI", use: "Custom AI agents" }
    ]
  },
  {
    id: 9,
    title: "Live Exercises",
    subtitle: "Hands-on, in-class demos — follow on your own devices",
    type: 'content',
    content: [
      { label: "01 — Rewrite your own prompt", text: "Tool: claude.ai", icon: <AILogo name="Claude" className="w-12 h-12" />, url: "https://claude.ai" },
      { label: "02 — Market research in 3 minutes", text: "Tool: perplexity.ai", icon: <AILogo name="Perplexity" className="w-12 h-12" />, url: "https://perplexity.ai" },
      { label: "03 — Interrogate your own document", text: "Tool: notebooklm.google.com", icon: <AILogo name="NotebookLM" className="w-12 h-12" />, url: "https://notebooklm.google.com" },
      { label: "04 — Map one automation workflow", text: "Tool: make.com", icon: <AILogo name="Make" className="w-12 h-12" />, url: "https://make.com" }
    ]
  },
  {
    id: 10,
    title: "Key Takeaways",
    subtitle: "What your class walks away knowing",
    type: 'closing',
    content: [
      { label: "AI removes the cost of execution", text: "Not a replacement for thinking — a force multiplier for doing." },
      { label: "RACI = better results every time", text: "Role, Audience, Context, Instruction. Teach this, they'll use it forever." },
      { label: "Right tool, right job", text: "Language AI for strategy. Search AI for research. Automation AI for repetition." },
      { label: "One workflow saved = instant ROI", text: "Help them calculate it. Make it real with a number, not a concept." }
    ]
  }
];

// --- Components ---

const GlassCard = ({ children, className = "" }: { children: ReactNode, className?: string, key?: React.Key }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.98, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.98, y: -20 }}
    whileHover={{ y: -4, scale: 1.01, transition: { duration: 0.2 } }}
    className={`glass-morphism rounded-2xl p-8 flex flex-col ${className}`}
  >
    {children}
  </motion.div>
);

const LiquidBackground = ({ isDark }: { isDark: boolean }) => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden transition-colors duration-1000">
      <motion.div
        animate={{
          x: [0, 150, 0],
          y: [0, -100, 0],
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute -top-1/4 -left-1/4 w-3/4 h-3/4 rounded-full blur-[140px] 
          ${isDark ? 'bg-indigo-900/60' : 'bg-indigo-400/20'}`}
      />
      <motion.div
        animate={{
          x: [0, -120, 0],
          y: [0, 150, 0],
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 rounded-full blur-[140px]
          ${isDark ? 'bg-violet-900/60' : 'bg-rose-400/20'}`}
      />
    </div>
  );
};

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev

  // Sync dark mode class with html element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => Math.min(prev + 1, SLIDES.length - 1));
  };
  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'f') nextSlide();
      if (e.key === 'ArrowLeft' || e.key === 'b') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <div 
      className={`min-h-screen selection:bg-indigo-500/30 overflow-x-hidden`}
    >
      <LiquidBackground isDark={isDark} />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-12 py-10">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="flex flex-col">
            <span className="font-black text-2xl tracking-tighter uppercase leading-none">AI-DISCOVERY</span>
            <span className="text-xs font-bold tracking-[0.5em] text-indigo-500 uppercase">My personal ai discovery</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-4 rounded-2xl bg-white/10 dark:bg-black/20 border border-white/20 hover:bg-white/20 hover:scale-110 transition-all shadow-xl backdrop-blur-md"
          >
            {isDark ? <Sun className="w-6 h-6 text-amber-400" /> : <Moon className="w-6 h-6 text-indigo-600" />}
          </button>
          <div className="px-6 py-3 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-500 font-black text-lg backdrop-blur-md">
            {currentSlide + 1} / {SLIDES.length}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative pt-40 pb-96 px-8 max-w-7xl mx-auto min-h-screen flex flex-col justify-start">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_, info) => {
              const threshold = 100;
              const velocityThreshold = 500;
              if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) nextSlide();
              else if (info.offset.x > threshold || info.velocity.x > velocityThreshold) prevSlide();
            }}
            transition={{ 
              type: "spring", 
              stiffness: 180, 
              damping: 22,
              mass: 1
            }}
            className="w-full cursor-grab active:cursor-grabbing touch-none px-4"
          >
            {slide.type === 'title' && (
              <div className="flex flex-col items-center text-center space-y-12">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-6 py-2 rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 font-black text-sm tracking-[0.3em] uppercase"
                >
                  {slide.subtitle}
                </motion.div>
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-balance text-text-primary">
                  {slide.title.split(' ').map((word, i) => (
                    <span key={i} className={i >= slide.title.split(' ').length - 2 ? "text-indigo-600 dark:text-indigo-400" : ""}>
                      {word}{' '}
                    </span>
                  ))}
                </h1>
                <p className="text-2xl md:text-3xl text-text-secondary max-w-3xl font-medium leading-relaxed">
                  {slide.content.description}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-12">
                  {slide.content.stats.map((stat: string, i: number) => (
                    <GlassCard key={i} className="py-8 items-center justify-center border-indigo-500/10 text-center">
                      <span className="text-4xl font-black text-indigo-600 dark:text-indigo-400 mb-2">{stat.split(' ')[0]}</span>
                      <p className="text-xs uppercase tracking-widest font-black opacity-60">{stat.split(' ').slice(1).join(' ')}</p>
                    </GlassCard>
                  ))}
                </div>

                <div className="flex flex-wrap justify-center gap-6 mt-12">
                  {slide.content.tools.map((tool: any, i: number) => (
                    <motion.a 
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      key={i}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-8 py-4 rounded-3xl bg-white/10 dark:bg-black/30 border border-white/20 hover:bg-white/20 transition-all font-black text-lg shadow-2xl backdrop-blur-xl"
                    >
                      <AILogo name={tool.name.split('.')[0].charAt(0).toUpperCase() + tool.name.split('.')[0].slice(1)} className="w-8 h-8" />
                      {tool.name} <ExternalLink className="w-4 h-4 opacity-40 ml-1" />
                    </motion.a>
                  ))}
                </div>
              </div>
            )}

            {slide.type === 'content' && (
              <div className="space-y-16">
                <div className="space-y-4">
                  <span className="text-indigo-500 font-black tracking-[0.3em] text-sm uppercase">{slide.subtitle}</span>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter">{slide.title}</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {slide.content.map((item: any, i: number) => (
                    <GlassCard key={i} className="group hover:bg-white/50 dark:hover:bg-white/5">
                      <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                        <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                          {item.icon || <CheckCircle className="w-10 h-10" />}
                        </div>
                        <div className="flex-1 space-y-4">
                          <h3 className="text-3xl font-black tracking-tight text-text-primary">{item.label}</h3>
                          <p className="text-xl text-text-secondary font-medium leading-relaxed">{item.text}</p>
                          {item.example && (
                            <div className="mt-6 p-6 rounded-3xl bg-black/5 dark:bg-white/5 border border-white/10 font-mono text-base italic leading-relaxed opacity-90 text-text-primary">
                              "{item.example}"
                            </div>
                          )}
                          {item.url && (
                            <a href={item.url} target="_blank" className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black text-lg mt-4 group/btn">
                              Launch Tool <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                            </a>
                          )}
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            )}

            {slide.type === 'grid' && (
              <div className="space-y-16">
                <div className="space-y-4">
                  <span className="text-indigo-500 font-black tracking-[0.3em] text-sm uppercase">{slide.subtitle}</span>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter">{slide.title}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {slide.content.map((item: any, i: number) => (
                    <GlassCard key={i} className="hover:border-indigo-500/30">
                      <div className="flex items-center justify-between mb-10">
                        <div className="w-16 h-16 rounded-3xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
                          {item.icon || <Zap className="w-8 h-8" />}
                        </div>
                        <div className="flex -space-x-4">
                          {item.tools.split(' · ').map((tool: string, idx: number) => (
                            <AILogo key={idx} name={tool.trim()} className="w-12 h-12 border-4 border-white/40 dark:border-slate-900/40 shadow-2xl bg-white" />
                          ))}
                        </div>
                      </div>
                      <h3 className="text-3xl font-black mb-6 tracking-tighter uppercase bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
                        {item.type}
                      </h3>
                      <div className="space-y-6 mt-auto">
                        <p className="text-2xl font-bold text-text-primary">{item.tools}</p>
                        <p className="text-lg text-text-secondary font-medium leading-relaxed">{item.use}</p>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            )}

            {slide.type === 'contrast' && (
              <div className="space-y-16">
                <div className="space-y-4">
                  <span className="text-indigo-500 font-black tracking-[0.3em] text-sm uppercase">{slide.subtitle}</span>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter">{slide.title}</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <GlassCard className="border-rose-500/20 bg-rose-500/5 items-start">
                    <h3 className="text-rose-500 font-black text-3xl mb-8 flex items-center gap-3">
                      <Zap className="w-8 h-8 rotate-180" /> {slide.content.weak.title}
                    </h3>
                    <div className="w-full p-8 rounded-[2rem] bg-indigo-950/5 dark:bg-black/20 border border-black/5 font-mono text-xl mb-10 shadow-inner min-h-[140px] flex items-center">
                      {slide.content.weak.text}
                    </div>
                    <ul className="space-y-6">
                      {slide.content.weak.points.map((p: string, i: number) => (
                        <li key={i} className="flex items-start gap-4 text-lg font-bold opacity-70">
                          <span className="text-rose-500 font-black text-2xl">✕</span> {p}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>

                  <GlassCard className="border-emerald-500/20 bg-emerald-500/5 items-start">
                    <h3 className="text-emerald-500 font-black text-3xl mb-8 flex items-center gap-3">
                      <CheckCircle className="w-8 h-8" /> {slide.content.raci.title}
                    </h3>
                    <div className="w-full p-8 rounded-[2rem] bg-indigo-950/5 dark:bg-black/20 border border-black/5 font-mono text-xl mb-10 shadow-inner min-h-[140px] flex items-center whitespace-pre-line">
                      {slide.content.raci.text}
                    </div>
                    <ul className="space-y-6">
                      {slide.content.raci.points.map((p: string, i: number) => (
                        <li key={i} className="flex items-start gap-4 text-lg font-black">
                          <span className="text-emerald-500 font-black text-2xl">✓</span> {p}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </div>
              </div>
            )}

            {slide.type === 'timeline' && (
              <div className="space-y-16">
                <div className="space-y-4">
                  <span className="text-indigo-500 font-black tracking-[0.3em] text-sm uppercase">{slide.subtitle}</span>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter">{slide.title}</h2>
                </div>
                <div className="space-y-6">
                  {slide.content.map((item: any, i: number) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-8 group"
                    >
                      <div className="w-32 flex-shrink-0 font-mono text-2xl font-black text-indigo-500 opacity-60">
                        {item.time}
                      </div>
                      <div className="flex-grow">
                        <GlassCard className="p-8 flex-row items-center justify-between group-hover:bg-white/80 dark:group-hover:bg-white/10 transition-all">
                          <div>
                            <h3 className="text-2xl font-black tracking-tight">{item.step}</h3>
                            <p className="text-lg opacity-60 font-medium mt-1">{item.detail}</p>
                          </div>
                          <ArrowRight className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0 text-indigo-500" />
                        </GlassCard>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {slide.type === 'closing' && (
              <div className="space-y-16">
                <div className="space-y-4">
                  <span className="text-indigo-500 font-black tracking-[0.3em] text-sm uppercase">{slide.subtitle}</span>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter">{slide.title}</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {slide.content.map((item: any, i: number) => (
                    <GlassCard key={i} className="border-indigo-500/10 p-10 group">
                      <div className="flex gap-8">
                        <div className="w-16 h-16 rounded-3xl bg-indigo-600 text-white flex items-center justify-center font-black text-2xl shadow-xl shadow-indigo-500/40 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                          {i + 1}
                        </div>
                        <div className="space-y-4 flex-1">
                          <h3 className="text-2xl font-black tracking-tight text-text-primary">{item.label}</h3>
                          <p className="text-xl text-text-secondary font-medium leading-relaxed">{item.text}</p>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
                <div className="mt-20 text-center">
                  <motion.button
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCurrentSlide(0)}
                    className="px-12 py-6 rounded-3xl bg-indigo-600 text-white font-black text-xl shadow-2xl shadow-indigo-500/50 hover:bg-indigo-700 transition-all uppercase tracking-widest"
                  >
                    🚀 Restart Masterclass
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Controls */}
      <nav className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-6 py-3 rounded-3xl glass-morphism shadow-2xl">
        <button 
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="p-3 rounded-xl hover:bg-white/20 disabled:opacity-20 transition-all group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
        </button>
        
        <div className="flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-700 ${
                currentSlide === i 
                  ? 'bg-indigo-600 w-10' 
                  : 'bg-indigo-500/20 hover:bg-indigo-500/40 w-2'
              }`}
            />
          ))}
        </div>

        <button 
          onClick={nextSlide}
          disabled={currentSlide === SLIDES.length - 1}
          className="p-3 rounded-xl hover:bg-white/20 disabled:opacity-20 transition-all group"
        >
          <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
        </button>
      </nav>

      {/* Progress Bar */}
      <div 
        className="fixed bottom-0 left-0 h-2 bg-indigo-600 transition-all duration-500 z-[60] shadow-[0_-4px_20px_rgba(79,70,229,0.5)]" 
        style={{ width: `${((currentSlide + 1) / SLIDES.length) * 100}%` }} 
      />
    </div>
  );
}
