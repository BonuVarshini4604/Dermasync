import React from 'react';
import { SkinProfileMatrix } from '../../types/dermasync';
import { ShieldCheck, Droplets, Flame, AlertTriangle, Sparkles, CheckCircle2 } from 'lucide-react';

interface SkinProfileMatrixCardProps {
  matrix: SkinProfileMatrix;
  onProceedToDashboard: () => void;
}

export const SkinProfileMatrixCard: React.FC<SkinProfileMatrixCardProps> = ({
  matrix,
  onProceedToDashboard
}) => {
  const getBarrierColor = (status: string) => {
    switch (status) {
      case 'Healthy':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Sensitized':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Compromised':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      default:
        return 'text-[#1E293B] bg-slate-50 border-slate-200';
    }
  };

  const flagsList = [
    { key: 'activeAcne', label: 'Active Pimples & Breakouts', active: matrix.flags.activeAcne },
    { key: 'postInflammatoryErythema', label: 'Red Breakout Spots', active: matrix.flags.postInflammatoryErythema },
    { key: 'hyperpigmentation', label: 'Dark Spots & Uneven Tone', active: matrix.flags.hyperpigmentation },
    { key: 'rosaceaRedness', label: 'Flushed Cheeks & Redness', active: matrix.flags.rosaceaRedness },
    { key: 'fineLines', label: 'Dryness Fine Lines', active: matrix.flags.fineLines },
    { key: 'fungalAcneRisk', label: 'Humidity Sweat Bump Risk', active: matrix.flags.fungalAcneRisk }
  ].filter(f => f.active);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Editorial Header */}
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-wider text-[#64748B] font-mono">
          Diagnostic Analysis Complete
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#1E293B]">
          Your Clinical Skin Profile Matrix
        </h2>
        <p className="text-sm text-[#64748B] max-w-xl mx-auto">
          Generated via multi-spectral biometric scanning and targeted neuro-sensory intake.
        </p>
      </div>

      {/* Bento Grid Matrix Display */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Card 1: Primary Classification (4 Cols) */}
        <div className="md:col-span-4 bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B]">
              Primary Dermal Typology
            </span>
            <div className="text-3xl font-serif font-bold text-[#1E293B] mt-1">
              {matrix.primaryType}
            </div>
            <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
              Sebum secretion rate is currently indexed at {matrix.sebumIndex}/100 with an epidermal moisture level of {matrix.hydrationIndex}/100.
            </p>
          </div>

          <div className="pt-4 border-t border-[#F1EFEA] mt-6">
            <div className="text-xs font-medium text-[#475569] mb-1">Sebum vs. Hydration Ratio</div>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-[11px] text-[#64748B] mb-0.5">
                  <span>Hydration Capacity</span>
                  <span className="font-mono tabular-nums">{matrix.hydrationIndex}%</span>
                </div>
                <div className="h-1.5 w-full bg-[#F1EFEA] rounded-full overflow-hidden">
                  <div className="h-full bg-[#38BDF8] rounded-full" style={{ width: `${matrix.hydrationIndex}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-[#64748B] mb-0.5">
                  <span>Sebaceous Output</span>
                  <span className="font-mono tabular-nums">{matrix.sebumIndex}%</span>
                </div>
                <div className="h-1.5 w-full bg-[#F1EFEA] rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${matrix.sebumIndex}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Barrier Integrity Status (4 Cols) */}
        <div className="md:col-span-4 bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B]">
              Stratum Corneum Integrity
            </span>
            <div className="text-3xl font-serif font-bold text-[#1E293B] mt-1 flex items-center gap-2">
              <span>{matrix.barrierStatus}</span>
            </div>
            <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
              Lipid envelope integrity is scoring at {matrix.barrierHealthScore}/100.
              {matrix.barrierStatus === 'Compromised' && ' Extreme precautions against aggressive active acids required.'}
              {matrix.barrierStatus === 'Sensitized' && ' Buffer with physiological ceramides prior to strong keratolytics.'}
              {matrix.barrierStatus === 'Healthy' && ' High resistance to active oxidative stress.'}
            </p>
          </div>

          <div className="pt-4 border-t border-[#F1EFEA] mt-6">
            <div className="flex items-center justify-between text-xs text-[#475569] mb-1">
              <span>Barrier Resilience Score</span>
              <span className="font-mono tabular-nums font-semibold text-[#1E293B]">
                {matrix.barrierHealthScore} / 100
              </span>
            </div>
            <div className="h-2 w-full bg-[#F1EFEA] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  matrix.barrierStatus === 'Healthy'
                    ? 'bg-[#2E4A3D]'
                    : matrix.barrierStatus === 'Sensitized'
                    ? 'bg-amber-500'
                    : 'bg-rose-500'
                }`}
                style={{ width: `${matrix.barrierHealthScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card 3: Clinical Flags Detected (4 Cols) */}
        <div className="md:col-span-4 bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B]">
              Active Biological Flags ({flagsList.length})
            </span>
            <div className="mt-3 space-y-2">
              {flagsList.length > 0 ? (
                flagsList.map((f) => (
                  <div key={f.key} className="flex items-start gap-2 text-xs text-[#1E293B]">
                    <span className="text-rose-500 font-bold">·</span>
                    <span className="font-medium">{f.label}</span>
                  </div>
                ))
              ) : (
                <div className="text-xs text-[#64748B]">No acute pathologies flagged.</div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-[#F1EFEA] mt-6 text-[11px] text-[#64748B]">
            All selected formulations automatically screen against these specific vulnerabilities.
          </div>
        </div>

        {/* Full-Width Diagnostic Synthesis & Prescription Summary (12 Cols) */}
        <div className="md:col-span-12 bg-[#F4F7F5] rounded-xl border border-[#DCE6DE] p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D4E0D7] pb-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#2E4A3D]">
                Clinical Strategy Directive
              </span>
              <h3 className="text-lg font-serif font-bold text-[#1E293B] mt-0.5">
                {matrix.recommendedFocus}
              </h3>
            </div>
          </div>

          <p className="text-sm text-[#334155] leading-relaxed">
            {matrix.summaryProse}
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#475569] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2E4A3D]" />
              <span>Full AM/PM regimen generated with wait-times and active conflict protection.</span>
            </div>

            <button
              onClick={onProceedToDashboard}
              className="w-full sm:w-auto px-8 py-3 bg-[#2E4A3D] hover:bg-[#23382E] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Access Your Protocol Dashboard</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
