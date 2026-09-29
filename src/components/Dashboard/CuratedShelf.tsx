import React, { useState } from 'react';
import { Product, SkinProfileMatrix, BudgetTier } from '../../types/dermasync';
import { calculateReviewAffinity } from '../../services/diagnosticEngine';
import { CLINICAL_PRODUCTS } from '../../data/products';
import { ArrowLeftRight, Check, Sparkles, ExternalLink, ShieldCheck, Info } from 'lucide-react';

interface CuratedShelfProps {
  products: Product[];
  profile: SkinProfileMatrix;
  onOpenProductModal: (productId: string) => void;
  onSwapProduct: (originalId: string, dupeId: string) => void;
}

export const CuratedShelf: React.FC<CuratedShelfProps> = ({
  products,
  profile,
  onOpenProductModal,
  onSwapProduct
}) => {
  // Deduplicate products across shelf
  const uniqueProducts = Array.from(new Set(products.map(p => p.id)))
    .map(id => products.find(p => p.id === id)!)
    .filter(Boolean);

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F1EFEA] pb-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B]">
            Prescription Formulation Wardrobe
          </span>
          <h3 className="text-xl font-serif font-bold text-[#1E293B] mt-0.5">
            Curated Active Shelf & Clinical Dupes
          </h3>
        </div>

        <div className="text-xs text-[#64748B]">
          NLP Cohort Verified for: <span className="font-semibold text-[#1E293B]">{profile.barrierStatus} {profile.primaryType}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {uniqueProducts.map((product) => {
          const affinityData = calculateReviewAffinity(product, profile);
          const dupeProduct = product.dupeId ? CLINICAL_PRODUCTS.find(p => p.id === product.dupeId) : null;
          const savings = dupeProduct ? product.price - dupeProduct.price : 0;

          return (
            <div
              key={product.id}
              className="rounded-lg border border-[#E2E8F0] hover:border-[#CBD5E1] p-5 bg-[#FAF9F5]/50 flex flex-col justify-between transition-all shadow-xs group"
            >
              <div className="space-y-3">
                {/* Header row: category & Affinity score */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B]">
                    {product.category}
                  </span>

                  {/* Affinity score */}
                  <div
                    className="flex items-center gap-1 text-[11px] font-mono font-semibold text-[#2E4A3D] bg-[#E9EFEA] px-2 py-0.5 rounded"
                    title={`Calculated from ${affinityData.matchingCohortCount} verified patients with ${profile.barrierStatus.toLowerCase()} barrier`}
                  >
                    <span>{affinityData.affinityScore}% Cohort Affinity</span>
                  </div>
                </div>

                {/* Product Name & Brand */}
                <div>
                  <h4
                    onClick={() => onOpenProductModal(product.id)}
                    className="text-base font-serif font-bold text-[#1E293B] group-hover:text-[#2E4A3D] cursor-pointer transition-colors leading-snug"
                  >
                    {product.name}
                  </h4>
                  <div className="text-xs text-[#64748B] font-mono mt-0.5">
                    {product.brand} · ${product.price}
                  </div>
                </div>

                {/* Verified Review Insight Chip */}
                <div className="bg-white p-2.5 rounded border border-[#E2E8F0] text-xs text-[#334155] flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#2E4A3D] shrink-0 mt-0.5" />
                  <span className="leading-relaxed text-[11px]">
                    {affinityData.insightProse}
                  </span>
                </div>

                {/* Key Active Concentrations */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-mono text-[#64748B] uppercase">Primary Actives</div>
                  <div className="space-y-1">
                    {product.keyActives.map((act, i) => (
                      <div key={i} className="text-xs flex items-center justify-between text-[#475569]">
                        <span className="truncate pr-2">{act.name}</span>
                        <span className="font-mono text-[#1E293B] font-semibold shrink-0">{act.concentration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions: Dupe swap & Info */}
              <div className="mt-5 pt-4 border-t border-[#E8E6DF] space-y-2">
                {dupeProduct && savings > 0 && (
                  <button
                    onClick={() => onSwapProduct(product.id, dupeProduct.id)}
                    className="w-full py-1.5 px-2.5 text-[11px] font-medium text-[#1E293B] bg-white hover:bg-[#F1EFEA] border border-[#CBD5E1] rounded flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <ArrowLeftRight className="w-3 h-3 text-[#2E4A3D]" />
                      <span className="truncate">Swap with Dupe: {dupeProduct.name.slice(0, 18)}...</span>
                    </div>
                    <span className="text-emerald-700 font-mono font-semibold shrink-0">Save ${savings}</span>
                  </button>
                )}

                <div className="flex items-center justify-between gap-2 pt-1">
                  <button
                    onClick={() => onOpenProductModal(product.id)}
                    className="text-xs text-[#2E4A3D] hover:underline flex items-center gap-1 font-medium"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Clinical Profile</span>
                  </button>

                  <button
                    onClick={() => onOpenProductModal(product.id)}
                    className="px-3 py-1 text-xs font-medium text-white bg-[#2E4A3D] hover:bg-[#23382E] rounded transition-colors"
                  >
                    View Formula
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
