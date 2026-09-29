import React from 'react';
import { SkinProfileMatrix, BudgetTier, RegimenStep, Product } from '../../types/dermasync';
import { SkinVitalsCard } from './SkinVitalsCard';
import { RoutineChecklist } from './RoutineChecklist';
import { CuratedShelf } from './CuratedShelf';
import { ProgressTimeline } from './ProgressTimeline';
import { ShieldAlert, Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';

interface DashboardViewProps {
  matrix: SkinProfileMatrix;
  budgetTier: BudgetTier;
  amSteps: RegimenStep[];
  pmSteps: RegimenStep[];
  conflictsDetected: string[];
  onOpenProductModal: (productId: string) => void;
  onSwapProduct: (originalId: string, dupeId: string) => void;
  onRetakeIntake: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  matrix,
  budgetTier,
  amSteps,
  pmSteps,
  conflictsDetected,
  onOpenProductModal,
  onSwapProduct,
  onRetakeIntake
}) => {
  // Collect all unique products across AM and PM
  const allProducts: Product[] = [
    ...amSteps.map(s => s.product),
    ...pmSteps.map(s => s.product)
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 animate-fade-in">
      {/* Top Protocol Status Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#F4F7F5] border border-[#DCE6DE] p-5 rounded-xl shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-mono text-[#2E4A3D] font-semibold">
              Active Regimen Protocol
            </span>
            <span className="text-xs text-[#64748B]">·</span>
            <span className="text-xs font-mono text-[#475569]">
              Formulation Tier: <strong className="capitalize text-[#1E293B]">{budgetTier}</strong>
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1E293B]">
            {matrix.primaryType} & {matrix.barrierStatus} Barrier Protocol
          </h2>
          <p className="text-xs text-[#475569] max-w-3xl">
            {matrix.recommendedFocus}
          </p>
        </div>

        <button
          onClick={onRetakeIntake}
          className="self-start md:self-auto px-4 py-2 text-xs font-medium text-[#2E4A3D] bg-white hover:bg-[#FAF9F5] border border-[#CBD5E1] rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retake Dermal Diagnostic</span>
        </button>
      </div>

      {/* Conflict Guardrail Notice if any */}
      {conflictsDetected.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3 text-xs text-amber-900">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-[#1E293B]">Automated Safety Protocol Active:</span>
            {conflictsDetected.map((c, i) => (
              <p key={i} className="text-[#475569]">{c}</p>
            ))}
          </div>
        </div>
      )}

      {/* Bento Grid Section 1: Skin Vitals Card */}
      <SkinVitalsCard matrix={matrix} budgetTier={budgetTier} />

      {/* Bento Grid Section 2: Interactive Routine Checklist */}
      <RoutineChecklist
        amSteps={amSteps}
        pmSteps={pmSteps}
        onOpenProductModal={onOpenProductModal}
      />

      {/* Bento Grid Section 3: Curated Active Shelf & 1-Click Dupes */}
      <CuratedShelf
        products={allProducts}
        profile={matrix}
        onOpenProductModal={onOpenProductModal}
        onSwapProduct={onSwapProduct}
      />

      {/* Bento Grid Section 4: Longitudinal Progress Timeline */}
      <ProgressTimeline />
    </div>
  );
};
