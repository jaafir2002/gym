import React, { useState, useRef } from 'react';
import { Sparkles, Trophy, ArrowRight, Activity, Flame, ChevronLeft, ChevronRight } from 'lucide-react';
import { TRANSFORMATIONS } from '../data/gymData';

export const TransformationSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // percentage (0 - 100)
  const containerRef = useRef<HTMLDivElement>(null);

  const activeStory = TRANSFORMATIONS[activeIndex];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.max(10, Math.min(90, (x / rect.width) * 100));
    setSliderPos(percent);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    const percent = Math.max(10, Math.min(90, (x / rect.width) * 100));
    setSliderPos(percent);
  };

  return (
    <section id="transformations" className="py-20 sm:py-28 bg-[#0c0c0e] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#ff5722] font-heading">
              PROVEN METRICS
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight font-heading text-white mt-1">
              BEFORE & AFTER RESULTS
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
            Biometric InBody 770 scans and calibrated gym performance logs. No filters, no temporary dehydration — pure physical recomposition.
          </p>
        </div>

        {/* Transformation Showcase Container */}
        <div className="bg-[#141418] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Interactive Interactive Comparison Slider */}
            <div className="lg:col-span-7">
              <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                className="relative h-[360px] sm:h-[460px] w-full rounded-2xl sm:rounded-3xl overflow-hidden cursor-ew-resize select-none border border-white/15 shadow-2xl group"
              >
                {/* Full "After" Image (Background) */}
                <img
                  src={activeStory.afterImg}
                  alt={`${activeStory.name} after transformation`}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />

                {/* Cropped "Before" Image (Foreground with dynamic clip) */}
                <div
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  style={{ width: `${sliderPos}%` }}
                >
                  <img
                    src={activeStory.beforeImg}
                    alt={`${activeStory.name} before transformation`}
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: containerRef.current?.offsetWidth || '100%' }}
                  />
                  {/* Subtle sepia/desaturate for before */}
                  <div className="absolute inset-0 bg-neutral-900/30 backdrop-contrast-75" />
                  
                  {/* Before Label */}
                  <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider border border-white/10">
                    Day 1 Baseline
                  </div>
                </div>

                {/* After Label */}
                <div className="absolute top-4 right-4 bg-[#ff5722]/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-lg">
                  Week {activeStory.duration} Result
                </div>

                {/* Dividing Draggable Bar */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] pointer-events-none"
                  style={{ left: `${sliderPos}%` }}
                >
                  {/* Center Drag Handle Knob */}
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-neutral-900 flex items-center justify-center shadow-2xl border-2 border-[#ff5722]">
                    <div className="flex items-center space-x-0.5 text-neutral-800">
                      <ChevronLeft className="w-3 h-3" />
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>

                {/* Drag hint */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm px-3.5 py-1 rounded-full text-[11px] font-semibold text-white/90 border border-white/10 pointer-events-none">
                  ↔ Slide to compare physique
                </div>
              </div>
            </div>

            {/* Right: Client Story & Hard Metrics */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Member & Program Header */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#ff5722]">
                  {activeStory.duration} Case Study
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white mt-1">
                  {activeStory.name}, {activeStory.age}
                </h3>
                <div className="text-xs text-neutral-400 mt-0.5 font-medium">
                  Program: {activeStory.program}
                </div>
              </div>

              {/* 2 Big Stat Badges */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1c1c24] p-4 rounded-2xl border border-white/5">
                  <div className="flex items-center space-x-1.5 text-xs text-[#ff5722] font-semibold">
                    <Flame className="w-3.5 h-3.5" />
                    <span>Body Recomp</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black font-heading text-white mt-1">
                    {activeStory.metric1}
                  </div>
                </div>

                <div className="bg-[#1c1c24] p-4 rounded-2xl border border-white/5">
                  <div className="flex items-center space-x-1.5 text-xs text-emerald-400 font-semibold">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Capacity</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black font-heading text-white mt-1">
                    {activeStory.metric2}
                  </div>
                </div>
              </div>

              {/* Member Quote */}
              <blockquote className="text-sm text-neutral-300 leading-relaxed border-l-2 border-[#ff5722] pl-4 italic">
                "{activeStory.story}"
              </blockquote>

              {/* Story Selector Buttons */}
              <div className="pt-2 flex items-center justify-between border-t border-white/10">
                <div className="text-xs text-neutral-400 font-medium">
                  Athlete {activeIndex + 1} of {TRANSFORMATIONS.length}
                </div>

                <div className="flex items-center space-x-2">
                  {TRANSFORMATIONS.map((story, i) => (
                    <button
                      key={story.id}
                      onClick={() => {
                        setActiveIndex(i);
                        setSliderPos(50);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        activeIndex === i
                          ? 'bg-[#ff5722] text-white shadow'
                          : 'bg-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {story.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
