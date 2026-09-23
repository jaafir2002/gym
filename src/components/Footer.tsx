import React from 'react';
import { ArrowUp, Instagram, Facebook, Linkedin, Twitter, Phone, Clock, MapPin } from 'lucide-react';
import { AppPage } from '../types';

interface FooterProps {
  onNavigate?: (page: AppPage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLink = (e: React.MouseEvent, page: AppPage) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(page);
    }
  };

  return (
    <footer className="bg-[#09090b] text-neutral-400 border-t border-white/10 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid (Matching Screenshot Columns Exactly) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          
          {/* Col 1 & 2: Brand & Socials (Matching Screenshot) */}
          <div className="lg:col-span-2 space-y-5">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-black tracking-tighter font-heading text-white">
                GYM
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5722] shadow-[0_0_10px_#ff5722]" />
            </div>

            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Engineered for athletic performance, progressive hypertrophy, and sustainable vitality. World-class strength platforms and science-backed conditioning.
            </p>

            {/* Social Icons (Matching Screenshot) */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-[#ff5722] border border-white/10 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-[#ff5722] border border-white/10 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-[#ff5722] border border-white/10 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-[#ff5722] border border-white/10 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="X / Twitter"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Col 3: Menu (Matching Screenshot) */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white font-heading uppercase tracking-wider">
              Menu
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#home" onClick={(e) => handleLink(e, 'home')} className="hover:text-white transition-colors cursor-pointer">
                  Home
                </a>
              </li>
              <li>
                <a href="#membership" onClick={(e) => handleLink(e, 'membership')} className="hover:text-white transition-colors cursor-pointer">
                  Membership
                </a>
              </li>
              <li>
                <a href="#classes" onClick={(e) => handleLink(e, 'classes')} className="hover:text-white transition-colors cursor-pointer">
                  Classes
                </a>
              </li>
              <li>
                <a href="#coaches" onClick={(e) => handleLink(e, 'coaches')} className="hover:text-white transition-colors cursor-pointer">
                  Coaches
                </a>
              </li>
              <li>
                <a href="#profile" onClick={(e) => handleLink(e, 'profile')} className="hover:text-white transition-colors cursor-pointer">
                  Athlete Hub
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Links (Matching Screenshot) */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white font-heading uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#schedule" onClick={(e) => handleLink(e, 'schedule')} className="hover:text-white transition-colors cursor-pointer">
                  Class Schedule
                </a>
              </li>
              <li>
                <a href="#classes" onClick={(e) => handleLink(e, 'classes')} className="hover:text-white transition-colors cursor-pointer">
                  Disciplines & Programs
                </a>
              </li>
              <li>
                <a href="#membership" onClick={(e) => handleLink(e, 'membership')} className="hover:text-white transition-colors cursor-pointer">
                  Join / Pricing
                </a>
              </li>
              <li>
                <a href="#coaches" onClick={(e) => handleLink(e, 'coaches')} className="hover:text-white transition-colors cursor-pointer">
                  Find a Mentor
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Operational Hours & Phone (Matching Screenshot) */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white font-heading uppercase tracking-wider">
              Operational
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start space-x-2">
                <Clock className="w-3.5 h-3.5 text-[#ff5722] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">Every Day: 9:00 - 22:00</div>
                  <div className="text-neutral-500">Sat - Sun: 9:00 - 21:00</div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#schedule"
                  className="text-xs font-bold text-[#ff5722] hover:underline block"
                >
                  New Schedule Available
                </a>
              </div>

              <div className="pt-2 flex items-center space-x-2 text-white font-mono text-xs">
                <Phone className="w-3.5 h-3.5 text-[#ff5722]" />
                <span>+088 01717741422</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Scroll-to-Top (Matching Screenshot) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} GYM Performance Center. All rights reserved.</p>

          <div className="flex items-center space-x-4">
            <span className="text-neutral-400">Crafted with precision & high contrast</span>
            
            {/* Scroll-to-Top Button (Signature circular button from screenshot) */}
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-[#ff5722] border border-white/10 text-white flex items-center justify-center transition-all hover:scale-110 cursor-pointer shadow-lg"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
