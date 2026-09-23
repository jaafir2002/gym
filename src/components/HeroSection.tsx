import React from 'react';
import { ArrowDown, ArrowUpRight, Flame, ShieldCheck, Users } from 'lucide-react';
import { HERO_DATA } from '../data/gymData';

interface HeroSectionProps {
  onOpenVideo?: () => void;
  onExploreMore: () => void;
  onOpenFreeTrial: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenVideo,
  onExploreMore,
  onOpenFreeTrial,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-[#0c0c0e]"
    >
      {/* Background Ambient Athletic Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[500px] bg-[#ff5722]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
        
        {/* Split Big Display Headlines - "Get Fit" (left) and "Stay Fit" (right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-6 sm:mb-8">
          <div className="text-left">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tighter uppercase font-heading text-white drop-shadow-2xl">
              Get Fit
            </h1>
          </div>
          <div className="text-left md:text-right">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tighter uppercase font-heading text-white/95 drop-shadow-2xl">
              Stay Fit
            </h1>
          </div>
        </div>

        {/* Central Stage: Muscular Athlete Image with Barbells and Overlapping Floating Cards */}
        <div className="relative w-full max-w-5xl mx-auto mt-2 min-h-[460px] sm:min-h-[580px] lg:min-h-[640px] flex items-center justify-center">
          
          {/* Main Focal Athlete Image (Dark Cinematic Gym Silhouette / Lighting) */}
          <div className="relative w-full h-[460px] sm:h-[580px] lg:h-[640px] rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border border-white/10 group">
            {/* Background image */}
            <img
              src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=85&w=1600&auto=format&fit=crop"
              alt="Elite athlete performing barbell training at GYM"
              loading="eager"
              className="w-full h-full object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            {/* Dark Dramatic Vignette Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/30 to-transparent opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0e]/80 via-transparent to-[#0c0c0e]/80" />
          </div>

          {/* Left Floating Content Card: Copy, Explore Pill, and 20+ Active Coaches Badge */}
          <div className="absolute left-4 sm:left-8 bottom-6 sm:bottom-12 max-w-sm sm:max-w-md z-20 flex flex-col space-y-4 sm:space-y-6">
            
            {/* Copy paragraph */}
            <div className="bg-[#0c0c0e]/75 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/10 shadow-2xl">
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Personalized strength periodization, Olympic platforms, and metabolic conditioning engineered to shatter plateaus and sustain lifetime physical resilience.
              </p>
              
              <div className="mt-4 flex items-center space-x-3">
                <button
                  id="hero-explore-btn"
                  onClick={onExploreMore}
                  className="bg-[#ff5722] hover:bg-[#f4511e] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-full transition-all duration-300 hover:shadow-[0_0_24px_rgba(255,87,34,0.5)] active:scale-95 flex items-center space-x-2 cursor-pointer group/btn"
                >
                  <span>Explore more</span>
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>

                <button
                  onClick={onOpenFreeTrial}
                  className="text-xs sm:text-sm font-semibold text-neutral-300 hover:text-white px-3 py-2 transition-colors flex items-center space-x-1"
                >
                  <span>Claim 1-Day Trial</span>
                </button>
              </div>
            </div>

            {/* Floating "20+ Active Coaches" Badge (Matching Screenshot) */}
            <div
              id="active-coaches-badge"
              className="bg-[#141418]/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/15 shadow-2xl flex items-center space-x-3 w-fit"
            >
              {/* Stacked Avatars */}
              <div className="flex -space-x-2.5 overflow-hidden">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-[#141418] object-cover"
                  src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=120&auto=format&fit=crop"
                  alt="Coach Alex"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-[#141418] object-cover"
                  src="https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=120&auto=format&fit=crop"
                  alt="Coach Maya"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-[#141418] object-cover"
                  src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=120&auto=format&fit=crop"
                  alt="Coach Marcus"
                />
                <div className="h-8 w-8 rounded-full ring-2 ring-[#141418] bg-[#ff5722] flex items-center justify-center text-[10px] font-extrabold text-white">
                  +17
                </div>
              </div>

              {/* Text */}
              <div>
                <div className="text-xs font-bold text-white tracking-wide">
                  20+ Active Coaches
                </div>
                <div className="text-[11px] text-neutral-400">
                  Certified CSCS & Olympic Mentors
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Right Down-Arrow Indicator (Matching Screenshot) */}
          <a
            href="#classes"
            id="hero-scroll-indicator"
            className="absolute right-4 sm:right-8 bottom-6 sm:bottom-8 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#16161c]/80 hover:bg-[#ff5722] border border-white/15 text-neutral-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
            aria-label="Scroll to Classes Section"
          >
            <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
          </a>

        </div>

        {/* Quick Micro Metric Strip */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-white/10 pt-6">
          {HERO_DATA.stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs text-neutral-400 font-medium tracking-wide uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
