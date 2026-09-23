import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/gymData';

export const ReviewsSection: React.FC = () => {
  const [selectedReviewIdx, setSelectedReviewIdx] = useState(0);

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-[#0c0c0e] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header (Matching Screenshot: "REVIEW / FROM YOU") */}
        <div className="mb-12 sm:mb-16">
          <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-neutral-400 font-heading">
            REVIEW
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight font-heading text-white mt-1">
            FROM YOU
          </h2>
        </div>

        {/* Testimonials Body: Avatar Cluster on Left, Review Cards on Right (Matching Screenshot Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Avatar Cluster (Matching Screenshot with circular avatars and orange highlight ring) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80">
              
              {/* Top-Left Avatar */}
              <button
                onClick={() => setSelectedReviewIdx(0)}
                className={`absolute top-2 left-4 w-20 h-20 rounded-full overflow-hidden border-2 transition-all duration-300 hover:scale-110 cursor-pointer ${
                  selectedReviewIdx === 0
                    ? 'border-[#ff5722] ring-4 ring-[#ff5722]/30 scale-105 z-20'
                    : 'border-white/20 opacity-70 hover:opacity-100 z-10'
                }`}
              >
                <img
                  src={TESTIMONIALS[0].avatar}
                  alt={TESTIMONIALS[0].name}
                  className="w-full h-full object-cover"
                />
              </button>

              {/* Top-Right Avatar */}
              <button
                onClick={() => setSelectedReviewIdx(1)}
                className={`absolute top-6 right-8 w-20 h-20 rounded-full overflow-hidden border-2 transition-all duration-300 hover:scale-110 cursor-pointer ${
                  selectedReviewIdx === 1
                    ? 'border-[#ff5722] ring-4 ring-[#ff5722]/30 scale-105 z-20'
                    : 'border-white/20 opacity-70 hover:opacity-100 z-10'
                }`}
              >
                <img
                  src={TESTIMONIALS[1].avatar}
                  alt={TESTIMONIALS[1].name}
                  className="w-full h-full object-cover"
                />
              </button>

              {/* Center Highlighted Large Avatar (Matching the vibrant orange surround in screenshot) */}
              <button
                onClick={() => setSelectedReviewIdx(2)}
                className={`absolute bottom-4 left-10 w-28 h-28 rounded-full overflow-hidden border-4 transition-all duration-300 hover:scale-105 cursor-pointer shadow-2xl ${
                  selectedReviewIdx === 2
                    ? 'border-[#ff5722] ring-8 ring-[#ff5722]/20 scale-105 z-30'
                    : 'border-white/30 opacity-80 hover:opacity-100 z-10'
                }`}
              >
                <img
                  src={TESTIMONIALS[2].avatar}
                  alt={TESTIMONIALS[2].name}
                  className="w-full h-full object-cover"
                />
              </button>

              {/* Bottom-Right Avatar */}
              <button
                onClick={() => setSelectedReviewIdx(3)}
                className={`absolute bottom-2 right-4 w-18 h-18 rounded-full overflow-hidden border-2 transition-all duration-300 hover:scale-110 cursor-pointer ${
                  selectedReviewIdx === 3
                    ? 'border-[#ff5722] ring-4 ring-[#ff5722]/30 scale-105 z-20'
                    : 'border-white/20 opacity-70 hover:opacity-100 z-10'
                }`}
              >
                <img
                  src={TESTIMONIALS[3].avatar}
                  alt={TESTIMONIALS[3].name}
                  className="w-full h-full object-cover"
                />
              </button>

              {/* Decorative Gym Stamp Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#181820] border border-white/10 flex items-center justify-center text-[10px] font-black text-[#ff5722] uppercase tracking-wider z-0 pointer-events-none">
                VERIFIED
              </div>

            </div>
          </div>

          {/* Right: Review Cards (Matching Screenshot) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Main Active Testimonial Card */}
            <div className="bg-[#141418] border border-white/15 rounded-3xl p-6 sm:p-8 relative shadow-2xl">
              
              {/* Header inside card: User Badge + Brand pill */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-bold text-white bg-black/60 px-3 py-1 rounded-full border border-white/10">
                    {TESTIMONIALS[selectedReviewIdx].name}
                  </span>
                  <span className="text-xs text-neutral-400 hidden sm:inline">
                    {TESTIMONIALS[selectedReviewIdx].role}
                  </span>
                </div>

                <div className="text-xs font-black tracking-widest text-[#ff5722] uppercase font-heading flex items-center space-x-1">
                  <span>GYM</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff5722]" />
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex items-center space-x-1 mt-4">
                {[...Array(TESTIMONIALS[selectedReviewIdx].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-amber-400" />
                ))}
              </div>

              {/* Quote Highlight & Full Text */}
              <h4 className="text-lg sm:text-xl font-bold font-heading text-white mt-3">
                "{TESTIMONIALS[selectedReviewIdx].highlight}"
              </h4>

              <p className="text-sm text-neutral-300 leading-relaxed mt-2">
                {TESTIMONIALS[selectedReviewIdx].text}
              </p>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400">
                <div className="flex items-center space-x-1.5 text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{TESTIMONIALS[selectedReviewIdx].memberSince}</span>
                </div>

                {/* Next / Prev Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedReviewIdx((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1))}
                    className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-[#ff5722] text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Previous review"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedReviewIdx((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1))}
                    className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-[#ff5722] text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Next review"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
