import { Product } from '../types/dermasync';

export const CLINICAL_PRODUCTS: Product[] = [
  // --- CLEANSERS ---
  {
    id: 'cleanser-gentle-1',
    name: 'Purifying Barrier Amino Cleanser',
    brand: 'DermaSync Lab',
    category: 'Cleanser',
    price: 38,
    budgetTier: 'balanced',
    targetSkinTypes: ['Sensitized', 'Dry', 'Combination', 'Normal'] as any,
    targetBarriers: ['Healthy', 'Sensitized', 'Compromised'],
    keyActives: [
      { name: 'Sodium Cocoyl Apple Amino Acids', concentration: '12%', purpose: 'Ultra-gentle sulfate-free anionic surfactant matrix' },
      { name: 'Colloidal Oat Extract', concentration: '2%', purpose: 'Reduces inflammation and skin dehydration and moisture loss' },
      { name: 'Panthenol (Pro-Vitamin B5)', concentration: '1.5%', purpose: 'Barrier humectant and cellular soothing' }
    ],
    ph: 5.5,
    badges: ['Fragrance-Free', 'Pore-Safe (Won’t Clog Pores)', 'Fungal Acne Safe', 'Protects Skin Shield'],
    dosageGuidance: 'One nickel-sized pump onto wet palms. Emulsify for 60 seconds with lukewarm water.',
    applicationOrder: 1,
    targetTime: 'BOTH',
    description: 'A physiologically buffered gel-to-cloud cleanser engineered to protect lipid membranes during particulate removal.',
    texture: 'Lightweight soothing emulsion gel',
    dupeId: 'cleanser-dupe-1',
    dupeActiveMatchPercent: 96,
    reviews: [
      {
        id: 'rev-c1',
        reviewerSkinType: 'Combination',
        reviewerBarrier: 'Sensitized',
        daysUsed: 28,
        rating: 5,
        comment: 'No stinging even during active tretinoin peel days. Restores that calm cushion without any film.',
        flagsAddressed: ['Rosacea/Redness', 'Red Breakout Spots'],
        reportedZeroIrritation: true,
        reportedPIEReduction: true,
        authorAgeGroup: '25-34'
      },
      {
        id: 'rev-c2',
        reviewerSkinType: 'Dry',
        reviewerBarrier: 'Compromised',
        daysUsed: 14,
        rating: 5,
        comment: 'Zero tightness after drying. This was the only cleanser my skin tolerated after a laser treatment.',
        flagsAddressed: ['Red Breakout Spots'],
        reportedZeroIrritation: true,
        reportedPIEReduction: true,
        authorAgeGroup: '35-44'
      },
      {
        id: 'rev-c3',
        reviewerSkinType: 'Oily',
        reviewerBarrier: 'Healthy',
        daysUsed: 45,
        rating: 4,
        comment: 'Very mild. If you wear heavy silicone waterproof makeup you may prefer a double cleanse first.',
        flagsAddressed: ['Active Acne'],
        reportedZeroIrritation: true,
        reportedPIEReduction: false,
        authorAgeGroup: '18-24'
      }
    ]
  },
  {
    id: 'cleanser-dupe-1',
    name: 'Hydrating Gentle Oat Cleanser',
    brand: 'Krave-Style BioCare',
    category: 'Cleanser',
    price: 14,
    budgetTier: 'drugstore',
    targetSkinTypes: ['Sensitized', 'Dry', 'Combination', 'Normal'] as any,
    targetBarriers: ['Healthy', 'Sensitized', 'Compromised'],
    keyActives: [
      { name: 'Oat Kernel Extract & Amino Surfactants', concentration: '10%', purpose: 'Bio-identical soothing surfactant base' },
      { name: 'Panthenol', concentration: '1.2%', purpose: 'Epidermal moisture binding' },
      { name: 'Glycerin', concentration: '8%', purpose: 'Osmolytic hydration cushion' }
    ],
    ph: 5.6,
    badges: ['Fragrance-Free', 'Pore-Safe (Won’t Clog Pores)', 'Protects Skin Shield'],
    dosageGuidance: 'One small pump on damp face, massage for 45-60 seconds, rinse thoroughly.',
    applicationOrder: 1,
    targetTime: 'BOTH',
    description: 'Clinical drugstore bio-equivalent offering uncompromised surfactant gentleness at a fraction of the cost.',
    texture: 'Soft jelly gel',
    reviews: [
      {
        id: 'rev-c4',
        reviewerSkinType: 'Combination',
        reviewerBarrier: 'Sensitized',
        daysUsed: 21,
        rating: 5,
        comment: 'Saves over $24 every two months and behaves almost identically to high-end medical cleansers.',
        flagsAddressed: ['Rosacea/Redness'],
        reportedZeroIrritation: true,
        reportedPIEReduction: true,
        authorAgeGroup: '25-34'
      }
    ]
  },

  // --- SERUMS: VITAMIN C (AM) ---
  {
    id: 'serum-vit-c-premium',
    name: 'C + E + Ferulic Clinical 15%',
    brand: 'SkinCeutical Precision Bio',
    category: 'Serum',
    price: 182,
    budgetTier: 'clinical',
    targetSkinTypes: ['Normal', 'Combination', 'Oily', 'Dry'],
    targetBarriers: ['Healthy'],
    keyActives: [
      { name: 'L-Ascorbic Acid (Pure Vitamin C)', concentration: '15.0%', purpose: 'Potent antioxidant neutralizing free radicals & boosting collagen synthesis', phRange: '2.5 - 3.0' },
      { name: 'Alpha Tocopherol (Pure Vitamin E)', concentration: '1.0%', purpose: 'Lipid-soluble antioxidant regenerating Vitamin C' },
      { name: 'Ferulic Acid', concentration: '0.5%', purpose: 'Doubles photoprotective efficiency & stabilizes low pH' }
    ],
    ph: 2.8,
    badges: ['Fragrance-Free', 'Pore-Safe (Won’t Clog Pores)'],
    dosageGuidance: 'Apply 4-5 drops to freshly cleansed, completely DRY face and neck. Press firmly into skin.',
    applicationOrder: 3,
    targetTime: 'AM',
    waitMinutes: 10,
    description: 'Gold-standard Duke formulation patent profile. Delivers 8x photo-defense when paired under broad-spectrum SPF.',
    texture: 'Water-weight clear solution with signature antioxidant scent',
    dupeId: 'serum-vit-c-dupe',
    dupeActiveMatchPercent: 98,
    reviews: [
      {
        id: 'rev-v1',
        reviewerSkinType: 'Combination',
        reviewerBarrier: 'Healthy',
        daysUsed: 60,
        rating: 5,
        comment: 'Faded stubborn sun spots and post-acne marks significantly in 6 weeks. Incredible brightening.',
        flagsAddressed: ['Dark Spots & Uneven Tone', 'Fine Lines'],
        reportedZeroIrritation: true,
        reportedPIEReduction: true,
        authorAgeGroup: '35-44'
      },
      {
        id: 'rev-v2',
        reviewerSkinType: 'Combination',
        reviewerBarrier: 'Sensitized',
        daysUsed: 5,
        rating: 3,
        comment: 'Potent. Stung when my barrier was compromised. Needed to wait until barrier healed first.',
        flagsAddressed: ['Rosacea/Redness'],
        reportedZeroIrritation: false,
        reportedPIEReduction: false,
        authorAgeGroup: '25-34'
      }
    ]
  },
  {
    id: 'serum-vit-c-dupe',
    name: '20% Vitamin C + E + Ferulic Acid Serum',
    brand: 'Timeless Skin Science Bio',
    category: 'Serum',
    price: 26,
    budgetTier: 'drugstore',
    targetSkinTypes: ['Normal', 'Combination', 'Oily', 'Dry'],
    targetBarriers: ['Healthy'],
    keyActives: [
      { name: 'L-Ascorbic Acid', concentration: '20.0%', purpose: 'Clinical high-potency antioxidant & tyrosinase inhibitor', phRange: '2.4 - 2.8' },
      { name: 'Alpha Tocopherol', concentration: '1.0%', purpose: 'Stabilizing antioxidant companion' },
      { name: 'Ferulic Acid', concentration: '0.5%', purpose: 'Photoprotection amplifier' }
    ],
    ph: 2.7,
    badges: ['Fragrance-Free', 'Pore-Safe (Won’t Clog Pores)', 'Protects Skin Shield'],
    dosageGuidance: '3-4 drops on clean, completely dry skin. Allow 10 min wait time before subsequent moisturizers.',
    applicationOrder: 3,
    targetTime: 'AM',
    waitMinutes: 10,
    description: 'Exact bio-identical active trio at an accessible price. Airless vacuum pump packaging prevents photo-oxidation.',
    texture: 'Fluid, non-greasy fast absorbing liquid',
    reviews: [
      {
        id: 'rev-v3',
        reviewerSkinType: 'Combination',
        reviewerBarrier: 'Healthy',
        daysUsed: 45,
        rating: 5,
        comment: 'Saves $156 compared to the luxury patent brand and yields 98% identical brightness metrics on my scan.',
        flagsAddressed: ['Dark Spots & Uneven Tone', 'Red Breakout Spots'],
        reportedZeroIrritation: true,
        reportedPIEReduction: true,
        authorAgeGroup: '25-34'
      },
      {
        id: 'rev-v4',
        reviewerSkinType: 'Oily',
        reviewerBarrier: 'Healthy',
        daysUsed: 30,
        rating: 5,
        comment: 'Quick absorption, zero pore clogging. My post-blemish spots clear twice as fast.',
        flagsAddressed: ['Red Breakout Spots', 'Active Acne'],
        reportedZeroIrritation: true,
        reportedPIEReduction: true,
        authorAgeGroup: '18-24'
      }
    ]
  },

  // --- SERUMS: AZELAIC ACID (FOR SENSITIZED / REDNESS / ROSACEA / PIE) ---
  {
    id: 'serum-azelaic-clinical',
    name: 'Azelaic Acid 15% Micronized Suspension',
    brand: 'Finacea Rx Bio Equivalent',
    category: 'Serum',
    price: 64,
    budgetTier: 'clinical',
    targetSkinTypes: ['Combination', 'Oily', 'Sensitized', 'Normal'] as any,
    targetBarriers: ['Sensitized', 'Healthy', 'Compromised'],
    keyActives: [
      { name: 'Micronized Azelaic Acid', concentration: '15.0%', purpose: 'Selective antimycotic, anti-inflammatory, reduces PIE and papulopustular rosacea', phRange: '4.5 - 5.0' },
      { name: 'Colloidal Avena Sativa', concentration: '1.0%', purpose: 'Neuro-calming oat beta-glucan' }
    ],
    ph: 4.8,
    badges: ['Fragrance-Free', 'Pore-Safe (Won’t Clog Pores)', 'Fungal Acne Safe', 'Protects Skin Shield'],
    dosageGuidance: 'Pea-sized amount spread evenly across face. Can be applied AM or PM.',
    applicationOrder: 3,
    targetTime: 'BOTH',
    waitMinutes: 5,
    description: 'Medical-grade dicarboxylic acid formula targeting persistent vascular redness, acne bacteria, and stubborn melasma.',
    texture: 'Silky micro-matte gel-cream',
    dupeId: 'serum-azelaic-dupe',
    dupeActiveMatchPercent: 92,
    reviews: [
      {
        id: 'rev-a1',
        reviewerSkinType: 'Combination',
        reviewerBarrier: 'Sensitized',
        daysUsed: 28,
        rating: 5,
        comment: '91% of my post-acne red marks (PIE) faded. Unlike harsh acids, this actually soothed my rosacea flush.',
        flagsAddressed: ['Red Breakout Spots', 'Rosacea/Redness'],
        reportedZeroIrritation: true,
        reportedPIEReduction: true,
        authorAgeGroup: '25-34'
      },
      {
        id: 'rev-a2',
        reviewerSkinType: 'Oily',
        reviewerBarrier: 'Sensitized',
        daysUsed: 35,
        rating: 5,
        comment: 'T-zone inflammation dropped noticeably by week 2. Does not trigger flaking.',
        flagsAddressed: ['Active Acne', 'Red Breakout Spots'],
        reportedZeroIrritation: true,
        reportedPIEReduction: true,
        authorAgeGroup: '18-24'
      }
    ]
  },
  {
    id: 'serum-azelaic-dupe',
    name: 'Azelaic Acid 10% Clarifying Booster',
    brand: 'The Ordinary Pure Derma',
    category: 'Serum',
    price: 11,
    budgetTier: 'drugstore',
    targetSkinTypes: ['Combination', 'Oily', 'Sensitized', 'Normal'] as any,
    targetBarriers: ['Sensitized', 'Healthy'],
    keyActives: [
      { name: 'Azelaic Acid', concentration: '10.0%', purpose: 'Reduces microbial load and evens surface tone' },
      { name: 'Isodecyl Neopentanoate', concentration: '3.0%', purpose: 'Lightweight non-occlusive slip' }
    ],
    ph: 4.9,
    badges: ['Fragrance-Free', 'Pore-Safe (Won’t Clog Pores)', 'Fungal Acne Safe'],
    dosageGuidance: 'Small pea-sized amount over face. Pat gently to avoid pilling with subsequent creams.',
    applicationOrder: 3,
    targetTime: 'BOTH',
    waitMinutes: 3,
    description: 'High-value entry active for redness moderation and post-blemish pigmentation.',
    texture: 'Suspension cream with velvety finish',
    reviews: [
      {
        id: 'rev-a3',
        reviewerSkinType: 'Combination',
        reviewerBarrier: 'Sensitized',
        daysUsed: 21,
        rating: 4,
        comment: 'Remarkably effective for PIE at just $11. Let it dry before layering heavy creams.',
        flagsAddressed: ['Red Breakout Spots'],
        reportedZeroIrritation: true,
        reportedPIEReduction: true,
        authorAgeGroup: '25-34'
      }
    ]
  },

  // --- SERUMS: RETINOID (PM) ---
  {
    id: 'serum-retinoid-clinical',
    name: 'Encapsulated Retinaldehyde 0.1% Microsponge',
    brand: 'A-Clinical Molecular Repair',
    category: 'Serum',
    price: 98,
    budgetTier: 'clinical',
    targetSkinTypes: ['Combination', 'Normal', 'Oily', 'Dry'],
    targetBarriers: ['Healthy', 'Sensitized'],
    keyActives: [
      { name: 'Liposomal Retinal (Retinaldehyde)', concentration: '0.1%', purpose: 'Converts in single step to Retinoic Acid; 11x faster than retinol with lower erythema potential', phRange: '5.5 - 6.5' },
      { name: 'Bisabolol & Allantoin', concentration: '1.5%', purpose: 'Inhibits TRPA1 receptor mediated retinoid irritation' },
      { name: 'Ectoin', concentration: '2.0%', purpose: 'Cellular extremolyte protecting keratinocyte integrity' }
    ],
    ph: 6.0,
    badges: ['Fragrance-Free', 'Pore-Safe (Won’t Clog Pores)', 'Protects Skin Shield'],
    dosageGuidance: '1-2 pumps at NIGHT ONLY. Apply to completely dry skin. Begin 2 nights per week (Skin Cycling).',
    applicationOrder: 3,
    targetTime: 'PM',
    waitMinutes: 15,
    description: 'Precision clinical vitamin A precursor offering pharmaceutical efficacy without the harsh peeling cycle of raw tretinoin.',
    texture: 'Silky saffron-hued emulsion',
    dupeId: 'serum-retinoid-dupe',
    dupeActiveMatchPercent: 94,
    reviews: [
      {
        id: 'rev-r1',
        reviewerSkinType: 'Combination',
        reviewerBarrier: 'Sensitized',
        daysUsed: 60,
        rating: 5,
        comment: 'Completely transformed skin texture without the dreaded retinoid purge and flaking. 10/10.',
        flagsAddressed: ['Fine Lines', 'Active Acne', 'Red Breakout Spots'],
        reportedZeroIrritation: true,
        reportedPIEReduction: true,
        authorAgeGroup: '35-44'
      },
      {
        id: 'rev-r2',
        reviewerSkinType: 'Oily',
        reviewerBarrier: 'Healthy',
        daysUsed: 90,
        rating: 5,
        comment: 'Clear pore decongestion and zero cystic flare-ups along jawline since starting this routine.',
        flagsAddressed: ['Active Acne'],
        reportedZeroIrritation: true,
        reportedPIEReduction: true,
        authorAgeGroup: '25-34'
      }
    ]
  },
  {
    id: 'serum-retinoid-dupe',
    name: 'A-Game 5 Retinal 0.05% Emulsion',
    brand: 'Geek & Gorgeous Bio Lab',
    category: 'Serum',
    price: 19,
    budgetTier: 'drugstore',
    targetSkinTypes: ['Combination', 'Normal', 'Oily', 'Dry'],
    targetBarriers: ['Healthy', 'Sensitized'],
    keyActives: [
      { name: 'Retinal (Retinaldehyde)', concentration: '0.05%', purpose: 'Direct retinoic acid precursor' },
      { name: 'Allantoin & Biosaccharide Gum-1', concentration: '1.2%', purpose: 'Moisture shield and anti-irritant' }
    ],
    ph: 6.2,
    badges: ['Fragrance-Free', 'Pore-Safe (Won’t Clog Pores)', 'Protects Skin Shield'],
    dosageGuidance: 'Pea-sized amount at NIGHT ONLY on dry skin. Follow with barrier moisturizer after 10-15 min.',
    applicationOrder: 3,
    targetTime: 'PM',
    waitMinutes: 15,
    description: 'Smart European formulation delivering stabilized clinical retinal at an accessible drugstore tier.',
    texture: 'Light yellow fluid emulsion',
    reviews: [
      {
        id: 'rev-r3',
        reviewerSkinType: 'Combination',
        reviewerBarrier: 'Sensitized',
        daysUsed: 40,
        rating: 5,
        comment: 'Saves $79 and outperforms most OTC retinol oils. Gentle yet visibly smoothed forehead micro-lines.',
        flagsAddressed: ['Fine Lines', 'Red Breakout Spots'],
        reportedZeroIrritation: true,
        reportedPIEReduction: true,
        authorAgeGroup: '25-34'
      }
    ]
  },

  // --- MOISTURIZERS: BARRIER LIPID MATRIX ---
  {
    id: 'cream-barrier-premium',
    name: 'Triple Lipid Restore 2:4:2 Clinical Cream',
    brand: 'SkinCeutical Precision Bio',
    category: 'Moisturizer',
    price: 150,
    budgetTier: 'clinical',
    targetSkinTypes: ['Dry', 'Sensitized', 'Normal', 'Combination'] as any,
    targetBarriers: ['Compromised', 'Sensitized', 'Healthy'],
    keyActives: [
      { name: 'Pure Ceramide 1 & 3', concentration: '2.0%', purpose: 'Reconstructs stratum corneum intercellular lamellar sheets' },
      { name: 'Natural Cholesterol', concentration: '4.0%', purpose: 'Accelerates barrier self-repair and optimizes lipid bilayer viscosity' },
      { name: 'Essential Fatty Acids (Sunflower/Linoleic)', concentration: '2.0%', purpose: 'Restores skin structural flexibility and suppresses TEWL' }
    ],
    ph: 5.4,
    badges: ['Fragrance-Free', 'Pore-Safe (Won’t Clog Pores)', 'Protects Skin Shield'],
    dosageGuidance: 'Warm a dime-sized amount between fingertips. Press into face and neck morning and evening.',
    applicationOrder: 4,
    targetTime: 'BOTH',
    description: 'Clinically proven 2:4:2 physiological ratio that resets compromised barrier kinetics within 24 hours.',
    texture: 'Cushioned melting lipid balm-cream',
    dupeId: 'cream-barrier-dupe',
    dupeActiveMatchPercent: 95,
    reviews: [
      {
        id: 'rev-m1',
        reviewerSkinType: 'Dry',
        reviewerBarrier: 'Compromised',
        daysUsed: 14,
        rating: 5,
        comment: 'Repaired my severely stinging barrier after an over-exfoliation accident in literally 3 days.',
        flagsAddressed: ['Rosacea/Redness', 'Red Breakout Spots'],
        reportedZeroIrritation: true,
        reportedPIEReduction: true,
        authorAgeGroup: '25-34'
      },
      {
        id: 'rev-m2',
        reviewerSkinType: 'Combination',
        reviewerBarrier: 'Sensitized',
        daysUsed: 30,
        rating: 5,
        comment: 'Rich without inducing closed comedones. Leaves a velvet matte finish rather than grease.',
        flagsAddressed: ['Red Breakout Spots'],
        reportedZeroIrritation: true,
        reportedPIEReduction: true,
        authorAgeGroup: '35-44'
      }
    ]
  },
  {
    id: 'cream-barrier-dupe',
    name: 'Lipid Gold Barrier Repair Emulsion',
    brand: 'Stratia Bio-Equivalent',
    category: 'Moisturizer',
    price: 29,
    budgetTier: 'drugstore',
    targetSkinTypes: ['Dry', 'Sensitized', 'Normal', 'Combination'] as any,
    targetBarriers: ['Compromised', 'Sensitized', 'Healthy'],
    keyActives: [
      { name: 'Ceramides NP, AP, EOP', concentration: '2.0%', purpose: 'Equi-molar lipid ratio' },
      { name: 'Cholesterol & Free Fatty Acids', concentration: '3.8%', purpose: 'Physiological barrier mimicking matrix' },
      { name: 'Sea Buckthorn Oil & Rosehip', concentration: '1.5%', purpose: 'Rich in anti-inflammatory palmitoleic acid' },
      { name: 'Niacinamide', concentration: '4.0%', purpose: 'Stimulates endogenous ceramide synthesis' }
    ],
    ph: 5.5,
    badges: ['Fragrance-Free', 'Pore-Safe (Won’t Clog Pores)', 'Protects Skin Shield'],
    dosageGuidance: '1-2 pumps morning and evening. Can be applied over slightly damp skin or after active serums.',
    applicationOrder: 4,
    targetTime: 'BOTH',
    description: 'Cult-favorite clinical dupe delivering the identical golden-ratio lipid rebuilding science at 80% lower cost.',
    texture: 'Golden soothing light lotion-balm',
    reviews: [
      {
        id: 'rev-m3',
        reviewerSkinType: 'Combination',
        reviewerBarrier: 'Sensitized',
        daysUsed: 30,
        rating: 5,
        comment: 'Identical lipid restoration results, saves $121 per bottle. Niacinamide addition is a huge bonus.',
        flagsAddressed: ['Rosacea/Redness', 'Red Breakout Spots'],
        reportedZeroIrritation: true,
        reportedPIEReduction: true,
        authorAgeGroup: '25-34'
      },
      {
        id: 'rev-m4',
        reviewerSkinType: 'Dry',
        reviewerBarrier: 'Compromised',
        daysUsed: 21,
        rating: 5,
        comment: 'Zero sting on application. Rebuilt my skin cushion after chemical peel burn.',
        flagsAddressed: ['Red Breakout Spots'],
        reportedZeroIrritation: true,
        reportedPIEReduction: true,
        authorAgeGroup: '35-44'
      }
    ]
  },

  // --- SUNSCREENS: DAILY UV DEFENSE (AM ONLY) ---
  {
    id: 'spf-mineral-clinical',
    name: 'UV Clear Broad-Spectrum SPF 46 Tinted/Pure',
    brand: 'EltaMD Clinical Dermatology',
    category: 'Sunscreen',
    price: 43,
    budgetTier: 'balanced',
    targetSkinTypes: ['Combination', 'Oily', 'Sensitized', 'Normal', 'Dry'] as any,
    targetBarriers: ['Healthy', 'Sensitized', 'Compromised'],
    keyActives: [
      { name: 'Transparent Zinc Oxide', concentration: '9.0%', purpose: 'Photostable physical UVA/UVB blockade' },
      { name: 'Niacinamide (Vitamin B3)', concentration: '5.0%', purpose: 'Downregulates inflammatory cytokines and prevents post-inflammatory hyperpigmentation' },
      { name: 'Hyaluronic Acid', concentration: '0.8%', purpose: 'Non-occlusive dermal hydration' }
    ],
    ph: 6.8,
    badges: ['Fragrance-Free', 'Pore-Safe (Won’t Clog Pores)', 'Fungal Acne Safe', 'Reef-Safe SPF', 'Protects Skin Shield'],
    dosageGuidance: 'Two full finger lengths (1/4 teaspoon for face and neck). Reapply every 2 hours during direct UV exposure.',
    applicationOrder: 5,
    targetTime: 'AM',
    description: 'Dermatologist #1 recommended formula for acne-prone, hyperpigmented, and rosacea-susceptible profiles.',
    texture: 'Weightless oil-free lotion with transparent dry-down',
    dupeId: 'spf-mineral-dupe',
    dupeActiveMatchPercent: 93,
    reviews: [
      {
        id: 'rev-s1',
        reviewerSkinType: 'Combination',
        reviewerBarrier: 'Sensitized',
        daysUsed: 90,
        rating: 5,
        comment: 'The only sunscreen that does not trigger whiteheads or inflame my rosacea cheeks. Holy grail.',
        flagsAddressed: ['Rosacea/Redness', 'Active Acne', 'Red Breakout Spots'],
        reportedZeroIrritation: true,
        reportedPIEReduction: true,
        authorAgeGroup: '25-34'
      },
      {
        id: 'rev-s2',
        reviewerSkinType: 'Oily',
        reviewerBarrier: 'Healthy',
        daysUsed: 60,
        rating: 5,
        comment: 'Leaves zero greasy shine by 2 PM. Works beautifully under mineral powder.',
        flagsAddressed: ['Active Acne'],
        reportedZeroIrritation: true,
        reportedPIEReduction: false,
        authorAgeGroup: '18-24'
      }
    ]
  },
  {
    id: 'spf-mineral-dupe',
    name: 'Zinc Barrier Daily Defense Fluid SPF 50',
    brand: 'Hero Force Shield Bio',
    category: 'Sunscreen',
    price: 18,
    budgetTier: 'drugstore',
    targetSkinTypes: ['Combination', 'Oily', 'Sensitized', 'Normal', 'Dry'] as any,
    targetBarriers: ['Healthy', 'Sensitized', 'Compromised'],
    keyActives: [
      { name: 'Non-Nano Zinc Oxide', concentration: '17.5%', purpose: 'Full physical broad-spectrum solar screen' },
      { name: 'Centella Asiatica (Cica) & Bisabolol', concentration: '1.5%', purpose: 'Calms acute solar heat erythema' }
    ],
    ph: 7.0,
    badges: ['Fragrance-Free', 'Pore-Safe (Won’t Clog Pores)', 'Fungal Acne Safe', 'Reef-Safe SPF'],
    dosageGuidance: 'Two full finger lengths applied evenly across face and neck after moisturizer.',
    applicationOrder: 5,
    targetTime: 'AM',
    description: 'Clean mineral fluid providing non-comedogenic physical protection with zero pore congestion.',
    texture: 'Ultra-sheer milky lotion',
    reviews: [
      {
        id: 'rev-s3',
        reviewerSkinType: 'Combination',
        reviewerBarrier: 'Sensitized',
        daysUsed: 30,
        rating: 5,
        comment: 'Saves $25 every bottle. Sheer finish with zero irritation on active breakouts.',
        flagsAddressed: ['Active Acne', 'Red Breakout Spots'],
        reportedZeroIrritation: true,
        reportedPIEReduction: true,
        authorAgeGroup: '25-34'
      }
    ]
  },

  // --- EXFOLIANTS: CHEMICAL EXFOLIATION (SKIN CYCLING / TARGETED) ---
  {
    id: 'exfoliant-bha-clinical',
    name: 'Skin Perfecting 2% BHA Salicylic Acid Liquid',
    brand: "Paula's Choice Clinical Science",
    category: 'Exfoliant',
    price: 35,
    budgetTier: 'balanced',
    targetSkinTypes: ['Oily', 'Combination', 'Normal'],
    targetBarriers: ['Healthy'],
    keyActives: [
      { name: 'Salicylic Acid (BHA)', concentration: '2.0%', purpose: 'Lipid-soluble beta hydroxy acid penetrating sebaceous infundibulum to clear micro-comedones', phRange: '3.2 - 3.8' },
      { name: 'Green Tea Extract (EGCG)', concentration: '1.0%', purpose: 'Powerful epigallocatechin gallate antioxidant soothing dermal redness' }
    ],
    ph: 3.5,
    badges: ['Fragrance-Free', 'Pore-Safe (Won’t Clog Pores)'],
    dosageGuidance: 'Apply nickel-sized amount onto cotton pad or fingers. Pat onto clean, DRY skin at PM. Do NOT combine with Retinoids in same night.',
    applicationOrder: 2,
    targetTime: 'PM',
    waitMinutes: 15,
    description: 'The global benchmark chemical exfoliant that dissolves oil buildup and refines pore architecture without physical scrubbing.',
    texture: 'Hydrating liquid toner-essence',
    dupeId: 'exfoliant-bha-dupe',
    dupeActiveMatchPercent: 97,
    reviews: [
      {
        id: 'rev-e1',
        reviewerSkinType: 'Oily',
        reviewerBarrier: 'Healthy',
        daysUsed: 40,
        rating: 5,
        comment: 'Shrunk blackheads on my nose within 10 days. Essential for anyone struggling with congested pores.',
        flagsAddressed: ['Active Acne'],
        reportedZeroIrritation: true,
        reportedPIEReduction: false,
        authorAgeGroup: '18-24'
      },
      {
        id: 'rev-e2',
        reviewerSkinType: 'Combination',
        reviewerBarrier: 'Sensitized',
        daysUsed: 14,
        rating: 3,
        comment: 'Works great but only when used once every 3-4 days. Daily use provoked cheek flaking.',
        flagsAddressed: ['Active Acne', 'Red Breakout Spots'],
        reportedZeroIrritation: false,
        reportedPIEReduction: true,
        authorAgeGroup: '25-34'
      }
    ]
  },
  {
    id: 'exfoliant-bha-dupe',
    name: '2% BHA Acne Clarifying Exfoliating Toner',
    brand: 'Peach Slices Bio Clear',
    category: 'Exfoliant',
    price: 11,
    budgetTier: 'drugstore',
    targetSkinTypes: ['Oily', 'Combination', 'Normal'],
    targetBarriers: ['Healthy'],
    keyActives: [
      { name: 'Salicylic Acid', concentration: '2.0%', purpose: 'Direct comedolytic exfoliation' },
      { name: 'Cica & Hyaluronic Acid', concentration: '2.5%', purpose: 'Buffered moisture matrix countering potential desquamation' }
    ],
    ph: 3.6,
    badges: ['Fragrance-Free', 'Pore-Safe (Won’t Clog Pores)', 'Protects Skin Shield'],
    dosageGuidance: '3-4 drops patted on clean dry skin. Maximum 2-3 nights per week.',
    applicationOrder: 2,
    targetTime: 'PM',
    waitMinutes: 15,
    description: 'Clinical-grade 2% salicylic acid formulated with soothing cica, saving $24 per bottle with identical pH performance.',
    texture: 'Slightly viscous clarifying liquid',
    reviews: [
      {
        id: 'rev-e3',
        reviewerSkinType: 'Oily',
        reviewerBarrier: 'Healthy',
        daysUsed: 30,
        rating: 5,
        comment: 'Exact same 2% BHA clearing power as Paula’s Choice, but half the price and slightly more hydrating.',
        flagsAddressed: ['Active Acne'],
        reportedZeroIrritation: true,
        reportedPIEReduction: true,
        authorAgeGroup: '18-24'
      }
    ]
  },

  // --- TONERS: HYDRATING & PREP (AM/PM) ---
  {
    id: 'toner-barrier-prep',
    name: 'Ectoin & Ceramide Micro-Infusion Essence',
    brand: 'DermaSync Lab',
    category: 'Toner',
    price: 36,
    budgetTier: 'balanced',
    targetSkinTypes: ['Sensitized', 'Dry', 'Combination', 'Normal'] as any,
    targetBarriers: ['Compromised', 'Sensitized', 'Healthy'],
    keyActives: [
      { name: 'Ectoin Cellular Stabilizer', concentration: '2.0%', purpose: 'Protects cells against environmental stress and preserves lipid bilayers' },
      { name: 'Micro-Molecular Hyaluronic Acid', concentration: '1.2%', purpose: 'Penetrates past superficial stratum corneum to plump dermis' },
      { name: 'Centella Asiatica Leaf Extract', concentration: '65.0%', purpose: 'Primary water base replacing regular aqua to maximize wound-repair cytokines' }
    ],
    ph: 5.4,
    badges: ['Fragrance-Free', 'Pore-Safe (Won’t Clog Pores)', 'Fungal Acne Safe', 'Protects Skin Shield'],
    dosageGuidance: 'Splash 4-5 drops into cupped hands, press directly into freshly cleansed face while still slightly damp.',
    applicationOrder: 2,
    targetTime: 'BOTH',
    description: 'An osmotic hydration infusion that supercharges moisture channels without triggering fungal acne or erythema.',
    texture: 'Plumping watery essence with bouncy feel',
    dupeId: 'toner-barrier-dupe',
    dupeActiveMatchPercent: 91,
    reviews: [
      {
        id: 'rev-t1',
        reviewerSkinType: 'Combination',
        reviewerBarrier: 'Sensitized',
        daysUsed: 30,
        rating: 5,
        comment: 'Stopped that mid-afternoon tight prickly feeling completely. Skin feels like velvet after pressing this in.',
        flagsAddressed: ['Rosacea/Redness', 'Red Breakout Spots'],
        reportedZeroIrritation: true,
        reportedPIEReduction: true,
        authorAgeGroup: '25-34'
      }
    ]
  },
  {
    id: 'toner-barrier-dupe',
    name: 'Centella Unscented Recovery Toner',
    brand: 'Purito Derma Essential',
    category: 'Toner',
    price: 15,
    budgetTier: 'drugstore',
    targetSkinTypes: ['Sensitized', 'Dry', 'Combination', 'Normal'] as any,
    targetBarriers: ['Compromised', 'Sensitized', 'Healthy'],
    keyActives: [
      { name: 'Centella Asiatica Extract', concentration: '10.0%', purpose: 'Anti-inflammatory flavonoids' },
      { name: 'Panthenol & Sodium Hyaluronate', concentration: '2.0%', purpose: 'Water reservoir binding' }
    ],
    ph: 5.6,
    badges: ['Fragrance-Free', 'Pore-Safe (Won’t Clog Pores)', 'Fungal Acne Safe', 'Protects Skin Shield'],
    dosageGuidance: 'Splash generously into hands and press onto face. Can layer 2-3 coats for thirsty skin.',
    applicationOrder: 2,
    targetTime: 'BOTH',
    description: 'Sublime soothing drugstore recovery essence delivering high-purity centella at a fraction of luxury costs.',
    texture: 'Light slip toner',
    reviews: [
      {
        id: 'rev-t2',
        reviewerSkinType: 'Combination',
        reviewerBarrier: 'Sensitized',
        daysUsed: 21,
        rating: 5,
        comment: 'So cooling on hot flushed skin. Repurchased 4 times already.',
        flagsAddressed: ['Rosacea/Redness'],
        reportedZeroIrritation: true,
        reportedPIEReduction: true,
        authorAgeGroup: '25-34'
      }
    ]
  }
];
