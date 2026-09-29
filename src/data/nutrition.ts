import { NutritionRecommendation, LifestyleGuideline, SkinFlags, ClimateProfile } from '../types/dermasync';

export const DIETARY_ENHANCERS: NutritionRecommendation[] = [
  {
    type: 'enhancer',
    category: 'Healthy Skin Fats',
    title: 'Salmon, Walnuts & Chia Seeds (Omega-3s)',
    scientificRationale: 'Healthy natural fats help build your skin shield from the inside out, keeping moisture locked in and soothing tight, itchy dryness.',
    actionItems: [
      'Eat salmon, canned tuna, or sardines 2–3 times a week, or take a gentle algae/fish oil supplement daily',
      'Sprinkle a spoonful of chia seeds or walnuts over breakfast oatmeal or yogurt'
    ]
  },
  {
    type: 'enhancer',
    category: 'Skin Healers',
    title: 'Pumpkin Seeds & Green Leafy Veggies (Zinc)',
    scientificRationale: 'Zinc acts like a natural healing helper for your skin, speeding up how quickly pimples heal and calming down redness without leaving dark marks.',
    actionItems: [
      'Keep a bag of roasted pumpkin seeds for an easy midday snack',
      'Add a big handful of spinach or baby greens into your lunchtime salad or pasta'
    ]
  },
  {
    type: 'enhancer',
    category: 'Antioxidant Glow',
    title: 'Green Tea & Fresh Berries',
    scientificRationale: 'Rich in natural plant protectors that calm down red, flushed cheeks and shield your skin cells against sun and city pollution.',
    actionItems: [
      'Sip 1 or 2 cups of warm green tea or iced matcha during the day',
      'Snack on a bowl of fresh blueberries, blackberries, or strawberries'
    ]
  },
  {
    type: 'enhancer',
    category: 'Tummy & Gut Health',
    title: 'Curd / Yogurt, Kefir & Kimchi (Probiotics)',
    scientificRationale: 'A happy, balanced gut directly calms skin redness and stops sudden flare-ups and dry patches on your face.',
    actionItems: [
      'Add a small bowl of plain curd/yogurt to your lunch every day',
      'Drink an extra glass of water with lemon to help digestion'
    ]
  }
];

export const DIETARY_TRIGGERS: NutritionRecommendation[] = [
  {
    type: 'trigger',
    category: 'Sugary Treats',
    title: 'Sugary Drinks & Pastries (Quick Sugar Spikes)',
    scientificRationale: 'Big sugar rushes cause sudden blood sugar spikes, which tell your pores to pump out extra sticky oil that clogs pores.',
    actionItems: [
      'Swap sugary sodas and sweetened drinks for water infused with fresh mint or lemon',
      'Enjoy sweets right after a balanced meal rather than on an empty stomach'
    ]
  },
  {
    type: 'trigger',
    category: 'Gym Shakes',
    title: 'Dairy Whey Protein Powders',
    scientificRationale: 'Dairy whey powders are a very common trigger for stubborn pimples and bumps along the chin and jawline.',
    actionItems: [
      'Swap dairy whey for plant-based protein powders like pea, brown rice, or pumpkin seed protein',
      'Check your protein bars to make sure they do not use heavy whey concentrate'
    ]
  },
  {
    type: 'trigger',
    category: 'Hot & Spicy Foods',
    title: 'Very Spicy Chili & Steaming Hot Food',
    scientificRationale: 'Piping hot soups and intense spicy peppers open up tiny blood vessels in your cheeks, making redness and flushing look worse.',
    actionItems: [
      'Let piping hot soups and teas cool down to warm before drinking',
      'Ease up on fiery hot chili oil if your cheeks are currently flushed or irritated'
    ]
  }
];

export const LIFESTYLE_GUIDELINES: LifestyleGuideline[] = [
  {
    pillar: 'Washing Water Temperature',
    recommendation: 'Wash with Lukewarm Water (Never Steaming Hot)',
    rationale: 'Hot water strips away your skin’s natural protective oils, leaving your face feeling tight, dry, and red after washing.',
    metricTarget: 'Use gentle, lukewarm water when washing your face in the sink or shower'
  },
  {
    pillar: 'Pillowcase Care',
    recommendation: 'Sleep on a Clean Pillowcase (Silk or Soft Cotton)',
    rationale: 'Pillowcases collect daily hair oil and dust that rubs against your face all night long.',
    metricTarget: 'Swap or wash your pillowcase once or twice a week with a gentle, fragrance-free detergent'
  },
  {
    pillar: 'Air Humidity',
    recommendation: 'Keep Room Air from Getting Too Dry',
    rationale: 'Dry indoor heating or blasting air conditioning sucks moisture out of your skin while you sleep, causing morning tightness.',
    metricTarget: 'Use a simple bedroom humidifier or keep a bowl of water near the heater in winter'
  },
  {
    pillar: 'Beauty Sleep',
    recommendation: 'Get 7 to 8 Hours of Restful Sleep',
    rationale: 'Your skin repairs and rebuilds its protective shield the fastest while you are asleep at night.',
    metricTarget: 'Wind down and put screens away 30 minutes before bed to sleep deeply'
  }
];

export function calculateTargetHydrationLiters(climate: 'arid' | 'temperate' | 'humid' | 'polluted_urban', weightKg = 68, activeHours = 1): number {
  let baseLiters = weightKg * 0.033;
  if (climate === 'arid') baseLiters += 0.6;
  if (climate === 'humid') baseLiters += 0.3;
  if (climate === 'polluted_urban') baseLiters += 0.4;
  baseLiters += activeHours * 0.4;
  return Math.round(baseLiters * 10) / 10;
}
