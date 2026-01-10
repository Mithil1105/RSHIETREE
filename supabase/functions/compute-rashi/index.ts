import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ASTROLOGY_API_URL = 'https://json.freeastrologyapi.com/planets';

// Rashi mapping with exact Vedic names (1-indexed as returned by API)
const RASHI_MAP: Record<number, { key: string; vedic: string; label: string; englishName: string }> = {
  1: { key: 'MESHA', vedic: 'Mesh', label: 'मेष', englishName: 'Aries' },
  2: { key: 'VRISHABHA', vedic: 'Vrishabh', label: 'वृषभ', englishName: 'Taurus' },
  3: { key: 'MITHUNA', vedic: 'Mithun', label: 'मिथुन', englishName: 'Gemini' },
  4: { key: 'KARKA', vedic: 'Karka', label: 'कर्क', englishName: 'Cancer' },
  5: { key: 'SIMHA', vedic: 'Simha', label: 'सिंह', englishName: 'Leo' },
  6: { key: 'KANYA', vedic: 'Kanya', label: 'कन्या', englishName: 'Virgo' },
  7: { key: 'TULA', vedic: 'Tula', label: 'तुला', englishName: 'Libra' },
  8: { key: 'VRISHCHIKA', vedic: 'Vrishchik', label: 'वृश्चिक', englishName: 'Scorpio' },
  9: { key: 'DHANU', vedic: 'Dhanu', label: 'धनु', englishName: 'Sagittarius' },
  10: { key: 'MAKARA', vedic: 'Makar', label: 'मकर', englishName: 'Capricorn' },
  11: { key: 'KUMBHA', vedic: 'Kumbh', label: 'कुंभ', englishName: 'Aquarius' },
  12: { key: 'MEENA', vedic: 'Meen', label: 'मीन', englishName: 'Pisces' },
};

interface ComputeRashiRequest {
  date_of_birth: string; // YYYY-MM-DD
  time_of_birth?: string; // HH:MM
  latitude: number;
  longitude: number;
  timezone: number;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('ASTROLOGY_API_KEY');
    if (!apiKey) {
      console.error('ASTROLOGY_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body: ComputeRashiRequest = await req.json();
    console.log('Received request:', JSON.stringify(body));

    // Parse date
    const [year, month, date] = body.date_of_birth.split('-').map(Number);
    
    // Parse time (default to noon if not provided)
    let hours = 12;
    let minutes = 0;
    if (body.time_of_birth) {
      const timeParts = body.time_of_birth.split(':').map(Number);
      hours = timeParts[0] || 12;
      minutes = timeParts[1] || 0;
    }

    const requestBody = {
      year,
      month,
      date,
      hours,
      minutes,
      seconds: 0,
      latitude: body.latitude,
      longitude: body.longitude,
      timezone: body.timezone,
      settings: {
        observation_point: "topocentric",
        ayanamsha: "lahiri"
      }
    };

    console.log('Calling Astrology API with:', JSON.stringify(requestBody));

    const response = await fetch(ASTROLOGY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Astrology API error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: `Astrology API error: ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('Astrology API response:', JSON.stringify(data));

    // Extract Moon data from the response
    // The API returns output as an array with two structures:
    // Preferred: output[1].Moon.current_sign
    // Fallback: output[0]["2"].current_sign (Moon is planet index 2)
    
    let moonSign: number | undefined;
    let moonLongitude: number | undefined;

    // Try preferred path first
    const planetsData = data.output?.[1];
    const moonData = planetsData?.Moon;
    
    if (moonData?.current_sign !== undefined) {
      moonSign = moonData.current_sign;
      moonLongitude = moonData.fullDegree;
      console.log('Extracted moon sign from preferred path (output[1].Moon):', moonSign);
    } else {
      // Try fallback path
      const fallbackData = data.output?.[0]?.["2"];
      if (fallbackData?.current_sign !== undefined) {
        moonSign = fallbackData.current_sign;
        moonLongitude = fallbackData.fullDegree;
        console.log('Extracted moon sign from fallback path (output[0]["2"]):', moonSign);
      }
    }

    if (moonSign === undefined || moonSign === null) {
      console.error('Moon sign (Rashi) not found in API response');
      return new Response(
        JSON.stringify({ error: 'Moon sign (Rashi) not found in API response.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (typeof moonSign !== 'number' || moonSign < 1 || moonSign > 12) {
      console.error('Invalid moon sign value:', moonSign);
      return new Response(
        JSON.stringify({ error: `Moon sign (Rashi) not found in API response. Invalid value: ${moonSign}` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const rashiInfo = RASHI_MAP[moonSign];
    if (!rashiInfo) {
      console.error('Unknown moon sign:', moonSign);
      return new Response(
        JSON.stringify({ error: `Unknown Rashi for moon sign: ${moonSign}` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log('Resolved rashi:', { number: moonSign, vedic: rashiInfo.vedic, english: rashiInfo.englishName });

    const result = {
      rashi_key: rashiInfo.key,
      rashi_vedic: rashiInfo.vedic,
      rashi_label: `${rashiInfo.vedic} (${rashiInfo.englishName})`,
      rashi_hindi: rashiInfo.label,
      sidereal_longitude: moonLongitude ?? 0,
      moon_sign_number: moonSign,
      location: {
        lat: body.latitude,
        lon: body.longitude,
        timezone: body.timezone,
      },
      confidence_note: body.time_of_birth 
        ? 'Exact (birth time provided)' 
        : 'Approximate (birth time not provided, using noon)',
    };

    console.log('Returning result:', JSON.stringify(result));

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in compute-rashi function:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
