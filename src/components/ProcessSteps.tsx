import React, { useState } from 'react';
import { ClipboardCheck, Dumbbell, Moon, Scale, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { PROCESS_STEPS } from '../data/gymData';

export const ProcessSteps: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1); // Default to dumbbell (highlighted in screenshot)

  const getIcon = (iconName: string, isActive: boolean) => {
    const iconClass = `w-6 h-6 sm:w-7 sm:h-7 ${isActive ? 'text-white' : 'text-neutral-300'}`;
    switch (iconName) {
      case 'clipboard':
        return <ClipboardCheck className={iconClass} />;
      case 'dumbbell':
        return <Dumbbell className={iconClass} />;
      case 'moon':
        return <Moon className={iconClass} />;
      case 'scale':
        return <Scale className={iconClass} />;
      default:
        return <Zap className={iconClass} />;
    }
  };

  const currentStepData = PROCESS_STEPS[activeStep] || PROCESS_STEPS[1];

  return (
    <section className="py-16 sm:py-24 bg-[#0c0c0e] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Matching Screenshot) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-neutral-400 font-heading">
              COME TO A RESULT
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight font-heading text-white mt-1">
              SYSTEM
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
            Four disciplined phases engineered to eliminate guesswork, prevent central nervous system fatigue, and lock in consistent physical progression.
          </p>
        </div>

        {/* Process Dotted Line & Circular Icons (Matching Screenshot) */}
        <div className="relative py-8">
          
          {/* Connecting Dotted Line */}
          <div className="hidden md:block absolute top-1/2 left-12 right-12 -translate-y-1/2 h-0.5 border-t-2 border-dashed border-white/20 z-0" />

          {/* Icons Flex Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
            {PROCESS_STEPS.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center text-center cursor-pointer group"
                  onClick={() => setActiveStep(idx)}
                >
                  {/* Outer Circle Container */}
                  <div
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl relative ${
                      isSelected
                        ? 'bg-[#ff5722] text-white ring-4 ring-[#ff5722]/30 scale-110 shadow-[0_0_30px_rgba(255,87,34,0.5)]'
                        : 'bg-[#18181f] text-neutral-300 border border-white/15 hover:border-[#ff5722]/60 hover:bg-[#20202a]'
                    }`}
                  >
                    {getIcon(step.icon, isSelected)}

                    {/* Step Number Tag */}
                    <span
                      className={`absolute -top-1 -right-1 text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border ${
                        isSelected
                          ? 'bg-white text-[#ff5722] border-white'
                          : 'bg-neutral-800 text-neutral-400 border-white/10'
                      }`}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Step Title */}
                  <h3
                    className={`mt-4 text-sm sm:text-base font-bold font-heading transition-colors ${
                      isSelected ? 'text-[#ff5722]' : 'text-neutral-200 group-hover:text-white'
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[11px] text-neutral-400 mt-0.5 hidden sm:block">
                    {step.subtitle}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

        {/* Dynamic Detail Card for Selected Step */}
        <div className="mt-8 bg-[#141418] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative overflow-hidden transition-all duration-300">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#ff5722]" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-[#ff5722] text-xs font-bold uppercase tracking-wider">
                <span>Phase {currentStepData.number} Breakdown</span>
                <span>•</span>
                <span>{currentStepData.subtitle}</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-bold font-heading text-white mt-1">
                {currentStepData.title}
              </h4>
              <p className="text-sm text-neutral-300 mt-2 max-w-2xl leading-relaxed">
                {currentStepData.description}
              </p>
            </div>

            <div className="shrink-0">
              <a
                href="#pricing"
                className="inline-flex items-center space-x-2 bg-[#20202a] hover:bg-[#ff5722] text-white text-xs font-bold px-5 py-3 rounded-xl transition-all border border-white/10"
              >
                <span>Experience Phase {currentStepData.number}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
