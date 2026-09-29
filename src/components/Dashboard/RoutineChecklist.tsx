import React, { useState, useEffect } from 'react';
import { RegimenStep } from '../../types/dermasync';
import { Clock, Play, Pause, RotateCcw, Check, Sparkles, AlertCircle, Sun, Moon } from 'lucide-react';

interface RoutineChecklistProps {
  amSteps: RegimenStep[];
  pmSteps: RegimenStep[];
  onOpenProductModal: (productId: string) => void;
}

export const RoutineChecklist: React.FC<RoutineChecklistProps> = ({
  amSteps,
  pmSteps,
  onOpenProductModal
}) => {
  const [activeRegimen, setActiveRegimen] = useState<'AM' | 'PM'>('AM');
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  // Active Timer state
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [activeTimerLabel, setActiveTimerLabel] = useState<string>('');
  const [totalTimerDuration, setTotalTimerDuration] = useState<number>(0);

  const steps = activeRegimen === 'AM' ? amSteps : pmSteps;

  const toggleStep = (stepKey: string) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepKey]: !prev[stepKey]
    }));
  };

  const startStepTimer = (minutes: number, label: string) => {
    const totalSec = minutes * 60;
    setTotalTimerDuration(totalSec);
    setTimerSecondsLeft(totalSec);
    setActiveTimerLabel(label);
    setIsTimerRunning(true);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timerSecondsLeft !== null && timerSecondsLeft > 0) {
      interval = setInterval(() => {
        setTimerSecondsLeft((prev) => {
          if (prev !== null && prev <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return (prev || 1) - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSecondsLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Completion calculation
  const completedCount = steps.filter(s => completedSteps[`${activeRegimen}-${s.stepNumber}`]).length;
  const progressPct = Math.round((completedCount / (steps.length || 1)) * 100);

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm space-y-6">
      {/* Header and Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1EFEA] pb-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B]">
            Interactive Daily Protocol
          </span>
          <h3 className="text-xl font-serif font-bold text-[#1E293B] mt-0.5">
            Application Regimen & Precision Dosage
          </h3>
        </div>

        {/* AM / PM Segmented Toggle */}
        <div className="flex items-center gap-1 bg-[#FAF9F5] p-1 rounded-lg border border-[#E8E6DF] self-start sm:self-auto">
          <button
            onClick={() => setActiveRegimen('AM')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeRegimen === 'AM'
                ? 'bg-white text-[#1E293B] shadow-xs font-semibold'
                : 'text-[#64748B] hover:text-[#1E293B]'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span>Morning (AM) Regimen</span>
          </button>

          <button
            onClick={() => setActiveRegimen('PM')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeRegimen === 'PM'
                ? 'bg-white text-[#1E293B] shadow-xs font-semibold'
                : 'text-[#64748B] hover:text-[#1E293B]'
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-indigo-500" />
            <span>Evening (PM) Regimen</span>
          </button>
        </div>
      </div>

      {/* Progress & Active Countdown Timer Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#F8FAFC] p-4 rounded-lg border border-[#E2E8F0]">
        <div className="w-full sm:w-auto">
          <div className="flex items-center gap-2 text-xs font-medium text-[#475569]">
            <span>{activeRegimen} Protocol Adherence:</span>
            <span className="font-semibold text-[#1E293B] font-mono">{completedCount} of {steps.length} Steps Complete</span>
          </div>
          <div className="w-48 sm:w-64 bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden mt-1.5">
            <div className="bg-[#2E4A3D] h-full rounded-full transition-all duration-300" style={{ width: `${progressPct}%` }} />
          </div>
        </div>

        {/* Live Wait-Time Stopwatch if active */}
        {timerSecondsLeft !== null && (
          <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3 bg-white px-3.5 py-2 rounded-md border border-[#CBD5E1] shadow-xs">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#2E4A3D] animate-pulse" />
              <div>
                <div className="text-[10px] uppercase font-mono text-[#64748B] truncate max-w-[140px]">
                  {activeTimerLabel}
                </div>
                <div className="text-sm font-mono font-bold text-[#1E293B] tabular-nums">
                  {formatTime(timerSecondsLeft)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="p-1 rounded hover:bg-[#F1EFEA] text-[#1E293B]"
                title={isTimerRunning ? 'Pause' : 'Resume'}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => {
                  setTimerSecondsLeft(null);
                  setIsTimerRunning(false);
                }}
                className="p-1 rounded hover:bg-[#F1EFEA] text-[#64748B]"
                title="Cancel Timer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Step by Step List */}
      <div className="space-y-3">
        {steps.map((step) => {
          const stepKey = `${activeRegimen}-${step.stepNumber}`;
          const isDone = !!completedSteps[stepKey];

          return (
            <div
              key={stepKey}
              className={`p-4 sm:p-5 rounded-lg border transition-all ${
                isDone
                  ? 'bg-[#F9FAF8] border-[#DCE6DE] opacity-85'
                  : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1] shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  {/* Checkbox button */}
                  <button
                    onClick={() => toggleStep(stepKey)}
                    className={`mt-0.5 w-6 h-6 rounded border flex items-center justify-center transition-colors shrink-0 ${
                      isDone
                        ? 'bg-[#2E4A3D] border-[#2E4A3D] text-white'
                        : 'border-[#CBD5E1] hover:border-[#2E4A3D] bg-white'
                    }`}
                  >
                    {isDone && <Check className="w-4 h-4 stroke-[3]" />}
                  </button>

                  <div className="space-y-1 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-mono text-[#64748B]">
                        Step {step.stepNumber} · {step.product.category}
                      </span>
                      <span className="text-[11px] font-medium text-[#2E4A3D] bg-[#E9EFEA] px-2 py-0.5 rounded">
                        Apply to {step.skinCondition}
                      </span>
                      {step.waitDurationMinutes > 0 && (
                        <span className="text-[11px] font-mono text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>Wait {step.waitDurationMinutes} min</span>
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4
                        onClick={() => onOpenProductModal(step.product.id)}
                        className={`text-base font-serif font-bold cursor-pointer hover:text-[#2E4A3D] transition-colors ${
                          isDone ? 'line-through text-[#64748B]' : 'text-[#1E293B]'
                        }`}
                      >
                        {step.product.name}
                      </h4>
                      <span className="text-xs text-[#64748B] font-mono">
                        {step.product.brand} · ${step.product.price}
                      </span>
                    </div>

                    {/* Exact Dosage Guidance */}
                    <div className="text-xs font-medium text-[#334155] pt-0.5">
                      <span className="text-[#64748B]">Dosage:</span> {step.dosage}
                    </div>

                    {/* Clinical Application Instruction */}
                    <p className="text-xs text-[#64748B] leading-relaxed pt-1">
                      {step.clinicalNote}
                    </p>
                  </div>
                </div>

                {/* Right Action: Wait timer launcher */}
                {step.waitDurationMinutes > 0 && (
                  <button
                    onClick={() => startStepTimer(step.waitDurationMinutes, `${step.product.category} Wait Time`)}
                    className="shrink-0 px-2.5 py-1.5 text-xs font-medium text-[#2E4A3D] bg-[#E9EFEA] hover:bg-[#DCE6DE] rounded flex items-center gap-1 transition-colors whitespace-nowrap"
                  >
                    <Play className="w-3 h-3" />
                    <span className="hidden sm:inline">Start {step.waitDurationMinutes}m Timer</span>
                    <span className="sm:hidden">{step.waitDurationMinutes}m</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
