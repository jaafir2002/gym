import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ClassesPage } from './pages/ClassesPage';
import { CoachesPage } from './pages/CoachesPage';
import { SchedulePage } from './pages/SchedulePage';
import { MembershipPage } from './pages/MembershipPage';
import { MemberProfilePage } from './pages/MemberProfilePage';
import { FreeTrialModal } from './components/FreeTrialModal';
import { Toast } from './components/Toast';
import { AppPage, BookedClass, ClassItem, Coach, PricingPlan, TrialBooking } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [isTrialOpen, setIsTrialOpen] = useState(false);
  const [trialPrefilledGoal, setTrialPrefilledGoal] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string>('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  // Active reservations in the Member Hub
  const [bookedClasses, setBookedClasses] = useState<BookedClass[]>([
    {
      id: 'res-1',
      classTitle: 'Barbell Power & Olympic Snatch',
      day: 'Monday',
      time: '07:00 - 08:00 AM',
      coach: 'Alex Vance',
      room: 'Olympic Platform Zone',
      bookedAt: 'Today, 08:30 AM',
    },
    {
      id: 'res-2',
      classTitle: 'High-Calorie MetCon Turf',
      day: 'Wednesday',
      time: '09:30 - 10:20 AM',
      coach: 'Maya Lin',
      room: 'AstroTurf Arena',
      bookedAt: 'Yesterday, 04:15 PM',
    },
  ]);

  // Sync with browser URL hash on initial load & popstate
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace('#', '').replace('/', '');
      const validPages: AppPage[] = ['home', 'classes', 'coaches', 'schedule', 'membership', 'profile'];
      if (validPages.includes(hash as AppPage)) {
        setCurrentPage(hash as AppPage);
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  const navigateTo = (page: AppPage) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setIsToastVisible(true);
  };

  const handleBookClass = (className: string) => {
    const newBooking: BookedClass = {
      id: `res-${Date.now()}`,
      classTitle: className,
      day: 'Upcoming Session',
      time: '09:00 - 10:00 AM',
      coach: 'Senior Coach',
      room: 'Main Studio',
      bookedAt: 'Just now',
    };
    setBookedClasses((prev) => [newBooking, ...prev]);
    showToast(`Spot reserved for ${className}! Added to your Athlete Hub.`);
  };

  const handleReserveScheduleSpot = (classItem: ClassItem) => {
    const newBooking: BookedClass = {
      id: `res-${Date.now()}`,
      classTitle: classItem.title,
      day: classItem.day,
      time: classItem.time,
      coach: classItem.coach,
      room: classItem.room,
      bookedAt: 'Just now',
    };
    setBookedClasses((prev) => [newBooking, ...prev]);
    showToast(`Spot reserved for ${classItem.title} (${classItem.day} ${classItem.time.split(' - ')[0]})!`);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookedClasses((prev) => prev.filter((b) => b.id !== bookingId));
    showToast('Reservation cancelled. Your spot was released.');
  };

  const handleBookCoach = (coach: Coach) => {
    setTrialPrefilledGoal(`1-on-1 Consultation with ${coach.name}`);
    setIsTrialOpen(true);
  };

  const handleSelectPlan = (plan: PricingPlan) => {
    setTrialPrefilledGoal(`${plan.name} (${plan.period})`);
    setIsTrialOpen(true);
  };

  const handleClaimRecommendedPlan = (suggestedClass: string) => {
    setTrialPrefilledGoal(`Recommended Program: ${suggestedClass}`);
    setIsTrialOpen(true);
  };

  const handleTrialSuccess = (booking: TrialBooking) => {
    showToast(`VIP Pass ${booking.passId} generated! Confirmation sent to ${booking.email}.`);
  };

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-[#f5f5f7] flex flex-col selection:bg-[#ff5722] selection:text-white">
      {/* Sticky Top Navigation with Active Page State */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenFreeTrial={() => {
          setTrialPrefilledGoal('VIP 1-Day Trial Pass');
          setIsTrialOpen(true);
        }}
      />

      {/* Main Multi-Page Routed View */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onOpenFreeTrial={(goal) => {
              setTrialPrefilledGoal(goal || 'VIP 1-Day Trial Pass');
              setIsTrialOpen(true);
            }}
            onBookClass={handleBookClass}
            onBookCoach={handleBookCoach}
            onSelectPlan={handleSelectPlan}
            onReserveScheduleSpot={handleReserveScheduleSpot}
            onClaimRecommendedPlan={handleClaimRecommendedPlan}
          />
        )}

        {currentPage === 'classes' && (
          <ClassesPage
            onNavigate={navigateTo}
            onBookClass={handleBookClass}
            onOpenFreeTrial={(goal) => {
              setTrialPrefilledGoal(goal || 'Class Trial Pass');
              setIsTrialOpen(true);
            }}
          />
        )}

        {currentPage === 'coaches' && (
          <CoachesPage
            onNavigate={navigateTo}
            onBookCoach={handleBookCoach}
            onOpenFreeTrial={(goal) => {
              setTrialPrefilledGoal(goal || 'Coach Consultation');
              setIsTrialOpen(true);
            }}
          />
        )}

        {currentPage === 'schedule' && (
          <SchedulePage
            onNavigate={navigateTo}
            onReserveSpot={handleReserveScheduleSpot}
            onOpenFreeTrial={(goal) => {
              setTrialPrefilledGoal(goal || 'Timetable Pass');
              setIsTrialOpen(true);
            }}
          />
        )}

        {currentPage === 'membership' && (
          <MembershipPage
            onNavigate={navigateTo}
            onSelectPlan={handleSelectPlan}
            onOpenFreeTrial={(goal) => {
              setTrialPrefilledGoal(goal || 'Membership Pass');
              setIsTrialOpen(true);
            }}
          />
        )}

        {currentPage === 'profile' && (
          <MemberProfilePage
            onNavigate={navigateTo}
            bookedClasses={bookedClasses}
            onCancelBooking={handleCancelBooking}
            onOpenFreeTrial={(goal) => {
              setTrialPrefilledGoal(goal || 'Member Hub Pass');
              setIsTrialOpen(true);
            }}
          />
        )}
      </main>

      {/* Bottom Footer with Page Navigation & Quick Links */}
      <Footer onNavigate={navigateTo} />

      {/* VIP Trial Registration Modal */}
      <FreeTrialModal
        isOpen={isTrialOpen}
        onClose={() => setIsTrialOpen(false)}
        prefilledGoal={trialPrefilledGoal}
        onSuccess={handleTrialSuccess}
      />

      {/* Global Notification Toast */}
      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />
    </div>
  );
}
