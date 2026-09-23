import React, { useState } from 'react';
import { 
  Dumbbell, 
  Flame, 
  Clock, 
  Users, 
  Search, 
  Filter, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  ShieldCheck,
  Calendar,
  X
} from 'lucide-react';
import { SCHEDULE_ITEMS, FEATURED_CLASSES } from '../data/gymData';
import { ClassItem, AppPage } from '../types';

interface ClassesPageProps {
  onNavigate: (page: AppPage) => void;
  onBookClass: (className: string) => void;
  onOpenFreeTrial: (goal?: string) => void;
}

export const ClassesPage: React.FC<ClassesPageProps> = ({
  onNavigate,
  onBookClass,
  onOpenFreeTrial,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedIntensity, setSelectedIntensity] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalClass, setActiveModalClass] = useState<ClassItem | null>(null);

  const categories = ['All', 'Strength', 'HIIT', 'Boxing', 'Mobility', 'Cardio'];
  const intensities = ['All', 'Medium', 'High', 'Extreme'];

  // Combine unique classes from SCHEDULE_ITEMS
  const uniqueClassesMap = new Map<string, ClassItem>();
  SCHEDULE_ITEMS.forEach((item: ClassItem) => {
    if (!uniqueClassesMap.has(item.title)) {
      uniqueClassesMap.set(item.title, item);
    }
  });
  const allUniqueClasses = Array.from(uniqueClassesMap.values());

  const filteredClasses = allUniqueClasses.filter((item: ClassItem) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesIntensity = selectedIntensity === 'All' || item.intensity === selectedIntensity;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.coach.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesIntensity && matchesSearch;
  });

  return (
    <div className="pt-28 pb-24 bg-[#0c0c0e] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center space-x-2 text-xs font-semibold text-neutral-400 mb-4">
          <button 
            onClick={() => onNavigate('home')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#ff5722]">Classes & Training Disciplines</span>
        </div>

        {/* Page Hero Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#ff5722] font-heading">
              WORLD-CLASS CURRICULUM
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight font-heading text-white mt-1">
              GYM CLASSES & DISCIPLINES
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
            From high-velocity barbell Olympic lifting to metabolic turf intervals. Coached by certified strength athletes with real-time biometric tracking.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-8 bg-[#141418] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search class title, coach, or workout..."
                className="w-full bg-[#1c1c24] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#ff5722]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Chips */}
            <div className="md:col-span-7 flex flex-wrap items-center gap-2">
              <span className="text-xs text-neutral-400 font-semibold mr-1 flex items-center">
                <Filter className="w-3 h-3 mr-1 text-[#ff5722]" /> Category:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#ff5722] text-white shadow-[0_0_12px_rgba(255,87,34,0.4)]'
                      : 'bg-[#1c1c24] text-neutral-400 hover:text-white hover:bg-[#252530]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>

          {/* Secondary Intensity Filter */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/5 text-xs text-neutral-400">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-neutral-300">Intensity Level:</span>
              {intensities.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedIntensity(lvl)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                    selectedIntensity === lvl
                      ? 'bg-neutral-200 text-black'
                      : 'bg-neutral-800/80 text-neutral-400 hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            <div>
              Showing <strong className="text-white">{filteredClasses.length}</strong> training sessions
            </div>
          </div>
        </div>

        {/* Classes Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredClasses.map((item) => (
            <div
              key={item.id}
              className="bg-[#141418] border border-white/10 rounded-3xl overflow-hidden hover:border-[#ff5722]/50 transition-all duration-300 group flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Class Image & Overlay Badges */}
                <div className="relative h-52 sm:h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-[#141418]/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center space-x-2">
                    <span className="bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-white uppercase tracking-wider border border-white/10">
                      {item.category}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      item.intensity === 'Extreme' ? 'bg-red-500/80 text-white' :
                      item.intensity === 'High' ? 'bg-amber-500/80 text-white' :
                      'bg-emerald-500/80 text-white'
                    }`}>
                      {item.intensity}
                    </span>
                  </div>

                  {/* Duration Pill */}
                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-semibold text-neutral-300 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-[#ff5722]" />
                    <span>{item.duration}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-extrabold font-heading text-white group-hover:text-[#ff5722] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Coach & Location info */}
                  <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2.5">
                      <img
                        src={item.coachPhoto}
                        alt={item.coach}
                        className="w-8 h-8 rounded-full object-cover border border-white/20"
                      />
                      <div>
                        <div className="text-[10px] text-neutral-500 uppercase font-semibold">Coach</div>
                        <div className="font-bold text-white">{item.coach}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] text-neutral-500 uppercase font-semibold">Location</div>
                      <div className="font-medium text-neutral-300">{item.room}</div>
                    </div>
                  </div>

                  {/* Spots indicator */}
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-neutral-400">Class Availability:</span>
                    <span className="text-[#ff5722] font-semibold font-mono">
                      {item.spotsLeft} spots available
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex items-center space-x-3">
                <button
                  onClick={() => setActiveModalClass(item)}
                  className="flex-1 py-2.5 rounded-xl bg-[#1f1f28] hover:bg-[#282836] text-neutral-200 text-xs font-bold transition-all text-center border border-white/10 cursor-pointer"
                >
                  View Curriculum
                </button>
                <button
                  onClick={() => onBookClass(item.title)}
                  className="flex-1 py-2.5 rounded-xl bg-[#ff5722] hover:bg-[#f4511e] text-white text-xs font-bold transition-all shadow-lg hover:shadow-[0_0_15px_rgba(255,87,34,0.4)] flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>Book Spot</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Empty state if filtered to 0 */}
        {filteredClasses.length === 0 && (
          <div className="mt-12 text-center py-16 bg-[#141418] rounded-3xl border border-white/10">
            <Dumbbell className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No classes matched your criteria</h3>
            <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
              Try changing your search keywords or reset the category filter to view all available workout disciplines.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedIntensity('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#ff5722] text-white text-xs font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom Banner: Jump to Timetable or Claim Pass */}
        <div className="mt-16 bg-gradient-to-r from-[#181822] via-[#1c1c28] to-[#181822] border border-white/15 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ff5722]">
              NEED A SPECIFIC TIME SLOT?
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-white">
              EXPLORE OUR 7-DAY LIVE SCHEDULE
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-lg">
              Check morning, midday, and evening training windows across Monday through Sunday. Reserve your slot up to 7 days in advance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('schedule')}
              className="px-6 py-3 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs sm:text-sm font-bold transition-all shadow-lg flex items-center space-x-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Open Timetable</span>
            </button>
            <button
              onClick={() => onOpenFreeTrial('1-Day Class Pass')}
              className="px-6 py-3 rounded-xl bg-[#ff5722] hover:bg-[#f4511e] text-white text-xs sm:text-sm font-bold transition-all shadow-lg flex items-center space-x-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Claim Free 1-Day Pass</span>
            </button>
          </div>
        </div>

      </div>

      {/* Curriculum Modal */}
      {activeModalClass && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setActiveModalClass(null)}
        >
          <div
            className="bg-[#141418] border border-white/15 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalClass(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-800 hover:bg-[#ff5722] text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-xs font-bold uppercase tracking-wider text-[#ff5722]">
              {activeModalClass.category} Discipline
            </div>
            <h3 className="text-2xl font-black font-heading text-white mt-1">
              {activeModalClass.title}
            </h3>

            <div className="mt-4 p-4 rounded-2xl bg-[#1c1c24] border border-white/5 space-y-2 text-xs text-neutral-300">
              <div className="flex justify-between">
                <span className="text-neutral-400">Duration:</span>
                <span className="font-bold text-white">{activeModalClass.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Intensity:</span>
                <span className="font-bold text-[#ff5722]">{activeModalClass.intensity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Coach:</span>
                <span className="font-bold text-white">{activeModalClass.coach}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Facility Studio:</span>
                <span className="font-bold text-white">{activeModalClass.room}</span>
              </div>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {activeModalClass.description} Includes full dynamic warm-up, kinetic chain mobility priming, work sets with heart-rate tracking, and down-regulation breathing recovery.
            </p>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="text-xs text-neutral-400">
                <strong className="text-white">{activeModalClass.spotsLeft} spots</strong> left today
              </div>
              <button
                onClick={() => {
                  onBookClass(activeModalClass.title);
                  setActiveModalClass(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#ff5722] hover:bg-[#f4511e] text-white text-xs font-bold transition-all shadow-lg flex items-center space-x-1.5 cursor-pointer"
              >
                <span>Confirm Reservation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
