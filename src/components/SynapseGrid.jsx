import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Lock, X, Terminal, ChevronRight } from 'lucide-react';

// Added 'content' to simulate a real markdown/blog post payload
const articles = [
  {
    id: "LOG-01", title: "Master Async/Await", category: "SYS.JS", readTime: "05m", size: "col-span-1 md:col-span-2 row-span-2",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    content: "The JavaScript event loop is a chaotic vortex. Most developers just throw 'await' at a Promise and hope the thread doesn't lock up. But in this lab, we engineer precision.\n\nTo truly master asynchronous execution, you must understand the microtask queue. When the call stack clears, the engine doesn't just grab the next macro task; it violently consumes every pending microtask first.\n\n> \"A synchronous mind cannot comprehend an asynchronous universe.\"\n\n```javascript\n// Typical amateur approach\nawait fetchUserData();\nawait fetchLabData();\n\n// The Mad Brogrammer approach\nawait Promise.all([fetchUserData(), fetchLabData()]);\n```\n\nStop bottlenecking your I/O operations. Parallelize your chaos."
  },
  {
    id: "LOG-02", title: "When AI Reviews Your PR", category: "SYS.AI", readTime: "08m", size: "col-span-1 md:col-span-2", bg: "bg-gradient-to-br from-[#0091ff]/20 to-[#0a0c10]",
    content: "We plugged our codebase into a massive LLM to see what would happen. It didn't just find bugs; it judged our architecture.\n\nThe AI pointed out that our state management was 'unnecessarily convoluted' and suggested a refactor that cut our bundle size by 14%. It's terrifying, humbling, and incredibly efficient.\n\nThe future of code review isn't human. It's an unforgiving, hyper-logical neural net that never sleeps."
  },
  {
    id: "LOG-03", title: "Becoming a Calm Dev", category: "SYS.MIND", readTime: "04m", size: "col-span-1 row-span-2", bg: "bg-gradient-to-br from-[#FC5185]/20 to-[#0a0c10]",
    content: "Servers will crash. Databases will corrupt. PMs will change the requirements a day before launch.\n\nPanic is a memory leak in the human brain. The calm developer doesn't react; they observe. They read the stack trace like a detective, not a victim.\n\nBreathe in. Console.log. Breathe out."
  },
  {
    id: "LOG-04", title: "Pandas for Big Data", category: "SYS.DATA", readTime: "12m", size: "col-span-1", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    content: "Loading 10 million rows into memory? Good luck with that standard Python array. \n\nPandas is the heavy machinery of data manipulation. Vectorized operations bypass the slow Python loops, dropping down into raw, unadulterated C code execution.\n\nMaster the DataFrame, and you command the data."
  },
  {
    id: "LOG-05", title: "The Next GPT Engine", category: "SYS.AI", readTime: "06m", size: "col-span-1 md:col-span-2", bg: "bg-gradient-to-br from-[#00ffe7]/20 to-[#0a0c10]",
    content: "Context windows are expanding. Latency is dropping. The next generation of LLMs aren't just autocomplete on steroids; they are reasoning engines.\n\nWe are shifting from 'prompt engineering' to 'agent orchestration'. If your app isn't natively interacting with an intelligence layer by next year, it belongs in a museum."
  },
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