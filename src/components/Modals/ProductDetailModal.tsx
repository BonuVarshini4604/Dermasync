import React from 'react';
import { Product, SkinProfileMatrix } from '../../types/dermasync';
import { SKINCARE_CATALOG, getProductById } from '../../data/skincareCatalog';
import { CLINICAL_PRODUCTS } from '../../data/products';
import { INDIA_CURATED_PRODUCTS } from '../../data/geoCatalog';
import { calculateReviewAffinity } from '../../services/diagnosticEngine';
import { formatRegionalPrice } from '../../services/geoService';
import { ProductThumbnail } from '../ProductThumbnail';
import { getVerifiedProduct } from '../../data/verifiedProducts';
import { X, ShieldCheck, Sparkles, Clock, ArrowLeftRight, Check, Droplets, ExternalLink, ShoppingBag, Star, HeartHandshake } from 'lucide-react';

interface ProductDetailModalProps {
  productId: string | null;
  profile: SkinProfileMatrix;
  currencyCode?: 'INR' | 'USD' | 'GBP';
  onClose: () => void;
  onSwapProduct?: (originalId: string, dupeId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  productId,
  profile,
  currencyCode = 'INR',
  onClose,
  onSwapProduct
}) => {
  if (!productId) return null;

  const allAvailable = [...SKINCARE_CATALOG, ...INDIA_CURATED_PRODUCTS, ...CLINICAL_PRODUCTS];
  const product = getProductById(productId) || allAvailable.find(p => p.id === productId);
  if (!product) return null;

  const verifiedItem = getVerifiedProduct(product.id);
  const displayBrand = verifiedItem?.brand || product.brand;
  const displayName = verifiedItem?.name || product.name;
  const displayBenefit = verifiedItem?.plainEnglishBenefit || product.description;
  const displayBestFor = verifiedItem?.bestFor || product.bestFor;
  const displayKeyActives = verifiedItem?.keyActives || product.keyActives?.map(a => `${a.name}${a.concentration ? ` (${a.concentration})` : ''}`);

  const affinityData = calculateReviewAffinity(product, profile);
  const dupeProduct = product.dupeId ? (getProductById(product.dupeId) || allAvailable.find(p => p.id === product.dupeId)) : null;
  const formattedPrice = formatRegionalPrice(product.price, verifiedItem?.priceINR || product.priceInr, currencyCode);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#121820] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 p-6 sm:p-8 animate-fade-in my-8 text-slate-900 dark:text-slate-100">
        {/* Top Header with Verified Product Image Visual */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-4">
            <ProductThumbnail product={product} size="md" showBadge={false} className="shrink-0 shadow-sm" />
            <div>
              <span className="text-xs tracking-wider font-bold uppercase text-rose-700 dark:text-rose-400 block mb-0.5">
                {displayBrand}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                {displayName}
              </h3>
              <div className="text-xs text-slate-700 dark:text-slate-300 font-mono mt-0.5 flex items-center gap-2">
                <span className="text-base font-bold font-mono text-slate-900 dark:text-emerald-400">{formattedPrice}</span>
                <span>· {product.category}</span>
                <span>· pH {product.ph}</span>
              </div>
              {displayBestFor && (
                <div className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold mt-1 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Best For: {displayBestFor}</span>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-600 flex items-center justify-center text-slate-800 dark:text-slate-200 transition-colors shadow-xs self-start sm:self-center cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Match Score Card */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="bg-emerald-100 text-emerald-900 font-semibold px-2.5 py-1 rounded-full text-xs flex items-center gap-1 shadow-xs border border-emerald-300">
              <Star className="w-3.5 h-3.5 text-emerald-800 fill-emerald-800" />
              <span>{affinityData.affinityScore}% Match for Your Skin</span>
            </span>
            <span className="font-mono text-xs text-slate-700 dark:text-slate-300 font-medium">
              Based on {affinityData.matchingCohortCount} similar skin profiles
            </span>
          </div>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed italic">
            "{affinityData.insightProse}"
          </p>
        </div>

        {/* Plain English Benefit */}
        <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 shadow-xs">
          <div className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            What It Does:
          </div>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
            {displayBenefit}
          </p>
        </div>

        {/* Retailer Storefront Instant Buy Chips */}
        {((verifiedItem?.retailerLinks && verifiedItem.retailerLinks.length > 0) || (product.retailers && product.retailers.length > 0)) && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5 shadow-xs">
            <div className="flex items-center justify-between font-mono text-xs text-slate-800 dark:text-slate-200 font-bold">
              <span className="flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-rose-600" />
                WHERE TO BUY (AUTHENTIC PACKAGING):
              </span>
              <span className="text-emerald-800 dark:text-emerald-400 font-bold">Verified In-Stock</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {(verifiedItem?.retailerLinks || product.retailers || []).map((ret, idx) => (
                <a
                  key={idx}
                  href={ret.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all flex items-center gap-1.5 hover:scale-105 shadow-xs bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-800 dark:border-slate-200"
                >
                  <span>{ret.name}</span>
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Action-Oriented Simple Instructions */}
        <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs shadow-xs">
          <div className="font-mono text-xs text-slate-900 dark:text-slate-100 font-bold uppercase tracking-wider">
            How to Apply It
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-800 dark:text-slate-200">
            <div>
              <span className="text-slate-600 dark:text-slate-400 font-mono text-[10px] uppercase font-bold block">How much to use:</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm">{product.dosageGuidance}</span>
            </div>
            <div>
              <span className="text-slate-600 dark:text-slate-400 font-mono text-[10px] uppercase font-bold block">When to apply:</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                {product.targetTime === 'AM' ? 'Morning routine' : product.targetTime === 'PM' ? 'Night routine' : 'Morning or night'} {product.waitMinutes ? `· Wait ${product.waitMinutes} minutes before the next step` : '· Layer next step right away'}
              </span>
            </div>
          </div>
          {product.texture && (
            <p className="text-xs text-slate-700 dark:text-slate-300 pt-1 font-mono">
              Feel &amp; Texture: <strong className="font-semibold">{product.texture}</strong>
            </p>
          )}
        </div>

        {/* Active Ingredients & What They Do in Plain English */}
        <div className="space-y-3">
          <span className="font-mono text-xs uppercase tracking-wider text-slate-900 dark:text-slate-100 font-bold block">
            Active Ingredients (Key Actives):
          </span>
          <div className="space-y-2">
            {product.keyActives.map((active, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-rose-600" />
                  <span className="text-slate-900 dark:text-white font-bold">{active.name}</span>
                </div>

                <div className="flex items-center gap-3">
                  {active.concentration && (
                    <span className="text-slate-900 dark:text-slate-100 font-bold px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 shrink-0">
                      {active.concentration}
                    </span>
                  )}
                  {active.purpose && (
                    <span className="text-slate-700 dark:text-slate-300 text-xs font-sans font-medium">
                      {active.purpose}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges (Plain English) */}
        <div className="flex flex-wrap gap-2 pt-2">
          {product.badges.map((badge, idx) => {
            const cleanBadge = badge === 'Non-Comedogenic'
              ? 'Pore-Safe (Won’t Clog Pores)'
              : badge === 'Barrier-Supportive'
              ? 'Protects Skin Shield'
              : badge;
            return (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-full text-xs font-mono bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-xs font-medium"
              >
                ✓ {cleanBadge}
              </span>
            );
          })}
        </div>

        {/* Budget Swap Option if available */}
        {dupeProduct && (
          <div className="p-4 rounded-2xl bg-[#FFF6F0] border border-[#D49B86]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-sm">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#8C5E4F] font-bold">
                Smart Budget Swap Available (Save Money with the Same Key Ingredients)
              </span>
              <div className="font-serif font-bold text-[#3B4655] text-base mt-0.5">
                {dupeProduct.name} ({formatRegionalPrice(dupeProduct.price, dupeProduct.priceInr, currencyCode)})
              </div>
              <div className="text-[11px] text-[#3B4655]/70 font-mono">
                Contains the exact same active ingredients at a lower price.
              </div>
            </div>

            {onSwapProduct && (
              <button
                onClick={() => {
                  onSwapProduct(product.id, dupeProduct.id);
                  onClose();
                }}
                className="px-4 py-2 nectar-gradient hover:opacity-90 text-[#3B4655] font-mono font-bold rounded-full whitespace-nowrap transition-all shadow-sm"
              >
                Switch to Budget Swap
              </button>
            )}
          </div>
        )}

        {/* Close Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 btn-clinical-slate text-xs font-mono font-bold rounded-full transition-all"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
