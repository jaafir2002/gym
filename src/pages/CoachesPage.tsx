import React, { useState } from 'react';
import { 
  Award, 
  Star, 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck,
  ChevronRight,
  Flame
} from 'lucide-react';
import { COACHES } from '../data/gymData';
import { Coach, AppPage } from '../types';

interface CoachesPageProps {
  onNavigate: (page: AppPage) => void;
  onBookCoach: (coach: Coach) => void;
  onOpenFreeTrial: (goal?: string) => void;
}

export const CoachesPage: React.FC<CoachesPageProps> = ({
  onNavigate,
  onBookCoach,
  onOpenFreeTrial,
}) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');

  const specialties = ['All', 'Olympic Lifting', 'Metabolic Conditioning', 'Hypertrophy', 'Functional Mobility'];

  const filteredCoaches = COACHES.filter((coach) => {
    if (selectedSpecialty === 'All') return true;
    if (selectedSpecialty === 'Olympic Lifting') return coach.specialty.toLowerCase().includes('snatch') || coach.specialty.toLowerCase().includes('powerlifting');
    if (selectedSpecialty === 'Metabolic Conditioning') return coach.specialty.toLowerCase().includes('hiit') || coach.specialty.toLowerCase().includes('vo2');
    if (selectedSpecialty === 'Hypertrophy') return coach.specialty.toLowerCase().includes('hypertrophy');
    if (selectedSpecialty === 'Functional Mobility') return coach.specialty.toLowerCase().includes('mobility') || coach.specialty.toLowerCase().includes('fascial');
    return true;
  });

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
          <span className="text-[#ff5722]">Elite Mentors & Coaches</span>
        </div>

        {/* Page Hero Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#ff5722] font-heading">
              ARE YOU LOOKING FOR A MENTOR?
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight font-heading text-white mt-1">
              WORLD-CLASS COACHES
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
            Every GYM instructor is an active competitive athlete with collegiate or international credentials. No generic gym floor supervisors — true master practitioners.
          </p>
        </div>

        {/* Specialties Filter Bar */}
        <div className="mt-8 flex flex-wrap items-center gap-2 pb-4">
          <span className="text-xs text-neutral-400 font-semibold mr-2">Discipline Filter:</span>
          {specialties.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedSpecialty === spec
                  ? 'bg-[#ff5722] text-white shadow-[0_0_15px_rgba(255,87,34,0.4)]'
                  : 'bg-[#141418] text-neutral-400 hover:text-white border border-white/10'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>

        {/* Coaches Cards Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCoaches.map((coach) => (
            <div
              key={coach.id}
              className="bg-[#141418] border border-white/10 rounded-3xl overflow-hidden hover:border-[#ff5722]/50 transition-all duration-300 shadow-2xl flex flex-col justify-between"
            >
              <div>
                {/* Visual Header with Action Photo + Floating Portrait */}
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <img
                    src={coach.actionPhoto}
                    alt={`${coach.name} in action`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-[#141418]/40 to-transparent" />

                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center space-x-1.5 text-xs font-bold text-white">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{coach.rating}</span>
                    <span className="text-neutral-400 font-normal">({coach.clientCount}+ Athletes)</span>
                  </div>

                  {/* Experience Badge */}
                  <div className="absolute top-4 left-4 bg-[#ff5722] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                    {coach.experience} Experience
                  </div>

                  {/* Coach Avatar Overlay */}
                  <div className="absolute -bottom-2 left-6 flex items-end space-x-4">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-3 border-[#141418] shadow-2xl shrink-0 bg-neutral-900">
                      <img
                        src={coach.photo}
                        alt={coach.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-6 sm:p-8 pt-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                        {coach.name}
                      </h3>
                      <div className="text-xs sm:text-sm font-bold text-[#ff5722] mt-0.5">
                        {coach.role}
                      </div>
                    </div>

                    <div className="text-xs text-neutral-400 font-medium">
                      Training Days: <strong className="text-white">{coach.scheduleDay}</strong>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mt-4">
                    {coach.bio}
                  </p>

                  {/* Specialty Box */}
                  <div className="mt-5 p-3.5 rounded-2xl bg-[#1c1c24] border border-white/5 space-y-1">
                    <div className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">
                      Biomechanical Specialty
                    </div>
                    <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                      <Flame className="w-3.5 h-3.5 text-[#ff5722]" />
                      <span>{coach.specialty}</span>
                    </div>
                  </div>

                  {/* Certifications Badges */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {coach.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="px-2.5 py-1 rounded-lg bg-[#20202c] border border-white/10 text-[11px] font-semibold text-neutral-300 flex items-center space-x-1"
                      >
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        <span>{cert}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 sm:p-8 pt-0 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onBookCoach(coach)}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#ff5722] hover:bg-[#f4511e] text-white text-xs sm:text-sm font-bold transition-all shadow-lg hover:shadow-[0_0_20px_rgba(255,87,34,0.4)] flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Book 1-on-1 Consultation</span>
                </button>

                <button
                  onClick={() => onNavigate('schedule')}
                  className="py-3 px-5 rounded-xl bg-[#1c1c24] hover:bg-[#252530] text-neutral-300 hover:text-white text-xs sm:text-sm font-bold transition-all border border-white/10 flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <span>View Sessions</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Coaching Philosophy Callout */}
        <div className="mt-16 bg-[#141418] border border-white/10 rounded-3xl p-8 sm:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#ff5722]/10 border border-[#ff5722]/30 flex items-center justify-center text-[#ff5722]">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white font-heading">Zero Ego Coaching</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                We calibrate intensity based on your connective tissue readiness and movement screening, never arbitrary ego lifts.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#ff5722]/10 border border-[#ff5722]/30 flex items-center justify-center text-[#ff5722]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white font-heading">Continuous Video Review</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                High-speed 120fps camera analysis for bar path velocity, lumbar stability, and knee tracking on all compound lifts.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#ff5722]/10 border border-[#ff5722]/30 flex items-center justify-center text-[#ff5722]">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white font-heading">Dedicated Accountability</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Direct WhatsApp or coach messaging access between sessions for quick form questions, macro check-ins, and rest day guidance.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
