import React, { useState } from 'react';
import { Product } from '../types/dermasync';
import { ShieldCheck, Sparkles, Clock, Package } from 'lucide-react';
import { getProductById } from '../data/skincareCatalog';
import { VERIFIED_PACKAGING_MAP } from '../data/productPackagingAssets';
import { getVerifiedProduct } from '../data/verifiedProducts';

interface ProductThumbnailProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'fill';
  showBadge?: boolean;
  customBadge?: string;
  badgePosition?: 'top-right' | 'top-left';
  className?: string;
}

export const ProductThumbnail: React.FC<ProductThumbnailProps> = ({
  product,
  size = 'fill',
  showBadge = true,
  customBadge,
  badgePosition = 'top-right',
  className = ''
}) => {
  const [hasError, setHasError] = useState(false);

  // Lookup in verifiedProducts and skincareCatalog single source of truth
  const verifiedProd = getVerifiedProduct(product.id);
  const catalogItem = getProductById(product.id) || product;
  const verifiedImageUrl = verifiedProd?.officialImageUrl
    || VERIFIED_PACKAGING_MAP[product.id] 
    || catalogItem.imageUrl 
    || catalogItem.image 
    || product.imageUrl 
    || product.image;

  // Determine badge text per specification
  const badgeText = customBadge || (
    catalogItem.badges?.find(b => b.includes('Instant Delivery') || b.includes('10 mins'))
      ? 'Instant Delivery (10 mins)'
      : catalogItem.retailers?.[0]?.name
      ? `${catalogItem.retailers[0].name} · Authentic`
      : 'Verified Authentic Packaging'
  );

  const isInstant = badgeText.toLowerCase().includes('10 mins') || badgeText.toLowerCase().includes('blinkit');

  // Dimension classes based on size prop
  const sizeClasses = {
    sm: 'w-14 h-14 rounded-xl p-1',
    md: 'w-24 h-24 sm:w-28 sm:h-28 rounded-2xl p-2',
    lg: 'w-36 h-36 rounded-2xl p-3',
    xl: 'w-48 h-48 rounded-2xl p-4',
    fill: 'w-full aspect-square rounded-2xl p-4'
  }[size];

  // Fallback packaging illustrator for each brand SKU
  const renderPackagingFallback = () => {
    const brandLower = catalogItem.brand.toLowerCase();
    const nameLower = catalogItem.name.toLowerCase();

    // 1. Cetaphil: Iconic white bottle with royal blue shield & pump
    if (brandLower.includes('cetaphil')) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center select-none relative">
          <div className="w-20 sm:w-24 h-28 sm:h-32 rounded-2xl bg-white border-2 border-sky-200/80 shadow-md flex flex-col items-center justify-between p-2 relative overflow-hidden">
            <div className="w-6 h-3 rounded-t-md bg-sky-600 -mt-3.5 mb-1" />
            <div className="w-2.5 h-2 bg-slate-300" />
            <div className="w-14 py-1 rounded-md bg-sky-600 text-white font-sans text-[8px] font-extrabold tracking-wider uppercase shadow-xs">
              Cetaphil
            </div>
            <div className="text-[7px] font-mono text-slate-700 leading-tight font-bold px-1">
              GENTLE SKIN CLEANSER
            </div>
            <div className="w-12 h-1 rounded-full bg-emerald-500/80 mt-1" />
            <div className="text-[6px] font-mono text-slate-500 uppercase mt-0.5">
              Hydrating Formula
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#8C5E4F] font-bold mt-2">
            Cetaphil Gentle Cleanser
          </span>
        </div>
      );
    }

    // 2. The Derma Co: Clean white clinical dropper bottle
    if (brandLower.includes('derma co') || nameLower.includes('niacinamide')) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center select-none relative">
          <div className="w-18 sm:w-20 h-28 sm:h-32 rounded-2xl bg-white border-2 border-slate-200 shadow-md flex flex-col items-center justify-between p-2 relative overflow-hidden">
            <div className="w-4 h-4 rounded-full bg-slate-800 -mt-3" />
            <div className="w-7 h-2.5 bg-slate-100 rounded-t border-b border-slate-300" />
            <div className="w-full py-0.5 text-center font-sans text-[7px] font-black text-slate-800 tracking-wider">
              the <strong className="text-sky-700">derma</strong> co
            </div>
            <div className="w-full p-1 rounded bg-amber-50 border border-amber-200/80">
              <div className="text-[7.5px] font-mono font-black text-amber-900 leading-tight">
                10% Niacinamide
              </div>
              <div className="text-[6.5px] font-mono text-sky-800 font-semibold">
                + 2% Zinc PCA
              </div>
            </div>
            <div className="text-[6px] font-mono text-slate-400 uppercase">
              Face Serum · 30ml
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#8C5E4F] font-bold mt-2">
            The Derma Co Serum
          </span>
        </div>
      );
    }

    // 3. Foxtale: Pastel soft yellow pump tube
    if (brandLower.includes('foxtale') || nameLower.includes('dewy sunscreen')) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center select-none relative">
          <div className="w-16 sm:w-18 h-28 sm:h-32 rounded-3xl bg-[#FEF08A] border-2 border-yellow-300/80 shadow-md flex flex-col items-center justify-between p-2 relative overflow-hidden">
            <div className="w-8 h-3 rounded-b-md bg-[#FDE047] -mt-1 border-t border-yellow-300" />
            <div className="font-serif italic text-purple-900 text-[10px] font-bold tracking-tight">
              foxtale
            </div>
            <div className="w-full px-1 py-1 rounded-lg bg-white/70 backdrop-blur-xs">
              <div className="text-[7px] font-mono font-bold text-purple-900 uppercase">
                COVER UP
              </div>
              <div className="text-[6.5px] font-mono text-yellow-900 font-extrabold">
                DEWY SUNSCREEN
              </div>
              <div className="text-[7.5px] font-mono font-black text-purple-800">
                SPF 70 PA++++
              </div>
            </div>
            <div className="text-[6px] font-mono text-purple-700/80 uppercase">
              Niacinamide + Vit E
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#8C5E4F] font-bold mt-2">
            Foxtale Dewy Sunscreen
          </span>
        </div>
      );
    }

    // 4. Minimalist: Pharmaceutical amber glass bottle
    if (brandLower.includes('minimalist')) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center select-none relative">
          <div className="w-18 sm:w-20 h-28 sm:h-32 rounded-2xl bg-amber-900/90 border-2 border-amber-950 shadow-md flex flex-col items-center justify-between p-2 relative overflow-hidden">
            <div className="w-4 h-4 rounded-full bg-neutral-900 -mt-3" />
            <div className="w-7 h-2.5 bg-neutral-800 rounded-t border-b border-amber-950" />
            <div className="w-full bg-white p-1 rounded shadow-xs text-left">
              <div className="text-[7px] font-mono font-black text-neutral-900 tracking-wider">
                Be Minimalist.
              </div>
              <div className="text-[7.5px] font-mono font-bold text-neutral-800 leading-tight mt-0.5">
                {nameLower.includes('salicylic') ? 'Salicylic Acid 02%' : 'Active Formulation'}
              </div>
              <div className="text-[5.5px] font-mono text-neutral-500">
                Pure Actives · 30ml
              </div>
            </div>
            <div className="text-[6px] font-mono text-amber-200/80 uppercase">
              Dermatologically Tested
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#8C5E4F] font-bold mt-2">
            Minimalist Packaging
          </span>
        </div>
      );
    }

    // Default elegant branded container
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center select-none">
        <div className="w-16 h-24 rounded-2xl bg-white/90 border border-[#D49B86]/40 shadow-sm flex flex-col items-center justify-center p-2 space-y-1">
          <Package className="w-6 h-6 text-[#D49B86]" />
          <span className="text-[9px] font-mono uppercase text-[#3B4655] font-bold tracking-wider">
            {catalogItem.brand}
          </span>
          <span className="text-[7px] font-mono text-[#8C5E4F] truncate max-w-[50px]">
            {catalogItem.category}
          </span>
        </div>
        <span className="text-[10px] font-mono text-[#3B4655] font-semibold mt-2 truncate max-w-[140px]">
          {catalogItem.name}
        </span>
      </div>
    );
  };

  return (
    <div
      className={`relative overflow-hidden bg-[#FAF9F6] dark:bg-[#121820]/50 border border-[#D49B86]/25 shadow-inner flex items-center justify-center group ${sizeClasses} ${className}`}
    >
      {/* Delicate Porcelain Inner Radial Glow */}
      <div className="absolute inset-0 bg-radial from-[#FFD5B9]/20 via-[#FAF9F6]/5 to-transparent pointer-events-none" />

      {/* Verified Official Product Image with Zero-Mismatched Guardrail */}
      {!hasError && verifiedImageUrl ? (
        <img
          src={verifiedImageUrl}
          alt={catalogItem.name}
          onError={() => setHasError(true)}
          className="w-full h-full object-contain p-3 filter contrast-[1.02] drop-shadow-[0_10px_20px_rgba(59,70,85,0.12)] group-hover:scale-105 transition-transform duration-300 ease-out select-none"
          loading="lazy"
        />
      ) : (
        renderPackagingFallback()
      )}

      {/* Top Overlay Badge */}
      {showBadge && size !== 'sm' && (
        <div
          className={`absolute z-10 ${
            badgePosition === 'top-right' ? 'top-3 right-3' : 'top-3 left-3'
          }`}
        >
          <span
            className={`px-2.5 py-1 rounded-full text-[9px] font-mono font-bold border backdrop-blur-md shadow-xs flex items-center gap-1 ${
              isInstant
                ? 'bg-amber-50/95 text-amber-900 border-amber-300'
                : 'bg-white/95 text-[#8C5E4F] border-[#D49B86]/40'
            }`}
          >
            {isInstant ? (
              <Clock className="w-3 h-3 text-amber-600 shrink-0" />
            ) : (
              <ShieldCheck className="w-3 h-3 text-[#D49B86] shrink-0" />
            )}
            <span className="truncate max-w-[130px]">{badgeText}</span>
          </span>
        </div>
      )}
    </div>
  );
};
