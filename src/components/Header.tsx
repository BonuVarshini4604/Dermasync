import React from 'react';
import { Sparkles, Activity, ShieldCheck, RefreshCw, BookmarkCheck } from 'lucide-react';

interface HeaderProps {
  currentTab: 'intake' | 'dashboard' | 'dupes' | 'conflicts' | 'holistic';
  onSelectTab: (tab: 'intake' | 'dashboard' | 'dupes' | 'conflicts' | 'holistic') => void;
  hasCompletedIntake: boolean;
  onRetakeIntake: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  hasCompletedIntake,
  onRetakeIntake
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[#E8E6DF] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectTab(hasCompletedIntake ? 'dashboard' : 'intake')}
          className="text-xl sm:text-2xl font-serif tracking-tight font-medium text-[#1E293B] hover:text-[#2E4A3D] transition-colors flex items-center gap-2 text-left"
        >
          <span>DermaSync</span>
          <span className="text-xs font-sans font-normal text-[#64748B] tracking-normal border-l border-[#CBD5E1] pl-2 hidden sm:inline">
            Clinical Dermatology
          </span>
        </button>

        {/* Zone 2: 4-6 text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#475569]">
          {hasCompletedIntake && (
            <button
              onClick={() => onSelectTab('dashboard')}
              className={`hover:text-[#1E293B] transition-colors pb-1 border-b-2 ${
                currentTab === 'dashboard' ? 'border-[#2E4A3D] text-[#1E293B] font-semibold' : 'border-transparent'
              }`}
            >
              Protocol Dashboard
            </button>
          )}

          <button
            onClick={() => onSelectTab('dupes')}
            className={`hover:text-[#1E293B] transition-colors pb-1 border-b-2 ${
              currentTab === 'dupes' ? 'border-[#2E4A3D] text-[#1E293B] font-semibold' : 'border-transparent'
            }`}
          >
            Clinical Dupe Finder
          </button>

          <button
            onClick={() => onSelectTab('conflicts')}
            className={`hover:text-[#1E293B] transition-colors pb-1 border-b-2 ${
              currentTab === 'conflicts' ? 'border-[#2E4A3D] text-[#1E293B] font-semibold' : 'border-transparent'
            }`}
          >
            Active Safety Guard
          </button>

          <button
            onClick={() => onSelectTab('holistic')}
            className={`hover:text-[#1E293B] transition-colors pb-1 border-b-2 ${
              currentTab === 'holistic' ? 'border-[#2E4A3D] text-[#1E293B] font-semibold' : 'border-transparent'
            }`}
          >
            Holistic Rx
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {hasCompletedIntake ? (
            <button
              onClick={onRetakeIntake}
              className="px-3.5 py-1.5 text-xs font-medium text-[#2E4A3D] bg-[#E9EFEA] hover:bg-[#DCE6DE] rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retake Intake</span>
            </button>
          ) : (
            <button
              onClick={() => onSelectTab('intake')}
              className="px-4 py-2 text-xs font-medium text-white bg-[#2E4A3D] hover:bg-[#23382E] rounded-md transition-colors whitespace-nowrap shadow-sm"
            >
              Start Skin Diagnostic
            </button>
          )}
        </div>
      </div>

      {/* Mobile nav bar row for accessibility */}
      <div className="md:hidden flex items-center justify-around border-t border-[#E8E6DF] bg-[#FAF9F5] px-2 py-2 text-xs font-medium text-[#64748B]">
        {hasCompletedIntake && (
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`px-2 py-1 rounded ${currentTab === 'dashboard' ? 'text-[#2E4A3D] font-semibold bg-[#E9EFEA]' : ''}`}
          >
            Dashboard
          </button>
        )}
        <button
          onClick={() => onSelectTab('dupes')}
          className={`px-2 py-1 rounded ${currentTab === 'dupes' ? 'text-[#2E4A3D] font-semibold bg-[#E9EFEA]' : ''}`}
        >
          Dupes
        </button>
        <button
          onClick={() => onSelectTab('conflicts')}
          className={`px-2 py-1 rounded ${currentTab === 'conflicts' ? 'text-[#2E4A3D] font-semibold bg-[#E9EFEA]' : ''}`}
        >
          Conflicts
        </button>
        <button
          onClick={() => onSelectTab('holistic')}
          className={`px-2 py-1 rounded ${currentTab === 'holistic' ? 'text-[#2E4A3D] font-semibold bg-[#E9EFEA]' : ''}`}
        >
          Holistic Rx
        </button>
      </div>
    </header>
  );
};
