import React from 'react';
import { BudgetTier } from '../../types/dermasync';
import { ShieldCheck, Tag, Sparkles, Check, ArrowRight } from 'lucide-react';

interface BudgetTierStepProps {
  selectedTier: BudgetTier;
  onSelectTier: (tier: BudgetTier) => void;
  onGenerateProtocol: () => void;
  onBack: () => void;
  isGenerating: boolean;
}

export const BudgetTierStep: React.FC<BudgetTierStepProps> = ({
  selectedTier,
  onSelectTier,
  onGenerateProtocol,
  onBack,
  isGenerating
}) => {
  const tiers = [
    {
      id: 'drugstore' as BudgetTier,
      title: 'Budget-Friendly (Drugstore Clinical)',
      costPerStep: '$11 – $26 / item',
      fullRegimenAvg: '$68 total routine',
      tagline: 'Bio-equivalent active concentrations with smart minimalist packaging',
      pros: [
        'Pure single-molecule actives (Geek & Gorgeous, Peach Slices, The Ordinary)',
        'Zero mark-up on patented marketing packaging',
        'Same active percentages (2% BHA, 10% Azelaic, 20% Vit C)',
        'Ideal for budget-conscious scientific routines'
      ]
    },
    {
      id: 'balanced' as BudgetTier,
      title: 'Balanced (High-Efficacy Mid-Range)',
      costPerStep: '$28 – $55 / item',
      fullRegimenAvg: '$148 total routine',
      tagline: 'Optimal balance of delivery vehicles, texture elegance, and clinical potency',
      pros: [
        'Formulated with advanced soothing buffers (Centella, Oat Beta-Glucan, Ectoin)',
        'Superior sensory texture that layers invisibly under makeup/SPF',
        'Airless vacuum pump stability against photo-oxidation',
        'Dermatologist clinic standard (EltaMD, Paula’s Choice, DermaSync Lab)'
      ]
    },
    {
      id: 'clinical' as BudgetTier,
      title: 'Clinical / Medical-Grade (Patented Formulations)',
      costPerStep: '$65 – $182 / item',
      fullRegimenAvg: '$340 total routine',
      tagline: 'Pharmaceutical-grade research patents, Duke Antioxidant patents, and triple lipid ratios',
      pros: [
        'Gold-standard Duke patent 15% L-Ascorbic Acid + 1% Alpha Tocopherol + 0.5% Ferulic',
        'Triple Lipid 2:4:2 physiological membrane reconstituting lipid balance',
        'Proprietary encapsulated retinaldehyde delivery technology',
        'Direct bio-equivalent dupe toggles available at any moment on your shelf'
      ]
    }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Editorial Title */}
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-wider text-[#64748B] font-mono">
          Phase 03 · Regimen Investment Calibration
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif text-[#1E293B]">
          Routine Budget & Formulation Tier
        </h2>
        <p className="text-sm text-[#64748B] max-w-lg mx-auto">
          DermaSync matches bio-equivalent actives at every price point. You can swap any individual product with its clinical dupe with one click later.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {tiers.map((t) => {
          const isSelected = selectedTier === t.id;
          return (
            <div
              key={t.id}
              onClick={() => onSelectTier(t.id)}
              className={`cursor-pointer rounded-xl border p-6 flex flex-col justify-between transition-all bg-white relative ${
                isSelected
                  ? 'border-[#2E4A3D] ring-2 ring-[#2E4A3D] shadow-md'
                  : 'border-[#E2E8F0] hover:border-[#CBD5E1] shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-mono text-[#64748B]">
                    {t.id}
                  </span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-[#2E4A3D] border-[#2E4A3D] text-white' : 'border-[#CBD5E1]'
                  }`}>
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>

                <h3 className="text-base font-serif font-bold text-[#1E293B] mt-2">
                  {t.title}
                </h3>

                <div className="mt-3 pt-3 border-t border-[#F1EFEA]">
                  <div className="text-lg font-serif font-semibold text-[#1E293B]">
                    {t.costPerStep}
                  </div>
                  <div className="text-xs text-[#64748B]">
                    Est. {t.fullRegimenAvg}
                  </div>
                </div>

                <p className="text-xs text-[#475569] mt-3 leading-relaxed">
                  {t.tagline}
                </p>

                <div className="mt-4 pt-4 border-t border-[#F1EFEA] space-y-2">
                  {t.pros.map((pro, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] text-[#64748B] leading-tight">
                      <span className="text-[#2E4A3D] font-bold">·</span>
                      <span>{pro}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F1EFEA]">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTier(t.id);
                  }}
                  className={`w-full py-2 px-3 text-xs font-medium rounded-md transition-colors ${
                    isSelected
                      ? 'bg-[#2E4A3D] text-white'
                      : 'bg-[#F1EFEA] text-[#1E293B] hover:bg-[#E5E2D9]'
                  }`}
                >
                  {isSelected ? 'Selected Tier' : 'Select Tier'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-medium text-[#64748B] hover:text-[#1E293B] transition-colors"
        >
          ← Back to Symptoms Quiz
        </button>

        <button
          type="button"
          disabled={isGenerating}
          onClick={onGenerateProtocol}
          className="w-full sm:w-auto px-8 py-3 bg-[#2E4A3D] hover:bg-[#23382E] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Synthesizing Skin Profile Matrix...</span>
            </>
          ) : (
            <>
              <span>Synthesize Clinical Protocol</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
