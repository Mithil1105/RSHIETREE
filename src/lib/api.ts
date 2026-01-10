import { RashiComputeRequest, RashiComputeResponse, TreesByRashiResponse, Rashi, GeocodingResult } from './types';
import { rashiList, getTreesForRashi, getRashiByKey } from './data';
import { supabase } from '@/integrations/supabase/client';

// Geocode a place name using Nominatim (free, no API key)
export async function geocodePlace(place: string): Promise<GeocodingResult> {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(place)}&format=json&limit=1`,
    {
      headers: {
        'User-Agent': 'RashiTreeGuide/1.0'
      }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to geocode place');
  }

  const data = await response.json();
  if (!data || data.length === 0) {
    throw new Error('Place not found. Please try a different location or enter coordinates manually.');
  }

  return {
    lat: parseFloat(data[0].lat),
    lon: parseFloat(data[0].lon),
    display_name: data[0].display_name
  };
}

// Get timezone offset from coordinates using a simple approach
// Note: This is a simplified version. For production, consider using a proper timezone API
function getTimezoneOffset(lat: number, lon: number): number {
  // Simple approximation based on longitude (15 degrees = 1 hour)
  // This is a rough estimate, works for most cases
  const offset = Math.round(lon / 15);
  return offset;
}

// India Standard Time offset
const IST_OFFSET = 5.5;

export async function getRashiList(): Promise<Rashi[]> {
  return rashiList;
}

export interface ComputeRashiParams {
  date_of_birth: string;
  time_of_birth?: string;
  place?: string;
  latitude?: number | null;
  longitude?: number | null;
  timezone?: number | null;
}

export async function computeRashi(params: ComputeRashiParams): Promise<RashiComputeResponse & { trees: ReturnType<typeof getTreesForRashi> }> {
  let lat: number;
  let lon: number;
  let tz: number;

  // Get coordinates
  if (params.latitude != null && params.longitude != null) {
    lat = params.latitude;
    lon = params.longitude;
    tz = params.timezone ?? getTimezoneOffset(lat, lon);
  } else if (params.place) {
    const geocoded = await geocodePlace(params.place);
    lat = geocoded.lat;
    lon = geocoded.lon;
    // For India, use IST; otherwise estimate from longitude
    tz = params.place.toLowerCase().includes('india') ? IST_OFFSET : getTimezoneOffset(lat, lon);
  } else {
    throw new Error('Either place or coordinates are required');
  }

  const request: RashiComputeRequest = {
    date_of_birth: params.date_of_birth,
    time_of_birth: params.time_of_birth,
    latitude: lat,
    longitude: lon,
    timezone: tz
  };

  // Call the edge function
  const { data, error } = await supabase.functions.invoke('compute-rashi', {
    body: request
  });

  if (error) {
    console.error('Edge function error:', error);
    throw new Error(error.message || 'Failed to compute rashi');
  }

  if (data.error) {
    throw new Error(data.error);
  }

  // Get trees for the computed rashi
  const trees = getTreesForRashi(data.rashi_key);

  return {
    ...data,
    trees
  };
}

export async function getTreesByRashi(rashiKey: string): Promise<TreesByRashiResponse> {
  // Simulate network delay for consistency
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const rashi = getRashiByKey(rashiKey);
  const trees = getTreesForRashi(rashiKey);
  
  return {
    rashi_key: rashiKey,
    rashi_label: rashi ? `${rashi.label} (${rashi.englishName})` : rashiKey,
    trees
  };
}
