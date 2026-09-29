import React, { useState } from 'react';
import { Sun, Shield, Sparkles, Volume2, VolumeX, RefreshCw, Flame, Check, ChevronDown, MapPin, Wind, Droplets, Bot, MessageSquare } from 'lucide-react';
import { toggleAudioMute, isAudioMuted, playWaterPop } from '../utils/dewpointAudio';
import { GeoEnvironmentalData } from '../types/dermasync';

interface DewpointNavProps {
  barrierScore: number;
  skinStatus: string;
  activeTab: 'dashboard' | 'shelf' | 'dupes' | 'diet' | 'clashes' | 'scan' | 'chat';
  onSelectTab: (tab: 'dashboard' | 'shelf' | 'dupes' | 'diet' | 'clashes' | 'scan' | 'chat') => void;
  onOpenRescanModal: () => void;
  geoData: GeoEnvironmentalData;
  onOpenLocationDrawer: () => void;
  onOpenChatModal?: () => void;
}

export const DewpointNav: React.FC<DewpointNavProps> = ({
  barrierScore,
  skinStatus,
  activeTab,
  onSelectTab,
  onOpenRescanModal,
  geoData,
  onOpenLocationDrawer,
  onOpenChatModal
}) => {
  const [muted, setMuted] = useState(isAudioMuted());
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleToggleMute = () => {
    const isNowMuted = toggleAudioMute();
    setMuted(isNowMuted);
    if (!isNowMuted) playWaterPop();
  };

  // SVG parameters for glowing barrier ring around avatar (Rose Gold Nectar Chrome)
  const radius = 17;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (barrierScore / 100) * circumference;

  return (
    <header className="sticky top-4 z-40 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="glass-pill rounded-full px-3.5 sm:px-6 py-2 flex items-center justify-between gap-2 sm:gap-3 transition-all">
        {/* Brand Wordmark & Friendly Tag */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectTab('dashboard')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-8 h-8 rounded-full nectar-gradient border border-white flex items-center justify-center relative overflow-hidden shadow-[0_2px_10px_rgba(212,155,134,0.35)] group-hover:scale-105 transition-transform">
              <div className="w-2.5 h-2.5 rounded-full bg-[#3B4655] shadow-[0_0_8px_rgba(59,70,85,0.4)]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-base sm:text-lg tracking-tight font-bold text-[#3B4655] group-hover:text-[#8C5E4F] transition-colors">
                  DEWPOINT
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] tracking-wider uppercase font-bold px-1.5 py-0.5 rounded-full nectar-badge">
                  LABS
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Center: Live Environmental & Weather Telemetry HUD Pill */}
        <div className="relative">
          <button
            onClick={() => {
              onOpenLocationDrawer();
              playWaterPop();
            }}
            className="group flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-white/70 hover:bg-white border border-[#3B4655]/10 hover:border-[#D49B86]/50 shadow-sm hover:shadow-[0_4px_16px_rgba(212,155,134,0.2)] transition-all text-xs font-mono text-[#3B4655]"
            title="Click to check weather or travel climate"
          >
            <span className="text-sm">{geoData.flag}</span>
            <span className="font-bold text-[#3B4655] hidden xs:inline">{geoData.city}</span>
            <span className="text-[#3B4655]/30 hidden sm:inline">·</span>
            <span className="font-semibold text-[#3B4655] hidden sm:inline">{geoData.temperatureC}°C</span>
            <span className="text-[#3B4655]/30 hidden md:inline">·</span>

            {/* Humidity */}
            <span className={`hidden md:inline font-semibold ${geoData.humidity > 70 ? 'text-rose-600 font-bold' : 'text-sky-700'}`}>
              {geoData.humidity}% Humidity
            </span>

            {/* UV Badge */}
            <span className="text-[#3B4655]/30 hidden lg:inline">·</span>
            <span className={`flex items-center gap-1 font-bold ${geoData.uvIndex > 6 ? 'text-amber-600' : 'text-[#3B4655]'}`}>
              <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span>Sun (UV {geoData.uvIndex})</span>
            </span>

            {/* AQI Badge */}
            <span className="text-[#3B4655]/30 hidden xl:inline">·</span>
            <span className={`hidden xl:inline font-bold px-2 py-0.5 rounded-full text-[10px] ${
              geoData.aqi > 120
                ? 'bg-rose-100 text-rose-700 border border-rose-200'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            }`}>
              Air: {geoData.aqi > 120 ? 'Smoggy' : 'Clean'} ({geoData.aqi})
            </span>

            <span className="text-[10px] text-[#8C5E4F] font-bold underline ml-1 hidden sm:inline">
              Change
            </span>
          </button>
        </div>

        {/* Navigation Quick Links (Desktop) */}
        <nav className="hidden xl:flex items-center gap-1 bg-[#FAF9F6]/80 p-1 rounded-full border border-[#3B4655]/10 text-xs font-medium">
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`px-3.5 py-1.5 rounded-full transition-all ${
              activeTab === 'dashboard'
                ? 'bg-[#3B4655] text-white font-semibold shadow-sm'
                : 'text-[#3B4655]/70 hover:text-[#3B4655]'
            }`}
          >
            Skin Check
          </button>
          <button
            onClick={() => onSelectTab('shelf')}
            className={`px-3.5 py-1.5 rounded-full transition-all ${
              activeTab === 'shelf'
                ? 'bg-[#3B4655] text-white font-semibold shadow-sm'
                : 'text-[#3B4655]/70 hover:text-[#3B4655]'
            }`}
          >
            Your Products
          </button>
          <button
            onClick={() => onSelectTab('diet')}
            className={`px-3.5 py-1.5 rounded-full transition-all ${
              activeTab === 'diet'
                ? 'bg-[#3B4655] text-white font-semibold shadow-sm'
                : 'text-[#3B4655]/70 hover:text-[#3B4655]'
            }`}
          >
            Skin Food
          </button>
          <button
            onClick={() => onSelectTab('dupes')}
            className={`px-3.5 py-1.5 rounded-full transition-all ${
              activeTab === 'dupes'
                ? 'bg-[#3B4655] text-white font-semibold shadow-sm'
                : 'text-[#3B4655]/70 hover:text-[#3B4655]'
            }`}
          >
            Budget Swaps
          </button>
          <button
            onClick={() => onSelectTab('clashes')}
            className={`px-3.5 py-1.5 rounded-full transition-all ${
              activeTab === 'clashes'
                ? 'bg-[#3B4655] text-white font-semibold shadow-sm'
                : 'text-[#3B4655]/70 hover:text-[#3B4655]'
            }`}
          >
            Ingredient Clashes
          </button>
          <button
            onClick={() => onSelectTab('chat')}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 font-bold ${
              activeTab === 'chat'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-rose-700 hover:text-rose-900 bg-rose-50/70 border border-rose-200'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-rose-500" />
            <span>AI Agent</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </button>
        </nav>

        {/* Right Zone: Audio chime toggle + Quick AI Launcher + User Avatar */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Quick AI Chat Modal Launcher */}
          {onOpenChatModal && (
            <button
              onClick={onOpenChatModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold shadow-sm transition-transform hover:scale-105"
              title="Open Clinical AI Chatbot"
            >
              <Bot className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>
          )}

          {/* Audio Chime Button */}
          <button
            onClick={handleToggleMute}
            className="w-8 h-8 rounded-full bg-white/70 hover:bg-white border border-[#3B4655]/10 flex items-center justify-center text-[#3B4655]/70 hover:text-[#3B4655] transition-colors shadow-sm"
            title={muted ? 'Turn Sound On' : 'Turn Sound Off'}
          >
            {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#8C5E4F]" />}
          </button>

          {/* Quick Rescan Button */}
          <button
            onClick={onOpenRescanModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 hover:bg-white border border-[#3B4655]/10 text-xs font-mono text-[#3B4655] hover:text-[#8C5E4F] transition-colors shadow-sm"
          >
            <RefreshCw className="w-3 h-3 text-[#D49B86]" />
            <span className="font-semibold">Check Skin</span>
          </button>

          {/* User Profile Avatar with Glowing Radial Nectar Ring */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="relative p-0.5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#D49B86]/60 transition-transform active:scale-95"
              title="Your Skin Shield Score"
            >
              {/* SVG Glowing Barrier Health Ring */}
              <svg className="w-9 h-9 sm:w-10 sm:h-10 -rotate-90" viewBox="0 0 40 40">
                <defs>
                  <linearGradient id="nectarRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F6D5C3" />
                    <stop offset="50%" stopColor="#E8B49F" />
                    <stop offset="100%" stopColor="#D49B86" />
                  </linearGradient>
                </defs>
                <circle
                  cx="20"
                  cy="20"
                  r={radius}
                  stroke="rgba(59,70,85,0.08)"
                  strokeWidth="2.5"
                  fill="none"
                />
                <circle
                  cx="20"
                  cy="20"
                  r={radius}
                  stroke="url(#nectarRingGrad)"
                  strokeWidth="2.5"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 filter drop-shadow-[0_0_6px_rgba(212,155,134,0.6)]"
                />
              </svg>

              {/* Inner Avatar Portrait */}
              <div className="absolute inset-1 rounded-full overflow-hidden bg-gradient-to-tr from-[#3B4655] to-[#2C3440] flex items-center justify-center text-xs font-mono font-bold text-white border border-white/60 shadow-inner">
                <span className="text-[10px] font-mono text-[#F6D5C3] font-bold">{barrierScore}</span>
              </div>
            </button>

            {/* Profile Menu Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 top-12 w-72 glass-card rounded-2xl p-4 text-xs shadow-2xl z-50 border border-white animate-fade-in space-y-3">
                <div className="flex items-center gap-3 border-b border-[#3B4655]/10 pb-3">
                  <div className="w-9 h-9 rounded-full nectar-gradient border border-white flex items-center justify-center font-mono font-bold text-[#3B4655] shadow-sm">
                    YOU
                  </div>
                  <div>
                    <div className="font-semibold text-[#3B4655]">Your Skin Profile</div>
                    <div className="text-[11px] font-mono text-[#8C5E4F] font-bold">
                      Skin Shield: {barrierScore}/100 · Strong & Healthy
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-[11px] text-[#3B4655]">
                  <div>
                    <span className="text-[#3B4655]/60 block font-semibold">Skin Type:</span>
                    <span className="font-medium text-[#3B4655]">{skinStatus}</span>
                  </div>
                  <div>
                    <span className="text-[#3B4655]/60 block font-semibold">Today's Weather:</span>
                    <span className="font-mono text-[#3B4655]">{geoData.city} · {geoData.temperatureC}°C with {geoData.humidity}% humidity</span>
                  </div>
                  <div>
                    <span className="text-[#3B4655]/60 block font-semibold">Sunscreen Touch-Up:</span>
                    <span className="font-mono text-amber-700 font-bold">Every 45-60m if outside</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#3B4655]/10 space-y-2">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      onOpenLocationDrawer();
                    }}
                    className="w-full py-2 bg-white hover:bg-[#FAF9F6] text-[#3B4655] border border-[#3B4655]/15 rounded-xl text-center font-mono text-xs transition-colors font-medium flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#D49B86]" />
                    <span>Change City / Traveling</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      onOpenRescanModal();
                    }}
                    className="w-full py-2 nectar-gradient hover:opacity-95 text-[#3B4655] border border-[#D49B86]/40 rounded-xl text-center font-mono text-xs transition-all font-bold flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-[#3B4655]" />
                    <span>Take a New Skin Photo</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
