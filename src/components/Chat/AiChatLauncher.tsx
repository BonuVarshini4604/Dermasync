import React from 'react';
import { Bot, Sparkles, MessageSquare } from 'lucide-react';
import { playWaterPop } from '../../utils/dewpointAudio';

interface AiChatLauncherProps {
  isOpen: boolean;
  onToggle: () => void;
  unreadCount?: number;
}

export const AiChatLauncher: React.FC<AiChatLauncherProps> = ({
  isOpen,
  onToggle,
  unreadCount = 0
}) => {
  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        onClick={() => {
          onToggle();
          playWaterPop();
        }}
        className={`group relative flex items-center gap-2.5 px-4 py-3 rounded-full shadow-[0_12px_36px_-6px_rgba(212,155,134,0.4)] transition-all duration-300 cursor-pointer border ${
          isOpen
            ? 'bg-slate-900 text-white border-slate-700 shadow-md'
            : 'bg-white hover:bg-[#FAF9F6] text-slate-900 border-[#D49B86]/40 hover:border-[#D49B86] hover:scale-105'
        }`}
        title="Chat with your DermaSync n8n Clinical AI Agent"
      >
        {/* Pulsing Green Online Indicator */}
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>

        {/* Nectar Icon Orb */}
        <div className="w-7 h-7 rounded-full nectar-gradient flex items-center justify-center text-[#3B4655] shadow-xs group-hover:rotate-12 transition-transform">
          <Bot className="w-4 h-4 text-[#8C5E4F]" />
        </div>

        <div className="text-left font-mono">
          <div className="text-xs font-bold flex items-center gap-1 leading-tight text-slate-900 dark:text-white">
            <span>Ask Clinical AI</span>
            <Sparkles className="w-3 h-3 text-[#D49B86] group-hover:scale-125 transition-transform" />
          </div>
          <div className="text-[10px] text-slate-500 font-medium">
            n8n Agent Active
          </div>
        </div>

        {unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-600 text-white text-[10px] font-mono font-bold rounded-full flex items-center justify-center shadow-md">
            {unreadCount}
          </span>
        )}
      </button>
    </div>
  );
};
