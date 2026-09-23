import React from 'react';
import { 
  User, 
  Calendar, 
  Dumbbell, 
  Award, 
  Clock, 
  Trash2, 
  QrCode, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  MapPin,
  TrendingUp
} from 'lucide-react';
import { BookedClass, AppPage } from '../types';

interface MemberProfilePageProps {
  onNavigate: (page: AppPage) => void;
  bookedClasses: BookedClass[];
  onCancelBooking: (id: string) => void;
  onOpenFreeTrial: (goal?: string) => void;
}

export const MemberProfilePage: React.FC<MemberProfilePageProps> = ({
  onNavigate,
  bookedClasses,
  onCancelBooking,
  onOpenFreeTrial,
}) => {
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
          <span className="text-[#ff5722]">Athlete Member Hub</span>
        </div>

        {/* Member Profile Header */}
        <div className="bg-[#141418] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-[#ff5722]/10 blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center space-x-5">
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-neutral-800 border-2 border-white/20 overflow-hidden flex items-center justify-center text-white shadow-xl">
                  <User className="w-10 h-10 text-neutral-300" />
                </div>
                <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#141418] shadow" />
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl sm:text-3xl font-black font-heading text-white">
                    Athlete Portal
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ff5722]/20 border border-[#ff5722]/40 text-[#ff5722] text-[10px] font-bold uppercase tracking-wider">
                    VIP All-Access
                  </span>
                </div>
                <p className="text-xs text-neutral-400 mt-1">
                  Pass ID: <span className="font-mono text-white font-bold">#GYM-88241-VIP</span> • Member since Jan 2026
                </p>
                <div className="flex items-center space-x-4 mt-3 text-xs text-neutral-300">
                  <span className="flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Locker Assigned: #14B</span>
                  </span>
                  <span>•</span>
                  <span>InBody Status: <strong className="text-emerald-400">Optimal</strong></span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('schedule')}
                className="px-5 py-2.5 rounded-xl bg-[#ff5722] hover:bg-[#f4511e] text-white text-xs font-bold transition-all shadow-lg flex items-center space-x-1.5 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book New Session</span>
              </button>
              <button
                onClick={() => onOpenFreeTrial('Guest Pass Generation')}
                className="px-4 py-2.5 rounded-xl bg-[#1c1c24] hover:bg-[#252530] text-neutral-200 text-xs font-bold transition-all border border-white/10 flex items-center space-x-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#ff5722]" />
                <span>Invite Guest</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Stat Metric Badges */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#141418] border border-white/10 rounded-2xl p-5 shadow-lg">
            <div className="text-[11px] text-neutral-400 font-semibold uppercase">Reserved Classes</div>
            <div className="text-3xl font-black font-heading text-white mt-1">
              {bookedClasses.length}
            </div>
            <div className="text-[10px] text-emerald-400 mt-1">Confirmed & on timetable</div>
          </div>

          <div className="bg-[#141418] border border-white/10 rounded-2xl p-5 shadow-lg">
            <div className="text-[11px] text-neutral-400 font-semibold uppercase">Workouts Logged</div>
            <div className="text-3xl font-black font-heading text-white mt-1">
              38
            </div>
            <div className="text-[10px] text-neutral-400 mt-1">This month: +14 sessions</div>
          </div>

          <div className="bg-[#141418] border border-white/10 rounded-2xl p-5 shadow-lg">
            <div className="text-[11px] text-neutral-400 font-semibold uppercase">Recovery Sessions</div>
            <div className="text-3xl font-black font-heading text-white mt-1">
              12
            </div>
            <div className="text-[10px] text-neutral-400 mt-1">Sauna & Cold Plunge</div>
          </div>

          <div className="bg-[#141418] border border-white/10 rounded-2xl p-5 shadow-lg">
            <div className="text-[11px] text-neutral-400 font-semibold uppercase">Barbell PR Total</div>
            <div className="text-3xl font-black font-heading text-[#ff5722] mt-1">
              465 <span className="text-xs text-neutral-400">kg</span>
            </div>
            <div className="text-[10px] text-emerald-400 mt-1">+15kg improvement</div>
          </div>
        </div>

        {/* Upcoming Reserved Classes Section */}
        <div className="mt-10 bg-[#141418] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-heading text-white uppercase">
                My Upcoming Reserved Sessions
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Check in at the digital turnstile 10 minutes prior to session start.
              </p>
            </div>
            <span className="text-xs font-mono text-[#ff5722] font-bold">
              {bookedClasses.length} Scheduled
            </span>
          </div>

          {bookedClasses.length > 0 ? (
            <div className="mt-6 space-y-4">
              {bookedClasses.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#1c1c24] border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start sm:items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-[#ff5722]/10 border border-[#ff5722]/30 flex items-center justify-center text-[#ff5722] shrink-0">
                      <Dumbbell className="w-6 h-6" />
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-base font-extrabold font-heading text-white">
                          {item.classTitle}
                        </h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          Confirmed
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 mt-1">
                        <span className="flex items-center space-x-1 text-white">
                          <Calendar className="w-3.5 h-3.5 text-[#ff5722]" />
                          <span>{item.day}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5 text-neutral-400" />
                          <span>{item.time}</span>
                        </span>
                        <span>•</span>
                        <span>Coach: <strong className="text-white">{item.coach}</strong></span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3 text-[#ff5722]" />
                          <span>{item.room}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onCancelBooking(item.id)}
                    className="self-end sm:self-center px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold transition-colors flex items-center space-x-1.5 border border-red-500/20 cursor-pointer"
                    title="Cancel reservation"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Cancel Spot</span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-8 text-center py-12 bg-[#1c1c24] rounded-2xl border border-white/5">
              <Calendar className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
              <h4 className="text-base font-bold text-white">No active class reservations yet</h4>
              <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
                Explore our daily schedule to reserve your spot for Barbell Power, MetCon Turf, or Boxing.
              </p>
              <button
                onClick={() => onNavigate('schedule')}
                className="mt-4 px-5 py-2.5 rounded-xl bg-[#ff5722] hover:bg-[#f4511e] text-white text-xs font-bold transition-all shadow-lg cursor-pointer"
              >
                Browse Weekly Schedule
              </button>
            </div>
          )}
        </div>

        {/* Digital Wallet Pass & Facility QR */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Digital Badge */}
          <div className="bg-gradient-to-br from-[#1c1c24] to-[#121216] border border-white/10 rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-black font-heading text-white">GYM</span>
                  <span className="w-2 h-2 rounded-full bg-[#ff5722]" />
                </div>
                <span className="text-[10px] font-mono text-neutral-400">DIGITAL NFC PASS</span>
              </div>

              <div className="mt-8 p-4 bg-white rounded-2xl flex items-center justify-center max-w-[160px] mx-auto shadow-xl">
                {/* Visual QR representation */}
                <QrCode className="w-32 h-32 text-black" />
              </div>

              <div className="mt-6 text-center">
                <div className="text-xs font-bold text-white">SCAN AT ENTRANCE GATES</div>
                <div className="text-[11px] font-mono text-neutral-400 mt-0.5">TAP TO SYNC WITH APPLE / GOOGLE WALLET</div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400">
              <span>Facility Key: ACTIVE</span>
              <span className="text-emerald-400 font-bold">24/7 UNRESTRICTED</span>
            </div>
          </div>

          {/* Personal Records Track */}
          <div className="lg:col-span-2 bg-[#141418] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg sm:text-xl font-black font-heading text-white uppercase flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-[#ff5722]" />
                <span>Verified Biomechanical Benchmarks</span>
              </h3>
              <span className="text-xs text-neutral-400">Tested bi-weekly</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-[#1c1c24] border border-white/5 space-y-1">
                <div className="text-[10px] text-neutral-500 uppercase font-bold">Back Squat (1RM)</div>
                <div className="text-2xl font-black font-heading text-white">180 kg</div>
                <div className="text-[10px] text-emerald-400 font-medium">96th percentile</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#1c1c24] border border-white/5 space-y-1">
                <div className="text-[10px] text-neutral-500 uppercase font-bold">Deadlift (1RM)</div>
                <div className="text-2xl font-black font-heading text-white">225 kg</div>
                <div className="text-[10px] text-emerald-400 font-medium">+10kg last cycle</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#1c1c24] border border-white/5 space-y-1">
                <div className="text-[10px] text-neutral-500 uppercase font-bold">Bench Press (1RM)</div>
                <div className="text-2xl font-black font-heading text-white">135 kg</div>
                <div className="text-[10px] text-emerald-400 font-medium">Symmetric bar path</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#1c1c24] border border-white/5 space-y-1">
                <div className="text-[10px] text-neutral-500 uppercase font-bold">500m Row Split</div>
                <div className="text-2xl font-black font-heading text-[#ff5722]">1:24.2</div>
                <div className="text-[10px] text-neutral-400 font-medium">Concept2 verified</div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs text-neutral-400">
                Next coach assessment & InBody 770 scan scheduled for <strong>Wednesday at 10:00 AM</strong>.
              </p>
              <button
                onClick={() => onNavigate('coaches')}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all whitespace-nowrap cursor-pointer"
              >
                Schedule Coach Check-in
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
