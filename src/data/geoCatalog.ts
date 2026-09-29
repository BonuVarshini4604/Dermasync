import { VERIFIED_PACKAGING_MAP } from './productPackagingAssets';
import { Product } from '../types/dermasync';

export const INDIA_CURATED_PRODUCTS: Product[] = [
  // --- CLEANSERS ---
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
    image: VERIFIED_PACKAGING_MAP['cleanser-cetaphil-gentle'] || VERIFIED_PACKAGING_MAP['cleanser-cetaphil-gentle'],
    imageUrl: VERIFIED_PACKAGING_MAP['cleanser-cetaphil-gentle'] || VERIFIED_PACKAGING_MAP['cleanser-cetaphil-gentle'],
    bestFor: 'Sensitive, Dry, or Irritated Skin Shield',
    sizes: [
      { size: '59ml', priceInr: 199 },
      { size: '125ml', priceInr: 426 }
    ],
    keyActives: [
      { name: 'Hydrating Glycerin (Moisture Magnet)', concentration: '6.0%', purpose: 'Draws fresh water into dry skin so your face never feels tight' },
      { name: 'Vitamin B5 Panthenol (Skin Soother)', concentration: '1.0%', purpose: 'Calms redness, stops stinging, and supports your natural skin shield' },
      { name: 'Niacinamide (Skin Calmer & Oil Control)', concentration: '2.0%', purpose: 'Balances natural oils and keeps pores smooth and clean' }
    ],
    ph: 5.5,
    badges: ['Derm-Approved Staple', 'Pore-Safe (Won’t Clog Pores)', 'Instant Delivery (10 mins)', 'Protects Skin Shield'],
    dosageGuidance: 'One coin-sized pump onto damp hands. Gently massage over face for 60 seconds.',
    applicationOrder: 1,
    targetTime: 'BOTH',
    description: 'A holy-grail gentle cleanser that washes away daily oil and dirt without stripping your skin shield or causing that tight, squeaky feeling.',
    texture: 'Creamy lotion wash',
    countryAvailability: ['IN'],
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
  {
    id: 'cleanser-minimalist-oat',
    name: 'Oat & Amino Gentle Face Cleanser',
    brand: 'Minimalist',
    category: 'Cleanser',
    price: 6,
    priceInr: 299,
    budgetTier: 'drugstore',
    targetSkinTypes: ['Sensitized', 'Dry', 'Combination', 'Normal'] as any,
    targetBarriers: ['Healthy', 'Sensitized', 'Compromised'],
    image: VERIFIED_PACKAGING_MAP['rev-cet-1'] || VERIFIED_PACKAGING_MAP['cleanser-cetaphil-gentle'],
    imageUrl: VERIFIED_PACKAGING_MAP['rev-cet-1'] || VERIFIED_PACKAGING_MAP['cleanser-cetaphil-gentle'],
    bestFor: 'Daily wash for humid weather & sensitive skin',
    sizes: [
      { size: '100ml', priceInr: 299 }
    ],
    keyActives: [
      { name: 'Oat Extract (Skin Soother)', concentration: '8.0%', purpose: 'Gentle soap-free wash that leaves skin soft without drying' },
      { name: 'Polyglutamic Acid (Moisture Cushion)', concentration: '1.5%', purpose: 'Locks in water so skin doesn’t feel parched' },
      { name: 'Vitamin B5 (Barrier Calmer)', concentration: '1.0%', purpose: 'Calms irritation and protects natural skin shield' }
    ],
    ph: 5.5,
    badges: ['Derm-Approved Staple', 'Pore-Safe (Won’t Clog Pores)', 'Protects Skin Shield'],
    dosageGuidance: 'One pump onto wet palms. Wash face for 60 seconds with lukewarm water.',
    applicationOrder: 1,
    targetTime: 'BOTH',
    description: 'A gentle daily cleanser tailored for hot and humid weather. Rinses clean with zero residue.',
    texture: 'Lightweight soothing gel wash',
    countryAvailability: ['IN'],
    retailers: [
      { name: 'Nykaa', url: 'https://nykaa.com', badge: 'Next Day', colorClass: 'text-[#FC2779] border-[#FC2779]/40 bg-[#FC2779]/10' },
      { name: 'Amazon IN', url: 'https://amazon.in', badge: 'Prime', colorClass: 'text-[#FF9900] border-[#FF9900]/40 bg-[#FF9900]/10' },
      { name: 'Blinkit', url: 'https://blinkit.com', badge: '10m Drop', colorClass: 'text-[#F8CB46] border-[#F8CB46]/40 bg-[#F8CB46]/10' }
    ],
    reviews: []
  },
  {
    id: 'cleanser-double-balm',
    name: 'Squalane 08% Deep Cleansing Oil-Balm',
    brand: 'Minimalist',
    category: 'Double Cleanse',
    price: 7,
    priceInr: 399,
    budgetTier: 'drugstore',
    targetSkinTypes: ['Oily', 'Combination', 'Dry', 'Normal'] as any,
    targetBarriers: ['Healthy', 'Sensitized', 'Compromised'],
    image: VERIFIED_PACKAGING_MAP['cleanser-double-balm'] || VERIFIED_PACKAGING_MAP['cleanser-cetaphil-gentle'],
    imageUrl: VERIFIED_PACKAGING_MAP['cleanser-double-balm'] || VERIFIED_PACKAGING_MAP['cleanser-cetaphil-gentle'],
    bestFor: 'City Smog, Heavy Sunscreen & Waterproof Makeup',
    sizes: [
      { size: '100g', priceInr: 399 }
    ],
    keyActives: [
      { name: 'Plant Squalane (Gentle Oil Dissolver)', concentration: '8.0%', purpose: 'Dissolves city soot, pollution grime, and stubborn sunscreen' },
      { name: 'Sunflower Seed Oil (Pore Cleanser)', concentration: '35.0%', purpose: 'Gently cleans pores without clogging them' },
      { name: 'Vitamin E (Skin Protector)', concentration: '1.0%', purpose: 'Shields skin against city exhaust and free radicals' }
    ],
    ph: 6.0,
    badges: ['Instant Delivery (10 mins)', 'Pore-Safe (Won’t Clog Pores)', 'Anti-Pollution'],
    dosageGuidance: '1-2 pumps massaged onto completely DRY skin for 45s. Emulsify with warm water before regular wash.',
    applicationOrder: 1,
    targetTime: 'PM',
    description: 'A soothing oil-balm that melts away heavy sunscreen and city pollution so your skin stays completely clear.',
    texture: 'Silky oil-to-milk emulsion',
    countryAvailability: ['IN'],
    retailers: [
      { name: 'Nykaa', url: 'https://nykaa.com', badge: 'Express', colorClass: 'text-[#FC2779] border-[#FC2779]/40 bg-[#FC2779]/10' },
      { name: 'Amazon IN', url: 'https://amazon.in', badge: 'Prime', colorClass: 'text-[#FF9900] border-[#FF9900]/40 bg-[#FF9900]/10' },
      { name: 'Zepto', url: 'https://zepto.in', badge: '10m Drop', colorClass: 'text-[#7928CA] border-[#7928CA]/40 bg-[#7928CA]/10' }
    ],
    reviews: []
  },

  // --- SERUMS / TREATMENTS ---
  {
    id: 'serum-derma-co-niacinamide',
    name: '10% Niacinamide Face Serum with 2% Zinc PCA',
    brand: 'The Derma Co',
    category: 'Serum',
    price: 6,
    priceInr: 224,
    budgetTier: 'drugstore',
    targetSkinTypes: ['Oily', 'Combination', 'Sensitized', 'Normal'] as any,
    targetBarriers: ['Healthy', 'Sensitized', 'Compromised'],
    image: VERIFIED_PACKAGING_MAP['serum-derma-co-niacinamide'] || VERIFIED_PACKAGING_MAP['cleanser-cetaphil-gentle'],
    imageUrl: VERIFIED_PACKAGING_MAP['serum-derma-co-niacinamide'] || VERIFIED_PACKAGING_MAP['cleanser-cetaphil-gentle'],
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
    badges: ['Derm-Approved Staple', 'Pore-Safe (Won’t Clog Pores)', 'Instant Delivery (10 mins)'],
    dosageGuidance: '2–3 drops onto clean skin morning and night. Tap gently until absorbed.',
    applicationOrder: 3,
    targetTime: 'BOTH',
    waitMinutes: 2,
    description: 'An everyday oil-balancing serum that clears up red breakout marks and prevents midday grease without drying out your skin.',
    texture: 'Water-weight fast-absorbing fluid',
    countryAvailability: ['IN'],
    retailers: [
      { name: 'Nykaa', url: 'https://nykaa.com', badge: 'Bestseller', colorClass: 'text-[#FC2779] border-[#FC2779]/40 bg-[#FC2779]/10' },
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
        comment: 'Faded my red acne spots within 3 weeks. T-zone stays matte all day at college!',
        flagsAddressed: ['Active Acne', 'Post-Inflammatory Erythema'],
        reportedZeroIrritation: true,
        reportedPIEReduction: true,
        authorAgeGroup: '18-24'
      }
    ]
  },
  {
    id: 'serum-skinceuticals-ce-ferulic',
    name: 'C E Ferulic 15% Vitamin C Treatment',
    brand: 'SkinCeuticals',
    category: 'Serum',
    price: 182,
    priceInr: 14500,
    budgetTier: 'clinical',
    targetSkinTypes: ['Normal', 'Combination', 'Dry', 'Oily'] as any,
    targetBarriers: ['Healthy'],
    image: VERIFIED_PACKAGING_MAP['rev-der-1'] || VERIFIED_PACKAGING_MAP['cleanser-cetaphil-gentle'],
    imageUrl: VERIFIED_PACKAGING_MAP['rev-der-1'] || VERIFIED_PACKAGING_MAP['cleanser-cetaphil-gentle'],
    bestFor: 'Prestige Clinical Antioxidant Defense & Dark Spot Fading',
    sizes: [
      { size: '30ml', priceInr: 14500 }
    ],
    keyActives: [
      { name: 'Pure L-Ascorbic Acid (Vitamin C)', concentration: '15.0%', purpose: 'Gold-standard antioxidant for dark spot fading and collagen stimulation' },
      { name: 'Pure Vitamin E (Skin Shield)', concentration: '1.0%', purpose: 'Replenishes protective skin lipids' },
      { name: 'Ferulic Acid (Antioxidant Booster)', concentration: '0.5%', purpose: 'Stabilizes Vitamin C for 8x photo-defense' }
    ],
    ph: 2.8,
    badges: ['Clinical Cult Favorite', 'Prestige Formula'],
    dosageGuidance: '3-4 drops directly onto dry clean skin in the morning.',
    applicationOrder: 3,
    targetTime: 'AM',
    waitMinutes: 5,
    dupeId: 'serum-minimalist-vitc-10',
    dupeActiveMatchPercent: 96,
    description: 'The world-famous luxury clinical Vitamin C patent. Brightens uneven tone and provides gold-standard sun protection.',
    texture: 'Water-weight active solution',
    countryAvailability: ['GLOBAL'],
    retailers: [
      { name: 'Direct Lab', url: '#', badge: 'Prestige', colorClass: 'text-[#3B4655] border-[#3B4655]/20 bg-white' }
    ],
    reviews: []
  },
  {
    id: 'serum-minimalist-vitc-10',
    name: 'Vitamin C 10% + Centella Glow Serum',
    brand: 'Minimalist',
    category: 'Serum',
    price: 8,
    priceInr: 699,
    budgetTier: 'balanced',
    targetSkinTypes: ['Normal', 'Combination', 'Oily', 'Dry'],
    targetBarriers: ['Healthy', 'Sensitized'],
    image: VERIFIED_PACKAGING_MAP['serum-minimalist-vitc-10'] || VERIFIED_PACKAGING_MAP['cleanser-cetaphil-gentle'],
    imageUrl: VERIFIED_PACKAGING_MAP['serum-minimalist-vitc-10'] || VERIFIED_PACKAGING_MAP['cleanser-cetaphil-gentle'],
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
    badges: ['Derm-Approved Staple', 'Pore-Safe (Won’t Clog Pores)', 'Anti-Pollution'],
    dosageGuidance: '3-4 drops directly onto face in AM. Pat gently into dry skin.',
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

  // --- SUN PROTECTION & MOISTURIZERS ---
  {
    id: 'spf-foxtale-dewy-70',
    name: 'Foxtale Dewy Sunscreen SPF 70 PA++++',
    brand: 'Foxtale',
    category: 'Sunscreen',
    price: 5,
    priceInr: 420,
    budgetTier: 'drugstore',
    targetSkinTypes: ['Normal', 'Dry', 'Combination', 'Sensitized'] as any,
    targetBarriers: ['Healthy', 'Sensitized', 'Compromised'],
    image: VERIFIED_PACKAGING_MAP['spf-foxtale-dewy-70'] || VERIFIED_PACKAGING_MAP['cleanser-cetaphil-gentle'],
    imageUrl: VERIFIED_PACKAGING_MAP['spf-foxtale-dewy-70'] || VERIFIED_PACKAGING_MAP['cleanser-cetaphil-gentle'],
    bestFor: 'High-UV Daily Defense with a Non-Greasy Glow',
    sizes: [
      { size: '50ml', priceInr: 420 }
    ],
    keyActives: [
      { name: 'Niacinamide (Skin Calmer)', concentration: '2.0%', purpose: 'Evens skin tone and prevents UV dark spots from forming' },
      { name: 'Vitamin E (Sun Defense Booster)', concentration: '1.0%', purpose: 'Protects skin cells against sun rays and heat' },
      { name: 'Hybrid UV Filters (Broad Spectrum SPF 70)', concentration: '14.0%', purpose: 'High photostable UVA & UVB protection without white cast' }
    ],
    ph: 6.5,
    badges: ['Derm-Approved Staple', 'Pore-Safe (Won’t Clog Pores)', 'Instant Delivery (10 mins)', 'Reef-Safe SPF'],
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
  {
    id: 'spf-reequil-ultra-matte',
    name: 'Re’equil Ultra Matte Dry Touch Gel SPF 50 PA++++',
    brand: "Re'equil",
    category: 'Sunscreen',
    price: 9,
    priceInr: 780,
    budgetTier: 'balanced',
    targetSkinTypes: ['Oily', 'Combination', 'Sensitized', 'Normal'] as any,
    targetBarriers: ['Healthy', 'Sensitized', 'Compromised'],
    image: VERIFIED_PACKAGING_MAP['rev-fox-1'] || VERIFIED_PACKAGING_MAP['cleanser-cetaphil-gentle'],
    imageUrl: VERIFIED_PACKAGING_MAP['rev-fox-1'] || VERIFIED_PACKAGING_MAP['cleanser-cetaphil-gentle'],
    bestFor: 'Humid weather, heavy sweating & shine control',
    sizes: [
      { size: '50g', priceInr: 780 }
    ],
    keyActives: [
      { name: 'Mineral Zinc & UV Defense', concentration: '15.0%', purpose: 'Very high photostable UVA/UVB blockade' },
      { name: 'Velvet Matte Base', concentration: '12.0%', purpose: 'Absorbs sweat and stops midday oiliness for 6+ hours' }
    ],
    ph: 6.8,
    badges: ['Derm-Approved Staple', 'Pore-Safe (Won’t Clog Pores)', 'Reef-Safe SPF', 'Protects Skin Shield'],
    dosageGuidance: 'Two full finger lengths. Non-greasy dry-touch finish that resists heavy sweating.',
    applicationOrder: 5,
    targetTime: 'AM',
    description: 'Dermatologist #1 recommended matte SPF in India. Velvety primer finish that does not melt in tropical humidity.',
    texture: 'Velvet-touch dry matte gel',
    countryAvailability: ['IN'],
    climateTags: ['matte-fluid-spf'],
    retailers: [
      { name: 'Nykaa', url: 'https://nykaa.com', badge: 'Top Seller', colorClass: 'text-[#FC2779] border-[#FC2779]/40 bg-[#FC2779]/10' },
      { name: 'Tira', url: 'https://tirabeauty.com', badge: 'Official', colorClass: 'text-[#E32636] border-[#E32636]/40 bg-[#E32636]/10' },
      { name: 'Blinkit', url: 'https://blinkit.com', badge: '10m Drop', colorClass: 'text-[#F8CB46] border-[#F8CB46]/40 bg-[#F8CB46]/10' }
    ],
    reviews: []
  },
  {
    id: 'cream-minimalist-b5-gel',
    name: 'Vitamin B5 10% Oil-Free Hydrating Water-Gel',
    brand: 'Minimalist',
    category: 'Moisturizer',
    price: 5,
    priceInr: 349,
    budgetTier: 'drugstore',
    targetSkinTypes: ['Oily', 'Combination', 'Sensitized', 'Normal'] as any,
    targetBarriers: ['Healthy', 'Sensitized'],
    image: VERIFIED_PACKAGING_MAP['cream-minimalist-b5-gel'] || VERIFIED_PACKAGING_MAP['cleanser-cetaphil-gentle'],
    imageUrl: VERIFIED_PACKAGING_MAP['cream-minimalist-b5-gel'] || VERIFIED_PACKAGING_MAP['cleanser-cetaphil-gentle'],
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
    badges: ['Derm-Approved Staple', 'Pore-Safe (Won’t Clog Pores)', 'Oil-Free Water-Gel', 'Instant Delivery (10 mins)'],
    dosageGuidance: 'Dime-sized dollop smoothed over face. Dries down matte in 10 seconds.',
    applicationOrder: 4,
    targetTime: 'BOTH',
    description: 'Perfect for sticky humid weather. Replaces heavy creams with a weightless water-gel so your pores stay clear.',
    texture: 'Ultra-light refreshing water-gel',
    countryAvailability: ['IN'],
    climateTags: ['lightweight-water-gel'],
    retailers: [
      { name: 'Nykaa', url: 'https://nykaa.com', badge: 'Fast Ship', colorClass: 'text-[#FC2779] border-[#FC2779]/40 bg-[#FC2779]/10' },
      { name: 'Blinkit', url: 'https://blinkit.com', badge: '10m Drop', colorClass: 'text-[#F8CB46] border-[#F8CB46]/40 bg-[#F8CB46]/10' },
      { name: 'Zepto', url: 'https://zepto.in', badge: 'Quick Delivery', colorClass: 'text-[#7928CA] border-[#7928CA]/40 bg-[#7928CA]/10' }
    ],
    reviews: []
  },
  {
    id: 'cream-ceramide-reequil',
    name: 'Ceramide & Hyaluronic Acid Moisture Balm',
    brand: "Re'equil",
    category: 'Moisturizer',
    price: 7,
    priceInr: 550,
    budgetTier: 'balanced',
    targetSkinTypes: ['Dry', 'Sensitized', 'Normal'] as any,
    targetBarriers: ['Compromised', 'Sensitized', 'Healthy'],
    image: VERIFIED_PACKAGING_MAP['cream-ceramide-reequil'] || VERIFIED_PACKAGING_MAP['cleanser-cetaphil-gentle'],
    imageUrl: VERIFIED_PACKAGING_MAP['cream-ceramide-reequil'] || VERIFIED_PACKAGING_MAP['cleanser-cetaphil-gentle'],
    bestFor: 'Dry climates, air-conditioned rooms & damaged skin shield',
    sizes: [
      { size: '100g', priceInr: 550 }
    ],
    keyActives: [
      { name: 'Ceramides (Natural Skin Sealants)', concentration: '2.0%', purpose: 'Repairs your skin shield to stop dry flaking and tight stinging' },
      { name: 'Mango Seed Butter (Nourishing Cushion)', concentration: '3.0%', purpose: 'Deeply softens rough dry patches' }
    ],
    ph: 5.6,
    badges: ['Derm-Approved Staple', 'Pore-Safe (Won’t Clog Pores)', 'Protects Skin Shield'],
    dosageGuidance: 'Warm between fingertips. Best for dry weather or air-conditioned bedrooms.',
    applicationOrder: 4,
    targetTime: 'BOTH',
    description: 'A rich, comforting cream that restores moisture when the weather turns cold or dry.',
    texture: 'Cushiony moisturizing cream',
    countryAvailability: ['IN'],
    climateTags: ['heavy-lipid-cream'],
    climateSubstituteId: 'cream-minimalist-b5-gel',
    retailers: [
      { name: 'Nykaa', url: 'https://nykaa.com', badge: 'Official', colorClass: 'text-[#FC2779] border-[#FC2779]/40 bg-[#FC2779]/10' },
      { name: 'Tira', url: 'https://tirabeauty.com', badge: 'Verified', colorClass: 'text-[#E32636] border-[#E32636]/40 bg-[#E32636]/10' }
    ],
    reviews: []
  },
  {
    id: 'toner-cosrx-snail-or-centella',
    name: 'Advanced Snail 96 Mucin Power Essence',
    brand: 'COSRX',
    category: 'Toner',
    price: 18,
    priceInr: 1450,
    budgetTier: 'clinical',
    targetSkinTypes: ['Sensitized', 'Dry', 'Combination', 'Normal'] as any,
    targetBarriers: ['Compromised', 'Sensitized', 'Healthy'],
    image: VERIFIED_PACKAGING_MAP['toner-cosrx-snail-or-centella'] || VERIFIED_PACKAGING_MAP['cleanser-cetaphil-gentle'],
    imageUrl: VERIFIED_PACKAGING_MAP['toner-cosrx-snail-or-centella'] || VERIFIED_PACKAGING_MAP['cleanser-cetaphil-gentle'],
    bestFor: 'Glass skin bounce, soothing redness & deep hydration',
    sizes: [
      { size: '100ml', priceInr: 1450 }
    ],
    keyActives: [
      { name: 'Snail Mucin (Skin Healer)', concentration: '96.3%', purpose: 'Soothes stinging, repairs your skin shield, and heals redness fast' },
      { name: 'Hyaluronic Acid (Plumping Hydration)', concentration: '1.0%', purpose: 'Bouncy moisture that plumps up fine lines' }
    ],
    ph: 6.5,
    badges: ['Clinical Cult Favorite', 'Pore-Safe (Won’t Clog Pores)', 'Protects Skin Shield'],
    dosageGuidance: '1-2 pumps pressed gently into clean damp skin right after washing.',
    applicationOrder: 2,
    targetTime: 'BOTH',
    description: 'The world-famous hydrating essence that leaves skin looking dewy, soothed, and glowing with zero customs delays.',
    texture: 'Rich bouncy essence',
    countryAvailability: ['IN'],
    retailers: [
      { name: 'Nykaa', url: 'https://nykaa.com', badge: 'Official Partner', colorClass: 'text-[#FC2779] border-[#FC2779]/40 bg-[#FC2779]/10' },
      { name: 'Tira', url: 'https://tirabeauty.com', badge: 'Direct Import', colorClass: 'text-[#E32636] border-[#E32636]/40 bg-[#E32636]/10' }
    ],
    reviews: []
  }
];

export const INDIA_DIET_ENHANCERS = [
  {
    type: 'enhancer' as const,
    category: 'Natural Vitamin C Boost',
    title: 'Fresh Amla (Indian Gooseberry)',
    scientificRationale: 'Amla is packed with 20 times more natural Vitamin C than an orange! It helps build natural collagen to keep skin bouncy and naturally fades dark marks left after breakouts.',
    actionItems: [
      'Drink 1 small shot of fresh Amla juice with warm water in the morning, or eat 1 raw amla with a pinch of rock salt',
      'Works wonders alongside your morning skincare to protect against sun and smog'
    ],
    regionalEco: 'IN' as const
  },
  {
    type: 'enhancer' as const,
    category: 'Redness Soother',
    title: 'Turmeric Milk (Haldi Doodh) with Black Pepper',
    scientificRationale: 'Turmeric is a time-tested natural skin calmer. A tiny pinch of black pepper helps your body absorb it easily, soothing red pimples and sensitive flushed cheeks.',
    actionItems: [
      'Drink a warm cup of golden turmeric milk with a pinch of black pepper 1 hour before bedtime',
      'Helps your skin shield recover while you sleep'
    ],
    regionalEco: 'IN' as const
  },
  {
    type: 'enhancer' as const,
    category: 'Tummy & Gut Health',
    title: 'Fresh Spiced Chaas (Buttermilk) or Dahi (Curd)',
    scientificRationale: 'Chaas and fresh curd are loaded with good live bacteria for your gut. When your stomach is happy and balanced, sudden face redness, breakouts, and flaking stop.',
    actionItems: [
      'Enjoy 1 cold glass of spiced Chaas with roasted cumin (jeera) and mint after lunch',
      'Avoid commercial yogurts that have added sugar or artificial syrups'
    ],
    regionalEco: 'IN' as const
  },
  {
    type: 'enhancer' as const,
    category: 'Hormonal Breakout Balance',
    title: 'Methi (Fenugreek) Water & Roasted Flaxseeds (Alsi)',
    scientificRationale: 'Methi seeds and flaxseeds help keep blood sugar steady after meals, which stops your skin glands from producing sticky excess oil along the jawline.',
    actionItems: [
      'Soak 1 tsp of Methi seeds in a glass of water overnight, and drink the water first thing in the morning',
      'Sprinkle 1 spoonful of roasted flaxseeds (alsi) over your daily dal or vegetables'
    ],
    regionalEco: 'IN' as const
  }
];

export const INDIA_DIET_TRIGGERS = [
  {
    type: 'trigger' as const,
    category: 'Pimple Trigger',
    title: 'Deep-Fried Snacks in Reheated Oil (Pakoras, Samosas, Bhajias)',
    scientificRationale: 'Roadside oil that gets boiled over and over creates damaged fats that can trigger sudden, painful pimples within 24 to 48 hours.',
    actionItems: [
      'Swap deep-fried street snacks for crunchy roasted makhana (foxnuts), roasted chana, or air-fried treats',
      'Cook home meals with fresh, moderate amounts of cold-pressed oil or pure ghee'
    ],
    regionalEco: 'IN' as const
  },
  {
    type: 'trigger' as const,
    category: 'Oiliness Spike',
    title: 'Heavily Sugared Mithai & Sweetened Chai',
    scientificRationale: 'Cups of tea with heaps of white sugar cause rapid sugar spikes, which signal your skin to pump out sticky oil that clogs pores in warm weather.',
    actionItems: [
      'Enjoy chai with a small pinch of jaggery (gur) or try fragrant ginger-cardamom tea without extra sugar',
      'Save sweets like gulab jamun and jalebi for special family celebrations'
    ],
    regionalEco: 'IN' as const
  }
];
