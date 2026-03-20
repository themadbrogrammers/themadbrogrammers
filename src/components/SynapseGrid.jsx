import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Lock, X, Terminal, ChevronRight } from 'lucide-react';

// Added 'content' to simulate a real markdown/blog post payload
const articles = [
  {
    id: "LOG-AX01",
    title: "Tutorials Are a Controlled Lie",
    category: "SYS.MIND",
    readTime: "04m",
    size: "col-span-1 md:col-span-2 row-span-2",
    img: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=800&auto=format&fit=crop",
    content: "Every tutorial you’ve consumed was engineered to succeed.\n\nNo edge cases. No failure states. No chaos.\n\nBut real systems don’t behave like that. They degrade, they conflict, they break in ways no documentation predicts.\n\n> \"If your code only works in ideal conditions, it doesn’t work.\"\n\nThe real skill isn’t writing code that runs.\nIt’s writing code that survives.\n\nThat’s where engineering begins."
  },
  {
    id: "LOG-AX02",
    title: "UI Is Not Decoration",
    category: "SYS.DESIGN",
    readTime: "05m",
    size: "col-span-1 md:col-span-2",
    bg: "bg-gradient-to-br from-[#00ffe7]/20 to-[#0a0c10]",
    content: "Most developers treat UI as the final layer.\n\nThat’s why most products feel dead.\n\nInterface is not decoration. It is behavior.\n\nEvery animation communicates intent.\nEvery delay creates perception.\nEvery transition teaches the user how the system thinks.\n\n> \"A good UI doesn’t look good. It feels inevitable.\"\n\nIf your interface is replaceable, your product is forgettable."
  },
  {
    id: "LOG-AX03",
    title: "Calm Is a Competitive Advantage",
    category: "SYS.MIND",
    readTime: "03m",
    size: "col-span-1 row-span-2",
    bg: "bg-gradient-to-br from-[#FC5185]/20 to-[#0a0c10]",
    content: "Most developers panic when systems fail.\n\nLogs flood. Errors spike. Deadlines collapse.\n\nThe average reaction is speed.\nThe correct reaction is stillness.\n\n> \"Panic is a debugging anti-pattern.\"\n\nCalm engineers see patterns others miss.\n\nThey don’t fight the system.\nThey read it."
  },
  {
    id: "LOG-AX04",
    title: "Automation Replaces Discipline",
    category: "SYS.LOGIC",
    readTime: "06m",
    size: "col-span-1",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop",
    content: "If you’re doing something repeatedly, you’re already wrong.\n\nHumans are inconsistent.\nMachines are not.\n\nWe don’t rely on discipline.\nWe build systems that remove the need for it.\n\n> \"The best workflow is the one you don’t have to think about.\"\n\nIf it can be automated, it should be eliminated from human responsibility."
  },
  {
    id: "LOG-AX05",
    title: "Most Apps Shouldn’t Exist",
    category: "SYS.REALITY",
    readTime: "05m",
    size: "col-span-1 md:col-span-2",
    bg: "bg-gradient-to-br from-[#FC5185]/20 to-[#0a0c10]",
    content: "The internet is flooded with unnecessary software.\n\nClones. Variations. Slightly different dashboards solving identical problems.\n\nMost apps are built to exist.\nVery few are built to matter.\n\n> \"If your product disappears tomorrow and nothing breaks, it was never important.\"\n\nBuild things that remove friction.\nNot things that add to the noise."
  },
  {
    id: "LOG-AX06",
    title: "We Don’t Build Features",
    category: "SYS.CORE",
    readTime: "04m",
    size: "col-span-1",
    bg: "bg-gradient-to-br from-[#00ffe7]/20 to-[#0a0c10]",
    content: "Features are surface-level thinking.\n\nAnyone can add buttons.\nAnyone can stack functionality.\n\nWe build behavior.\n\nSystems that react.\nInterfaces that guide.\nLogic that adapts.\n\n> \"A feature solves a task. A system reshapes how the task exists.\"\n\nThat’s the difference between shipping code and engineering impact."
  },
  {
    id: "LOG-NULL",
    title: "REDACTED ENTRY",
    category: "SYS.UNKNOWN",
    readTime: "??",
    locked: true,
    content: "ACCESS DENIED"
  },
  {
    id: "LOG-NX01",
    title: "Software That Watches Back",
    category: "SYS.AI",
    readTime: "06m",
    size: "col-span-1 md:col-span-2",
    content: "We’ve built software that users interact with.\n\nThat’s primitive.\n\nThe next layer is software that observes behavior and adapts silently.\n\nInterfaces that rearrange themselves based on hesitation.\nSystems that detect confusion before input is completed.\n\n> \"The best interface responds before the user realizes they need help.\"\n\nWe are not building tools anymore.\nWe are building entities that learn presence."
  },
  {
    id: "LOG-NX02",
    title: "Latency Is Psychological",
    category: "SYS.DESIGN",
    readTime: "04m",
    size: "col-span-1",
    content: "Two systems. Same speed.\n\nOne feels instant.\nThe other feels slow.\n\nWhy?\n\nBecause perception is engineered.\n\nMicro-animations.\nLoading illusions.\nResponse anticipation.\n\n> \"Speed is not measured in milliseconds. It is measured in trust.\"\n\nIf your system feels slow, it is poorly designed—regardless of benchmarks."
  },
  {
    id: "LOG-NX03",
    title: "Delete Half Your Code",
    category: "SYS.CORE",
    readTime: "05m",
    size: "col-span-1 row-span-2",
    content: "Most codebases are bloated.\n\nNot because of complexity—\nbut because of hesitation.\n\nRedundant abstractions.\nDefensive layers.\nUnnecessary flexibility.\n\n> \"Every line of code is a liability until proven essential.\"\n\nThe strongest systems are not built by adding more.\nThey are built by removing everything that doesn’t break them."
  },
  {
    id: "LOG-NX04",
    title: "The Interface That Teaches Itself",
    category: "SYS.FUTURE",
    readTime: "07m",
    size: "col-span-1 md:col-span-2",
    content: "Documentation is a failure.\n\nIf users need instructions, your system has already lost.\n\nImagine an interface that evolves its own onboarding.\n\nTracking confusion.\nInjecting guidance only when needed.\nDisappearing when mastery is detected.\n\n> \"The best tutorial is the one that never exists.\"\n\nSelf-teaching systems will replace static UX."
  },
  {
    id: "LOG-NX05",
    title: "Your App Is a Habit Machine",
    category: "SYS.MIND",
    readTime: "04m",
    size: "col-span-1",
    content: "Every app trains behavior.\n\nWhether intentional or not.\n\nScroll loops.\nNotification triggers.\nReward cycles.\n\n> \"You are not building features. You are programming habits.\"\n\nThe question is not *what your app does.*\n\nThe question is:\n\nWhat does it make people become?"
  },
  {
    id: "LOG-NX06",
    title: "Systems That Refuse Input",
    category: "SYS.LOGIC",
    readTime: "05m",
    size: "col-span-1",
    content: "We assume systems should accept user input.\n\nWhy?\n\nWhat if the system rejects bad decisions in real time?\n\nPrevents invalid actions.\nBlocks self-destructive flows.\n\n> \"Good systems don’t obey. They protect.\"\n\nThe future is not user control.\n\nIt is guided constraint."
  },
  {
    id: "LOG-NX07",
    title: "Invisible Complexity",
    category: "SYS.ARCH",
    readTime: "06m",
    size: "col-span-1 row-span-2",
    content: "Great systems hide their depth.\n\nThe user sees simplicity.\nUnderneath is controlled chaos.\n\nDistributed logic.\nFallback layers.\nPredictive state.\n\n> \"Complexity should exist. Just not where the user can see it.\"\n\nIf your system feels complex, you exposed it incorrectly."
  },
  {
    id: "LOG-NX08",
    title: "The Death of Static Apps",
    category: "SYS.FUTURE",
    readTime: "05m",
    size: "col-span-1 md:col-span-2",
    content: "Static apps are already obsolete.\n\nFixed layouts.\nFixed flows.\nFixed logic.\n\nEverything predetermined.\n\n> \"A static app is a fossil pretending to be alive.\"\n\nThe next generation:\n\nApps that mutate.\nInterfaces that evolve.\nLogic that rewrites itself based on usage.\n\nIf your app behaves the same for every user, it’s already behind."
  },
  {
    id: "LOG-NX09",
    title: "You Don’t Need Motivation",
    category: "SYS.MIND",
    readTime: "03m",
    size: "col-span-1",
    content: "Motivation is unreliable.\n\nIt spikes. It fades.\n\nSystems don’t.\n\n> \"Consistency is not a personality trait. It is an engineered environment.\"\n\nIf your workflow depends on willpower, it will fail.\n\nBuild systems that make progress inevitable."
  },
  {
    id: "LOG-NX10",
    title: "Build Something That Shouldn’t Exist",
    category: "SYS.CORE",
    readTime: "06m",
    size: "col-span-1 md:col-span-2",
    content: "Most developers build what is expected.\n\nSafe ideas.\nPredictable patterns.\nApproved solutions.\n\nThat’s why most products are forgettable.\n\n> \"If it feels comfortable to build, it’s probably already been built.\"\n\nThe only things worth creating are the ones that feel slightly impossible.\n\nThat tension?\n\nThat’s where new systems come from."
  }
];

