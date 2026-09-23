import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Check, Flame, Filter, ChevronRight } from 'lucide-react';
import { SCHEDULE_ITEMS } from '../data/gymData';
import { ClassItem } from '../types';

interface ClassScheduleSectionProps {
  onReserveSpot: (classItem: ClassItem) => void;
}

export const ClassScheduleSection: React.FC<ClassScheduleSectionProps> = ({ onReserveSpot }) => {
  const [selectedDay, setSelectedDay] = useState<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'>('Mon');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [bookedIds, setBookedIds] = useState<Record<string, boolean>>({});

  const days: Array<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'> = [
    'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
  ];

  const categories = ['All', 'Strength', 'HIIT', 'Boxing', 'Mobility', 'Cardio'];

  const filteredSchedule = SCHEDULE_ITEMS.filter((item) => {
    const matchDay = item.day === selectedDay;
    const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchDay && matchCategory;
  });

  const handleBook = (item: ClassItem) => {
    setBookedIds((prev) => ({ ...prev, [item.id]: true }));
    onReserveSpot(item);
  };

  return (
    <section id="schedule" className="py-20 sm:py-28 bg-[#0b0b0d] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#ff5722] font-heading">
              LIVE TIMETABLE
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight font-heading text-white mt-1">
              CLASS SCHEDULE
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
            Reserve your platform spot in advance. Small group limits ensure personalized form feedback and equipment availability.
          </p>
        </div>

        {/* Day Selector Tabs (Mon - Sun) */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 scrollbar-none border-b border-white/10">
          {days.map((day) => {
            const isActive = selectedDay === day;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer flex flex-col items-center min-w-[72px] ${
                  isActive
                    ? 'bg-[#ff5722] text-white shadow-[0_0_20px_rgba(255,87,34,0.4)] scale-105'
                    : 'bg-[#141418] text-neutral-400 hover:text-white hover:bg-[#1c1c22]'
                }`}
              >
                <span>{day}</span>
                <span className={`text-[10px] mt-0.5 ${isActive ? 'text-white/80' : 'text-neutral-500'}`}>
                  {SCHEDULE_ITEMS.filter((i) => i.day === day).length} Classes
                </span>
              </button>
            );
          })}
        </div>

        {/* Category Filters */}
        <div className="mt-6 flex items-center space-x-2 overflow-x-auto pb-2">
          <span className="text-xs text-neutral-500 font-semibold flex items-center space-x-1 shrink-0 mr-2">
            <Filter className="w-3.5 h-3.5" />
            <span>Discipline:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors shrink-0 ${
                selectedCategory === cat
                  ? 'bg-white text-black'
                  : 'bg-neutral-900 border border-white/10 text-neutral-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Timetable List Grid */}
        <div className="mt-8 space-y-4">
          {filteredSchedule.length === 0 ? (
            <div className="bg-[#141418] border border-white/10 rounded-2xl p-12 text-center">
              <div className="text-neutral-500 text-sm">No classes match this filter for {selectedDay}.</div>
              <button
                onClick={() => setSelectedCategory('All')}
                className="mt-3 text-xs font-bold text-[#ff5722] hover:underline"
              >
                View all {selectedDay} sessions
              </button>
            </div>
          ) : (
            filteredSchedule.map((classItem) => {
              const isBooked = bookedIds[classItem.id];
              const remainingSpots = isBooked ? Math.max(0, classItem.spotsLeft - 1) : classItem.spotsLeft;

              return (
                <div
                  key={classItem.id}
                  className="bg-[#141418] hover:bg-[#1a1a22] border border-white/10 hover:border-white/20 rounded-2xl p-4 sm:p-6 transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                >
                  {/* Left: Time & Class Info */}
                  <div className="flex items-start sm:items-center space-x-4">
                    {/* Time Slot Tag */}
                    <div className="bg-[#1c1c24] border border-white/10 px-4 py-3 rounded-xl text-center min-w-[130px] shrink-0">
                      <div className="text-xs font-bold text-white flex items-center justify-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-[#ff5722]" />
                        <span>{classItem.time.split(' - ')[0]}</span>
                      </div>
                      <div className="text-[11px] text-neutral-400 mt-0.5">
                        {classItem.duration}
                      </div>
                    </div>

                    {/* Class Details */}
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff5722] bg-[#ff5722]/10 px-2 py-0.5 rounded">
                          {classItem.category}
                        </span>
                        <span className="text-[11px] text-neutral-400 flex items-center space-x-1">
                          <MapPin className="w-3 h-3 text-neutral-500" />
                          <span>{classItem.room}</span>
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold font-heading text-white mt-1 group-hover:text-[#ff5722] transition-colors">
                        {classItem.title}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1 max-w-xl line-clamp-1">
                        {classItem.description}
                      </p>
                    </div>
                  </div>

                  {/* Right: Coach Photo, Spots Left, and Book Button */}
                  <div className="flex items-center justify-between md:justify-end space-x-4 sm:space-x-6 pt-3 md:pt-0 border-t md:border-t-0 border-white/5">
                    
                    {/* Coach Avatar */}
                    <div className="flex items-center space-x-2.5">
                      <img
                        src={classItem.coachPhoto}
                        alt={classItem.coach}
                        className="w-9 h-9 rounded-full object-cover ring-1 ring-white/20"
                      />
                      <div className="text-left">
                        <div className="text-xs font-semibold text-white">{classItem.coach}</div>
                        <div className="text-[10px] text-neutral-500">Coach</div>
                      </div>
                    </div>

                    {/* Spots Left Indicator */}
                    <div className="text-right">
                      <div
                        className={`text-xs font-bold ${
                          remainingSpots === 0
                            ? 'text-red-400'
                            : remainingSpots <= 2
                            ? 'text-amber-400'
                            : 'text-emerald-400'
                        }`}
                      >
                        {remainingSpots === 0 ? 'Waitlist Only' : `${remainingSpots} Spots Left`}
                      </div>
                      <div className="text-[10px] text-neutral-500">Cap: {classItem.capacity}</div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => handleBook(classItem)}
                      disabled={isBooked || remainingSpots === 0}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                        isBooked
                          ? 'bg-emerald-600 text-white cursor-default'
                          : remainingSpots === 0
                          ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                          : 'bg-[#ff5722] hover:bg-[#f4511e] text-white hover:shadow-[0_0_15px_rgba(255,87,34,0.4)]'
                      }`}
                    >
                      {isBooked ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Reserved</span>
                        </>
                      ) : remainingSpots === 0 ? (
                        <span>Join Waitlist</span>
                      ) : (
                        <span>Book Spot</span>
                      )}
                    </button>

                  </div>

                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
};
