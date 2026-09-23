import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ArrowUpRight, 
  User, 
  Dumbbell, 
  Calendar, 
  Users, 
  CreditCard, 
  Home as HomeIcon,
  Flame,
  PhoneCall,
  Sparkles
} from 'lucide-react';
import { AppPage } from '../types';

interface NavbarProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
  onOpenFreeTrial: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  onNavigate, 
  onOpenFreeTrial 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: Array<{ 
    label: string; 
    page: AppPage; 
    badge?: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    { label: 'Home', page: 'home', icon: HomeIcon },
    { label: 'Classes', page: 'classes', icon: Dumbbell },
    { label: 'Schedule', page: 'schedule', badge: 'Live', icon: Calendar },
    { label: 'Coaches', page: 'coaches', icon: Users },
    { label: 'Membership', page: 'membership', badge: '₹499', icon: CreditCard },
    { label: 'Athlete Hub', page: 'profile', icon: User },
  ];

  const handleNavClick = (e: React.MouseEvent, page: AppPage) => {
    e.preventDefault();
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a0c]/95 backdrop-blur-xl border-b border-white/10 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-gradient-to-b from-[#0a0a0c]/95 via-[#0a0a0c]/80 to-transparent py-4 sm:py-5'
      }`}
    >
      {/* Optional Top Micro Notification Bar (Visible on desktop when not scrolled) */}
      {!isScrolled && (
        <div className="hidden lg:block border-b border-white/5 pb-2 mb-3 text-[11px] text-neutral-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1 text-[#ff5722] font-semibold">
                <Flame className="w-3.5 h-3.5" />
                <span>24/7 UNRESTRICTED FACILITY ACCESS</span>
              </span>
              <span className="text-neutral-600">•</span>
              <span>Olympic Platforms, Contrast Recovery & Biomechanics Assessment</span>
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href="tel:+919876543210" 
                className="flex items-center space-x-1.5 hover:text-white transition-colors"
              >
                <PhoneCall className="w-3 h-3 text-[#ff5722]" />
                <span className="font-mono text-neutral-300">+91 98765 43210</span>
              </a>
              <span className="text-neutral-600">•</span>
              <span className="text-emerald-400 font-medium flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Trainers On-Floor Now</span>
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo & Submark (Left) */}
          <a
            href="#home"
            id="brand-logo"
            onClick={(e) => handleNavClick(e, 'home')}
            className="flex items-center space-x-3 group focus:outline-none cursor-pointer select-none shrink-0"
            aria-label="GYM Fitness Homepage"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff5722] to-[#e64a19] flex items-center justify-center shadow-[0_0_18px_rgba(255,87,34,0.4)] group-hover:scale-105 transition-transform duration-300">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="text-2xl font-black tracking-tight font-heading text-white group-hover:text-neutral-100 transition-colors">
                  GYM
                </span>
                <span className="w-2 h-2 rounded-full bg-[#ff5722] shadow-[0_0_8px_#ff5722]" />
              </div>
              <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-neutral-400 -mt-1 group-hover:text-neutral-300">
                ATHLETIC CLUB
              </span>
            </div>
          </a>

          {/* Unified Desktop Navigation Bar (Center Dock) */}
          <nav 
            id="desktop-nav-dock"
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center bg-[#141418]/90 border border-white/10 rounded-full px-2 py-1.5 backdrop-blur-md shadow-inner"
          >
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <a
                  key={item.label}
                  href={`#${item.page}`}
                  id={`nav-link-${item.page}`}
                  onClick={(e) => handleNavClick(e, item.page)}
                  className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 flex items-center space-x-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#ff5722] to-[#f4511e] text-white shadow-[0_0_15px_rgba(255,87,34,0.45)]'
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span 
                      className={`text-[9px] px-1.5 py-0.5 rounded-full uppercase tracking-wider font-mono font-bold leading-none ${
                        isActive 
                          ? 'bg-black/30 text-white' 
                          : 'bg-[#ff5722]/20 text-[#ff784e] border border-[#ff5722]/30'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Controls: CTA & Profile Badge */}
          <div className="hidden sm:flex items-center space-x-3 shrink-0">
            {/* Free Trial Pass CTA Button */}
            <button
              id="nav-contact-btn"
              onClick={onOpenFreeTrial}
              className="group relative bg-[#ff5722] hover:bg-[#f4511e] text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-2.5 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(255,87,34,0.35)] hover:shadow-[0_0_25px_rgba(255,87,34,0.6)] active:scale-95 flex items-center space-x-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-200 animate-pulse" />
              <span>Claim Free Pass</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Quick Profile Portal Avatar */}
            <button
              id="nav-profile-btn"
              onClick={(e) => handleNavClick(e as any, 'profile')}
              title="Athlete Portal / Reserved Sessions"
              className={`relative w-10 h-10 rounded-full bg-[#16161c] border flex items-center justify-center transition-all focus:outline-none cursor-pointer group ${
                currentPage === 'profile'
                  ? 'border-[#ff5722] text-[#ff5722] shadow-[0_0_12px_rgba(255,87,34,0.5)] bg-[#ff5722]/10'
                  : 'border-white/15 text-neutral-300 hover:text-white hover:border-[#ff5722]'
              }`}
              aria-label="Athlete Profile"
            >
              <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0a0a0c]" />
            </button>
          </div>

          {/* Mobile Actions: Compact CTA + Hamburger */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              id="mobile-contact-btn"
              onClick={onOpenFreeTrial}
              className="bg-[#ff5722] hover:bg-[#f4511e] text-white text-xs font-bold px-3 py-2 rounded-full cursor-pointer shadow-md flex items-center space-x-1"
            >
              <span>Free Pass</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-[#16161c] border border-white/10 text-neutral-300 hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#ff5722]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer (Polished, with Icons, Active Badges, and Helpline) */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden bg-[#0c0c0e]/98 backdrop-blur-2xl border-b border-white/15 px-5 py-6 mt-3 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.label}
                  id={`mobile-nav-${item.page}`}
                  onClick={(e) => handleNavClick(e, item.page)}
                  className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-[#ff5722] text-white font-bold shadow-lg shadow-[#ff5722]/20' 
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#ff5722]'}`} />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  {item.badge ? (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                      isActive ? 'bg-black/30 text-white' : 'bg-[#ff5722]/20 text-[#ff5722]'
                    }`}>
                      {item.badge}
                    </span>
                  ) : (
                    <ArrowUpRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-600'}`} />
                  )}
                </button>
              );
            })}

            {/* Quick Contact Info inside Drawer */}
            <div className="pt-4 mt-3 border-t border-white/10 space-y-3">
              <a
                href="tel:+919876543210"
                className="w-full bg-[#16161c] border border-white/10 rounded-xl p-3 flex items-center justify-between text-xs text-neutral-300 hover:text-white"
              >
                <div className="flex items-center space-x-2">
                  <PhoneCall className="w-4 h-4 text-[#ff5722]" />
                  <span>Call Gym Reception (24/7)</span>
                </div>
                <span className="font-mono text-white font-bold">+91 98765 43210</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenFreeTrial();
                }}
                className="w-full bg-gradient-to-r from-[#ff5722] to-[#e64a19] text-white font-bold py-3.5 rounded-xl flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(255,87,34,0.4)] cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Claim VIP 1-Day Trial Pass</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
