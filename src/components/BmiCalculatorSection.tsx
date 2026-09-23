import React, { useState } from 'react';
import { Calculator, ArrowRight, Zap, Target, Flame, HeartPulse, Sparkles } from 'lucide-react';

interface BmiCalculatorSectionProps {
  onClaimRecommendedPlan: (planName: string) => void;
}

export const BmiCalculatorSection: React.FC<BmiCalculatorSectionProps> = ({ onClaimRecommendedPlan }) => {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  
  // Metric state
  const [heightCm, setHeightCm] = useState<number>(178);
  const [weightKg, setWeightKg] = useState<number>(76);
  
  // Imperial state
  const [heightInches, setHeightInches] = useState<number>(70); // 5ft 10in
  const [weightLbs, setWeightLbs] = useState<number>(168);

  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState<number>(1.55); // 1.2 = Sedentary, 1.375 = Light, 1.55 = Moderate, 1.725 = Very Active
  const [age, setAge] = useState<number>(28);

  // Compute BMI
  let bmi = 0;
  let weightInKg = weightKg;
  let heightInM = heightCm / 100;

  if (unit === 'metric') {
    bmi = weightKg / ((heightCm / 100) * (heightCm / 100));
    weightInKg = weightKg;
    heightInM = heightCm / 100;
  } else {
    bmi = (weightLbs / (heightInches * heightInches)) * 703;
    weightInKg = weightLbs * 0.453592;
    heightInM = (heightInches * 2.54) / 100;
  }

  const roundedBmi = parseFloat(bmi.toFixed(1));

  // Determine Category & Theme
  let category = 'Normal Weight';
  let categoryColor = 'text-emerald-400';
  let categoryBg = 'bg-emerald-500/10 border-emerald-500/30';
  let recommendation = 'Strength Periodization & Lean Hypertrophy';
  let suggestedClass = 'Barbell Power & Olympic Snatch';

  if (roundedBmi < 18.5) {
    category = 'Underweight';
    categoryColor = 'text-sky-400';
    categoryBg = 'bg-sky-500/10 border-sky-500/30';
    recommendation = 'Caloric Surplus & Heavy Progressive Hypertrophy';
    suggestedClass = 'Upper Body Hypertrophy Forge';
  } else if (roundedBmi >= 18.5 && roundedBmi <= 24.9) {
    category = 'Optimal Athletic Range';
    categoryColor = 'text-emerald-400';
    categoryBg = 'bg-emerald-500/10 border-emerald-500/30';
    recommendation = 'Functional Strength & High VO2 Max Conditioning';
    suggestedClass = 'High-Calorie MetCon Turf';
  } else if (roundedBmi >= 25 && roundedBmi <= 29.9) {
    category = 'Overweight / Heavy Musculature';
    categoryColor = 'text-amber-400';
    categoryBg = 'bg-amber-500/10 border-amber-500/30';
    recommendation = 'Targeted Body Recomposition & Metabolic Circuits';
    suggestedClass = 'Outdoor Spartan Bootcamp';
  } else {
    category = 'Elevated Body Mass';
    categoryColor = 'text-rose-400';
    categoryBg = 'bg-rose-500/10 border-rose-500/30';
    recommendation = 'Caloric Deficit, Low-Impact Cardio & Core Stability';
    suggestedClass = 'Functional Athletic Hyrox Prep';
  }

  // Calculate approximate BMR & TDEE (Mifflin-St Jeor)
  let bmr = 10 * weightInKg + 6.25 * (heightInM * 100) - 5 * age;
  bmr = gender === 'male' ? bmr + 5 : bmr - 161;
  const tdee = Math.round(bmr * activity);

  return (
    <section id="bmi" className="py-20 sm:py-28 bg-[#0b0b0d] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#ff5722] font-heading">
              BODY METRICS ENGINE
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight font-heading text-white mt-1">
              BMI & TDEE CALCULATOR
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
            Calculate your Basal Metabolic Rate and body mass index to calibrate exact daily caloric intake and training volume.
          </p>
        </div>

        {/* Interactive Calculator Card */}
        <div className="bg-[#141418] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Interactive Controls & Sliders */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Unit Toggle & Gender */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-white/10">
                
                {/* Metric / Imperial */}
                <div className="inline-flex p-1 rounded-xl bg-[#1c1c24] border border-white/10">
                  <button
                    onClick={() => setUnit('metric')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      unit === 'metric'
                        ? 'bg-[#ff5722] text-white'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Metric (cm / kg)
                  </button>
                  <button
                    onClick={() => setUnit('imperial')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      unit === 'imperial'
                        ? 'bg-[#ff5722] text-white'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Imperial (ft / lbs)
                  </button>
                </div>

                {/* Gender */}
                <div className="inline-flex p-1 rounded-xl bg-[#1c1c24] border border-white/10">
                  <button
                    onClick={() => setGender('male')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      gender === 'male'
                        ? 'bg-neutral-200 text-black'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => setGender('female')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      gender === 'female'
                        ? 'bg-neutral-200 text-black'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Female
                  </button>
                </div>

              </div>

              {/* Height Input Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-neutral-300">Height</span>
                  <span className="text-[#ff5722] font-mono text-sm font-bold">
                    {unit === 'metric' ? `${heightCm} cm` : `${Math.floor(heightInches / 12)}' ${heightInches % 12}" (${heightInches} in)`}
                  </span>
                </div>
                {unit === 'metric' ? (
                  <input
                    type="range"
                    min="130"
                    max="220"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full h-2 bg-[#20202a] rounded-lg appearance-none cursor-pointer accent-[#ff5722]"
                  />
                ) : (
                  <input
                    type="range"
                    min="50"
                    max="86"
                    value={heightInches}
                    onChange={(e) => setHeightInches(Number(e.target.value))}
                    className="w-full h-2 bg-[#20202a] rounded-lg appearance-none cursor-pointer accent-[#ff5722]"
                  />
                )}
              </div>

              {/* Weight Input Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-neutral-300">Weight</span>
                  <span className="text-[#ff5722] font-mono text-sm font-bold">
                    {unit === 'metric' ? `${weightKg} kg` : `${weightLbs} lbs`}
                  </span>
                </div>
                {unit === 'metric' ? (
                  <input
                    type="range"
                    min="40"
                    max="160"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full h-2 bg-[#20202a] rounded-lg appearance-none cursor-pointer accent-[#ff5722]"
                  />
                ) : (
                  <input
                    type="range"
                    min="90"
                    max="350"
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(Number(e.target.value))}
                    className="w-full h-2 bg-[#20202a] rounded-lg appearance-none cursor-pointer accent-[#ff5722]"
                  />
                )}
              </div>

              {/* Age & Activity Level Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Age */}
                <div className="space-y-1.5">
                  <label className="text-xs text-neutral-300 font-semibold block">Age (Years)</label>
                  <input
                    type="number"
                    min="15"
                    max="85"
                    value={age}
                    onChange={(e) => setAge(Math.max(15, Math.min(85, Number(e.target.value))))}
                    className="w-full bg-[#1c1c24] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:border-[#ff5722] focus:outline-none"
                  />
                </div>

                {/* Activity Level */}
                <div className="space-y-1.5">
                  <label className="text-xs text-neutral-300 font-semibold block">Training Cadence</label>
                  <select
                    value={activity}
                    onChange={(e) => setActivity(Number(e.target.value))}
                    className="w-full bg-[#1c1c24] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:border-[#ff5722] focus:outline-none"
                  >
                    <option value={1.2}>Sedentary (Desk Job)</option>
                    <option value={1.375}>Light (1-2 workouts/wk)</option>
                    <option value={1.55}>Moderate (3-5 workouts/wk)</option>
                    <option value={1.725}>Very Active (6+ workouts/wk)</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Right: Dynamic BMI Gauge & Energy Output */}
            <div className="lg:col-span-5 bg-[#181820] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between">
              
              {/* BMI Score Display */}
              <div className="text-center">
                <div className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                  Calculated BMI
                </div>
                <div className="text-5xl sm:text-6xl font-black font-heading text-white tracking-tight mt-1">
                  {roundedBmi}
                </div>
                <div className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-bold border ${categoryBg} ${categoryColor}`}>
                  {category}
                </div>
              </div>

              {/* Visual Scale Bar */}
              <div className="space-y-1.5">
                <div className="h-3 w-full rounded-full bg-gradient-to-r from-sky-500 via-emerald-500 via-amber-500 to-rose-500 relative overflow-hidden">
                  {/* Position pointer */}
                  <div
                    className="absolute top-0 bottom-0 w-1.5 bg-white shadow-[0_0_8px_white]"
                    style={{
                      left: `${Math.max(5, Math.min(95, ((roundedBmi - 15) / 25) * 100))}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                  <span>18.5 Under</span>
                  <span>25 Normal</span>
                  <span>30 Over</span>
                  <span>35+</span>
                </div>
              </div>

              {/* TDEE Daily Caloric Targets */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-[#121216] p-3 rounded-xl border border-white/5 text-center">
                  <div className="text-[11px] text-neutral-400">Maintenance TDEE</div>
                  <div className="text-xl font-bold font-heading text-white mt-0.5">
                    {tdee} <span className="text-xs font-normal text-neutral-400">kcal/d</span>
                  </div>
                </div>

                <div className="bg-[#121216] p-3 rounded-xl border border-white/5 text-center">
                  <div className="text-[11px] text-neutral-400">Fat Loss Deficit</div>
                  <div className="text-xl font-bold font-heading text-[#ff5722] mt-0.5">
                    {tdee - 450} <span className="text-xs font-normal text-neutral-400">kcal/d</span>
                  </div>
                </div>
              </div>

              {/* Recommendation Callout */}
              <div className="bg-[#20202a] p-3.5 rounded-xl border border-white/10 text-xs text-neutral-300">
                <span className="font-bold text-white block mb-0.5">Recommended GYM Focus:</span>
                {recommendation}. Matching class: <strong className="text-[#ff5722]">{suggestedClass}</strong>.
              </div>

              <button
                onClick={() => onClaimRecommendedPlan(suggestedClass)}
                className="w-full py-3 rounded-xl bg-[#ff5722] hover:bg-[#f4511e] text-white text-xs sm:text-sm font-bold transition-all shadow-lg hover:shadow-[0_0_20px_rgba(255,87,34,0.4)] flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Book First Assessment Session</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
