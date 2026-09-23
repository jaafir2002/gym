import React, { useState } from 'react';
import { ArrowUpRight, Flame, Clock, UserCheck, Dumbbell, Shield, CheckCircle2 } from 'lucide-react';
import { FEATURED_CLASSES } from '../data/gymData';

interface ClassesSectionProps {
  onBookClass: (className: string) => void;
}

export const ClassesSection: React.FC<ClassesSectionProps> = ({ onBookClass }) => {
  const [selectedClass, setSelectedClass] = useState<typeof FEATURED_CLASSES[0] | null>(null);

  return (
    <section id="classes" className="py-20 sm:py-28 bg-[#0c0c0e] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Matching Screenshot) */}
        <div className="mb-12 sm:mb-16">
          <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-neutral-400 font-heading">
            CLASSES DESIGNED
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight font-heading text-white mt-1">
            FOR YOU
          </h2>
        </div>

        {/* 4 Cards Grid - Staggered Heights and Athletic Cards (Matching Screenshot) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
          {FEATURED_CLASSES.map((item, index) => {
            // Stagger heights to match the editorial composition from the design
            const heightClasses = [
              'h-[380px] sm:h-[420px]',
              'h-[420px] sm:h-[490px]',
              'h-[390px] sm:h-[450px]',
              'h-[440px] sm:h-[510px]',
            ][index % 4];

            return (
              <div
                key={item.id}
                onClick={() => setSelectedClass(item)}
                className={`group relative w-full ${heightClasses} rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 shadow-2xl border border-white/10 hover:border-[#ff5722]/60`}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${item.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedClass(item);
                  }
                }}
              >
                {/* Background Image with Zoom */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Dark Contrast Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />

                {/* Optional Stamp Badge for Group Training (The Yard Gym 2020) */}
                {item.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="w-16 h-16 rounded-full border border-dashed border-white/40 bg-black/60 backdrop-blur-sm flex items-center justify-center p-1 text-center rotate-12 group-hover:rotate-0 transition-transform duration-500">
                      <span className="text-[9px] font-black tracking-widest text-neutral-200 uppercase leading-tight font-heading">
                        THE YARD<br />GYM 2020
                      </span>
                    </div>
                  </div>
                )}

                {/* Intensity Tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-wider text-[#ff5722] flex items-center space-x-1">
                    <Flame className="w-3 h-3" />
                    <span>{item.intensity}</span>
                  </span>
                </div>

                {/* Bottom Card Content with Title & Circular Orange Arrow (Matching Screenshot) */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10 flex items-end justify-between">
                  <div className="pr-3">
                    <h3 className="text-xl sm:text-2xl font-bold font-heading text-white group-hover:text-white tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-300 mt-1 line-clamp-2 opacity-90">
                      {item.tagline}
                    </p>
                  </div>

                  {/* Circular Orange Arrow Icon Button (Signature UI element) */}
                  <div className="w-10 h-10 rounded-full bg-[#ff5722] group-hover:bg-[#f4511e] text-white flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(255,87,34,0.4)] group-hover:scale-115 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Class Details Modal */}
      {selectedClass && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedClass(null)}
        >
          <div
            className="bg-[#141418] border border-white/15 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Image */}
            <div className="relative h-48 sm:h-56 w-full">
              <img
                src={selectedClass.image}
                alt={selectedClass.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-[#141418]/40 to-transparent" />
              <button
                onClick={() => setSelectedClass(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 hover:bg-[#ff5722] text-white flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-6">
                <span className="text-xs font-bold text-[#ff5722] tracking-wider uppercase">
                  {selectedClass.intensity} Intensity • {selectedClass.duration}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                  {selectedClass.title}
                </h3>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-4">
              <p className="text-sm text-neutral-300 leading-relaxed">
                {selectedClass.description}
              </p>

              <div className="grid grid-cols-2 gap-3 py-2 text-xs">
                <div className="bg-[#1b1b22] p-3 rounded-xl border border-white/5 flex items-center space-x-2.5">
                  <UserCheck className="w-4 h-4 text-[#ff5722]" />
                  <div>
                    <div className="text-neutral-400">Head Coach</div>
                    <div className="text-white font-semibold">{selectedClass.coach}</div>
                  </div>
                </div>
                <div className="bg-[#1b1b22] p-3 rounded-xl border border-white/5 flex items-center space-x-2.5">
                  <Clock className="w-4 h-4 text-[#ff5722]" />
                  <div>
                    <div className="text-neutral-400">Duration</div>
                    <div className="text-white font-semibold">{selectedClass.duration}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">What's Included:</div>
                <div className="grid grid-cols-1 gap-2 text-xs text-neutral-300">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ff5722]" />
                    <span>Olympic Barbells & Rogue Calibrated Kilo Plates</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ff5722]" />
                    <span>Heart rate telemetry & live board output</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ff5722]" />
                    <span>Complimentary recovery electrolytes & towel</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center space-x-3">
                <button
                  onClick={() => {
                    const title = selectedClass.title;
                    setSelectedClass(null);
                    onBookClass(title);
                  }}
                  className="flex-1 bg-[#ff5722] hover:bg-[#f4511e] text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-[0_0_20px_rgba(255,87,34,0.4)] flex items-center justify-center space-x-2"
                >
                  <span>Book This Class</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedClass(null)}
                  className="px-4 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold text-xs"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
