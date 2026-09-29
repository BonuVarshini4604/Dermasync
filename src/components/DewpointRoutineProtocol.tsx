import React, { useState, useEffect } from 'react';
import { RegimenStep, GeoEnvironmentalData } from '../types/dermasync';
import { Sun, Moon, Clock, Play, Pause, RotateCcw, Check, Sparkles, ChevronRight, Droplets, Info, AlertTriangle } from 'lucide-react';
import { playStepCompleteChime, playTimerFinishChime, playWaterPop } from '../utils/dewpointAudio';
import { formatRegionalPrice } from '../services/geoService';
import { ProductThumbnail } from './ProductThumbnail';
import { getVerifiedProduct } from '../data/verifiedProducts';

interface DewpointRoutineProtocolProps {
  amSteps: RegimenStep[];
  pmSteps: RegimenStep[];
  geoData: GeoEnvironmentalData;
  onOpenProductModal: (productId: string) => void;
}

export const DewpointRoutineProtocol: React.FC<DewpointRoutineProtocolProps> = ({
  amSteps,
  pmSteps,
  geoData,
  onOpenProductModal
}) => {
  const [activeTab, setActiveTab] = useState<'AM' | 'PM'>('AM');
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({
    'AM-1': true,
    'AM-2': true
  });

  // Active Timer state
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [activeTimerStepId, setActiveTimerStepId] = useState<string | null>(null);
  const [activeTimerTitle, setActiveTimerTitle] = useState<string>('');

  const currentSteps = activeTab === 'AM' ? amSteps : pmSteps;

  const toggleStep = (stepKey: string) => {
    const nextState = !completedSteps[stepKey];
    setCompletedSteps(prev => ({
      ...prev,
      [stepKey]: nextState
    }));
    if (nextState) {
      playStepCompleteChime();
    } else {
      playWaterPop();
    }
  };

  const handleStartTimer = (stepId: string, durationMinutes: number, title: string) => {
    setActiveTimerStepId(stepId);
    setActiveTimerTitle(title);
    setTimerSecondsLeft(durationMinutes * 60);
    setIsTimerRunning(true);
    playWaterPop();
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timerSecondsLeft !== null && timerSecondsLeft > 0) {
      interval = setInterval(() => {
        setTimerSecondsLeft((prev) => {
          if (prev !== null && prev <= 1) {
            setIsTimerRunning(false);
            playTimerFinishChime();
            return 0;
          }
          return (prev || 1) - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSecondsLeft]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Completion calculation
  const completedCount = currentSteps.filter(s => completedSteps[`${activeTab}-${s.stepNumber}`]).length;
  const progressPct = Math.round((completedCount / (currentSteps.length || 1)) * 100);

  const isAM = activeTab === 'AM';

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
      {/* Top Protocol Header & AM/PM Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#3B4655]/10 pb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full nectar-gradient shadow-[0_0_8px_rgba(212,155,134,0.6)]" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#8C5E4F] font-bold">
              STEP-BY-STEP DAILY ROUTINE
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#3B4655] tracking-tight">
            Your Morning & Night Steps
          </h3>
          <p className="text-xs text-[#3B4655]/70 font-sans mt-0.5">
            Follow the exact order below. Tap any product for simple instructions.
          </p>
        </div>

        {/* AM / PM Frosted Toggle */}
        <div className="flex items-center gap-1.5 glass-pill p-1.5 rounded-full self-start sm:self-auto shadow-sm">
          <button
            onClick={() => {
              setActiveTab('AM');
              playWaterPop();
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold transition-all ${
              activeTab === 'AM'
                ? 'nectar-gradient text-[#3B4655] shadow-sm'
                : 'text-[#3B4655]/70 hover:text-[#3B4655]'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            <span>Morning Routine</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('PM');
              playWaterPop();
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold transition-all ${
              activeTab === 'PM'
                ? 'bg-[#3B4655] text-white shadow-sm'
                : 'text-[#3B4655]/70 hover:text-[#3B4655]'
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-[#F6D5C3]" />
            <span>Night Routine</span>
          </button>
        </div>
      </div>

      {/* Adherence Progress Bar & Floating Stopwatch Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white/70 border border-[#3B4655]/10 relative z-10 shadow-sm">
        <div className="w-full sm:w-auto">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-[#3B4655]/70">
              {activeTab === 'AM' ? 'Morning Routine:' : 'Night Routine:'}
            </span>
            <span className="font-bold text-[#3B4655]">
              {completedCount} of {currentSteps.length} steps checked off ({progressPct}%)
            </span>
          </div>
          <div className="w-full sm:w-72 bg-[#FAF9F6] h-2.5 rounded-full overflow-hidden mt-2 p-0.5 border border-[#3B4655]/10">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                isAM
                  ? 'nectar-gradient shadow-[0_0_10px_rgba(212,155,134,0.5)]'
                  : 'bg-[#3B4655] shadow-[0_0_10px_rgba(59,70,85,0.3)]'
              }`}
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Global Active Wait Timer Card if ticking */}
        {timerSecondsLeft !== null && (
          <div className="w-full sm:w-auto flex items-center justify-between gap-4 px-4 py-2.5 rounded-full bg-white border border-[#D49B86]/40 shadow-lg animate-fade-in">
            <div className="flex items-center gap-2.5 font-mono">
              <Clock className="w-4 h-4 text-[#D49B86] animate-spin" style={{ animationDuration: '4s' }} />
              <div>
                <div className="text-[10px] text-[#3B4655]/70 uppercase tracking-wider truncate max-w-[120px]">
                  {activeTimerTitle || 'Let It Absorb'}
                </div>
                <div className="text-sm font-bold text-[#3B4655] tabular-nums tracking-widest">
                  {formatTimer(timerSecondsLeft)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="w-7 h-7 rounded-full bg-[#FAF9F6] hover:bg-white border border-[#3B4655]/15 flex items-center justify-center text-[#3B4655] transition-colors shadow-sm"
                title={isTimerRunning ? 'Pause' : 'Resume'}
              >
                {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              </button>
              <button
                onClick={() => {
                  setTimerSecondsLeft(null);
                  setIsTimerRunning(false);
                }}
                className="w-7 h-7 rounded-full bg-[#FAF9F6] hover:bg-white border border-[#3B4655]/15 flex items-center justify-center text-[#3B4655]/60 hover:text-[#3B4655] transition-colors shadow-sm"
                title="Cancel Timer"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Solar Radiance Warning Banner (AM with UV > 6) */}
      {isAM && geoData.uvIndex > 6 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 border border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono shadow-[0_12px_28px_-6px_rgba(245,158,11,0.18)] relative overflow-hidden">
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 shrink-0 shadow-sm">
              <Sun className="w-5 h-5 animate-spin" style={{ animationDuration: '12s' }} />
            </div>
            <div>
              <div className="font-bold text-[#3B4655] text-sm flex items-center gap-2">
                <span>Bright Sun in {geoData.city} Today (UV {geoData.uvIndex})</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-300">
                  Sunscreen Needed
                </span>
              </div>
              <div className="text-[#3B4655]/85 text-[11px] mt-0.5 font-sans">
                The sunshine is intense right now! Apply two full finger-lengths of sunscreen, and remember to touch it up every 45 minutes if you are outside or sitting next to a sunny window.
              </div>
            </div>
          </div>
          <button
            onClick={() => handleStartTimer('AM-SPF-REAPPLY', 45, 'Sunscreen Touch-Up')}
            className="px-4 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-[#3B4655] font-bold text-xs shrink-0 transition-colors shadow-md flex items-center gap-2 self-start sm:self-auto relative z-10"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Start 45m Sunscreen Timer</span>
          </button>
        </div>
      )}

      {/* Step by Step Routine Cards */}
      <div className="space-y-4 relative z-10">
        {currentSteps.map((step) => {
          const stepKey = `${activeTab}-${step.stepNumber}`;
          const isDone = !!completedSteps[stepKey];
          const hasWait = step.waitDurationMinutes && step.waitDurationMinutes > 0;
          const isCurrentTimer = activeTimerStepId === stepKey && timerSecondsLeft !== null && timerSecondsLeft > 0;
          const isSpf = step.product.category === 'Sunscreen';
          const isSpfHighUv = isSpf && geoData.uvIndex > 6;

          return (
            <div
              key={stepKey}
              className={`rounded-2xl transition-all duration-300 relative overflow-hidden group border ${
                isSpfHighUv
                  ? 'border-amber-400/80 shadow-[0_16px_36px_-8px_rgba(245,158,11,0.22)] bg-gradient-to-r from-amber-50/90 to-white/90'
                  : isDone
                  ? 'bg-gradient-to-r from-[#FFF5F0]/90 to-white/90 border-[#D49B86]/40 shadow-[0_16px_32px_-8px_rgba(212,155,134,0.22)]'
                  : 'bg-white/80 hover:bg-white border-[#3B4655]/10 hover:border-[#D49B86]/40 shadow-[0_12px_28px_-8px_rgba(212,155,134,0.14)] hover:shadow-[0_20px_40px_-10px_rgba(212,155,134,0.25)]'
              }`}
            >
              {/* Iridescent shimmer highlight line on top */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-white via-white/90 to-[#D49B86]/30 pointer-events-none" />

              <div className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                <div className="flex items-start gap-4 flex-1">
                  {/* Check-off Button with Liquid Glow Pulse on Completion */}
                  <button
                    onClick={() => toggleStep(stepKey)}
                    className={`mt-0.5 w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isDone
                        ? 'nectar-gradient border-white text-[#3B4655] shadow-[0_0_14px_rgba(212,155,134,0.6)] liquid-glow-pulse'
                        : 'border-[#3B4655]/20 bg-white hover:border-[#D49B86] text-transparent shadow-sm'
                    }`}
                    title={isDone ? 'Mark as Not Done' : 'Mark as Completed'}
                  >
                    <Check className={`w-4 h-4 stroke-[3] transition-transform ${isDone ? 'scale-100' : 'scale-50'}`} />
                  </button>

                  {/* Authentic Product Packaging Thumbnail */}
                  <div 
                    onClick={() => onOpenProductModal(step.product.id)}
                    className="cursor-pointer shrink-0 hidden xs:block"
                    title="View Product Details"
                  >
                    <ProductThumbnail product={step.product} size="sm" showBadge={false} className="shadow-xs hover:scale-105 transition-transform" />
                  </div>

                  {/* Step Description & Details */}
                  <div className="space-y-2 flex-1">
                    {(() => {
                      const verifiedItem = getVerifiedProduct(step.product.id);
                      const displayBrand = verifiedItem?.brand || step.product.brand;
                      const displayName = verifiedItem?.name || step.product.name;
                      const displayBenefit = verifiedItem?.plainEnglishBenefit || step.clinicalNote;

                      return (
                        <>
                          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 uppercase font-bold text-[10px]">
                              STEP 0{step.stepNumber} · {step.product.category}
                            </span>

                            {/* Climate Badge if applicable */}
                            {step.climateBadge && (
                              <span className={`px-2.5 py-0.5 rounded-full border font-bold text-[10px] ${
                                step.climateBadge.includes('Swap') || step.climateBadge.includes('humid')
                                  ? 'bg-rose-100 text-rose-900 border-rose-300'
                                  : step.climateBadge.includes('Smog') || step.climateBadge.includes('Air')
                                  ? 'bg-purple-100 text-purple-900 border-purple-300'
                                  : 'bg-amber-100 text-amber-900 border-amber-300'
                              }`}>
                                ⚡ {step.climateBadge}
                              </span>
                            )}

                            {/* Exact Amount Pill */}
                            <span className="px-2.5 py-0.5 rounded-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold flex items-center gap-1 shadow-xs text-[10px]">
                              <Droplets className="w-3 h-3 text-sky-600" />
                              <span>Use: {step.dosage}</span>
                            </span>

                            {/* When to Apply Pill */}
                            <span className={`px-2.5 py-0.5 rounded-full border font-semibold text-[10px] ${
                              step.skinCondition === 'damp skin'
                                ? 'bg-sky-100 border-sky-300 text-sky-900'
                                : 'bg-amber-100 border-amber-300 text-amber-900'
                            }`}>
                              {step.skinCondition === 'damp skin'
                                ? 'Apply on damp skin'
                                : 'Wait until skin is dry'}
                            </span>
                          </div>

                          {/* Brand Micro-header & Product Name */}
                          <div className="pt-0.5">
                            <span className="text-xs tracking-wider font-bold uppercase text-rose-700 dark:text-rose-400 block mb-0.5">
                              {displayBrand}
                            </span>
                            <div className="flex flex-wrap items-baseline justify-between gap-3">
                              <h4
                                onClick={() => onOpenProductModal(step.product.id)}
                                className={`text-lg font-bold cursor-pointer transition-colors leading-snug ${
                                  isDone ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white hover:text-rose-700 dark:hover:text-rose-300'
                                }`}
                              >
                                {displayName}
                              </h4>
                              <div className="text-base font-bold font-mono text-slate-900 dark:text-emerald-400">
                                {formatRegionalPrice(step.product.price, step.product.priceInr, geoData.currencyCode)}
                              </div>
                            </div>
                          </div>

                          {/* Plain-English Benefit: Clean, high-legibility body text */}
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl">
                            {displayBenefit}
                          </p>
                        </>
                      );
                    })()}
                  </div>
                </div>

                {/* Right Zone: Wait Timer Launcher Button */}
                {hasWait && (
                  <div className="flex items-center gap-2 self-start md:self-auto shrink-0 font-mono text-xs">
                    <button
                      onClick={() => handleStartTimer(stepKey, step.waitDurationMinutes, `${step.product.category}`)}
                      className={`px-3.5 py-2 rounded-full border transition-all flex items-center gap-2 shadow-sm ${
                        isCurrentTimer
                          ? 'nectar-gradient border-white text-[#3B4655] font-bold shadow-md'
                          : 'bg-white hover:bg-[#FAF9F6] border-[#3B4655]/15 text-[#3B4655]'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5 text-[#D49B86]" />
                      <span>{isCurrentTimer ? `Resting: ${formatTimer(timerSecondsLeft || 0)}` : `Let it absorb (${step.waitDurationMinutes}m)`}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
