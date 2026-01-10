/**
 * Rashi (Moon Sign) Utility Functions
 * Maps API response to Indian Rashi names
 */

export interface RashiResult {
  number: number;
  vedic: string;
  english: string;
}

// Exact mapping as per requirements
export const RASHI_MAP: Record<number, { vedic: string; english: string }> = {
  1: { vedic: 'Mesh', english: 'Aries' },
  2: { vedic: 'Vrishabh', english: 'Taurus' },
  3: { vedic: 'Mithun', english: 'Gemini' },
  4: { vedic: 'Karka', english: 'Cancer' },
  5: { vedic: 'Simha', english: 'Leo' },
  6: { vedic: 'Kanya', english: 'Virgo' },
  7: { vedic: 'Tula', english: 'Libra' },
  8: { vedic: 'Vrishchik', english: 'Scorpio' },
  9: { vedic: 'Dhanu', english: 'Sagittarius' },
  10: { vedic: 'Makar', english: 'Capricorn' },
  11: { vedic: 'Kumbh', english: 'Aquarius' },
  12: { vedic: 'Meen', english: 'Pisces' },
};

/**
 * Extract Rashi from FreeAstrologyAPI planets response
 * 
 * @param response - The API response object
 * @returns RashiResult object with number, vedic name, and english name
 * @throws Error if moon sign cannot be extracted or is invalid
 */
export function getRashiFromPlanetsApi(response: unknown): RashiResult {
  let moonSignNum: number | undefined;

  // Type guard for response structure
  const res = response as {
    output?: Array<{
      Moon?: { current_sign?: number };
      [key: string]: { current_sign?: number } | undefined;
    }>;
  };

  // Preferred path: response.output[1].Moon.current_sign
  moonSignNum = res?.output?.[1]?.Moon?.current_sign;

  // Fallback path: response.output[0]["2"].current_sign (Moon is indexed as "2")
  if (moonSignNum === undefined || moonSignNum === null) {
    const fallbackData = res?.output?.[0]?.["2"];
    moonSignNum = fallbackData?.current_sign;
  }

  // Log in development only
  if (typeof window !== 'undefined' && import.meta.env.DEV) {
    console.log('[Rashi] Extracted moonSignNum:', moonSignNum);
  }

  // Validate the moon sign number
  if (moonSignNum === undefined || moonSignNum === null) {
    throw new Error('Moon sign (Rashi) not found in API response.');
  }

  if (typeof moonSignNum !== 'number' || moonSignNum < 1 || moonSignNum > 12) {
    throw new Error(`Moon sign (Rashi) not found in API response. Invalid value: ${moonSignNum}`);
  }

  const rashiInfo = RASHI_MAP[moonSignNum];
  
  if (!rashiInfo) {
    throw new Error(`Moon sign (Rashi) not found in API response. Unknown sign: ${moonSignNum}`);
  }

  const result: RashiResult = {
    number: moonSignNum,
    vedic: rashiInfo.vedic,
    english: rashiInfo.english,
  };

  // Log in development only
  if (typeof window !== 'undefined' && import.meta.env.DEV) {
    console.log('[Rashi] Resolved rashi object:', result);
  }

  return result;
}

/**
 * Get Rashi key for internal lookup (uppercase format)
 */
export function getRashiKey(vedic: string): string {
  return vedic.toUpperCase().replace(/H$/, 'HA');
}
