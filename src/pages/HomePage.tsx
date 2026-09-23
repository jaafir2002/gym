import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { ClassesSection } from '../components/ClassesSection';
import { CoachesSection } from '../components/CoachesSection';
import { ProcessSteps } from '../components/ProcessSteps';
import { PricingSection } from '../components/PricingSection';
import { ClassScheduleSection } from '../components/ClassScheduleSection';
import { TransformationSection } from '../components/TransformationSection';
import { BmiCalculatorSection } from '../components/BmiCalculatorSection';
import { ReviewsSection } from '../components/ReviewsSection';
import { ClassItem, Coach, PricingPlan, AppPage } from '../types';

interface HomePageProps {
  onNavigate: (page: AppPage) => void;
  onOpenFreeTrial: (goal?: string) => void;
  onBookClass: (className: string) => void;
  onBookCoach: (coach: Coach) => void;
  onSelectPlan: (plan: PricingPlan) => void;
  onReserveScheduleSpot: (classItem: ClassItem) => void;
  onClaimRecommendedPlan: (suggestedClass: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenFreeTrial,
  onBookClass,
  onBookCoach,
  onSelectPlan,
  onReserveScheduleSpot,
  onClaimRecommendedPlan,
}) => {
  return (
    <div>
      {/* 1. Hero Section (Matching Screenshot) */}
      <HeroSection
        onExploreMore={() => onNavigate('classes')}
        onOpenFreeTrial={() => onOpenFreeTrial('VIP 1-Day Trial Pass')}
      />

      {/* 2. Classes Designed For You */}
      <ClassesSection onBookClass={onBookClass} />

      {/* 3. Are You Looking for a Mentor? Coaches */}
      <CoachesSection onBookCoach={onBookCoach} />

      {/* 4. Come to a Result: 4 Process Steps */}
      <ProcessSteps />

      {/* 5. Pricing Plan / Join Today */}
      <PricingSection onSelectPlan={onSelectPlan} />

      {/* 6. Class Schedule with Day Tabs */}
      <ClassScheduleSection onReserveSpot={onReserveScheduleSpot} />

      {/* 7. Before & After Transformations */}
      <TransformationSection />

      {/* 8. Interactive BMI & Calorie Calculator */}
      <BmiCalculatorSection onClaimRecommendedPlan={onClaimRecommendedPlan} />

      {/* 9. Reviews From You */}
      <ReviewsSection />
    </div>
  );
};
