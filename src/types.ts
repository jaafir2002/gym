export type AppPage = 'home' | 'classes' | 'coaches' | 'schedule' | 'membership' | 'profile';

export interface BookedClass {
  id: string;
  classTitle: string;
  day: string;
  time: string;
  coach: string;
  room: string;
  bookedAt: string;
}

export interface ClassItem {
  id: string;
  title: string;
  category: 'Strength' | 'HIIT' | 'Boxing' | 'Mobility' | 'Cardio';
  coach: string;
  coachPhoto: string;
  time: string;
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  duration: string;
  intensity: 'Medium' | 'High' | 'Extreme';
  capacity: number;
  spotsLeft: number;
  room: string;
  image: string;
  description: string;
}

export interface Coach {
  id: string;
  name: string;
  role: string;
  photo: string;
  actionPhoto: string;
  experience: string;
  specialty: string;
  rating: number;
  clientCount: number;
  bio: string;
  certifications: string[];
  scheduleDay: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  subtitle: string;
  description: string;
  theme: 'orange' | 'white' | 'dark';
  popular?: boolean;
  features: string[];
  ctaText: string;
  category: 'membership' | 'personal_training';
}

export interface TransformationStory {
  id: string;
  name: string;
  age: number;
  duration: string;
  program: string;
  metric1: string;
  metric2: string;
  beforeImg: string;
  afterImg: string;
  story: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
  highlight: string;
  memberSince: string;
}

export interface BmiState {
  unit: 'metric' | 'imperial';
  height: number; // cm or inches
  weight: number; // kg or lbs
  age: number;
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'moderate' | 'active' | 'athlete';
}

export interface TrialBooking {
  fullName: string;
  email: string;
  phone: string;
  goal: string;
  date: string;
  timeSlot: string;
  passId?: string;
}
