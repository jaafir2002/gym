import React, { useState } from 'react';
import { X, Check, QrCode, Calendar, Clock, Sparkles, ShieldCheck, Download, UserCheck } from 'lucide-react';
import { TrialBooking } from '../types';

interface FreeTrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledGoal?: string;
  onSuccess: (booking: TrialBooking) => void;
}

export const FreeTrialModal: React.FC<FreeTrialModalProps> = ({
  isOpen,
  onClose,
  prefilledGoal,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<TrialBooking>({
    fullName: '',
    email: '',
    phone: '',
    goal: prefilledGoal || 'Hypertrophy & Muscle Building',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
    timeSlot: '07:00 AM - Morning Prime',
  });

  const [generatedPass, setGeneratedPass] = useState<TrialBooking | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg('Please fill in your name, email, and phone number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    setTimeout(() => {
      const passId = `VIP-${Math.floor(100000 + Math.random() * 900000)}`;
      const completedBooking = { ...formData, passId };
      setGeneratedPass(completedBooking);
      setIsSubmitting(false);
      onSuccess(completedBooking);
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#141418] border border-white/15 rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-neutral-800 hover:bg-[#ff5722] text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {!generatedPass ? (
          /* Signup Form */
          <div>
            <div className="flex items-center space-x-2 text-[#ff5722] text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Complimentary Access</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight">
              CLAIM VIP 1-DAY PASS
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Enjoy full access to Olympic platforms, recovery saunas, and 1 group training session of your choice.
            </p>

            {errorMsg && (
              <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Henderson"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-[#1c1c24] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-[#ff5722] focus:outline-none"
                />
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#1c1c24] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-[#ff5722] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#1c1c24] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-[#ff5722] focus:outline-none"
                  />
                </div>
              </div>

              {/* Fitness Goal */}
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  Primary Fitness Ambition
                </label>
                <select
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  className="w-full bg-[#1c1c24] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#ff5722] focus:outline-none"
                >
                  <option value="Hypertrophy & Muscle Building">Hypertrophy & Heavy Muscle Building</option>
                  <option value="Fat Loss & Body Recomposition">Fat Loss & Athletic Body Recomposition</option>
                  <option value="Olympic Weightlifting & Power">Olympic Weightlifting & Powerlifting</option>
                  <option value="High-Speed Metabolic Conditioning">High-Speed Metabolic Conditioning & VO2 Max</option>
                  <option value="Functional Mobility & Joint Longevity">Functional Mobility & Joint Longevity</option>
                </select>
              </div>

              {/* Target Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    First Visit Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#1c1c24] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#ff5722] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full bg-[#1c1c24] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#ff5722] focus:outline-none"
                  >
                    <option value="07:00 AM - Morning Prime">07:00 AM - Morning Prime</option>
                    <option value="12:00 PM - Midday Session">12:00 PM - Midday Session</option>
                    <option value="05:30 PM - Evening High-Energy">05:30 PM - Evening High-Energy</option>
                    <option value="08:00 PM - Night Lift">08:00 PM - Night Lift</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#ff5722] hover:bg-[#f4511e] text-white text-sm font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-[0_0_20px_rgba(255,87,34,0.4)] flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Generating Official Pass...</span>
                  ) : (
                    <>
                      <span>Generate VIP Day Pass</span>
                      <Sparkles className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-center text-[11px] text-neutral-500 pt-1">
                Zero credit card required. Show this pass on your phone upon arrival.
              </div>

            </form>
          </div>
        ) : (
          /* Pass Success View (Digital Membership Badge) */
          <div className="text-center py-2 space-y-5 animate-in zoom-in-95 duration-200">
            
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                VIP Pass Activated
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-heading text-white mt-0.5">
                WELCOME, {generatedPass.fullName.toUpperCase()}
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                A confirmation copy has been dispatched to {generatedPass.email}.
              </p>
            </div>

            {/* Rendered Digital Pass Card */}
            <div className="bg-[#ff5722] rounded-2xl p-6 text-white text-left relative overflow-hidden shadow-2xl">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[10px] font-black tracking-widest uppercase opacity-80">
                    GYM FITNESS • VIP ACCESS
                  </div>
                  <div className="text-2xl font-black font-heading tracking-tight mt-0.5">
                    1-DAY PASS
                  </div>
                </div>
                <div className="bg-black/80 px-2.5 py-1 rounded text-[11px] font-mono font-bold">
                  {generatedPass.passId}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-[10px] opacity-75 uppercase">Athlete</div>
                  <div className="font-bold truncate">{generatedPass.fullName}</div>
                </div>
                <div>
                  <div className="text-[10px] opacity-75 uppercase">Target Date</div>
                  <div className="font-bold">{generatedPass.date}</div>
                </div>
                <div>
                  <div className="text-[10px] opacity-75 uppercase">Time Slot</div>
                  <div className="font-bold truncate">{generatedPass.timeSlot.split(' - ')[0]}</div>
                </div>
                <div>
                  <div className="text-[10px] opacity-75 uppercase">Focus Goal</div>
                  <div className="font-bold truncate">{generatedPass.goal.split(' ')[0]}</div>
                </div>
              </div>

              {/* Simulated QR Code Bar */}
              <div className="mt-5 pt-3 border-t border-white/20 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-[11px] font-semibold">
                  <QrCode className="w-6 h-6" />
                  <span>Scan at Front Desk</span>
                </div>
                <span className="text-[10px] opacity-80">Valid 48h from issue</span>
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={() => {
                  alert(`Pass ${generatedPass.passId} saved to your device wallet!`);
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-[#20202a] hover:bg-[#282836] text-white text-xs font-bold transition-all flex items-center justify-center space-x-2 border border-white/10"
              >
                <Download className="w-4 h-4" />
                <span>Save to Wallet</span>
              </button>

              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-bold transition-all"
              >
                Done
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
