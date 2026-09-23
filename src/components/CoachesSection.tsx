import React, { useState } from 'react';
import { ArrowUpRight, Star, Award, Calendar, Check, ExternalLink } from 'lucide-react';
import { COACHES } from '../data/gymData';
import { Coach } from '../types';

interface CoachesSectionProps {
  onBookCoach: (coach: Coach) => void;
}

export const CoachesSection: React.FC<CoachesSectionProps> = ({ onBookCoach }) => {
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);

  return (
    <section id="coaches" className="py-20 sm:py-28 bg-[#0c0c0e] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Mentor Header Banner (Matching Screenshot Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 sm:mb-20">
          
          {/* Left: Dual Action Photos (Runner in sportswear & barbell/treadmill action) */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="relative h-64 sm:h-80 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 group shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=600&auto=format&fit=crop"
                alt="Trainer coaching outdoor running sprint"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-semibold text-white border border-white/10">
                Track & Speed
              </div>
            </div>

            <div className="relative h-64 sm:h-80 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 group shadow-xl mt-6">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop"
                alt="Athletes conditioning together in gym"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-semibold text-white border border-white/10">
                Biomechanics Lab
              </div>
            </div>
          </div>

          {/* Right: Copy & Explore Button (Matching Screenshot) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-neutral-400 font-heading">
                ARE YOU LOOKING FOR A MENTOR?
              </div>
              <h2 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight font-heading text-white mt-1">
                COACHES
              </h2>
            </div>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl">
              Our training cadre doesn't hand out cookie-cutter printouts. Every coach is credentialed in progressive overload periodization, kinematic movement screening, and Olympic barbell mechanics. We optimize your form so every rep counts.
            </p>

            <div className="pt-2">
              <a
                href="#schedule"
                className="inline-flex items-center space-x-2 bg-[#ff5722] hover:bg-[#f4511e] text-white text-xs sm:text-sm font-bold px-7 py-3 rounded-full transition-all duration-300 hover:shadow-[0_0_24px_rgba(255,87,34,0.4)] active:scale-95 group/btn"
              >
                <span>View Full Roster</span>
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

        </div>

        {/* Individual Coach Profile Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COACHES.map((coach) => (
            <div
              key={coach.id}
              className="bg-[#131317] rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden group hover:border-[#ff5722]/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between"
            >
              {/* Photo */}
              <div className="relative h-64 w-full overflow-hidden bg-neutral-900">
                <img
                  src={coach.photo}
                  alt={coach.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131317] via-[#131317]/20 to-transparent" />
                
                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-amber-400 border border-white/10 flex items-center space-x-1">
                  <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                  <span>{coach.rating}</span>
                </div>

                {/* Experience Tag */}
                <div className="absolute bottom-3 left-3 bg-[#ff5722]/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] font-bold text-white uppercase tracking-wider">
                  {coach.experience}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold font-heading text-white group-hover:text-[#ff5722] transition-colors">
                    {coach.name}
                  </h3>
                  <p className="text-xs text-[#ff5722] font-semibold mt-0.5">
                    {coach.role}
                  </p>
                  <p className="text-xs text-neutral-400 mt-2 line-clamp-2">
                    {coach.specialty}
                  </p>
                </div>

                {/* Certifications preview */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <div className="flex flex-wrap gap-1.5">
                    {coach.certifications.slice(0, 2).map((cert, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedCoach(coach)}
                    className="w-full mt-2 py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-[#ff5722] text-neutral-200 hover:text-white text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 group/link"
                  >
                    <span>Coach Profile & Bio</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Coach Detail Modal */}
      {selectedCoach && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedCoach(null)}
        >
          <div
            className="bg-[#141418] border border-white/15 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Coach Banner */}
            <div className="relative h-56 w-full">
              <img
                src={selectedCoach.actionPhoto}
                alt={selectedCoach.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-[#141418]/60 to-transparent" />
              <button
                onClick={() => setSelectedCoach(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 hover:bg-[#ff5722] text-white flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className="absolute bottom-4 left-6 flex items-end space-x-4">
                <img
                  src={selectedCoach.photo}
                  alt={selectedCoach.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#ff5722] shadow-xl"
                />
                <div>
                  <h3 className="text-2xl font-bold font-heading text-white">
                    {selectedCoach.name}
                  </h3>
                  <p className="text-xs text-[#ff5722] font-semibold">
                    {selectedCoach.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Coach Details */}
            <div className="p-6 space-y-5">
              <p className="text-sm text-neutral-300 leading-relaxed">
                {selectedCoach.bio}
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-[#1b1b22] p-3 rounded-xl border border-white/5">
                  <div className="text-lg font-bold text-white font-heading">{selectedCoach.experience}</div>
                  <div className="text-[11px] text-neutral-400">Coaching</div>
                </div>
                <div className="bg-[#1b1b22] p-3 rounded-xl border border-white/5">
                  <div className="text-lg font-bold text-amber-400 font-heading">★ {selectedCoach.rating}</div>
                  <div className="text-[11px] text-neutral-400">Client Score</div>
                </div>
                <div className="bg-[#1b1b22] p-3 rounded-xl border border-white/5">
                  <div className="text-lg font-bold text-white font-heading">{selectedCoach.clientCount}+</div>
                  <div className="text-[11px] text-neutral-400">Transformed</div>
                </div>
              </div>

              {/* Certifications list */}
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                  Verified Certifications:
                </div>
                <div className="space-y-1.5">
                  {selectedCoach.certifications.map((cert, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs text-neutral-300">
                      <Check className="w-4 h-4 text-[#ff5722]" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center space-x-3">
                <button
                  onClick={() => {
                    const c = selectedCoach;
                    setSelectedCoach(null);
                    onBookCoach(c);
                  }}
                  className="flex-1 bg-[#ff5722] hover:bg-[#f4511e] text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-[0_0_20px_rgba(255,87,34,0.4)] flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Consultation with {selectedCoach.name.split(' ')[0]}</span>
                </button>
                <button
                  onClick={() => setSelectedCoach(null)}
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
