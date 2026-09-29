import { GeoEnvironmentalData, RegimenStep, Product } from '../types/dermasync';
import { INDIA_CURATED_PRODUCTS } from '../data/geoCatalog';
import { CLINICAL_PRODUCTS } from '../data/products';

export interface ClimateInterventionReport {
  humiditySwapped: boolean;
  heavyCreamSwappedToGel: boolean;
  pollutionShieldAdded: boolean;
  doubleCleanseAdded: boolean;
  highUvAlertActive: boolean;
  interventionMessages: string[];
}

export function applyClimateResponsiveLogic(
  baseAmSteps: RegimenStep[],
  basePmSteps: RegimenStep[],
  geoData: GeoEnvironmentalData
): {
  adaptedAmSteps: RegimenStep[];
  adaptedPmSteps: RegimenStep[];
  interventionReport: ClimateInterventionReport;
} {
  const isIndia = geoData.country === 'IN';
  const availableCatalog = isIndia ? [...INDIA_CURATED_PRODUCTS, ...CLINICAL_PRODUCTS] : CLINICAL_PRODUCTS;

  const messages: string[] = [];
  let humiditySwapped = false;
  let heavyCreamSwappedToGel = false;
  let pollutionShieldAdded = false;
  let doubleCleanseAdded = false;
  const highUvAlertActive = geoData.uvIndex > 6.0;

  // Clone steps so we don't mutate original state
  let adaptedAmSteps: RegimenStep[] = baseAmSteps.map(s => ({ ...s }));
  let adaptedPmSteps: RegimenStep[] = basePmSteps.map(s => ({ ...s }));

  // 1. If user is in India, map to Indian domestic/imported products if they are currently US products
  if (isIndia) {
    adaptedAmSteps = adaptedAmSteps.map(step => {
      const indiaMatch = INDIA_CURATED_PRODUCTS.find(p => p.category === step.product.category);
      if (indiaMatch) {
        return {
          ...step,
          product: indiaMatch
        };
      }
      return step;
    });

    adaptedPmSteps = adaptedPmSteps.map(step => {
      const indiaMatch = INDIA_CURATED_PRODUCTS.find(p => p.category === step.product.category);
      if (indiaMatch) {
        return {
          ...step,
          product: indiaMatch
        };
      }
      return step;
    });
  }

  // 2. High Humidity (> 70%): Heavy creams feel greasy and clog pores in humid weather
  if (geoData.humidity > 70) {
    humiditySwapped = true;
    const waterGel = availableCatalog.find(p => p.climateTags?.includes('lightweight-water-gel'))
      || INDIA_CURATED_PRODUCTS.find(p => p.id === 'cream-minimalist-b5-gel');

    if (waterGel) {
      adaptedAmSteps = adaptedAmSteps.map(step => {
        if (step.product.category === 'Moisturizer') {
          heavyCreamSwappedToGel = true;
          return {
            ...step,
            product: waterGel,
            dosage: 'Coin-sized dollop',
            climateBadge: `Weather Swap: Too humid for heavy creams (${geoData.humidity}% humidity)`,
            clinicalNote: `Weather Tip: It is muggy and humid (${geoData.humidity}%) in ${geoData.city} today! We swapped your heavy cream for this ultra-light water-gel with Vitamin B5 (Moisture Cushion) and Zinc (Oil Balancer) so your skin stays matte and fresh.`
          };
        }
        if (step.product.category === 'Sunscreen') {
          const matteSpf = availableCatalog.find(p => p.climateTags?.includes('matte-fluid-spf'))
            || INDIA_CURATED_PRODUCTS.find(p => p.id === 'spf-reequil-ultra-matte');
          if (matteSpf) {
            return {
              ...step,
              product: matteSpf,
              climateBadge: 'Lightweight Sweat-Resistant Sunscreen',
              clinicalNote: `Weather Tip: A velvety matte sunscreen that won't melt off or feel sticky in ${geoData.city}'s ${geoData.temperatureC}°C warmth and humidity.`
            };
          }
        }
        return step;
      });

      adaptedPmSteps = adaptedPmSteps.map(step => {
        if (step.product.category === 'Moisturizer') {
          return {
            ...step,
            product: waterGel,
            dosage: 'Generous dime-sized dot',
            climateBadge: `Weather Swap: Light Night Gel (${geoData.humidity}% humidity)`,
            clinicalNote: `Night Tip: A cooling, oil-free hydration gel that lets your pores breathe freely while you sleep.`
          };
        }
        return step;
      });

      messages.push(`High Humidity (${geoData.humidity}%): Swapped heavy creams for a refreshing water-gel so your skin won't feel sticky or break out.`);
    }
  }

  // 3. High AQI / City Smog (> 120): Needs anti-pollution shield and double wash
  if (geoData.aqi > 120) {
    const hasDoubleCleanse = adaptedPmSteps.some(s => s.product.category === 'Double Cleanse');
    if (!hasDoubleCleanse) {
      doubleCleanseAdded = true;
      const doubleCleanseProduct = availableCatalog.find(p => p.category === 'Double Cleanse')
        || INDIA_CURATED_PRODUCTS.find(p => p.id === 'cleanser-double-balm')!;

      const newStep: RegimenStep = {
        stepNumber: 0,
        timeOfDay: 'PM',
        product: doubleCleanseProduct,
        dosage: '1-2 pumps on completely dry hands and face',
        skinCondition: 'dry skin',
        waitDurationMinutes: 0,
        climateBadge: `Smog Alert: Air Quality is ${geoData.aqi} · Wash twice tonight`,
        clinicalNote: `City Smog Tip: The air in ${geoData.city} is smoggy today (AQI ${geoData.aqi}). Start by gently massaging this nourishing balm on dry skin to melt away city dust, grime, and sunscreen before your regular wash.`
      };

      adaptedPmSteps = [newStep, ...adaptedPmSteps].map((s, idx) => ({
        ...s,
        stepNumber: idx + 1
      }));

      messages.push(`City Smog Alert (${geoData.aqi} AQI - ${geoData.aqiStatus}): Added a quick double wash tonight to rinse off city dust and pollution.`);
    }

    // Add Anti-Pollution note to AM Vitamin C
    pollutionShieldAdded = true;
    adaptedAmSteps = adaptedAmSteps.map(step => {
      if (step.product.category === 'Serum') {
        return {
          ...step,
          climateBadge: `Pollution Shield (Air Quality: ${geoData.aqi})`,
          clinicalNote: `Daily Shield Tip: Vitamin C (Brightener & Antioxidant) + Centella (Herb Soother) team up to protect your skin cells from city smog and exhaust.`
        };
      }
      return step;
    });
  }

  // 4. High UV Index (> 6.0)
  if (highUvAlertActive) {
    adaptedAmSteps = adaptedAmSteps.map(step => {
      if (step.product.category === 'Sunscreen') {
        return {
          ...step,
          climateBadge: `Strong Sun Alert (UV ${geoData.uvIndex}) · Reapply in 45m`,
          clinicalNote: `Sunshine Warning: The sun is bright in ${geoData.city} right now (UV ${geoData.uvIndex})! Apply two full finger-lengths, and reapply every 45-60 minutes if you're outdoors or sitting next to a sunny window.`
        };
      }
      return step;
    });
    messages.push(`Strong Sunshine Alert (UV ${geoData.uvIndex}): Reminder active to touch up your sunscreen today.`);
  }

  return {
    adaptedAmSteps,
    adaptedPmSteps,
    interventionReport: {
      humiditySwapped,
      heavyCreamSwappedToGel,
      pollutionShieldAdded,
      doubleCleanseAdded,
      highUvAlertActive,
      interventionMessages: messages
    }
  };
}
