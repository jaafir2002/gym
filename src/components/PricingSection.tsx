import React, { useState } from 'react';
import { Check, ArrowUpRight, Sparkles, Shield, ChevronDown } from 'lucide-react';
import { PRICING_PLANS } from '../data/gymData';
import { PricingPlan } from '../types';

interface PricingSectionProps {
  onSelectPlan: (plan: PricingPlan) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [selectedCategory, setSelectedCategory] = useState<'membership' | 'personal_training'>('membership');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('monthly-pass');

  const filteredPlans = PRICING_PLANS.filter((p) => p.category === selectedCategory);

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-[#0c0c0e] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Category Filter Toggle (Matching Screenshot Layout) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          
          {/* Left: Filter Toggle / Dropdown (Matching Screenshot "Personal Training" dropdown) */}
          <div className="flex items-center space-x-3">
            <div className="inline-flex p-1 rounded-2xl bg-[#18181f] border border-white/10 shadow-lg">
              <button
                onClick={() => setSelectedCategory('membership')}
                className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedCategory === 'membership'
                    ? 'bg-[#ff5722] text-white shadow-[0_0_15px_rgba(255,87,34,0.4)]'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Gym Membership
              </button>
              <button
                onClick={() => setSelectedCategory('personal_training')}
                className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedCategory === 'personal_training'
                    ? 'bg-[#ff5722] text-white shadow-[0_0_15px_rgba(255,87,34,0.4)]'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Personal Training
              </button>
            </div>
          </div>

          {/* Right: Display Title (Matching Screenshot "PRISING PLAN / JOIN TODAY") */}
          <div className="text-left md:text-right">
            <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#ff5722] font-heading">
              PRICING PLAN
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight font-heading text-white mt-1">
              JOIN TODAY
            </h2>
          </div>

        </div>

        {/* 3 Pricing Cards (Matching the 3 exact colored cards in the screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {filteredPlans.map((plan) => {
            const isSelected = selectedPlanId === plan.id;
            const isWhiteCard = plan.theme === 'white';

            return (
              <div
                key={plan.id}
                onClick={() => {
                  setSelectedPlanId(plan.id);
                  onSelectPlan(plan);
                }}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-2 shadow-2xl ${
                  isWhiteCard
                    ? 'bg-white text-neutral-900 border-2 border-white ring-4 ring-white/10'
                    : 'bg-[#ff5722] text-white hover:bg-[#f4511e]'
                } ${isSelected ? 'scale-[1.02] shadow-[0_20px_50px_rgba(0,0,0,0.8)]' : ''}`}
              >
                {/* Popular Pill */}
                {plan.popular && (
                  <div className="absolute -top-3.5 right-6 bg-[#0c0c0e] text-[#ff5722] border border-[#ff5722]/50 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg flex items-center space-x-1">
                    <Sparkles className="w-3 h-3" />
                    <span>MOST POPULAR</span>
                  </div>
                )}

                <div>
                  {/* Top Radio Indicator (Signature element from screenshot) */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                        isWhiteCard
                          ? 'border-2 border-[#ff5722]'
                          : 'border-2 border-white/80 bg-white/20'
                      }`}
                    >
                      <div
                        className={`w-3.5 h-3.5 rounded-full transition-all ${
                          isWhiteCard ? 'bg-[#ff5722]' : 'bg-white'
                        }`}
                      />
                    </div>
                    
                    <span className={`text-[11px] font-bold uppercase tracking-wider ${isWhiteCard ? 'text-neutral-500' : 'text-white/80'}`}>
                      {plan.category === 'personal_training' ? '1-on-1 Coaching' : 'Facility Pass'}
                    </span>
                  </div>

                  {/* Plan Name */}
                  <h3
                    className={`text-2xl sm:text-3xl font-black font-heading tracking-tight uppercase ${
                      isWhiteCard ? 'text-neutral-950' : 'text-white'
                    }`}
                  >
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="mt-4 flex items-baseline">
                    <span
                      className={`text-3xl sm:text-4xl font-extrabold font-heading tracking-tight ${
                        isWhiteCard ? 'text-neutral-950' : 'text-white'
                      }`}
                    >
                      ₹{plan.price.toLocaleString('en-IN')}
                    </span>
                    <span
                      className={`ml-2 text-sm font-semibold ${
                        isWhiteCard ? 'text-neutral-600' : 'text-white/80'
                      }`}
                    >
                      {plan.period}
                    </span>
                  </div>

                  {/* Description Paragraph */}
                  <p
                    className={`mt-4 text-xs leading-relaxed ${
                      isWhiteCard ? 'text-neutral-600' : 'text-white/90'
                    }`}
                  >
                    {plan.description}
                  </p>

                  {/* Features Checklist */}
                  <div className="mt-6 pt-6 border-t border-black/10 space-y-2.5">
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs">
                        <div
                          className={`mt-0.5 shrink-0 rounded-full p-0.5 ${
                            isWhiteCard ? 'bg-[#ff5722] text-white' : 'bg-white text-[#ff5722]'
                          }`}
                        >
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className={isWhiteCard ? 'text-neutral-700 font-medium' : 'text-white font-medium'}>
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="mt-8 pt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlanId(plan.id);
                      onSelectPlan(plan);
                    }}
                    className={`w-full py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-lg cursor-pointer ${
                      isWhiteCard
                        ? 'bg-[#ff5722] hover:bg-[#f4511e] text-white hover:shadow-[0_0_20px_rgba(255,87,34,0.4)]'
                        : 'bg-[#0c0c0e] hover:bg-neutral-900 text-white'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-12 bg-[#141418] border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#ff5722]/10 border border-[#ff5722]/30 flex items-center justify-center text-[#ff5722]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">30-Day Zero-Risk Strength Guarantee</div>
              <div className="text-xs text-neutral-400">Cancel anytime with 1-click in your member dashboard. No hidden enrollment fees.</div>
            </div>
          </div>
          <div className="text-xs font-semibold text-[#ff5722]">
            ✓ Freezes available for travel
          </div>
        </div>

      </div>
    </section>
  );
};
