import React, { useState } from 'react';
import { BookOpen, Search, Sparkles, Layout, TrendingUp, ShieldCheck, ChevronDown, ChevronUp, Play, FileText, Download, CheckCircle, Clock } from 'lucide-react';
import { COURSE_MODULES } from '../data/courseData';
import { CourseModule } from '../types';

interface CourseCurriculumProps {
  onPreviewClick: () => void;
  onBuyClick: () => void;
}

export const CourseCurriculum: React.FC<CourseCurriculumProps> = ({ onPreviewClick, onBuyClick }) => {
  const [expandedModule, setExpandedModule] = useState<number>(1);

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search': return <Search className="w-5 h-5 text-amber-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'Layout': return <Layout className="w-5 h-5 text-amber-400" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-amber-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-amber-400" />;
      default: return <BookOpen className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="curriculum" className="py-16 md:py-24 bg-[#050505] text-[#F5F5F5] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold px-3 py-1 uppercase tracking-[0.2em] font-mono">
            <BookOpen className="w-3.5 h-3.5" />
            <span>5 Step-by-Step Master Modules</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase">
            Inside The <span className="text-amber-500">Curriculum</span>
          </h2>

          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Zero filler. Every lesson is engineered to take you from initial idea to active sales in record time.
          </p>
        </div>

        {/* Modules Accordion List */}
        <div className="space-y-4">
          {COURSE_MODULES.map((module: CourseModule) => {
            const isExpanded = expandedModule === module.id;

            return (
              <div
                key={module.id}
                className={`border transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? 'bg-[#0A0A0A] border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.1)]'
                    : 'bg-[#080808] border-white/10 hover:border-white/20'
                }`}
              >
                {/* Module Header Button */}
                <button
                  onClick={() => setExpandedModule(isExpanded ? 0 : module.id)}
                  className="w-full p-5 sm:p-6 flex items-start sm:items-center justify-between gap-4 text-left focus:outline-none"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="p-3 bg-[#050505] border border-white/10 shrink-0">
                      {getModuleIcon(module.iconName)}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold font-mono text-amber-500">
                        <span>MODULE {module.id}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-white/40 font-normal">
                          <Clock className="w-3 h-3" />
                          {module.duration}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider">
                        {module.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-white/50 font-normal line-clamp-2">
                        {module.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-2 text-white/40 shrink-0">
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-amber-500" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {/* Module Content / Lessons List */}
                {isExpanded && (
                  <div className="px-5 pb-6 sm:px-6 pt-2 border-t border-white/5 bg-[#050505] space-y-3 font-mono">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">
                      INCLUDED LESSONS & DOWNLOADS:
                    </h4>

                    <div className="grid grid-cols-1 gap-2.5">
                      {module.lessons.map((lesson, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-[#0A0A0A] border border-white/5 hover:border-white/20 text-xs sm:text-sm text-white/80 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {lesson.type === 'video' && <Play className="w-4 h-4 text-amber-500 shrink-0" />}
                            {lesson.type === 'pdf' && <FileText className="w-4 h-4 text-amber-500 shrink-0" />}
                            {lesson.type === 'template' && <Layout className="w-4 h-4 text-amber-500 shrink-0" />}
                            {lesson.type === 'prompt' && <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />}

                            <span className="font-semibold text-white/90 font-sans">{lesson.title}</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-mono text-white/40">{lesson.duration}</span>

                            {lesson.previewAvailable ? (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onPreviewClick();
                                }}
                                className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/20 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 transition-colors font-mono"
                              >
                                Preview Sample
                              </button>
                            ) : (
                              <span className="bg-white/5 text-white/40 text-[9px] font-bold px-2 py-0.5 font-mono uppercase tracking-widest">
                                LOCKED
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Bar for Curriculum */}
        <div className="mt-10 p-6 bg-[#0A0A0A] border border-amber-500/30 flex flex-wrap items-center justify-between gap-4 text-center sm:text-left shadow-2xl">
          <div>
            <h4 className="text-base font-bold text-white uppercase tracking-wider">
              Ready to access all 5 modules and instant download templates?
            </h4>
            <p className="text-xs text-white/50 mt-0.5 font-mono">
              Get full instant lifetime access today for just $37 (Normally $297)
            </p>
          </div>

          <button
            onClick={onBuyClick}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-widest px-6 py-3 text-xs shadow-[0_0_20px_rgba(245,158,11,0.25)] transition-all"
          >
            Enroll & Unlock All Lessons
          </button>
        </div>

      </div>
    </section>
  );
};
