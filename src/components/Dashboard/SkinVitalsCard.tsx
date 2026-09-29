import React from 'react';
import { SkinProfileMatrix, BudgetTier } from '../../types/dermasync';
import { ShieldCheck, Droplets, Sun, Wind, Activity, AlertCircle, Sparkles } from 'lucide-react';

interface SkinVitalsCardProps {
  matrix: SkinProfileMatrix;
  budgetTier: BudgetTier;
}

export const SkinVitalsCard: React.FC<SkinVitalsCardProps> = ({ matrix, budgetTier }) => {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F1EFEA] pb-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B]">
            Patient Biomarker Monitor
          </span>
          <h3 className="text-xl font-serif font-bold text-[#1E293B] mt-0.5">
            Dermal Vitals & Barrier Kinetics
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-[#64748B]">Typology:</span>
          <span className="font-semibold text-[#2E4A3D] bg-[#E9EFEA] px-2 py-0.5 rounded">
            {matrix.primaryType} · {matrix.barrierStatus}
          </span>
        </div>
      </div>

      {/* 3 Metric Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Metric 1: Skin Shield Health */}
        <div className="bg-[#FAF9F5] p-4 rounded-lg border border-[#E8E6DF] space-y-2">
          <div className="flex items-center justify-between text-xs text-[#475569]">
            <span className="font-medium">Skin Shield Health</span>
            <ShieldCheck className="w-4 h-4 text-[#2E4A3D]" />
          </div>
          <div className="text-2xl font-serif font-bold text-[#1E293B]">
            {matrix.barrierHealthScore} <span className="text-xs font-normal text-[#64748B]">/ 100</span>
          </div>
          <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                matrix.barrierHealthScore > 75 ? 'bg-[#2E4A3D]' : matrix.barrierHealthScore > 50 ? 'bg-amber-500' : 'bg-rose-500'
              }`}
              style={{ width: `${matrix.barrierHealthScore}%` }}
            />
          </div>
          <p className="text-[11px] text-[#64748B]">
            {matrix.barrierStatus === 'Healthy'
              ? 'Strong natural shield against dirt, redness, and dryness'
              : matrix.barrierStatus === 'Sensitized'
              ? 'Easily irritated; needs soothing moisture'
              : 'Skin Dehydration & Moisture Loss detected'}
          </p>
        </div>

        {/* Metric 2: Dermal Hydration Level */}
        <div className="bg-[#FAF9F5] p-4 rounded-lg border border-[#E8E6DF] space-y-2">
          <div className="flex items-center justify-between text-xs text-[#475569]">
            <span className="font-medium">Hydration Saturation</span>
            <Droplets className="w-4 h-4 text-[#38BDF8]" />
          </div>
          <div className="text-2xl font-serif font-bold text-[#1E293B]">
            {matrix.hydrationIndex} <span className="text-xs font-normal text-[#64748B]">%</span>
          </div>
          <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#38BDF8] rounded-full"
              style={{ width: `${matrix.hydrationIndex}%` }}
            />
          </div>
          <p className="text-[11px] text-[#64748B]">
            {matrix.hydrationIndex < 45 ? 'Under-saturated; micro-cracks present' : 'Optimal stratum corneum water binding'}
          </p>
        </div>

        {/* Metric 3: Sebum Equilibrium */}
        <div className="bg-[#FAF9F5] p-4 rounded-lg border border-[#E8E6DF] space-y-2">
          <div className="flex items-center justify-between text-xs text-[#475569]">
            <span className="font-medium">Sebum Excretion Rate</span>
            <Activity className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-serif font-bold text-[#1E293B]">
            {matrix.sebumIndex} <span className="text-xs font-normal text-[#64748B]">/ 100</span>
          </div>
          <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full"
              style={{ width: `${matrix.sebumIndex}%` }}
            />
          </div>
          <p className="text-[11px] text-[#64748B]">
            {matrix.sebumIndex > 70 ? 'High follicular flow; requires BHA / Zinc' : 'Controlled lipid production'}
          </p>
        </div>
      </div>

      {/* Target Objectives & Directives */}
      <div className="pt-2 border-t border-[#F1EFEA] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[#475569]">
          <span className="font-medium text-[#1E293B]">Skin Goals:</span>
          <span>
            {matrix.flags.postInflammatoryErythema && 'Fading Red Breakout Spots · '}
            {matrix.flags.activeAcne && 'Clearing Pores · '}
            {matrix.flags.hyperpigmentation && 'Fading Dark Spots & Uneven Tone · '}
            Strengthening Natural Skin Shield
          </span>
        </div>

        <div className="text-[11px] font-mono text-[#64748B]">
          Budget Tier: <span className="capitalize font-semibold text-[#1E293B]">{budgetTier}</span>
        </div>
      </div>
    </div>
  );
};
