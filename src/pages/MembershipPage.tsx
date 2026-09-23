import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  HelpCircle, 
  ShieldCheck, 
  Flame, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  Zap,
  CheckCircle2,
  X
} from 'lucide-react';
import { PRICING_PLANS } from '../data/gymData';
import { PricingPlan, AppPage } from '../types';

interface MembershipPageProps {
  onNavigate: (page: AppPage) => void;
  onSelectPlan: (plan: PricingPlan) => void;
  onOpenFreeTrial: (goal?: string) => void;
}

export const MembershipPage: React.FC<MembershipPageProps> = ({
  onNavigate,
  onSelectPlan,
  onOpenFreeTrial,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Are there any hidden sign-up fees or lock-in contracts?",
      a: "Zero hidden fees. Our monthly and day passes are strictly month-to-month or single-use without cancellation penalties. You can pause or cancel anytime with a simple 7-day notice.",
    },
    {
      q: "What equipment and facilities are included in my pass?",
      a: "All passes grant unrestricted access to our Eleiko Olympic platforms, custom dumbbell racks (up to 150 lbs), calibrated iron plates, Concept2 ergs, AstroTurf sled tracks, and the Infrared Recovery Saunas.",
    },
    {
      q: "Can I bring a training partner or guest?",
      a: "Monthly members receive 2 complimentary guest passes per month. Annual VIP members receive 4 passes per month. Additional day passes can be purchased at a 25% member discount.",
    },
    {
      q: "How does the InBody 770 biometric scan work?",
      a: "Our clinical-grade InBody 770 analyzer measures segmental lean mass, visceral fat level, intra/extracellular water ratios, and phase angle. All Monthly and Annual members receive monthly scans reviewed by a coach.",
    },
    {
      q: "Can I freeze or pause my membership during travel or injury?",
      a: "Yes. You can freeze your membership for up to 60 days per calendar year at no charge via the online member hub or front desk.",
    },
  ];

  return (
    <div className="pt-28 pb-24 bg-[#0c0c0e] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-semibold text-neutral-400 mb-4">
          <button 
            onClick={() => onNavigate('home')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#ff5722]">Memberships & Pricing</span>
        </div>

        {/* Page Hero Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#ff5722] font-heading">
              TRANSPARENT VALUE
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight font-heading text-white mt-1">
              MEMBERSHIP PLANS & PASSES
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
            No initiation surprises. World-class Eleiko lifting platforms, infrared recovery, and expert coaching wrapped in an athlete-first facility.
          </p>
        </div>

        {/* Billing Cycle Switcher */}
        <div className="mt-10 flex justify-center">
          <div className="bg-[#141418] border border-white/10 p-1.5 rounded-2xl inline-flex items-center space-x-2">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-[#ff5722] text-white shadow-lg'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Monthly Flexibility
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-[#ff5722] text-white shadow-lg'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>Annual Commitment</span>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/30">
                Save 25%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Main Pricing Cards */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.slice(0, 3).map((plan) => {
            const isWhite = plan.theme === 'white';
            const priceDisplay =
              billingCycle === 'annual' && plan.id === 'monthly-pass'
                ? 1875
                : plan.price;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 shadow-2xl ${
                  isWhite
                    ? 'bg-white text-black scale-100 lg:-translate-y-3 z-10 shadow-[0_20px_50px_rgba(255,255,255,0.1)]'
                    : 'bg-[#ff5722] text-white'
                }`}
              >
                {/* Popular Pill */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#ff5722] text-white text-[11px] font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-lg border border-white/20 flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>MOST POPULAR CHOICE</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className={`text-xl font-black font-heading tracking-tight uppercase ${
                      isWhite ? 'text-black' : 'text-white'
                    }`}>
                      {plan.name}
                    </h3>
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      isWhite ? 'bg-[#ff5722]' : 'bg-white'
                    }`} />
                  </div>

                  <p className={`text-xs mt-2 ${isWhite ? 'text-neutral-600' : 'text-white/80'}`}>
                    {plan.subtitle}
                  </p>

                  {/* Big Price Tag */}
                  <div className="mt-6 flex items-baseline space-x-1">
                    <span className="text-2xl font-bold">₹</span>
                    <span className="text-4xl sm:text-5xl font-black font-heading tracking-tight">
                      {priceDisplay.toLocaleString('en-IN')}
                    </span>
                    <span className={`text-xs font-semibold ${isWhite ? 'text-neutral-500' : 'text-white/80'}`}>
                      {billingCycle === 'annual' && plan.id === 'monthly-pass' ? '/ Mo (Billed Annually)' : plan.period}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className={`mt-8 pt-6 border-t ${isWhite ? 'border-neutral-200' : 'border-white/20'}`}>
                    <div className={`text-[10px] font-bold uppercase tracking-wider mb-3 ${
                      isWhite ? 'text-neutral-500' : 'text-white/80'
                    }`}>
                      What's Included:
                    </div>
                    <ul className="space-y-3 text-xs">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start space-x-2.5">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            isWhite ? 'bg-black text-white' : 'bg-white text-[#ff5722]'
                          }`}>
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <span className={isWhite ? 'text-neutral-800 font-medium' : 'text-white font-medium'}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Plan Action CTA */}
                <div className="mt-8 pt-4">
                  <button
                    onClick={() => onSelectPlan(plan)}
                    className={`w-full py-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer ${
                      isWhite
                        ? 'bg-[#ff5722] hover:bg-[#f4511e] text-white hover:shadow-[0_0_20px_rgba(255,87,34,0.4)]'
                        : 'bg-black hover:bg-neutral-900 text-white'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Full Comparison Matrix */}
        <div className="mt-20">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-white uppercase">
              PLAN COMPARISON MATRIX
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Direct breakdown of every facility privilege across all 3 tiers.
            </p>
          </div>

          <div className="overflow-x-auto bg-[#141418] border border-white/10 rounded-3xl shadow-xl">
            <table className="w-full text-left text-xs text-neutral-300">
              <thead className="bg-[#1c1c24] text-white text-[11px] font-bold uppercase tracking-wider border-b border-white/10">
                <tr>
                  <th className="p-4 sm:p-5">Facility & Benefit</th>
                  <th className="p-4 sm:p-5 text-center">Day Pass (₹499)</th>
                  <th className="p-4 sm:p-5 text-center text-[#ff5722]">Monthly Pass (₹2,499)</th>
                  <th className="p-4 sm:p-5 text-center">VIP Annual (₹1,699/mo)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { feature: "24/7 Access to Main Gym Floor", day: true, month: true, vip: true },
                  { feature: "Full Eleiko Olympic Barbell Platforms", day: true, month: true, vip: true },
                  { feature: "Unlimited Daily Group Fitness Classes", day: false, month: true, vip: true },
                  { feature: "Infrared Recovery Sauna Access", day: true, month: true, vip: true },
                  { feature: "Contrast Cold Plunge Immersion (48°F)", day: false, month: true, vip: true },
                  { feature: "Monthly Clinical InBody 770 Scan", day: false, month: true, vip: true },
                  { feature: "Monthly 1-on-1 Personal Training Session", day: false, month: false, vip: true },
                  { feature: "Free Guest Passes / Month", day: "None", month: "2 Passes", vip: "4 Passes" },
                  { feature: "Executive Permanent Locker & Laundry", day: false, month: false, vip: true },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-white">{row.feature}</td>
                    <td className="p-4 sm:p-5 text-center">
                      {typeof row.day === 'boolean' ? (
                        row.day ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <X className="w-4 h-4 text-neutral-600 mx-auto" />
                      ) : (
                        <span className="font-mono text-neutral-400">{row.day}</span>
                      )}
                    </td>
                    <td className="p-4 sm:p-5 text-center bg-[#ff5722]/5">
                      {typeof row.month === 'boolean' ? (
                        row.month ? <Check className="w-4 h-4 text-[#ff5722] mx-auto" /> : <X className="w-4 h-4 text-neutral-600 mx-auto" />
                      ) : (
                        <span className="font-bold text-[#ff5722]">{row.month}</span>
                      )}
                    </td>
                    <td className="p-4 sm:p-5 text-center">
                      {typeof row.vip === 'boolean' ? (
                        row.vip ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <X className="w-4 h-4 text-neutral-600 mx-auto" />
                      ) : (
                        <span className="font-bold text-white">{row.vip}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <div className="text-xs font-bold uppercase tracking-widest text-[#ff5722] font-heading">
              CLARITY FIRST
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-white uppercase mt-1">
              FREQUENTLY ASKED QUESTIONS
            </h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#141418] border border-white/10 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between text-sm sm:text-base font-bold text-white hover:text-[#ff5722] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 shrink-0 text-[#ff5722]" /> : <ChevronDown className="w-4 h-4 shrink-0 text-neutral-500" />}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-400 leading-relaxed border-t border-white/5 pt-3 animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Free Pass Banner */}
        <div className="mt-16 bg-[#181822] border border-[#ff5722]/30 rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-2xl">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#ff5722]/10 border border-[#ff5722]/30 text-xs font-bold text-[#ff5722]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Try Before You Decide</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
            NOT SURE WHICH PASS FITS YOU?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto">
            Test our facility for 24 hours at zero cost. Full platform access, sauna relaxation, and 1 coach consultation.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenFreeTrial('Complimentary 1-Day Trial Pass')}
              className="px-8 py-3.5 rounded-xl bg-[#ff5722] hover:bg-[#f4511e] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-[0_0_20px_rgba(255,87,34,0.4)] cursor-pointer"
            >
              Generate Free VIP 1-Day Pass
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
