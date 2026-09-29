import React, { useState } from 'react';
import { CLINICAL_PRODUCTS } from '../../data/products';
import { SKINCARE_CATALOG, getProductById } from '../../data/skincareCatalog';
import { INDIA_CURATED_PRODUCTS } from '../../data/geoCatalog';
import { getVerifiedProduct } from '../../data/verifiedProducts';
import { Product } from '../../types/dermasync';
import { ProductThumbnail } from '../ProductThumbnail';
import { ArrowLeftRight, Check, Sparkles, DollarSign, ShieldCheck, Tag, Star } from 'lucide-react';
import { playWaterPop, playStepCompleteChime } from '../../utils/dewpointAudio';

interface ClinicalDupeLibraryProps {
  onSwapProduct?: (originalId: string, dupeId: string) => void;
  onOpenProductModal: (productId: string) => void;
}

export const ClinicalDupeLibrary: React.FC<ClinicalDupeLibraryProps> = ({
  onSwapProduct,
  onOpenProductModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const allAvailable = [...SKINCARE_CATALOG, ...INDIA_CURATED_PRODUCTS, ...CLINICAL_PRODUCTS];

  // Pair products that have dupeId
  const pairedProducts = allAvailable.filter(p => p.dupeId).map(original => {
    const dupe = getProductById(original.dupeId!) || allAvailable.find(d => d.id === original.dupeId);
    const origPriceInr = original.priceInr || Math.round(original.price * 83);
    const dupePriceInr = dupe ? (dupe.priceInr || Math.round(dupe.price * 83)) : 0;

    return {
      original,
      dupe,
      savingsInr: Math.max(0, origPriceInr - dupePriceInr),
      matchPercent: original.dupeActiveMatchPercent || 92
    };
  }).filter(p => p.dupe !== undefined);

  // De-duplicate pairs by original.id
  const uniquePairs = Array.from(new Map(pairedProducts.map(item => [item.original.id, item])).values());

  const categories = ['All', 'Serum', 'Moisturizer', 'Cleanser', 'Exfoliant', 'Toner', 'Sunscreen'];

  const filteredPairs = selectedCategory === 'All'
    ? uniquePairs
    : uniquePairs.filter(p => p.original.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#3B4655]/10 pb-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-[#8C5E4F] font-bold">
            SMART BUDGET SWAPS
          </span>
          <h3 className="text-2xl font-serif font-bold text-[#3B4655]">
            Clinical Dupes with Identical Actives
          </h3>
          <p className="text-xs text-[#3B4655]/70 font-sans mt-0.5">
            Get the same skincare results without the luxury price tag. Same active ingredient percentages, verified packaging, and Indian drugstore pricing.
          </p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              playWaterPop();
            }}
            className={`px-4 py-1.5 text-xs font-mono rounded-full transition-all whitespace-nowrap shadow-sm font-semibold cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#3B4655] text-white'
                : 'bg-white border border-[#3B4655]/10 text-[#3B4655]/70 hover:text-[#3B4655]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Paired Cards List */}
      <div className="space-y-6">
        {filteredPairs.map(({ original, dupe, savingsInr, matchPercent }) => {
          if (!dupe) return null;
          const origInr = original.priceInr || Math.round(original.price * 83);
          const dupeInr = dupe.priceInr || Math.round(dupe.price * 83);

          return (
            <div
              key={original.id}
              className="glass-card rounded-3xl p-6 sm:p-7 border border-[#3B4655]/10 space-y-6 shadow-sm"
            >
              {/* Category banner & Savings badge */}
              <div className="flex flex-wrap items-center justify-between border-b border-[#3B4655]/10 pb-4 text-xs font-mono gap-2">
                <span className="uppercase tracking-widest text-[#3B4655]/70 font-semibold">
                  STEP: <strong className="text-[#3B4655]">{original.category}</strong>
                </span>

                <div className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-900 font-semibold px-2.5 py-1 rounded-full text-xs shadow-xs border border-emerald-300">
                    {matchPercent}% Identical Actives
                  </span>
                  <span className="text-xs font-bold text-rose-800 bg-rose-100 border border-rose-300 px-3 py-1 rounded-full shadow-xs">
                    Save ₹{savingsInr.toLocaleString('en-IN')} ({(Math.round((savingsInr / origInr) * 100))}% off)
                  </span>
                </div>
              </div>

              {/* Side by side comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/* Column 1: Luxury Original */}
                {(() => {
                  const verifiedOrig = getVerifiedProduct(original.id);
                  const origBrand = verifiedOrig?.brand || original.brand;
                  const origName = verifiedOrig?.name || original.name;
                  const origBenefit = verifiedOrig?.plainEnglishBenefit || original.description;

                  return (
                    <div className="p-5 rounded-2xl bg-white dark:bg-[#121820] border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 shadow-sm">
                      <div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-xs uppercase font-bold text-slate-700 dark:text-slate-300">
                            High-End Original
                          </span>
                          <span className="text-base font-bold font-mono text-slate-900 dark:text-white">
                            ₹{origInr.toLocaleString('en-IN')}
                          </span>
                        </div>

                        {/* Product Packaging Thumbnail */}
                        <div className="my-3 flex justify-center">
                          <ProductThumbnail product={original} size="md" showBadge={false} className="shadow-xs" />
                        </div>

                        <span className="text-xs tracking-wider font-bold uppercase text-rose-700 dark:text-rose-400 block mb-0.5">
                          {origBrand}
                        </span>
                        <h4
                          onClick={() => onOpenProductModal(original.id)}
                          className="text-lg font-bold text-slate-900 dark:text-white hover:text-rose-700 dark:hover:text-rose-300 cursor-pointer transition-colors leading-snug"
                        >
                          {origName}
                        </h4>

                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed mt-2">
                          {origBenefit}
                        </p>

                        <div className="mt-4 space-y-2 pt-3 border-t border-slate-200 dark:border-slate-800 font-mono">
                          <div className="text-xs uppercase text-slate-800 dark:text-slate-200 font-bold">Key Actives:</div>
                          {original.keyActives?.map((act, i) => (
                            <div key={i} className="text-xs flex justify-between text-slate-800 dark:text-slate-200">
                              <span>{act.name}</span>
                              <span className="font-bold text-slate-900 dark:text-white">{act.concentration}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 text-xs font-mono text-slate-700 dark:text-slate-300">
                        Gentle pH: {original.ph} · {original.texture}
                      </div>
                    </div>
                  );
                })()}

                {/* Column 2: Bio-Equivalent Drugstore Dupe */}
                {(() => {
                  const verifiedDupe = getVerifiedProduct(dupe.id);
                  const dupeBrand = verifiedDupe?.brand || dupe.brand;
                  const dupeName = verifiedDupe?.name || dupe.name;
                  const dupeBenefit = verifiedDupe?.plainEnglishBenefit || dupe.description;

                  return (
                    <div className="p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-300 dark:border-rose-900 flex flex-col justify-between space-y-4 relative shadow-sm">
                      <div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-xs uppercase font-bold text-rose-800 dark:text-rose-300">
                            Smart Budget Alternative
                          </span>
                          <span className="text-base font-bold font-mono text-slate-900 dark:text-emerald-400">
                            ₹{dupeInr.toLocaleString('en-IN')}
                          </span>
                        </div>

                        {/* Product Packaging Thumbnail */}
                        <div className="my-3 flex justify-center">
                          <ProductThumbnail product={dupe} size="md" showBadge={false} className="shadow-xs" />
                        </div>

                        <span className="text-xs tracking-wider font-bold uppercase text-rose-700 dark:text-rose-400 block mb-0.5">
                          {dupeBrand}
                        </span>
                        <h4
                          onClick={() => onOpenProductModal(dupe.id)}
                          className="text-lg font-bold text-slate-900 dark:text-white hover:text-rose-700 dark:hover:text-rose-300 cursor-pointer transition-colors leading-snug"
                        >
                          {dupeName}
                        </h4>

                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed mt-2">
                          {dupeBenefit}
                        </p>

                        <div className="mt-4 space-y-2 pt-3 border-t border-rose-200 dark:border-rose-900/60 font-mono">
                          <div className="text-xs uppercase text-slate-800 dark:text-slate-200 font-bold">Matching Active Ingredients:</div>
                          {dupe.keyActives?.map((act, i) => (
                            <div key={i} className="text-xs flex justify-between text-slate-800 dark:text-slate-200">
                              <span>{act.name}</span>
                              <span className="font-bold text-rose-800 dark:text-rose-300">{act.concentration}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-rose-200 dark:border-rose-900/60 flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-700 dark:text-slate-300">
                          pH: {dupe.ph} · Pore-Safe
                        </span>

                        {onSwapProduct && (
                          <button
                            onClick={() => {
                              onSwapProduct(original.id, dupe.id);
                              playStepCompleteChime();
                            }}
                            className="px-4 py-2 bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 font-mono text-xs font-bold rounded-full transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                          >
                            <ArrowLeftRight className="w-3.5 h-3.5" />
                            <span>Switch to This Dupe</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