const filters = ["ALL_LOGS", "SYS.JS", "SYS.AI", "SYS.DATA", "SYS.MIND"];

export default function SynapseGrid() {
  const [activeFilter, setActiveFilter] = useState("ALL_LOGS");
  const [activeArticle, setActiveArticle] = useState(null);

  // Lock body scroll when reading an article
  useEffect(() => {
    if (activeArticle) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeArticle]);

  const filteredArticles = articles.filter(a => activeFilter === "ALL_LOGS" || a.category === activeFilter);

  // Helper to simulate rendering Markdown (handles paragraphs, quotes, and code blocks)
  const renderContent = (content) => {
    return content.split('\n\n').map((paragraph, idx) => {
      if (paragraph.startsWith('>')) {
        return <blockquote key={idx} className="border-l-2 border-[#FC5185] pl-4 text-[#FC5185] italic my-6 font-['Cormorant_Garamond'] text-2xl">{paragraph.replace('> ', '')}</blockquote>;
      }
      if (paragraph.startsWith('```')) {
        const codeText = paragraph.replace(/```[a-z]*\n/g, '').replace(/```/g, '');
        return (
          <div key={idx} className="bg-black border border-white/10 p-4 rounded-xl my-6 font-mono text-sm text-[#00ffe7] overflow-x-auto">
            <pre><code>{codeText}</code></pre>
          </div>
        );
      }
      return <p key={idx} className="mb-6 text-gray-300 font-light leading-relaxed text-lg">{paragraph}</p>;
    });
  };

  return (
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto w-full text-white relative">

      {/* --- READER MODAL OVERLAY --- */}
      <AnimatePresence>
        {activeArticle && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-[#050608] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-40 bg-[#0a0c10]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-3 text-[#00ffe7] font-mono text-xs tracking-widest uppercase">
                <Terminal className="w-4 h-4" />
                <span>ACCESSING_FILE // {activeArticle.id}</span>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="flex items-center gap-2 text-gray-400 hover:text-[#FC5185] transition-colors group"
              >
                <span className="font-mono text-xs tracking-widest hidden sm:block">CLOSE_CONNECTION</span>
                <div className="p-2 border border-white/10 group-hover:border-[#FC5185] bg-black">
                  <X className="w-4 h-4" />
                </div>
              </button>
            </div>

            {/* Article Content Container */}
            <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
              <div className="mb-12">
                <span className="inline-block px-3 py-1 font-mono text-[10px] tracking-widest border border-[#00ffe7]/30 bg-[#00ffe7]/10 text-[#00ffe7] mb-6">
                  {activeArticle.category}
                </span>
                <h1 className="text-4xl md:text-6xl font-bold font-['Cormorant_Garamond'] tracking-tighter mb-6 leading-tight">
                  {activeArticle.title}
                </h1>
                <div className="flex items-center gap-4 font-mono text-xs text-gray-500 tracking-widest border-b border-white/10 pb-8">
                  <span>T-{activeArticle.readTime}</span>
                  <span>//</span>
                  <span>AUTHOR: MAD_BOT_v2</span>
                </div>
              </div>

              {/* Parsed Body */}
              <div className="font-['Share_Tech_Mono']">
                {renderContent(activeArticle.content)}
              </div>

              {/* End of File Marker */}
              <div className="mt-16 pt-8 border-t border-dashed border-white/20 flex justify-center text-gray-600">
                <span className="font-mono text-xs tracking-widest">/// END_OF_TRANSMISSION ///</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* --- STANDARD GRID VIEW --- */}
      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 border-b border-white/10 pb-6 gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#00ffe7]/10 border border-[#00ffe7]/30">
            <BookOpen className="w-6 h-6 text-[#00ffe7]" />
          </div>
          <div>
            <h2 className="text-xs font-mono text-[#00ffe7] tracking-[0.3em] mb-1">DECRYPTED ARCHIVES</h2>
            <h3 className="text-3xl md:text-5xl font-bold font-['Cormorant_Garamond'] tracking-tight uppercase">
              Synapse <span className="text-white italic">Logs</span>
            </h3>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {filters.map(f => (
            <button
              key={f} onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 font-mono text-[10px] tracking-widest uppercase transition-all border ${activeFilter === f
                ? 'bg-[#00ffe7] text-[#0a0c10] border-[#00ffe7] font-bold shadow-[0_0_15px_rgba(0,255,231,0.4)]'
                : 'bg-transparent text-gray-500 border-white/10 hover:border-[#00ffe7]/50 hover:text-[#00ffe7]'
                }`}
            >
              [{f}]
            </button>
          ))}
        </div>
      </div>

      {/* BENTO GRID */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[220px]">
        <AnimatePresence>
          {filteredArticles.map(article => (
            <motion.div
              layout key={article.id}
              onClick={() => setActiveArticle(article)}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className={`group relative overflow-hidden border border-white/10 hover:border-[#00ffe7]/50 transition-colors duration-500 cursor-pointer ${article.size} ${article.bg || 'bg-[#050608]'}`}
            >
              {/* Corner Brackets */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20 z-20 group-hover:border-[#00ffe7] transition-colors"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20 z-20 group-hover:border-[#00ffe7] transition-colors"></div>

              {/* Background Setup */}
              {article.img && (
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:4px_4px] z-10 mix-blend-overlay opacity-50"></div>
                  <img src={article.img} alt={article.title} className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-[#0a0c10]/80 to-transparent z-10"></div>
                </div>
              )}

              {/* Content */}
              <div className="relative z-20 p-6 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className={`inline-flex items-center gap-2 px-2 py-1 font-mono text-[9px] font-bold tracking-widest border ${article.img ? 'bg-[#00ffe7]/10 text-[#00ffe7] border-[#00ffe7]/30' : 'bg-white/5 text-white border-white/10'}`}>
                    <Lock className="w-3 h-3" />
                    {article.category}
                  </span>
                  <span className="font-mono text-[10px] text-gray-500 tracking-widest">T-{article.readTime}</span>
                </div>

                <div>
                  <h3 className={`text-2xl font-bold font-['Share_Tech_Mono'] mb-2 group-hover:text-[#00ffe7] transition-colors ${article.img ? 'text-white' : 'text-gray-200'}`}>
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[#00ffe7] opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[10px] tracking-widest">
                    <span>INITIALIZE_READ</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}