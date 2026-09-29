import { GeoEnvironmentalData, Product, RegimenStep } from '../types/dermasync';

export const GEO_PRESETS: Record<string, GeoEnvironmentalData> = {
  mumbai: {
    country: 'IN',
    countryName: 'India',
    flag: '🇮🇳',
    city: 'Mumbai',
    state: 'Maharashtra',
    temperatureC: 31,
    humidity: 84, // > 70% triggers water-gel substitution
    uvIndex: 8.4, // > 6 triggers UV Alert
    aqi: 165, // > 120 triggers Anti-Pollution Double Cleanse
    aqiStatus: 'Poor',
    currencySymbol: '₹',
    currencyCode: 'INR',
    climateAlerts: {
      highHumidity: true,
      highPollution: true,
      highUv: true
    }
  },
  delhi: {
    country: 'IN',
    countryName: 'India',
    flag: '🇮🇳',
    city: 'New Delhi',
    state: 'Delhi NCR',
    temperatureC: 28,
    humidity: 46,
    uvIndex: 7.8,
    aqi: 274, // Severe particulate
    aqiStatus: 'Severe',
    currencySymbol: '₹',
    currencyCode: 'INR',
    climateAlerts: {
      highHumidity: false,
      highPollution: true,
      highUv: true
    }
  },
  bengaluru: {
    country: 'IN',
    countryName: 'India',
    flag: '🇮🇳',
    city: 'Bengaluru',
    state: 'Karnataka',
    temperatureC: 24,
    humidity: 62,
    uvIndex: 6.9,
    aqi: 72,
    aqiStatus: 'Moderate',
    currencySymbol: '₹',
    currencyCode: 'INR',
    climateAlerts: {
      highHumidity: false,
      highPollution: false,
      highUv: true
    }
  },
  newyork: {
    country: 'US',
    countryName: 'United States',
    flag: '🇺🇸',
    city: 'New York',
    state: 'NY',
    temperatureC: 19,
    humidity: 48,
    uvIndex: 5.2,
    aqi: 42,
    aqiStatus: 'Good',
    currencySymbol: '$',
    currencyCode: 'USD',
    climateAlerts: {
      highHumidity: false,
      highPollution: false,
      highUv: false
    }
  },
  london: {
    country: 'GB',
    countryName: 'United Kingdom',
    flag: '🇬🇧',
    city: 'London',
    state: 'Greater London',
    temperatureC: 14,
    humidity: 78,
    uvIndex: 3.4,
    aqi: 32,
    aqiStatus: 'Good',
    currencySymbol: '£',
    currencyCode: 'GBP',
    climateAlerts: {
      highHumidity: true,
      highPollution: false,
      highUv: false
    }
  },
  tokyo: {
    country: 'JP',
    countryName: 'Japan',
    flag: '🇯🇵',
    city: 'Tokyo',
    state: 'Kanto',
    temperatureC: 21,
    humidity: 65,
    uvIndex: 6.2,
    aqi: 38,
    aqiStatus: 'Good',
    currencySymbol: '$',
    currencyCode: 'USD',
    climateAlerts: {
      highHumidity: false,
      highPollution: false,
      highUv: true
    }
  }
};

/**
 * Detect user's geo-location & environmental telemetries.
 * Defaults to India (Mumbai or Bengaluru) if browser timezone is Asia/Kolkata / Asia/Calcutta,
 * or allows manual destination toggle.
 */
export function detectInitialGeo(): GeoEnvironmentalData {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.includes('Kolkata') || tz.includes('Calcutta') || tz.includes('India')) {
      return { ...GEO_PRESETS.mumbai, isAutoDetected: true };
    }
    if (tz.includes('London') || tz.includes('Europe/London')) {
      return { ...GEO_PRESETS.london, isAutoDetected: true };
    }
    if (tz.includes('America/New_York') || tz.includes('US/Eastern') || tz.includes('America/Los_Angeles')) {
      return { ...GEO_PRESETS.newyork, isAutoDetected: true };
    }
  } catch {
    // fallback
  }

  // Default to Mumbai, India (as prioritized for India user context)
  return { ...GEO_PRESETS.mumbai, isAutoDetected: true };
}

/** Formatter helper for price with appropriate currency */
export function formatRegionalPrice(priceUsd: number, priceInr: number | undefined, currency: 'INR' | 'USD' | 'GBP'): string {
  if (currency === 'INR') {
    const amount = priceInr ?? Math.round(priceUsd * 83);
    return `₹${amount.toLocaleString('en-IN')}`;
  }
  if (currency === 'GBP') {
    const amount = Math.round(priceUsd * 0.79);
    return `£${amount}`;
  }
  return `$${priceUsd}`;
}
