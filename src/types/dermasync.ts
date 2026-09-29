export type SkinType = 'Oily' | 'Dry' | 'Combination' | 'Normal';
export type BarrierIntegrity = 'Healthy' | 'Sensitized' | 'Compromised';
export type BudgetTier = 'drugstore' | 'balanced' | 'clinical';

export interface SkinFlags {
  activeAcne: boolean;
  postInflammatoryErythema: boolean; // PIE
  hyperpigmentation: boolean;
  rosaceaRedness: boolean;
  fineLines: boolean;
  fungalAcneRisk: boolean;
}

export interface ClimateProfile {
  type: 'arid' | 'temperate' | 'humid' | 'polluted_urban';
  humidityPercent: number;
  uvIndexAvg: number;
}

export interface RetailerOption {
  name: 'Nykaa' | 'Tira' | 'Amazon IN' | 'Blinkit' | 'Zepto' | 'Sephora' | 'Direct Lab' | 'Brand Store' | string;
  url: string;
  badge?: string; // e.g. "10m Delivery", "Exclusive", "Official"
  colorClass: string;
}

export interface GeoEnvironmentalData {
  country: 'IN' | 'US' | 'GB' | string;
  countryName: string;
  flag: string;
  city: string;
  state: string;
  temperatureC: number;
  humidity: number; // percentage (e.g. 78)
  uvIndex: number; // 0-12
  aqi: number; // US AQI scale (e.g. 142)
  aqiStatus: 'Good' | 'Moderate' | 'Poor' | 'Severe';
  currencySymbol: '₹' | '$' | '£';
  currencyCode: 'INR' | 'USD' | 'GBP';
  isAutoDetected?: boolean;
  climateAlerts: {
    highHumidity: boolean; // > 70%
    highPollution: boolean; // > 120
    highUv: boolean; // > 6
  };
}

export interface QuizAnswers {
  middayShine: 'none' | 't_zone_only' | 'entire_face' | 'parched';
  cleanserSensation: 'tight_stinging' | 'normal_clean' | 'oily_film';
  barrierReactivity: 'never_reactive' | 'occasional_flaking' | 'stings_with_actives' | 'constant_burning';
  climateType: 'arid' | 'temperate' | 'humid' | 'polluted_urban';
  sunExposureHours: 'under_1' | '1_to_3' | 'over_3';
  hormonalBreakouts: 'never' | 'cyclical_jawline' | 'stress_diet_triggered';
  budgetTier: BudgetTier;
}

export interface SkinProfileMatrix {
  primaryType: SkinType;
  barrierStatus: BarrierIntegrity;
  barrierHealthScore: number; // 0-100
  hydrationIndex: number; // 0-100
  sebumIndex: number; // 0-100
  flags: SkinFlags;
  recommendedFocus: string;
  summaryProse: string;
}

export interface ActiveIngredientDetail {
  name: string;
  concentration: string;
  purpose: string;
  phRange?: string;
  isContraindicatedWith?: string[];
}

export interface CohortReview {
  id: string;
  reviewerSkinType: SkinType;
  reviewerBarrier: BarrierIntegrity;
  daysUsed: number;
  rating: number; // 1-5
  comment: string;
  flagsAddressed: string[];
  reportedZeroIrritation: boolean;
  reportedPIEReduction: boolean;
  authorAgeGroup: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'Cleanser' | 'Toner' | 'Exfoliant' | 'Serum' | 'Moisturizer' | 'Sunscreen' | 'Double Cleanse';
  price: number;
  priceInr?: number; // Price in INR (₹)
  budgetTier: BudgetTier;
  targetSkinTypes: SkinType[];
  targetBarriers: BarrierIntegrity[];
  keyActives: ActiveIngredientDetail[];
  ph: number;
  badges: (string)[];
  dosageGuidance: string;
  applicationOrder: number;
  targetTime: 'AM' | 'PM' | 'BOTH';
  waitMinutes?: number;
  description: string;
  texture: string;
  image?: string;
  imageUrl?: string;
  sizes?: { size: string; priceInr: number }[];
  bestFor?: string;
  dupeId?: string; // Links to budget-friendly equivalent
  dupeActiveMatchPercent?: number;
  retailers?: RetailerOption[];
  climateTags?: (string)[];
  climateWarning?: string;
  climateSubstituteId?: string;
  countryAvailability?: ('IN' | 'GLOBAL')[];
  reviews: CohortReview[];
}

export interface RegimenStep {
  stepNumber: number;
  timeOfDay: 'AM' | 'PM';
  product: Product;
  dosage: string;
  skinCondition: 'dry skin' | 'damp skin' | 'buffered over moisturizer';
  waitDurationMinutes: number;
  clinicalNote: string;
  completed?: boolean;
  climateBadge?: string;
}

export interface ConflictRule {
  activeA: string;
  activeB: string;
  severity: 'high' | 'moderate' | 'cautious';
  explanation: string;
  separationStrategy: string;
}

export interface NutritionRecommendation {
  type: 'enhancer' | 'trigger';
  category: string;
  title: string;
  scientificRationale: string;
  actionItems: string[];
  regionalEco?: 'IN' | 'GLOBAL' | 'BOTH';
}

export interface LifestyleGuideline {
  pillar: string;
  recommendation: string;
  rationale: string;
  metricTarget: string;
}

export interface ProgressLogEntry {
  id: string;
  weekNumber: number;
  date: string;
  photoUrl: string;
  notes: string;
  erythemaLevel: number; // 0-100 (lower is better)
  hydrationScore: number; // 0-100 (higher is better)
  barrierHealthScore: number; // 0-100 (higher is better)
}
