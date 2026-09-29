import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, SkinProfileMatrix, GeoEnvironmentalData } from '../types/dermasync';
import { calculateReviewAffinity } from '../services/diagnosticEngine';
import { SKINCARE_CATALOG, getProductById } from '../data/skincareCatalog';
import { CLINICAL_PRODUCTS } from '../data/products';
import { INDIA_CURATED_PRODUCTS } from '../data/geoCatalog';
import { getVerifiedProduct } from '../data/verifiedProducts';
import { ProductThumbnail } from './ProductThumbnail';
import { 
  Sparkles, 
  ArrowLeftRight, 
  Check, 
  ShieldCheck, 
  ExternalLink, 
  Filter, 
  Star,
  Clock
} from 'lucide-react';
import { playWaterPop, playStepCompleteChime } from '../utils/dewpointAudio';

interface DewpointCuratedShelfProps {
  products: Product[];
  profile: SkinProfileMatrix;
  geoData: GeoEnvironmentalData;
  onOpenProductModal: (productId: string) => void;
  onSwapProduct: (originalId: string, dupeId: string) => void;
}

export const DewpointCuratedShelf: React.FC<DewpointCuratedShelfProps> = ({
  products,
  profile,
  geoData,
  onOpenProductModal,
  onSwapProduct
}) => {
  const isIndia = geoData.country === 'IN';
  const allMasterProducts = useMemo(() => {
    return [...SKINCARE_CATALOG, ...INDIA_CURATED_PRODUCTS, ...CLINICAL_PRODUCTS];
  }, []);

  // Approved domestic and readily accessible domestic drugstore + clinical favorites
  const INDIA_APPROVED_BRANDS = [
    'Cetaphil',
    'The Derma Co',
    'Foxtale',
    'Minimalist',
    "Re'equil",
    'Conscious Chemist',
    'Sebamed',
    'COSRX',
    'Bioderma',
    'SkinCeuticals',
    'Drunk Elephant'
  ];

  // Filters & State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTier, setSelectedTier] = useState<'all' | 'budget' | 'balanced' | 'clinical'>('all');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, number>>({});
  const [swappedCards, setSwappedCards] = useState<Record<string, string>>({}); // originalId -> dupeId

  // Regional catalog compilation with default priority for local staples
  const regionalCatalog = useMemo(() => {
    const list: Product[] = [];
    const addedIds = new Set<string>();

    // 1. First add single-source verified SKINCARE_CATALOG items
    SKINCARE_CATALOG.forEach(p => {
      if (!addedIds.has(p.id)) {
        list.push(p);
        addedIds.add(p.id);
      }
    });

    // 2. Add additional curated Indian products
    if (isIndia) {
      INDIA_CURATED_PRODUCTS.forEach(p => {
        if (!addedIds.has(p.id)) {
          list.push(p);
          addedIds.add(p.id);
        }
      });
    }

    // 3. Add remaining user routine shelf products
    products.forEach(p => {
      if (p && !addedIds.has(p.id)) {
        if (isIndia) {
          const isApproved = INDIA_APPROVED_BRANDS.some(b => p.brand.toLowerCase().includes(b.toLowerCase()))
            || p.countryAvailability?.includes('IN');
          if (isApproved) {
            list.push(p);
            addedIds.add(p.id);
          }
        } else {
          list.push(p);
          addedIds.add(p.id);
        }
      }
    });

    return list;
  }, [products, isIndia]);

  // Handle local 1-click dupe switcher on individual card
  const handleToggleDupe = (originalId: string, dupeId: string) => {
    setSwappedCards(prev => {
      const next = { ...prev };
      if (next[originalId]) {
        delete next[originalId]; // revert back to original
        playWaterPop();
      } else {
        next[originalId] = dupeId; // swap to dupe
        playStepCompleteChime();
        onSwapProduct(originalId, dupeId);
      }
      return next;
    });
  };

  // Handle size selection change
  const handleSelectSize = (productId: string, sizeIdx: number) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: sizeIdx
    }));
    playWaterPop();
  };

  // Apply filters
  const filteredProducts = useMemo(() => {
    return regionalCatalog.filter(product => {
      // Check active item on this card (original or swapped dupe)
      const currentActiveId = swappedCards[product.id] || product.id;
      const activeProduct = allMasterProducts.find(p => p.id === currentActiveId) || product;

      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'Cleanser' && !['Cleanser', 'Double Cleanse'].includes(activeProduct.category)) return false;
        if (selectedCategory === 'Serum' && activeProduct.category !== 'Serum') return false;
        if (selectedCategory === 'Moisturizer' && activeProduct.category !== 'Moisturizer') return false;
        if (selectedCategory === 'Sunscreen' && activeProduct.category !== 'Sunscreen') return false;
      }

      // Price tier filter
      if (selectedTier !== 'all') {
        const inr = activeProduct.priceInr ?? Math.round(activeProduct.price * 83);
        if (selectedTier === 'budget' && inr >= 499) return false;
        if (selectedTier === 'balanced' && (inr < 499 || inr > 1200)) return false;
        if (selectedTier === 'clinical' && inr <= 1200) return false;
      }

      return true;
    });
  }, [regionalCatalog, selectedCategory, selectedTier, swappedCards, allMasterProducts]);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'Cleanser', label: 'Cleansers' },
    { id: 'Serum', label: 'Serums & Actives' },
    { id: 'Moisturizer', label: 'Moisturizers' },
    { id: 'Sunscreen', label: 'Sun Protection' }
  ];

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-8 relative overflow-hidden">
      {/* Decorative Ambient Under-Glow Blobs */}
      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#FFD5B9]/25 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-[#FFDBDB]/30 blur-3xl pointer-events-none" />

      {/* Editorial Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#3B4655]/10 pb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full nectar-gradient shadow-[0_0_8px_rgba(212,155,134,0.6)]" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#8C5E4F] font-bold">
              CURATED PRODUCT SHELF &amp; REGIMEN ENGINE
            </span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#3B4655] tracking-tight">
            Drugstore Staples &amp; Clinical Cult Favorites
          </h3>
          <p className="text-xs sm:text-sm text-[#3B4655]/75 font-sans mt-1.5 max-w-2xl leading-relaxed">
            Accessible Indian drugstore staples alongside clinical cult favorites in {geoData.city}. Real pricing in ₹ INR, verified packaging imagery, and 1-click affordable dupe swaps.
          </p>
        </div>

        {/* Local Market Status Pill */}
        <div className="flex items-center gap-2.5 self-start lg:self-auto bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#3B4655]/10 shadow-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <div className="text-xs font-mono text-[#3B4655]">
            Market: <strong className="text-[#3B4655] font-bold">India (₹ INR)</strong> · Instant Delivery Active
          </div>
        </div>
      </div>

      {/* Filter & Tier Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-[#3B4655]/10 relative z-10 shadow-sm">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[#3B4655]/70 text-[11px] font-mono uppercase mr-1 flex items-center gap-1 font-bold">
            <Filter className="w-3.5 h-3.5 text-[#D49B86]" /> Step:
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                playWaterPop();
              }}
              className={`px-3.5 py-1.5 rounded-full transition-all text-xs font-mono font-medium cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#3B4655] text-white shadow-sm font-semibold'
                  : 'text-[#3B4655]/70 hover:text-[#3B4655] bg-white border border-[#3B4655]/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Localized Price Tier Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto font-mono text-xs">
          <span className="text-[#3B4655]/70 text-[11px] uppercase mr-1 font-bold">Budget Tier:</span>
          {[
            { id: 'all', label: 'All Tiers' },
            { id: 'budget', label: 'Budget (< ₹499)' },
            { id: 'balanced', label: 'Balanced (₹500–₹1,200)' },
            { id: 'clinical', label: 'Clinical (₹1,200+)' }
          ].map(tier => (
            <button
              key={tier.id}
              onClick={() => {
                setSelectedTier(tier.id as any);
                playWaterPop();
              }}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all shadow-sm cursor-pointer ${
                selectedTier === tier.id
                  ? 'nectar-gradient text-[#3B4655] border border-white'
                  : 'text-[#3B4655]/70 hover:text-[#3B4655] bg-white border border-[#3B4655]/10'
              }`}
            >
              {tier.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Cards Bento Grid ("Dewy Glass & Rose Gold" Theme) */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => {
            const isSwapped = !!swappedCards[product.id];
            const activeId = swappedCards[product.id] || product.id;
            const currentItem = allMasterProducts.find(p => p.id === activeId) || product;

            // Partner product for dupe swap toggle
            const targetDupeProduct = product.dupeId 
              ? (allMasterProducts.find(p => p.id === product.dupeId) || null)
              : null;

            // Affinity & Match score calculation
            const affinityData = calculateReviewAffinity(currentItem, profile);

            // Size selection logic
            const availableSizes = currentItem.sizes && currentItem.sizes.length > 0 
              ? currentItem.sizes 
              : [{ size: 'Standard', priceInr: currentItem.priceInr || Math.round(currentItem.price * 83) }];

            const currentSizeIndex = selectedSizes[currentItem.id] ?? 0;
            const effectiveSizeObj = availableSizes[currentSizeIndex] || availableSizes[0];
            const livePriceInr = effectiveSizeObj.priceInr;

            // Retailers for instant purchase
            const effectiveRetailers = currentItem.retailers && currentItem.retailers.length > 0 
              ? currentItem.retailers 
              : [
                  { name: 'Nykaa', url: 'https://nykaa.com', badge: 'Next Day', colorClass: 'text-[#FC2779] border-[#FC2779]/40 bg-[#FC2779]/10' },
                  { name: 'Amazon IN', url: 'https://amazon.in', badge: 'Prime', colorClass: 'text-[#FF9900] border-[#FF9900]/40 bg-[#FF9900]/10' },
                  { name: 'Blinkit', url: 'https://blinkit.com', badge: '10-Min Drop', colorClass: 'text-[#F8CB46] border-[#F8CB46]/40 bg-[#F8CB46]/10' }
                ];

            // Verified item lookup for exact packshot, plain English benefit, and key actives
            const verifiedItem = getVerifiedProduct(currentItem.id);
            const displayBrand = verifiedItem?.brand || currentItem.brand;
            const displayName = verifiedItem?.name || currentItem.name;
            const displayBenefit = verifiedItem?.plainEnglishBenefit || currentItem.description;
            const displayBestFor = verifiedItem?.bestFor || currentItem.bestFor;
            const displayKeyActives = verifiedItem?.keyActives || currentItem.keyActives?.map(a => `${a.name}${a.concentration ? ` (${a.concentration})` : ''}`);

            // Retailers from verified catalog or fallbacks
            const displayRetailers = verifiedItem?.retailerLinks && verifiedItem.retailerLinks.length > 0
              ? verifiedItem.retailerLinks.map(r => ({
                  name: r.name,
                  url: r.url,
                  badge: r.name.includes('Blinkit') ? '10-Min' : r.name.includes('Amazon') ? 'Prime' : 'Direct',
                  colorClass: 'text-slate-900 border-slate-300 bg-slate-100 hover:bg-slate-200 dark:text-slate-100 dark:border-slate-700 dark:bg-slate-800'
                }))
              : effectiveRetailers;

            // Primary floating badge
            const isInstantDelivery = currentItem.badges?.some(b => b.includes('Instant Delivery') || b.includes('10 mins'));
            const floatingBadgeText = isInstantDelivery 
              ? 'Instant Delivery (10 mins)'
              : currentItem.badges?.find(b => b.includes('Derm-Approved') || b.includes('Clinical Cult')) 
              || (currentItem.budgetTier === 'drugstore' ? 'Derm-Approved Staple' : 'Clinical Cult Favorite');

            return (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl bg-white dark:bg-[#121820] border border-slate-200 dark:border-slate-800 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group shadow-[0_10px_25px_-5px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.12)] hover:-translate-y-0.5"
              >
                {/* Specular sheen top edge */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-rose-500/30 via-slate-200 dark:via-slate-700 to-transparent pointer-events-none" />

                <div className="space-y-4">
                  {/* Dedicated 1:1 Aspect-Ratio Product Image Container with Soft Glow */}
                  <div className="relative group/img">
                    <ProductThumbnail
                      product={currentItem}
                      size="fill"
                      showBadge={true}
                      customBadge={floatingBadgeText}
                      badgePosition="top-left"
                    />

                    {/* Match Score Pill: Bold black-on-lime or dark emerald pill */}
                    <div className="absolute bottom-3 right-3 z-10">
                      <span className="bg-emerald-100 text-emerald-900 font-semibold px-2.5 py-1 rounded-full text-xs flex items-center gap-1 shadow-sm border border-emerald-300/80">
                        <Star className="w-3.5 h-3.5 text-emerald-800 fill-emerald-800" />
                        <span>{affinityData.affinityScore}% Match</span>
                      </span>
                    </div>
                  </div>

                  {/* 1. Brand Label: Crisp uppercase micro-header */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs tracking-wider font-bold uppercase text-rose-700 dark:text-rose-400">
                      {displayBrand}
                    </span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                      {currentItem.category} · {currentItem.targetTime === 'AM' ? 'Morning' : currentItem.targetTime === 'PM' ? 'Night' : 'Day & Night'}
                    </span>
                  </div>

                  {/* Product Title: High-contrast title */}
                  <div>
                    <h4 
                      onClick={() => onOpenProductModal(currentItem.id)}
                      className="text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-rose-700 dark:group-hover:text-rose-300 transition-colors cursor-pointer"
                    >
                      {displayName}
                    </h4>

                    {/* Best For Tagline */}
                    {displayBestFor && (
                      <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 mt-1 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span className="truncate">Best For: {displayBestFor}</span>
                      </div>
                    )}
                  </div>

                  {/* Plain-English Benefit: Clean, high-legibility body text */}
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                    {displayBenefit}
                  </p>

                  {/* Key Actives */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                      Key Actives:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {displayKeyActives?.slice(0, 3).map((actText, i) => (
                        <span 
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-xs flex items-center gap-1"
                        >
                          <span>{actText}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Size Selector if multiple sizes exist */}
                  {availableSizes.length > 1 && (
                    <div className="pt-1 flex items-center gap-2 text-xs font-mono">
                      <span className="font-bold text-slate-800 dark:text-slate-200">Size:</span>
                      <div className="flex gap-1.5">
                        {availableSizes.map((sz, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSelectSize(currentItem.id, idx)}
                            className={`px-2.5 py-0.5 rounded-md border transition-all font-bold cursor-pointer ${
                              currentSizeIndex === idx
                                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 shadow-xs'
                                : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:border-rose-400'
                            }`}
                          >
                            {sz.size} (₹{sz.priceInr})
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price & Retailer: Bold monospaced price in ₹ INR */}
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block uppercase">Retail Price:</span>
                        <div className="text-base font-bold font-mono text-slate-900 dark:text-emerald-400 tracking-tight">
                          ₹{livePriceInr.toLocaleString('en-IN')}
                          {availableSizes.length > 1 && (
                            <span className="text-xs font-medium text-slate-600 dark:text-slate-400 ml-1">
                              ({effectiveSizeObj.size})
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block uppercase">Storefronts:</span>
                        <span className="text-xs font-mono text-emerald-800 dark:text-emerald-400 font-bold">100% Genuine</span>
                      </div>
                    </div>

                    {/* Quick-Buy Merchant Chips (Single-Tap: Nykaa, Tira, Amazon IN, Blinkit) */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {displayRetailers.map((ret, idx) => (
                        <a
                          key={idx}
                          href={ret.url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all flex items-center gap-1.5 hover:scale-105 shadow-xs bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-800 dark:border-slate-200"
                        >
                          <span>{ret.name}</span>
                          {ret.badge && (
                            <span className="px-1.5 py-0.2 rounded-full bg-white/20 dark:bg-black/20 text-[9px] uppercase tracking-wider font-extrabold">
                              {ret.badge}
                            </span>
                          )}
                          <ExternalLink className="w-3 h-3 opacity-90" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4. Interactive "Find a Drugstore Dupe" Switcher */}
                <div className="mt-5 pt-3.5 border-t border-slate-200 dark:border-slate-800 space-y-2">
                  {targetDupeProduct && (
                    <button
                      onClick={() => handleToggleDupe(product.id, targetDupeProduct.id)}
                      className={`w-full py-2.5 px-3.5 rounded-xl border text-xs font-mono transition-all flex items-center justify-between group/swap cursor-pointer shadow-xs ${
                        isSwapped
                          ? 'bg-rose-50 text-rose-900 border-rose-300 font-bold shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <ArrowLeftRight className={`w-3.5 h-3.5 text-rose-600 transition-transform duration-300 ${isSwapped ? 'rotate-180' : 'group-hover/swap:rotate-180'}`} />
                        <span className="truncate font-semibold">
                          {isSwapped 
                            ? `✓ Swapped with ${targetDupeProduct.brand}` 
                            : `Swap with Affordable Everyday Dupe (${targetDupeProduct.brand})`}
                        </span>
                      </div>
                      <span className="text-rose-700 dark:text-rose-400 font-bold shrink-0 text-xs">
                        {isSwapped ? 'Active' : `Save ₹${Math.max(0, (product.priceInr || 15200) - (targetDupeProduct.priceInr || 699))}`}
                      </span>
                    </button>
                  )}

                  {/* Learn more detail trigger */}
                  <button
                    onClick={() => onOpenProductModal(currentItem.id)}
                    className="w-full py-1.5 text-center text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-rose-700 dark:hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    View Ingredient Breakdown &amp; Safety →
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
