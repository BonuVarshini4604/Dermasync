import { Product } from '../types/dermasync';
import {
  CETAPHIL_CLEANSER_SVG,
  DERMA_CO_NIACINAMIDE_SVG,
  FOXTALE_DEWY_SPF_SVG,
  MINIMALIST_SALICYLIC_SVG,
  MINIMALIST_VITC_SVG,
  MINIMALIST_B5_GEL_SVG,
  REEQUIL_MATTE_SPF_SVG,
  REEQUIL_CERAMIDE_SVG,
  COSRX_SNAIL_MUCIN_SVG,
  SKINCEUTICALS_CE_SVG,
  DERMA_CO_AZELAIC_SVG,
  MINIMALIST_BALM_SVG,
  VERIFIED_PACKAGING_MAP
} from './productPackagingAssets';

/**
 * Single Source of Truth for verified skincare products across DEWPOINT LABS.
 * All product recommendations, shelf displays, routine steps, and modals pull from this catalog.
 * Zero-mismatched-image guardrail: Every entry has an immutable, verified packaging imageUrl.
 */

export const SKINCARE_CATALOG: Product[] = [
  // 1. Cleansers - Cetaphil Gentle Skin Cleanser
  {
    id: 'cleanser-cetaphil-gentle',
    name: 'Cetaphil Gentle Skin Cleanser',
    brand: 'Cetaphil',
    category: 'Cleanser',
    price: 6,
    priceInr: 199,
    budgetTier: 'drugstore',
    targetSkinTypes: ['Sensitized', 'Dry', 'Combination', 'Normal'] as any,
    targetBarriers: ['Healthy', 'Sensitized', 'Compromised'],
    imageUrl: CETAPHIL_CLEANSER_SVG,
    image: CETAPHIL_CLEANSER_SVG,
    bestFor: 'Sensitive, Dry, or Irritated Skin Shield',
    sizes: [
      { size: '59ml', priceInr: 199 },
      { size: '125ml', priceInr: 426 },
      { size: '250ml', priceInr: 740 }
    ],
    keyActives: [
      { name: 'Hydrating Glycerin (Moisture Magnet)', concentration: '6.0%', purpose: 'Draws fresh water into dry skin so your face never feels tight' },
      { name: 'Vitamin B5 Panthenol (Skin Soother)', concentration: '1.0%', purpose: 'Calms redness, stops stinging, and supports your natural skin shield' },
      { name: 'Niacinamide (Skin Calmer & Oil Control)', concentration: '2.0%', purpose: 'Balances natural oils and keeps pores smooth and clean' }
    ],
    ph: 5.5,
    badges: ['Derm-Approved Staple', 'Pore-Safe (Won’t Clog Pores)', 'Verified Authentic Packaging', 'Instant Delivery (10 mins)', 'Protects Skin Shield'],
    dosageGuidance: 'One coin-sized pump onto damp hands. Gently wash face for 60 seconds with lukewarm water.',
    applicationOrder: 1,
    targetTime: 'BOTH',
    description: 'A holy-grail gentle cleanser that washes away daily oil and dirt without stripping your skin shield or causing that tight, squeaky feeling.',
    texture: 'Creamy soothing lotion wash',
    countryAvailability: ['IN', 'GLOBAL'],
    retailers: [
      { name: 'Nykaa', url: 'https://nykaa.com', badge: 'Next Day', colorClass: 'text-[#FC2779] border-[#FC2779]/40 bg-[#FC2779]/10' },
      { name: 'Amazon IN', url: 'https://amazon.in', badge: 'Prime', colorClass: 'text-[#FF9900] border-[#FF9900]/40 bg-[#FF9900]/10' },
      { name: 'Blinkit', url: 'https://blinkit.com', badge: '10-Min Drop', colorClass: 'text-[#F8CB46] border-[#F8CB46]/40 bg-[#F8CB46]/10' }
    ],
    reviews: [
      {
        id: 'rev-cet-1',
        reviewerSkinType: 'Combination',
        reviewerBarrier: 'Sensitized',
        daysUsed: 45,
        rating: 5,
        comment: 'Zero tight stinging after washing even with hard water in Mumbai. Skin feels comfortable immediately.',
        flagsAddressed: ['Rosacea/Redness', 'Post-Inflammatory Erythema'],
        reportedZeroIrritation: true,
        reportedPIEReduction: true,
        authorAgeGroup: '22-28'
      }
    ]
  },

  // 2. Treatment / Serums - The Derma Co 10% Niacinamide Face Serum with 2% Zinc PCA
  {
    id: 'serum-derma-co-niacinamide',
    name: 'The Derma Co 10% Niacinamide Face Serum with 2% Zinc PCA',
    brand: 'The Derma Co',
    category: 'Serum',
    price: 6,
    priceInr: 224,
    budgetTier: 'drugstore',
    targetSkinTypes: ['Oily', 'Combination', 'Sensitized', 'Normal'] as any,
    targetBarriers: ['Healthy', 'Sensitized', 'Compromised'],
    imageUrl: DERMA_CO_NIACINAMIDE_SVG,
    image: DERMA_CO_NIACINAMIDE_SVG,
    bestFor: 'Oily skin, Large Pores, Red Breakout Spots',
    sizes: [
      { size: '20ml', priceInr: 224 },
      { size: '30ml', priceInr: 449 }
    ],
    keyActives: [
      { name: '10% Niacinamide (Skin Calmer & Oil Control)', concentration: '10.0%', purpose: 'Controls excess midday oiliness, fades post-pimple red marks, and visibly tightens pores' },
      { name: '2% Zinc PCA (Stops Excess Oil)', concentration: '2.0%', purpose: 'Balances sebum and calms painful inflamed acne bumps' }
    ],
    ph: 5.5,
    badges: ['Derm-Approved Staple', 'Pore-Safe (Won’t Clog Pores)', 'Verified Authentic Packaging', 'Instant Delivery (10 mins)'],
    dosageGuidance: '2–3 drops onto clean skin morning and night. Tap gently until absorbed.',
    applicationOrder: 3,
    targetTime: 'BOTH',
    waitMinutes: 2,
    description: 'An everyday oil-balancing serum that clears up red breakout marks and prevents midday grease without drying out your skin.',
    texture: 'Water-weight fast-absorbing fluid',
    countryAvailability: ['IN'],
    retailers: [
      { name: 'Nykaa', url: 'https://nykaa.com', badge: 'Bestseller', colorClass: 'text-[#FC2779] border-[#FC2779]/40 bg-[#FC2779]/10' },
      { name: 'Brand Store', url: 'https://thedermaco.com', badge: 'Official', colorClass: 'text-[#0284C7] border-[#0284C7]/40 bg-[#0284C7]/10' },
      { name: 'Amazon IN', url: 'https://amazon.in', badge: 'Prime', colorClass: 'text-[#FF9900] border-[#FF9900]/40 bg-[#FF9900]/10' },
      { name: 'Blinkit', url: 'https://blinkit.com', badge: '10m Drop', colorClass: 'text-[#F8CB46] border-[#F8CB46]/40 bg-[#F8CB46]/10' }
    ],
    reviews: [
      {
        id: 'rev-der-1',
        reviewerSkinType: 'Oily',
        reviewerBarrier: 'Sensitized',
        daysUsed: 21,
        rating: 5,
        comment: 'Faded my red acne spots within 3 weeks. T-zone stays matte all day!',
        flagsAddressed: ['Active Acne', 'Post-Inflammatory Erythema'],
        reportedZeroIrritation: true,
        reportedPIEReduction: true,
        authorAgeGroup: '18-24'
      }
    ]
  },

  // 3. Sun Protection & Moisturization - Foxtale Cover Up Dewy Sunscreen SPF 70 PA++++
  {
    id: 'spf-foxtale-dewy-70',
    name: 'Foxtale Cover Up Dewy Sunscreen SPF 70 PA++++',
    brand: 'Foxtale',
    category: 'Sunscreen',
    price: 5,
    priceInr: 420,
    budgetTier: 'drugstore',
    targetSkinTypes: ['Normal', 'Dry', 'Combination', 'Sensitized'] as any,
    targetBarriers: ['Healthy', 'Sensitized', 'Compromised'],
    imageUrl: FOXTALE_DEWY_SPF_SVG,
    image: FOXTALE_DEWY_SPF_SVG,
    bestFor: 'High-UV Daily Defense with a Non-Greasy Glow',
    sizes: [
      { size: '50ml', priceInr: 420 }
    ],
    keyActives: [
      { name: 'Niacinamide (Skin Calmer)', concentration: '2.0%', purpose: 'Evens skin tone and prevents UV dark spots from forming' },
      { name: 'Vitamin E (Sun Defense Booster)', concentration: '1.0%', purpose: 'Protects skin cells against sun rays and heat damage' },
      { name: 'Hybrid UV Filters (Broad Spectrum SPF 70)', concentration: '14.0%', purpose: 'Very high photostable UVA & UVB protection without white cast' }
    ],
    ph: 6.5,
    badges: ['Derm-Approved Staple', 'Pore-Safe (Won’t Clog Pores)', 'Verified Authentic Packaging', 'Instant Delivery (10 mins)', 'Reef-Safe SPF'],
    dosageGuidance: 'Two full finger-lengths across face and neck 15 minutes before heading outdoors.',
    applicationOrder: 5,
    targetTime: 'AM',
    description: 'An ultra-hydrating, glowy sunscreen with SPF 70 protection that leaves zero white cast and feels like a fresh moisturizer.',
    texture: 'Dewy water-light fluid cream',
    countryAvailability: ['IN'],
    climateTags: ['matte-fluid-spf'],
    retailers: [
      { name: 'Nykaa', url: 'https://nykaa.com', badge: 'Bestseller', colorClass: 'text-[#FC2779] border-[#FC2779]/40 bg-[#FC2779]/10' },
      { name: 'Tira', url: 'https://tirabeauty.com', badge: 'Official', colorClass: 'text-[#E32636] border-[#E32636]/40 bg-[#E32636]/10' },
      { name: 'Blinkit', url: 'https://blinkit.com', badge: '10m Drop', colorClass: 'text-[#F8CB46] border-[#F8CB46]/40 bg-[#F8CB46]/10' }
    ],
    reviews: [
      {
        id: 'rev-fox-1',
        reviewerSkinType: 'Combination',
        reviewerBarrier: 'Healthy',
        daysUsed: 30,
        rating: 5,
        comment: 'Gives the most natural glass skin glow with zero greasy feeling even in 34°C humid weather!',
        flagsAddressed: ['Hyperpigmentation'],
        reportedZeroIrritation: true,
        reportedPIEReduction: true,
        authorAgeGroup: '20-26'
      }
    ]
  },

  // 4. Treatment / Exfoliant - Minimalist 2% Salicylic Acid Face Serum
  {
    id: 'serum-minimalist-salicylic-2',
    name: 'Minimalist 2% Salicylic Acid Serum',
    brand: 'Minimalist',
    category: 'Serum',
    price: 7,
    priceInr: 549,
    budgetTier: 'drugstore',
    targetSkinTypes: ['Oily', 'Combination', 'Sensitized', 'Normal'] as any,
    targetBarriers: ['Healthy', 'Sensitized'],
    imageUrl: MINIMALIST_SALICYLIC_SVG,
    image: MINIMALIST_SALICYLIC_SVG,
    bestFor: 'Blackheads, Clogged Pores & Excess Sebum Control',
    sizes: [
      { size: '30ml', priceInr: 549 }
    ],
    keyActives: [
      { name: 'Salicylic Acid (Gentle Pore Clearer)', concentration: '2.0%', purpose: 'Dives deep into pores to dissolve trapped oil, dirt, and blackheads' },
      { name: 'Oligopeptide-10 (Blemish Calmer)', concentration: '0.5%', purpose: 'Targeted antimicrobial peptide that calms angry breakout bumps' },
      { name: 'Aloe Leaf Juice (Hydrating Base)', concentration: '70.0%', purpose: 'Soothes skin and prevents dryness or stinging' }
    ],
    ph: 3.8,
    badges: ['Derm-Approved Staple', 'Pore-Safe (Won’t Clog Pores)', 'Verified Authentic Packaging', 'Instant Delivery (10 mins)'],
    dosageGuidance: '2–3 drops onto clean dry skin at night. Start with 2 nights per week.',
    applicationOrder: 3,
    targetTime: 'PM',
    waitMinutes: 5,
    description: 'An oil-soluble BHA serum that unclogs pores, clears stubborn blackheads, and keeps grease under control without stripping your skin.',
    texture: 'Water-light non-sticky fluid',
    countryAvailability: ['IN'],
    retailers: [
      { name: 'Nykaa', url: 'https://nykaa.com', badge: 'Top Rated', colorClass: 'text-[#FC2779] border-[#FC2779]/40 bg-[#FC2779]/10' },
      { name: 'Amazon IN', url: 'https://amazon.in', badge: 'Prime', colorClass: 'text-[#FF9900] border-[#FF9900]/40 bg-[#FF9900]/10' },
      { name: 'Blinkit', url: 'https://blinkit.com', badge: '10m Drop', colorClass: 'text-[#F8CB46] border-[#F8CB46]/40 bg-[#F8CB46]/10' }
    ],
    reviews: [
      {
        id: 'rev-min-sal-1',
        reviewerSkinType: 'Oily',
        reviewerBarrier: 'Healthy',
        daysUsed: 28,
        rating: 5,
        comment: 'Completely cleared nose blackheads in 3 weeks. Does not sting like other salicylic acid washes.',
        flagsAddressed: ['Active Acne'],
        reportedZeroIrritation: true,
        reportedPIEReduction: false,
        authorAgeGroup: '20-28'
      }
    ]
  },

  // 5. Morning Glow Treatment - Minimalist 10% Vitamin C + Centella Glow Serum
  {
    id: 'serum-minimalist-vitc-10',
    name: 'Minimalist 10% Vitamin C + Centella Glow Serum',
    brand: 'Minimalist',
    category: 'Serum',
    price: 8,
    priceInr: 699,
    budgetTier: 'balanced',
    targetSkinTypes: ['Normal', 'Combination', 'Oily', 'Dry'],
    targetBarriers: ['Healthy', 'Sensitized'],
    imageUrl: MINIMALIST_VITC_SVG,
    image: MINIMALIST_VITC_SVG,
    bestFor: 'Dark spots, morning glow & urban pollution shield',
    sizes: [
      { size: '30ml', priceInr: 699 }
    ],
    keyActives: [
      { name: 'Stable Vitamin C (Dark Spot Fader)', concentration: '10.0%', purpose: 'Brightens skin, fades dark spots, and shields against sun damage' },
      { name: 'Centella (Herb Soother)', concentration: '60.0%', purpose: 'Soothes redness and calms sensitive skin' },
      { name: 'Glucosamine (Tone Evener)', concentration: '1.0%', purpose: 'Helps fade stubborn marks left behind after pimples' }
    ],
    ph: 4.2,
    badges: ['Derm-Approved Staple', 'Pore-Safe (Won’t Clog Pores)', 'Verified Authentic Packaging', 'Anti-Pollution'],
    dosageGuidance: '3-4 drops directly onto face in the morning. Pat gently into dry skin.',
    applicationOrder: 3,
    targetTime: 'AM',
    waitMinutes: 3,
    description: 'A stable Vitamin C serum made for warm tropical sun. Does not turn brown or sticky and brightens skin gently.',
    texture: 'Water-weight fast-absorbing fluid',
    countryAvailability: ['IN'],
    retailers: [
      { name: 'Nykaa', url: 'https://nykaa.com', badge: 'Top Rated', colorClass: 'text-[#FC2779] border-[#FC2779]/40 bg-[#FC2779]/10' },
      { name: 'Tira', url: 'https://tirabeauty.com', badge: '100% Genuine', colorClass: 'text-[#E32636] border-[#E32636]/40 bg-[#E32636]/10' },
      { name: 'Blinkit', url: 'https://blinkit.com', badge: '10m Drop', colorClass: 'text-[#F8CB46] border-[#F8CB46]/40 bg-[#F8CB46]/10' }
    ],
    reviews: []
  },

  // 6. High-Humidity Climate Water-Gel - Minimalist Vitamin B5 10% Oil-Free Hydrating Water-Gel
  {
    id: 'cream-minimalist-b5-gel',
    name: 'Minimalist Vitamin B5 10% Oil-Free Water-Gel',
    brand: 'Minimalist',
    category: 'Moisturizer',
    price: 5,
    priceInr: 349,
    budgetTier: 'drugstore',
    targetSkinTypes: ['Oily', 'Combination', 'Sensitized', 'Normal'] as any,
    targetBarriers: ['Healthy', 'Sensitized'],
    imageUrl: MINIMALIST_B5_GEL_SVG,
    image: MINIMALIST_B5_GEL_SVG,
    bestFor: 'Hot humid days, light hydration with zero grease',
    sizes: [
      { size: '50g', priceInr: 349 }
    ],
    keyActives: [
      { name: 'Vitamin B5 (Moisture Cushion)', concentration: '10.0%', purpose: 'Deep hydration that quenches thirsty skin with zero sticky feeling' },
      { name: 'Betaine (Water Binder)', concentration: '3.0%', purpose: 'Locks in all-day moisture without grease' },
      { name: 'Zinc PCA (Oil Balancer)', concentration: '1.0%', purpose: 'Balances natural facial oil and calms redness' }
    ],
    ph: 5.5,
    badges: ['Pore-Safe (Won’t Clog Pores)', 'Verified Authentic Packaging', 'Oil-Free Gel', 'Instant Delivery (10 mins)'],
    dosageGuidance: 'One coin-sized amount smoothed across face and neck after serum.',
    applicationOrder: 4,
    targetTime: 'BOTH',
    description: 'An ultra-light, oil-free moisturizer with pure Vitamin B5 that quenches skin instantly without leaving grease or clogging pores.',
    texture: 'Cooling translucent water-gel',
    countryAvailability: ['IN'],
    climateTags: ['oil-free-gel'],
    retailers: [
      { name: 'Nykaa', url: 'https://nykaa.com', badge: 'Fast Ship', colorClass: 'text-[#FC2779] border-[#FC2779]/40 bg-[#FC2779]/10' },
      { name: 'Blinkit', url: 'https://blinkit.com', badge: '10m Drop', colorClass: 'text-[#F8CB46] border-[#F8CB46]/40 bg-[#F8CB46]/10' },
      { name: 'Zepto', url: 'https://zepto.in', badge: 'Quick Delivery', colorClass: 'text-[#7928CA] border-[#7928CA]/40 bg-[#7928CA]/10' }
    ],
    reviews: []
  },

  // 7. Re'equil Ultra Matte Dry Touch Gel SPF 50 PA++++
  {
    id: 'spf-reequil-ultra-matte',
    name: 'Re’equil Ultra Matte Dry Touch Gel SPF 50 PA++++',
    brand: "Re'equil",
    category: 'Sunscreen',
    price: 8,
    priceInr: 780,
    budgetTier: 'balanced',
    targetSkinTypes: ['Oily', 'Combination', 'Sensitized', 'Normal'] as any,
    targetBarriers: ['Healthy', 'Sensitized', 'Compromised'],
    imageUrl: REEQUIL_MATTE_SPF_SVG,
    image: REEQUIL_MATTE_SPF_SVG,
    bestFor: 'Hot Humid Weather, High Sweat Resistance & Zero Shine',
    sizes: [
      { size: '50g', priceInr: 780 }
    ],
    keyActives: [
      { name: 'Mineral Zinc & UV Defense', concentration: '15.0%', purpose: 'Very high photostable UVA/UVB blockade' },
      { name: 'Velvet Matte Base', concentration: '12.0%', purpose: 'Absorbs sweat and stops midday oiliness for 6+ hours' }
    ],
    ph: 6.5,
    badges: ['Derm-Approved Staple', 'Pore-Safe (Won’t Clog Pores)', 'Verified Authentic Packaging', 'Instant Delivery (10 mins)'],
    dosageGuidance: 'Apply 2 finger-lengths evenly on face and neck 15 minutes before stepping out.',
    applicationOrder: 5,
    targetTime: 'AM',
    description: 'A cult-favorite velvety silicone gel sunscreen that keeps skin completely matte and shine-free all day long even in sweat-inducing humidity.',
    texture: 'Silky dry-touch primer gel',
    countryAvailability: ['IN'],
    climateTags: ['matte-fluid-spf'],
    retailers: [
      { name: 'Nykaa', url: 'https://nykaa.com', badge: 'Top Seller', colorClass: 'text-[#FC2779] border-[#FC2779]/40 bg-[#FC2779]/10' },
      { name: 'Tira', url: 'https://tirabeauty.com', badge: 'Official', colorClass: 'text-[#E32636] border-[#E32636]/40 bg-[#E32636]/10' },
      { name: 'Blinkit', url: 'https://blinkit.com', badge: '10m Drop', colorClass: 'text-[#F8CB46] border-[#F8CB46]/40 bg-[#F8CB46]/10' }
    ],
    reviews: []
  },

  // 8. Re'equil Ceramide & Hyaluronic Acid Moisture Balm
  {
    id: 'cream-ceramide-reequil',
    name: 'Re’equil Ceramide & Hyaluronic Acid Moisture Balm',
    brand: "Re'equil",
    category: 'Moisturizer',
    price: 6,
    priceInr: 550,
    budgetTier: 'balanced',
    targetSkinTypes: ['Dry', 'Sensitized', 'Normal'] as any,
    targetBarriers: ['Compromised', 'Sensitized'],
    imageUrl: REEQUIL_CERAMIDE_SVG,
    image: REEQUIL_CERAMIDE_SVG,
    bestFor: 'Damaged Skin Shield, Peeling, Stinging & Dry Irritation',
    sizes: [
      { size: '100g', priceInr: 550 }
    ],
    keyActives: [
      { name: 'Ceramides (Natural Skin Sealants)', concentration: '2.0%', purpose: 'Repairs your skin shield to stop dry flaking and tight stinging' },
      { name: 'Mango Seed Butter (Nourishing Cushion)', concentration: '3.0%', purpose: 'Deeply softens rough dry patches' }
    ],
    ph: 5.5,
    badges: ['Derm-Approved Staple', 'Protects Skin Shield', 'Verified Authentic Packaging'],
    dosageGuidance: 'Smooth a coin-sized amount onto clean face morning and evening.',
    applicationOrder: 4,
    targetTime: 'BOTH',
    description: 'A rich, soothing barrier repair balm packed with identical skin ceramides that stops dry peeling and stinging rapidly.',
    texture: 'Rich, cushioning restorative balm',
    countryAvailability: ['IN'],
    retailers: [
      { name: 'Nykaa', url: 'https://nykaa.com', badge: 'Official', colorClass: 'text-[#FC2779] border-[#FC2779]/40 bg-[#FC2779]/10' },
      { name: 'Tira', url: 'https://tirabeauty.com', badge: 'Verified', colorClass: 'text-[#E32636] border-[#E32636]/40 bg-[#E32636]/10' }
    ],
    reviews: []
  },

  // 9. COSRX Advanced Snail 96 Mucin Power Essence
  {
    id: 'toner-cosrx-snail-or-centella',
    name: 'COSRX Advanced Snail 96 Mucin Power Essence',
    brand: 'COSRX',
    category: 'Toner',
    price: 14,
    priceInr: 1450,
    budgetTier: 'balanced',
    targetSkinTypes: ['Dry', 'Sensitized', 'Combination', 'Normal'] as any,
    targetBarriers: ['Compromised', 'Sensitized', 'Healthy'],
    imageUrl: COSRX_SNAIL_MUCIN_SVG,
    image: COSRX_SNAIL_MUCIN_SVG,
    bestFor: 'Glass skin glow, deep hydration & calming irritated skin',
    sizes: [
      { size: '100ml', priceInr: 1450 }
    ],
    keyActives: [
      { name: 'Snail Mucin (Skin Healer)', concentration: '96.3%', purpose: 'Soothes stinging, repairs your skin shield, and heals redness fast' },
      { name: 'Hyaluronic Acid (Plumping Hydration)', concentration: '1.0%', purpose: 'Bouncy moisture that plumps up fine lines' }
    ],
    ph: 6.5,
    badges: ['Derm-Approved Staple', 'Pore-Safe (Won’t Clog Pores)', 'Verified Authentic Packaging'],
    dosageGuidance: '1-2 pumps patted into damp skin right after cleansing.',
    applicationOrder: 2,
    targetTime: 'BOTH',
    description: 'A cult-favorite bouncy essence made with 96% snail mucin that replenishes moisture, calms redness, and creates a dewy glass glow.',
    texture: 'Bouncy, silky lightweight essence',
    countryAvailability: ['IN', 'GLOBAL'],
    retailers: [
      { name: 'Nykaa', url: 'https://nykaa.com', badge: 'Official Partner', colorClass: 'text-[#FC2779] border-[#FC2779]/40 bg-[#FC2779]/10' },
      { name: 'Tira', url: 'https://tirabeauty.com', badge: 'Direct Import', colorClass: 'text-[#E32636] border-[#E32636]/40 bg-[#E32636]/10' }
    ],
    reviews: []
  },

  // 10. Minimalist Squalane 08% Deep Cleansing Oil-Balm
  {
    id: 'cleanser-double-balm',
    name: 'Minimalist Squalane 08% Deep Cleansing Oil-Balm',
    brand: 'Minimalist',
    category: 'Cleanser',
    price: 7,
    priceInr: 599,
    budgetTier: 'drugstore',
    targetSkinTypes: ['Normal', 'Combination', 'Oily', 'Dry'] as any,
    targetBarriers: ['Healthy', 'Sensitized'],
    imageUrl: MINIMALIST_BALM_SVG,
    image: MINIMALIST_BALM_SVG,
    bestFor: 'Melt Away Stubborn Sunscreen, City Smog & Heavy Dirt',
    sizes: [
      { size: '100g', priceInr: 599 }
    ],
    keyActives: [
      { name: 'Plant Squalane (Gentle Oil Dissolver)', concentration: '8.0%', purpose: 'Dissolves city soot, pollution grime, and stubborn sunscreen' },
      { name: 'Sunflower Seed Oil (Pore Cleanser)', concentration: '35.0%', purpose: 'Gently cleans pores without clogging them' },
      { name: 'Vitamin E (Skin Protector)', concentration: '1.0%', purpose: 'Shields skin against city exhaust and free radicals' }
    ],
    ph: 5.5,
    badges: ['Anti-Pollution', 'Pore-Safe (Won’t Clog Pores)', 'Verified Authentic Packaging', 'Instant Delivery (10 mins)'],
    dosageGuidance: 'Warm a grape-sized amount between dry palms, massage into dry face for 45s, then rinse with warm water.',
    applicationOrder: 1,
    targetTime: 'PM',
    description: 'A silky cleansing balm that melts away waterproof sunscreen and city dirt without leaving a greasy film or clogging pores.',
    texture: 'Transforming sherbet-to-milk balm',
    countryAvailability: ['IN'],
    retailers: [
      { name: 'Nykaa', url: 'https://nykaa.com', badge: 'Express', colorClass: 'text-[#FC2779] border-[#FC2779]/40 bg-[#FC2779]/10' },
      { name: 'Amazon IN', url: 'https://amazon.in', badge: 'Prime', colorClass: 'text-[#FF9900] border-[#FF9900]/40 bg-[#FF9900]/10' },
      { name: 'Zepto', url: 'https://zepto.in', badge: '10m Drop', colorClass: 'text-[#7928CA] border-[#7928CA]/40 bg-[#7928CA]/10' }
    ],
    reviews: []
  },

  // 11. SkinCeuticals C E Ferulic 15% Vitamin C Treatment (Clinical Cult Original)
  {
    id: 'serum-skinceuticals-ce-ferulic',
    name: 'SkinCeuticals C E Ferulic 15% Vitamin C Treatment',
    brand: 'SkinCeuticals',
    category: 'Serum',
    price: 182,
    priceInr: 15200,
    budgetTier: 'clinical',
    targetSkinTypes: ['Normal', 'Dry', 'Combination', 'Sensitized'] as any,
    targetBarriers: ['Healthy', 'Sensitized'],
    imageUrl: SKINCEUTICALS_CE_SVG,
    image: SKINCEUTICALS_CE_SVG,
    bestFor: 'Gold-Standard Clinical Dark Spot Correction & Pollution Shield',
    sizes: [
      { size: '30ml', priceInr: 15200 }
    ],
    keyActives: [
      { name: 'Pure L-Ascorbic Acid (Vitamin C)', concentration: '15.0%', purpose: 'Gold-standard antioxidant for dark spot fading and collagen stimulation' },
      { name: 'Pure Vitamin E (Skin Shield)', concentration: '1.0%', purpose: 'Replenishes protective skin lipids' },
      { name: 'Ferulic Acid (Antioxidant Booster)', concentration: '0.5%', purpose: 'Stabilizes Vitamin C for 8x photo-defense' }
    ],
    ph: 2.5,
    badges: ['Clinical Cult Favorite', 'Verified Authentic Packaging'],
    dosageGuidance: '4-5 drops onto clean, dry skin in the morning before other serums.',
    applicationOrder: 3,
    targetTime: 'AM',
    waitMinutes: 3,
    description: 'The patented clinical antioxidant standard that neutralizes free radicals, brightens skin tone, and reduces fine lines.',
    texture: 'Water-light clinical fluid',
    dupeId: 'serum-minimalist-vitc-10',
    dupeActiveMatchPercent: 94,
    countryAvailability: ['GLOBAL', 'IN'],
    retailers: [
      { name: 'Direct Lab', url: '#', badge: 'Prestige', colorClass: 'text-[#3B4655] border-[#3B4655]/20 bg-white' }
    ],
    reviews: []
  },

  // 12. The Derma Co 10% Azelaic Acid Face Serum
  {
    id: 'serum-derma-co-azelaic',
    name: 'The Derma Co 10% Azelaic Acid Face Serum',
    brand: 'The Derma Co',
    category: 'Serum',
    price: 7,
    priceInr: 499,
    budgetTier: 'drugstore',
    targetSkinTypes: ['Combination', 'Oily', 'Sensitized', 'Normal'] as any,
    targetBarriers: ['Sensitized', 'Healthy', 'Compromised'],
    imageUrl: DERMA_CO_AZELAIC_SVG,
    image: DERMA_CO_AZELAIC_SVG,
    bestFor: 'Fading lingering red pimple marks & calming irritation',
    sizes: [
      { size: '30ml', priceInr: 499 }
    ],
    keyActives: [
      { name: 'Azelaic Acid (Red Spot Fader)', concentration: '10.0%', purpose: 'Fades stubborn red marks left after breakouts and controls shine' },
      { name: 'Alpha Arbutin (Dark Spot Fader)', concentration: '1.0%', purpose: 'Naturally fades uneven dark patches' },
      { name: 'Chamomile Bisabolol (Calming Flower)', concentration: '0.5%', purpose: 'Calms sensitive, red, flushed cheeks' }
    ],
    ph: 5.2,
    badges: ['Derm-Approved Staple', 'Pore-Safe (Won’t Clog Pores)', 'Verified Authentic Packaging', 'Protects Skin Shield'],
    dosageGuidance: 'Pea-sized dot spread evenly across cheeks and forehead.',
    applicationOrder: 3,
    targetTime: 'BOTH',
    waitMinutes: 3,
    description: 'Designed specifically to fade red breakout spots and lingering marks after acne without stinging.',
    texture: 'Light, non-sticky lotion serum',
    countryAvailability: ['IN'],
    retailers: [
      { name: 'Nykaa', url: 'https://nykaa.com', badge: 'Sale', colorClass: 'text-[#FC2779] border-[#FC2779]/40 bg-[#FC2779]/10' },
      { name: 'Amazon IN', url: 'https://amazon.in', badge: 'Prime', colorClass: 'text-[#FF9900] border-[#FF9900]/40 bg-[#FF9900]/10' }
    ],
    reviews: []
  }
];

/**
 * Direct lookup map by product id for instantaneous O(1) access
 */
export const PRODUCT_CATALOG_MAP: Record<string, Product> = SKINCARE_CATALOG.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {} as Record<string, Product>);

/**
 * Retrieve a verified product from the catalog by exact id
 */
export function getProductById(id: string): Product | undefined {
  return PRODUCT_CATALOG_MAP[id];
}
