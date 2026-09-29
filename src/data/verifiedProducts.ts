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
  MINIMALIST_BALM_SVG
} from './productPackagingAssets';

export interface SkincareProduct {
  id: string;
  brand: string;
  name: string;
  step: 'Cleanse' | 'Treat' | 'Moisturize' | 'Protect';
  priceINR: number;
  officialImageUrl: string;
  bestFor: string;
  plainEnglishBenefit: string;
  keyActives: string[];
  retailerLinks: { name: string; url: string }[];
}

export const VERIFIED_PRODUCTS: Record<string, SkincareProduct> = {
  'cetaphil-cleanser': {
    id: 'cetaphil-cleanser',
    brand: 'Cetaphil',
    name: 'Gentle Skin Cleanser',
    step: 'Cleanse',
    priceINR: 199,
    officialImageUrl: CETAPHIL_CLEANSER_SVG,
    bestFor: 'Sensitive, Dry, & Compromised Skin Shield',
    plainEnglishBenefit: 'Gently cleanses away dirt and sweat without stripping your natural oils or stinging your eyes.',
    keyActives: ['Hydrating Glycerin', 'Vitamin B5 (Soothes Skin)', 'Niacinamide'],
    retailerLinks: [
      { name: 'Amazon IN', url: 'https://amazon.in' },
      { name: 'Nykaa', url: 'https://nykaa.com' },
      { name: 'Blinkit', url: 'https://blinkit.com' }
    ]
  },
  'cleanser-cetaphil-gentle': {
    id: 'cleanser-cetaphil-gentle',
    brand: 'Cetaphil',
    name: 'Gentle Skin Cleanser',
    step: 'Cleanse',
    priceINR: 199,
    officialImageUrl: CETAPHIL_CLEANSER_SVG,
    bestFor: 'Sensitive, Dry, & Compromised Skin Shield',
    plainEnglishBenefit: 'Gently cleanses away dirt and sweat without stripping your natural oils or stinging your eyes.',
    keyActives: ['Hydrating Glycerin', 'Vitamin B5 (Soothes Skin)', 'Niacinamide'],
    retailerLinks: [
      { name: 'Amazon IN', url: 'https://amazon.in' },
      { name: 'Nykaa', url: 'https://nykaa.com' },
      { name: 'Blinkit', url: 'https://blinkit.com' }
    ]
  },
  'dermaco-niacinamide': {
    id: 'dermaco-niacinamide',
    brand: 'The Derma Co',
    name: '10% Niacinamide Face Serum with 2% Zinc PCA',
    step: 'Treat',
    priceINR: 224,
    officialImageUrl: DERMA_CO_NIACINAMIDE_SVG,
    bestFor: 'Oily Skin, Large Pores, & Post-Acne Marks',
    plainEnglishBenefit: 'Clears up excess midday oil, unclogs pores, and fades stubborn dark spots from past breakouts.',
    keyActives: ['10% Niacinamide (Oil Balancer)', '2% Zinc PCA (Fades Marks)'],
    retailerLinks: [
      { name: 'Brand Store', url: 'https://thedermaco.com' },
      { name: 'Nykaa', url: 'https://nykaa.com' }
    ]
  },
  'serum-derma-co-niacinamide': {
    id: 'serum-derma-co-niacinamide',
    brand: 'The Derma Co',
    name: '10% Niacinamide Face Serum with 2% Zinc PCA',
    step: 'Treat',
    priceINR: 224,
    officialImageUrl: DERMA_CO_NIACINAMIDE_SVG,
    bestFor: 'Oily Skin, Large Pores, & Post-Acne Marks',
    plainEnglishBenefit: 'Clears up excess midday oil, unclogs pores, and fades stubborn dark spots from past breakouts.',
    keyActives: ['10% Niacinamide (Oil Balancer)', '2% Zinc PCA (Fades Marks)'],
    retailerLinks: [
      { name: 'Brand Store', url: 'https://thedermaco.com' },
      { name: 'Nykaa', url: 'https://nykaa.com' }
    ]
  },
  'foxtale-sunscreen': {
    id: 'foxtale-sunscreen',
    brand: 'Foxtale',
    name: 'Cover Up Dewy Sunscreen SPF 70 PA++++',
    step: 'Protect',
    priceINR: 420,
    officialImageUrl: FOXTALE_DEWY_SPF_SVG,
    bestFor: 'Daily Sun Protection with Hydrated Glow',
    plainEnglishBenefit: 'Blocks harsh UV rays without leaving a white residue or feeling greasy in humid weather.',
    keyActives: ['New-Gen UV Filters', 'Vitamin E (Antioxidant)', 'Niacinamide'],
    retailerLinks: [
      { name: 'Nykaa', url: 'https://nykaa.com' },
      { name: 'Tira', url: 'https://tirabeauty.com' }
    ]
  },
  'spf-foxtale-dewy-70': {
    id: 'spf-foxtale-dewy-70',
    brand: 'Foxtale',
    name: 'Cover Up Dewy Sunscreen SPF 70 PA++++',
    step: 'Protect',
    priceINR: 420,
    officialImageUrl: FOXTALE_DEWY_SPF_SVG,
    bestFor: 'Daily Sun Protection with Hydrated Glow',
    plainEnglishBenefit: 'Blocks harsh UV rays without leaving a white residue or feeling greasy in humid weather.',
    keyActives: ['New-Gen UV Filters', 'Vitamin E (Antioxidant)', 'Niacinamide'],
    retailerLinks: [
      { name: 'Nykaa', url: 'https://nykaa.com' },
      { name: 'Tira', url: 'https://tirabeauty.com' }
    ]
  },
  'minimalist-salicylic': {
    id: 'minimalist-salicylic',
    brand: 'Minimalist',
    name: '2% Salicylic Acid Face Serum',
    step: 'Treat',
    priceINR: 549,
    officialImageUrl: MINIMALIST_SALICYLIC_SVG,
    bestFor: 'Blackheads, Sebaceous Filaments, & Congestion',
    plainEnglishBenefit: 'Penetrates oil-clogged pores to dissolve blackheads and calm active redness.',
    keyActives: ['2% Salicylic Acid (BHA)', 'Oligopeptide-10', 'Aloe Vera Juice'],
    retailerLinks: [
      { name: 'Minimalist Store', url: 'https://beminimalist.co' },
      { name: 'Nykaa', url: 'https://nykaa.com' },
      { name: 'Blinkit', url: 'https://blinkit.com' }
    ]
  },
  'serum-minimalist-salicylic-2': {
    id: 'serum-minimalist-salicylic-2',
    brand: 'Minimalist',
    name: '2% Salicylic Acid Face Serum',
    step: 'Treat',
    priceINR: 549,
    officialImageUrl: MINIMALIST_SALICYLIC_SVG,
    bestFor: 'Blackheads, Sebaceous Filaments, & Congestion',
    plainEnglishBenefit: 'Penetrates oil-clogged pores to dissolve blackheads and calm active redness.',
    keyActives: ['2% Salicylic Acid (BHA)', 'Oligopeptide-10', 'Aloe Vera Juice'],
    retailerLinks: [
      { name: 'Minimalist Store', url: 'https://beminimalist.co' },
      { name: 'Nykaa', url: 'https://nykaa.com' },
      { name: 'Blinkit', url: 'https://blinkit.com' }
    ]
  },
  'minimalist-b5-gel': {
    id: 'minimalist-b5-gel',
    brand: 'Minimalist',
    name: 'Vitamin B5 10% Oil-Free Water-Gel',
    step: 'Moisturize',
    priceINR: 499,
    officialImageUrl: MINIMALIST_B5_GEL_SVG,
    bestFor: 'Dehydrated, Humid Weather, & Clog-Prone Skin',
    plainEnglishBenefit: 'Delivers lightweight splash-level hydration without a heavy greasy layer.',
    keyActives: ['10% Panthenol (Vitamin B5)', 'Copper & Zinc Minerals', 'Betaine'],
    retailerLinks: [
      { name: 'Nykaa', url: 'https://nykaa.com' },
      { name: 'Amazon IN', url: 'https://amazon.in' }
    ]
  },
  'cream-minimalist-b5-gel': {
    id: 'cream-minimalist-b5-gel',
    brand: 'Minimalist',
    name: 'Vitamin B5 10% Oil-Free Water-Gel',
    step: 'Moisturize',
    priceINR: 499,
    officialImageUrl: MINIMALIST_B5_GEL_SVG,
    bestFor: 'Dehydrated, Humid Weather, & Clog-Prone Skin',
    plainEnglishBenefit: 'Delivers lightweight splash-level hydration without a heavy greasy layer.',
    keyActives: ['10% Panthenol (Vitamin B5)', 'Copper & Zinc Minerals', 'Betaine'],
    retailerLinks: [
      { name: 'Nykaa', url: 'https://nykaa.com' },
      { name: 'Amazon IN', url: 'https://amazon.in' }
    ]
  },
  'reequil-sunscreen': {
    id: 'reequil-sunscreen',
    brand: "Re'equil",
    name: 'Ultra Matte Dry Touch Gel SPF 50 PA++++',
    step: 'Protect',
    priceINR: 699,
    officialImageUrl: REEQUIL_MATTE_SPF_SVG,
    bestFor: 'High Humidity, Sweat Resistance, & Zero-Glow Matte Finish',
    plainEnglishBenefit: 'Velvety dry-touch silicone formula that controls midday oil and never stings eyes.',
    keyActives: ['Octinoxate & Tinosorb S', 'Zinc Oxide', 'Vitamin E'],
    retailerLinks: [
      { name: 'Brand Store', url: 'https://reequil.com' },
      { name: 'Nykaa', url: 'https://nykaa.com' }
    ]
  },
  'spf-reequil-ultra-matte': {
    id: 'spf-reequil-ultra-matte',
    brand: "Re'equil",
    name: 'Ultra Matte Dry Touch Gel SPF 50 PA++++',
    step: 'Protect',
    priceINR: 699,
    officialImageUrl: REEQUIL_MATTE_SPF_SVG,
    bestFor: 'High Humidity, Sweat Resistance, & Zero-Glow Matte Finish',
    plainEnglishBenefit: 'Velvety dry-touch silicone formula that controls midday oil and never stings eyes.',
    keyActives: ['Octinoxate & Tinosorb S', 'Zinc Oxide', 'Vitamin E'],
    retailerLinks: [
      { name: 'Brand Store', url: 'https://reequil.com' },
      { name: 'Nykaa', url: 'https://nykaa.com' }
    ]
  },
  'reequil-ceramide': {
    id: 'reequil-ceramide',
    brand: "Re'equil",
    name: 'Ceramide & Hyaluronic Acid Moisturizer',
    step: 'Moisturize',
    priceINR: 425,
    officialImageUrl: REEQUIL_CERAMIDE_SVG,
    bestFor: 'Compromised Barrier, Stinging Skin, & Dry Patches',
    plainEnglishBenefit: 'Replenishes skin lipid matrix to heal micro-tears and lock in lasting moisture.',
    keyActives: ['Ceramide III', 'Hyaluronic Acid', 'Mango Seed Butter'],
    retailerLinks: [
      { name: 'Nykaa', url: 'https://nykaa.com' },
      { name: 'Amazon IN', url: 'https://amazon.in' }
    ]
  },
  'cream-ceramide-reequil': {
    id: 'cream-ceramide-reequil',
    brand: "Re'equil",
    name: 'Ceramide & Hyaluronic Acid Moisturizer',
    step: 'Moisturize',
    priceINR: 425,
    officialImageUrl: REEQUIL_CERAMIDE_SVG,
    bestFor: 'Compromised Barrier, Stinging Skin, & Dry Patches',
    plainEnglishBenefit: 'Replenishes skin lipid matrix to heal micro-tears and lock in lasting moisture.',
    keyActives: ['Ceramide III', 'Hyaluronic Acid', 'Mango Seed Butter'],
    retailerLinks: [
      { name: 'Nykaa', url: 'https://nykaa.com' },
      { name: 'Amazon IN', url: 'https://amazon.in' }
    ]
  },
  'cosrx-snail-mucin': {
    id: 'cosrx-snail-mucin',
    brand: 'COSRX',
    name: 'Advanced Snail 96 Mucin Power Essence',
    step: 'Treat',
    priceINR: 1190,
    officialImageUrl: COSRX_SNAIL_MUCIN_SVG,
    bestFor: 'Dehydration, Textural Roughness, & Barrier Repair',
    plainEnglishBenefit: 'Plumps skin cells with intense moisture and imparts a healthy glass-skin bounce.',
    keyActives: ['96.3% Snail Secretion Filtrate', 'Sodium Hyaluronate', 'Allantoin'],
    retailerLinks: [
      { name: 'Nykaa', url: 'https://nykaa.com' },
      { name: 'Tira', url: 'https://tirabeauty.com' }
    ]
  },
  'toner-cosrx-snail-or-centella': {
    id: 'toner-cosrx-snail-or-centella',
    brand: 'COSRX',
    name: 'Advanced Snail 96 Mucin Power Essence',
    step: 'Treat',
    priceINR: 1190,
    officialImageUrl: COSRX_SNAIL_MUCIN_SVG,
    bestFor: 'Dehydration, Textural Roughness, & Barrier Repair',
    plainEnglishBenefit: 'Plumps skin cells with intense moisture and imparts a healthy glass-skin bounce.',
    keyActives: ['96.3% Snail Secretion Filtrate', 'Sodium Hyaluronate', 'Allantoin'],
    retailerLinks: [
      { name: 'Nykaa', url: 'https://nykaa.com' },
      { name: 'Tira', url: 'https://tirabeauty.com' }
    ]
  },
  'minimalist-vitc': {
    id: 'minimalist-vitc',
    brand: 'Minimalist',
    name: '10% Vitamin C + Centella Glow Serum',
    step: 'Treat',
    priceINR: 699,
    officialImageUrl: MINIMALIST_VITC_SVG,
    bestFor: 'Dullness, Sun Spots, & Antioxidant Defense',
    plainEnglishBenefit: 'Brightens skin complexion and shields against city pollution and free radicals.',
    keyActives: ['10% Ethyl Ascorbic Acid', 'Centella Asiatica', 'Polyhydroxy Acid'],
    retailerLinks: [
      { name: 'Nykaa', url: 'https://nykaa.com' },
      { name: 'Amazon IN', url: 'https://amazon.in' }
    ]
  },
  'serum-minimalist-vitc-10': {
    id: 'serum-minimalist-vitc-10',
    brand: 'Minimalist',
    name: '10% Vitamin C + Centella Glow Serum',
    step: 'Treat',
    priceINR: 699,
    officialImageUrl: MINIMALIST_VITC_SVG,
    bestFor: 'Dullness, Sun Spots, & Antioxidant Defense',
    plainEnglishBenefit: 'Brightens skin complexion and shields against city pollution and free radicals.',
    keyActives: ['10% Ethyl Ascorbic Acid', 'Centella Asiatica', 'Polyhydroxy Acid'],
    retailerLinks: [
      { name: 'Nykaa', url: 'https://nykaa.com' },
      { name: 'Amazon IN', url: 'https://amazon.in' }
    ]
  },
  'skinceuticals-ce-ferulic': {
    id: 'skinceuticals-ce-ferulic',
    brand: 'SkinCeuticals',
    name: 'C E Ferulic Combination Antioxidant Serum',
    step: 'Treat',
    priceINR: 15200,
    officialImageUrl: SKINCEUTICALS_CE_SVG,
    bestFor: 'Gold-Standard Environmental & UV Photoaging Shield',
    plainEnglishBenefit: 'Clinical-strength antioxidant defense with 15% pure L-Ascorbic Acid.',
    keyActives: ['15% L-Ascorbic Acid', '1% Alpha Tocopherol', '0.5% Ferulic Acid'],
    retailerLinks: [
      { name: 'SkinCeuticals Clinical', url: 'https://skinceuticals.com' }
    ]
  },
  'serum-skinceuticals-ce-ferulic': {
    id: 'serum-skinceuticals-ce-ferulic',
    brand: 'SkinCeuticals',
    name: 'C E Ferulic Combination Antioxidant Serum',
    step: 'Treat',
    priceINR: 15200,
    officialImageUrl: SKINCEUTICALS_CE_SVG,
    bestFor: 'Gold-Standard Environmental & UV Photoaging Shield',
    plainEnglishBenefit: 'Clinical-strength antioxidant defense with 15% pure L-Ascorbic Acid.',
    keyActives: ['15% L-Ascorbic Acid', '1% Alpha Tocopherol', '0.5% Ferulic Acid'],
    retailerLinks: [
      { name: 'SkinCeuticals Clinical', url: 'https://skinceuticals.com' }
    ]
  },
  'clinical-cult-skinceuticals': {
    id: 'clinical-cult-skinceuticals',
    brand: 'SkinCeuticals',
    name: 'C E Ferulic Combination Antioxidant Serum',
    step: 'Treat',
    priceINR: 15200,
    officialImageUrl: SKINCEUTICALS_CE_SVG,
    bestFor: 'Gold-Standard Environmental & UV Photoaging Shield',
    plainEnglishBenefit: 'Clinical-strength antioxidant defense with 15% pure L-Ascorbic Acid.',
    keyActives: ['15% L-Ascorbic Acid', '1% Alpha Tocopherol', '0.5% Ferulic Acid'],
    retailerLinks: [
      { name: 'SkinCeuticals Clinical', url: 'https://skinceuticals.com' }
    ]
  },
  'dermaco-azelaic': {
    id: 'dermaco-azelaic',
    brand: 'The Derma Co',
    name: '10% Azelaic Acid Face Serum',
    step: 'Treat',
    priceINR: 499,
    officialImageUrl: DERMA_CO_AZELAIC_SVG,
    bestFor: 'Fading lingering red pimple marks & calming irritation',
    plainEnglishBenefit: 'Fades stubborn red marks left after breakouts and controls shine without stinging.',
    keyActives: ['10% Azelaic Acid', '1% Alpha Arbutin', 'Chamomile Bisabolol'],
    retailerLinks: [
      { name: 'Nykaa', url: 'https://nykaa.com' },
      { name: 'Amazon IN', url: 'https://amazon.in' }
    ]
  },
  'serum-derma-co-azelaic': {
    id: 'serum-derma-co-azelaic',
    brand: 'The Derma Co',
    name: '10% Azelaic Acid Face Serum',
    step: 'Treat',
    priceINR: 499,
    officialImageUrl: DERMA_CO_AZELAIC_SVG,
    bestFor: 'Fading lingering red pimple marks & calming irritation',
    plainEnglishBenefit: 'Fades stubborn red marks left after breakouts and controls shine without stinging.',
    keyActives: ['10% Azelaic Acid', '1% Alpha Arbutin', 'Chamomile Bisabolol'],
    retailerLinks: [
      { name: 'Nykaa', url: 'https://nykaa.com' },
      { name: 'Amazon IN', url: 'https://amazon.in' }
    ]
  },
  'minimalist-balm': {
    id: 'minimalist-balm',
    brand: 'Minimalist',
    name: 'Squalane 08% Cleansing Oil Balm',
    step: 'Cleanse',
    priceINR: 599,
    officialImageUrl: MINIMALIST_BALM_SVG,
    bestFor: 'Melting Waterproof Sunscreen & Ambient City Smog',
    plainEnglishBenefit: 'Melt-away cleansing balm that dissolves waterproof sunscreen and city soot in seconds.',
    keyActives: ['8% Plant Squalane', '35% Sunflower Seed Oil', 'Vitamin E'],
    retailerLinks: [
      { name: 'Minimalist Store', url: 'https://beminimalist.co' },
      { name: 'Nykaa', url: 'https://nykaa.com' }
    ]
  },
  'cleanser-double-balm': {
    id: 'cleanser-double-balm',
    brand: 'Minimalist',
    name: 'Squalane 08% Cleansing Oil Balm',
    step: 'Cleanse',
    priceINR: 599,
    officialImageUrl: MINIMALIST_BALM_SVG,
    bestFor: 'Melting Waterproof Sunscreen & Ambient City Smog',
    plainEnglishBenefit: 'Melt-away cleansing balm that dissolves waterproof sunscreen and city soot in seconds.',
    keyActives: ['8% Plant Squalane', '35% Sunflower Seed Oil', 'Vitamin E'],
    retailerLinks: [
      { name: 'Minimalist Store', url: 'https://beminimalist.co' },
      { name: 'Nykaa', url: 'https://nykaa.com' }
    ]
  }
};

/**
 * Retrieve verified product item by ID
 */
export function getVerifiedProduct(id: string): SkincareProduct | undefined {
  return VERIFIED_PRODUCTS[id];
}
