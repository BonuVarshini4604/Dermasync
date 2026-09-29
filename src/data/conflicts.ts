import { ConflictRule } from '../types/dermasync';

export const INGREDIENT_CONFLICT_RULES: ConflictRule[] = [
  {
    activeA: 'Retinol / Retinal (Night Renewal & Anti-Aging)',
    activeB: 'Exfoliating Acids (AHA / BHA / Glycolic / Salicylic)',
    severity: 'high',
    explanation: 'Using Retinol and strong Exfoliating Acids at the exact same time is way too harsh for your skin shield. It can cause stinging, peeling, redness, and dry patches.',
    separationStrategy: 'Use them on different nights! For example: exfoliate on Monday night, use Retinol on Tuesday night, and give your skin a soothing moisture break on Wednesday. Never layer them together on the same evening.'
  },
  {
    activeA: 'Pure Vitamin C (Morning Brightener & Antioxidant)',
    activeB: 'Copper Peptides (Skin Plumper)',
    severity: 'high',
    explanation: 'Vitamin C is naturally acidic, which breaks down Copper Peptides. When used together, they cancel each other out so neither one works, and your face can get red and irritated.',
    separationStrategy: 'Easy fix: Put on your Vitamin C in the morning right under your sunscreen, and use your Copper Peptides at night before your night cream.'
  },
  {
    activeA: 'Benzoyl Peroxide (Pimple Spot Treatment)',
    activeB: 'Retinol / Retinal (Night Renewal)',
    severity: 'high',
    explanation: 'Benzoyl Peroxide actually neutralizes Retinol when put on together, meaning your Retinol will stop working completely to clear and smooth your skin.',
    separationStrategy: 'Use Benzoyl Peroxide in the morning as a gentle pimple spot treatment, and keep your Retinol strictly for nighttime before bed.'
  },
  {
    activeA: 'Pure Vitamin C (Morning Brightener)',
    activeB: 'Exfoliating Acids (Glycolic / Lactic / Salicylic Acid)',
    severity: 'moderate',
    explanation: 'Putting on both Vitamin C and exfoliating acids at once is like giving your face a double dose of strong acids. It can cause sudden stinging, burning, and red flushed cheeks.',
    separationStrategy: 'Use Vitamin C every morning for brightening and sun defense, and use your exfoliating acids just 1 or 2 evenings a week.'
  },
  {
    activeA: 'Strong Niacinamide (Oil Control & Calmer >10%)',
    activeB: 'Pure Vitamin C (Morning Brightener)',
    severity: 'cautious',
    explanation: 'When very strong Niacinamide is mixed directly with pure Vitamin C on sensitive skin, it can cause a temporary warm feeling and mild redness for 10-15 minutes.',
    separationStrategy: 'Wait 10-15 minutes between them, or simply use Vitamin C in the morning and Niacinamide at night.'
  }
];

export interface ActivesCategory {
  id: string;
  name: string;
  aliases: string[];
  phProfile: string;
  category: 'Retinoid' | 'Acid' | 'Antioxidant' | 'Peptide' | 'Barrier' | 'Antibacterial';
  simpleWhatItDoes: string;
}

export const COMMON_SKINCARE_ACTIVES: ActivesCategory[] = [
  {
    id: 'retinal',
    name: 'Retinol / Retinal (Skin Smoother & Night Renewal)',
    aliases: ['Retin-A', 'Tretinoin', 'Adapalene', 'Retinol', 'Retinal'],
    phProfile: 'Gentle pH 5.5 - 6.5',
    category: 'Retinoid',
    simpleWhatItDoes: 'Fades fine lines and boosts new skin cell turnover overnight.'
  },
  {
    id: 'salicylic',
    name: 'Salicylic Acid / BHA (Gentle Pore Clearer)',
    aliases: ['BHA', 'Betaine Salicylate', 'Willow Bark'],
    phProfile: 'Pore-penetrating pH 3.0 - 4.0',
    category: 'Acid',
    simpleWhatItDoes: 'Dives deep into pores to dissolve trapped oil and blackheads.'
  },
  {
    id: 'glycolic',
    name: 'Glycolic / Lactic Acid (Dead Skin Polisher)',
    aliases: ['AHA', 'Lactic Acid', 'Mandelic Acid', 'Fruit Acids'],
    phProfile: 'Gentle exfoliation pH 3.2 - 3.8',
    category: 'Acid',
    simpleWhatItDoes: 'Sweeps away dull dead skin flakes for instant radiance.'
  },
  {
    id: 'vitc',
    name: 'Vitamin C (Dark Spot Brightener & Sun Defense)',
    aliases: ['Ascorbic Acid', 'Pure Vitamin C', 'Ethyl Ascorbic Acid'],
    phProfile: 'Brightening pH 2.5 - 3.2',
    category: 'Antioxidant',
    simpleWhatItDoes: 'Fades dark spots, evens skin tone, and protects against city smog.'
  },
  {
    id: 'peptides_copper',
    name: 'Copper Peptides (Skin Firming & Bounce)',
    aliases: ['Copper Peptides', 'GHK-Cu'],
    phProfile: 'Skin-friendly pH 6.0 - 7.0',
    category: 'Peptide',
    simpleWhatItDoes: 'Supports natural collagen to keep skin plump, firm, and elastic.'
  },
  {
    id: 'bpo',
    name: 'Benzoyl Peroxide (Pimple Fighter)',
    aliases: ['BPO', 'Benzaclin'],
    phProfile: 'Targeted pH 4.5 - 6.0',
    category: 'Antibacterial',
    simpleWhatItDoes: 'Quickly calms inflamed pimples and keeps acne-causing bacteria away.'
  },
  {
    id: 'azelaic',
    name: 'Azelaic Acid (Red Spot & Mark Fader)',
    aliases: ['Potassium Azeloyl Diglycinate', 'Finacea'],
    phProfile: 'Gentle pH 4.5 - 5.5',
    category: 'Acid',
    simpleWhatItDoes: 'Calms redness, soothes sensitive bumps, and fades lingering pimple marks.'
  },
  {
    id: 'niacinamide',
    name: 'Niacinamide / Vitamin B3 (Skin Calmer & Oil Balancer)',
    aliases: ['Nicotinamide', 'B3'],
    phProfile: 'Balanced pH 5.0 - 7.0',
    category: 'Barrier',
    simpleWhatItDoes: 'Tightens the look of stretched pores and keeps oily shine in check.'
  },
  {
    id: 'ceramides',
    name: 'Ceramides (Natural Skin Shield Builder)',
    aliases: ['Lipids', 'Phytosphingosine', 'Cholesterol'],
    phProfile: 'Shield pH 5.0 - 6.0',
    category: 'Barrier',
    simpleWhatItDoes: 'Locks in deep moisture and repairs your natural shield against dryness.'
  }
];
