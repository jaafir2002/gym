import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Flame, 
  CheckCircle2, 
  MapPin, 
  Filter, 
  ArrowRight, 
  Sparkles,
  UserCheck,
  AlertCircle
} from 'lucide-react';
import { SCHEDULE_ITEMS } from '../data/gymData';
import { ClassItem, AppPage } from '../types';

interface SchedulePageProps {
  onNavigate: (page: AppPage) => void;
  onReserveSpot: (classItem: ClassItem) => void;
  onOpenFreeTrial: (goal?: string) => void;
}

export const SchedulePage: React.FC<SchedulePageProps> = ({
  onNavigate,
  onReserveSpot,
  onOpenFreeTrial,
}) => {
  const [activeDay, setActiveDay] = useState<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'>('Mon');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('All');

  const days: Array<{ key: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'; full: string }> = [
    { key: 'Mon', full: 'Monday' },
    { key: 'Tue', full: 'Tuesday' },
    { key: 'Wed', full: 'Wednesday' },
    { key: 'Thu', full: 'Thursday' },
    { key: 'Fri', full: 'Friday' },
    { key: 'Sat', full: 'Saturday' },
    { key: 'Sun', full: 'Sunday' },
  ];

  const categories = ['All', 'Strength', 'HIIT', 'Boxing', 'Mobility', 'Cardio'];

  const filteredClasses = SCHEDULE_ITEMS.filter((item: ClassItem) => {
    const matchesDay = item.day === activeDay;
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    
    let matchesTime = true;
    const startHour = parseInt(item.time.split(':')[0], 10);
    const isPM = item.time.includes('PM');
    const adjustedHour = isPM && startHour !== 12 ? startHour + 12 : (!isPM && startHour === 12 ? 0 : startHour);

    if (selectedTimeSlot === 'Morning') matchesTime = adjustedHour < 12;
    else if (selectedTimeSlot === 'Afternoon') matchesTime = adjustedHour >= 12 && adjustedHour < 17;
    else if (selectedTimeSlot === 'Evening') matchesTime = adjustedHour >= 17;

    return matchesDay && matchesCategory && matchesTime;
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
          <span className="text-[#ff5722]">Live Class Timetable</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#ff5722] font-heading">
              CALENDAR & RESERVATIONS
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight font-heading text-white mt-1">
              WEEKLY CLASS SCHEDULE
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
            Interactive daily timetable. Reserve your spot up to 7 days ahead. Small group caps ensure dedicated biomechanics feedback from your coach.
          </p>
        </div>

        {/* Day Selector Tabs (Mon - Sun) */}
        <div className="mt-8 flex items-center space-x-2 overflow-x-auto pb-3 scrollbar-none">
          {days.map((d) => (
            <button
              key={d.key}
              onClick={() => setActiveDay(d.key)}
              className={`px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex-1 text-center ${
                activeDay === d.key
                  ? 'bg-[#ff5722] text-white shadow-[0_0_20px_rgba(255,87,34,0.4)] scale-105 z-10'
                  : 'bg-[#141418] text-neutral-400 hover:text-white hover:bg-[#1c1c24] border border-white/10'
              }`}
            >
              <div className="text-[10px] opacity-80">{d.key}</div>
              <div className="text-xs sm:text-sm">{d.full}</div>
            </button>
          ))}
        </div>

        {/* Filters Bar: Time & Category */}
        <div className="mt-6 bg-[#141418] border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-neutral-400 font-semibold mr-1 flex items-center">
              <Filter className="w-3.5 h-3.5 mr-1 text-[#ff5722]" /> Discipline:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-neutral-200 text-black'
                    : 'bg-[#1c1c24] text-neutral-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Time Filter */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-neutral-400 font-semibold">Time:</span>
            {['All', 'Morning', 'Afternoon', 'Evening'].map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedTimeSlot(slot)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  selectedTimeSlot === slot
                    ? 'bg-[#ff5722] text-white'
                    : 'bg-[#1c1c24] text-neutral-400 hover:text-white'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Timetable Items */}
        <div className="mt-8 space-y-4">
          {filteredClasses.length > 0 ? (
            filteredClasses.map((item: ClassItem) => (
              <div
                key={item.id}
                className="bg-[#141418] border border-white/10 hover:border-[#ff5722]/50 rounded-3xl p-5 sm:p-7 transition-all duration-300 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 group"
              >
                {/* Left: Time & Class Info */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
                  {/* Time Badge */}
                  <div className="sm:text-center sm:w-36 shrink-0">
                    <div className="text-lg sm:text-xl font-black font-heading text-white tracking-tight flex items-center sm:justify-center space-x-1.5">
                      <Clock className="w-4 h-4 text-[#ff5722]" />
                      <span>{item.time.split(' - ')[0]}</span>
                    </div>
                    <div className="text-[11px] text-neutral-500 font-mono">
                      to {item.time.split(' - ')[1]} ({item.duration})
                    </div>
                  </div>

                  {/* Thumbnail */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 hidden sm:block border border-white/10">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Details */}
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white border border-white/10">
                        {item.category}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        item.intensity === 'Extreme' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                        item.intensity === 'High' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {item.intensity} Intensity
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white group-hover:text-[#ff5722] transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-xs text-neutral-400 max-w-xl line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Right: Coach & Reservation Action */}
                <div className="flex items-center justify-between lg:justify-end gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/5">
                  {/* Coach */}
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.coachPhoto}
                      alt={item.coach}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                    />
                    <div className="text-left">
                      <div className="text-[10px] text-neutral-500 uppercase font-semibold">Coach</div>
                      <div className="text-xs font-bold text-white whitespace-nowrap">{item.coach}</div>
                      <div className="text-[10px] text-neutral-400 flex items-center space-x-1">
                        <MapPin className="w-2.5 h-2.5 text-[#ff5722]" />
                        <span>{item.room}</span>
                      </div>
                    </div>
                  </div>

                  {/* Spot Count & Book Button */}
                  <div className="text-right space-y-1.5 shrink-0">
                    <div className="text-[11px] font-mono text-[#ff5722] font-semibold">
                      {item.spotsLeft} of {item.capacity} spots left
                    </div>
                    <button
                      onClick={() => onReserveSpot(item)}
                      className="px-5 py-2.5 rounded-xl bg-[#ff5722] hover:bg-[#f4511e] text-white text-xs font-bold transition-all shadow-lg hover:shadow-[0_0_15px_rgba(255,87,34,0.4)] flex items-center space-x-1.5 cursor-pointer"
                    >
                      <span>Reserve Spot</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-[#141418] rounded-3xl border border-white/10">
              <Calendar className="w-10 h-10 text-neutral-600 mx-auto mb-2" />
              <div className="text-sm font-bold text-white">No sessions found for this filter</div>
              <p className="text-xs text-neutral-500 mt-1">Try switching to a different time slot or category filter.</p>
            </div>
          )}
        </div>

        {/* Reservation Policy Note */}
        <div className="mt-12 bg-[#141418] border border-white/10 rounded-2xl p-5 sm:p-6 flex items-start space-x-4">
          <AlertCircle className="w-5 h-5 text-[#ff5722] shrink-0 mt-0.5" />
          <div className="text-xs text-neutral-400 space-y-1">
            <div className="font-bold text-white">GYM Reservation & Cancellation Policy</div>
            <p>
              Class spots open exactly 7 days in advance at 06:00 AM. Free cancellations are permitted up to 2 hours before the start time. Towels, Eleiko chalk, and cold plunge immersion access are complimentary with all reservations.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
