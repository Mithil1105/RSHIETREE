export interface Rashi {
  key: string;
  label: string;
  englishName: string;
  symbol: string;
  element: string;
  ruling_planet: string;
  color: string;
  image?: string;
}

export interface Tree {
  id: string;
  name: string;
  scientific_name: string;
  description: string;
  care_tips: string;
  ideal_region?: string;
  image?: string;
  isPrimary?: boolean;
}

export interface RashiComputeRequest {
  date_of_birth: string;
  time_of_birth?: string;
  latitude: number;
  longitude: number;
  timezone: number;
}

export interface LocationInfo {
  lat: number;
  lon: number;
  timezone: number;
}

export interface RashiComputeResponse {
  rashi_key: string;
  rashi_label: string;
  sidereal_longitude: number;
  moon_sign_number: number;
  location: LocationInfo;
  confidence_note: string;
}

export interface TreesByRashiResponse {
  rashi_key: string;
  rashi_label: string;
  trees: Tree[];
}

export interface ApiError {
  detail: string;
  code?: string;
}

export interface GeocodingResult {
  lat: number;
  lon: number;
  display_name: string;
}
