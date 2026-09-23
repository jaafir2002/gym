import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Sparkles } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(25);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen && isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#121216] border border-white/20 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="p-4 flex items-center justify-between border-b border-white/10 bg-[#16161c]">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5722] animate-pulse" />
            <span className="text-xs font-bold text-white font-heading uppercase tracking-wider">
              GYM • Iron Lab Documentary & Tour
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-[#ff5722] text-white flex items-center justify-center transition-colors"
            aria-label="Close video player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cinematic Video Stage */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden group">
          {/* Dynamic Video Frame with Atmospheric Gym Athlete Footage */}
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=85&w=1200&auto=format&fit=crop"
            alt="Gym Workout Video Reel"
            className={`w-full h-full object-cover transition-all duration-700 ${
              isPlaying ? 'scale-105' : 'scale-100 brightness-75'
            }`}
          />

          {/* Vignette & Lighting */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

          {/* Center Big Play/Pause Toggle */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute z-10 w-16 h-16 rounded-full bg-[#ff5722]/90 hover:bg-[#ff5722] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all cursor-pointer"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1 fill-current" />}
          </button>

          {/* Workout Highlight Overlay */}
          <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs text-white flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-[#ff5722]" />
            <span>Chapter: Olympic Barbell Biomechanics</span>
          </div>

          {/* Bottom Scrub Bar and Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
            {/* Progress Bar */}
            <div
              className="w-full h-1.5 bg-neutral-700 rounded-full overflow-hidden cursor-pointer mb-3"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                setProgress(Math.round(pos * 100));
              }}
            >
              <div
                className="h-full bg-[#ff5722] transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-neutral-300">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-white transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-white transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="font-mono text-[11px]">
                  0:{Math.floor(progress * 0.9).toString().padStart(2, '0')} / 1:30
                </span>
              </div>

              <div className="flex items-center space-x-2 text-[11px] text-neutral-400">
                <span className="bg-neutral-800 px-2 py-0.5 rounded text-[10px] font-bold text-white">4K 60FPS</span>
                <span>Stereo Gym Audio</span>
              </div>
            </div>
          </div>
        </div>

        {/* Video Description & CTA */}
        <div className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#141418]">
          <p className="text-xs text-neutral-400 text-center sm:text-left">
            Experience our calibrated Olympic platforms, Eleiko bars, and high-intensity turf in person.
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#ff5722] hover:bg-[#f4511e] text-white text-xs font-bold transition-all shadow-lg shrink-0 cursor-pointer"
          >
            Visit Our Facility
          </button>
        </div>

      </div>
    </div>
  );
};
