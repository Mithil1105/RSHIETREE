import { useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, Clock, Calendar, Info } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { OnScreenKeyboard } from '@/components/OnScreenKeyboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { computeRashi } from '@/lib/api';
import { getRashiByKey } from '@/lib/data';
import { useLanguage, GUJARAT_CITIES, CITY_KEYS } from '@/contexts/LanguageContext';

const MONTH_KEYS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december'
];

const formSchema = z.object({
  birth_day: z.string().min(1, 'Day is required').refine(val => {
    const num = parseInt(val);
    return num >= 1 && num <= 31;
  }, 'Day must be 1-31'),
  birth_month: z.string().min(1, 'Month is required'),
  birth_year: z.string().min(1, 'Year is required').refine(val => {
    const num = parseInt(val);
    return num >= 1900 && num <= new Date().getFullYear();
  }, 'Enter valid year'),
  time_hour: z.string().optional(),
  time_minute: z.string().optional(),
  time_ampm: z.enum(['AM', 'PM']).optional(),
  place: z.string().optional(),
  // DMS format for coordinates
  lat_deg: z.string().optional(),
  lat_min: z.string().optional(),
  lat_sec: z.string().optional(),
  lat_dir: z.enum(['N', 'S']).optional(),
  lon_deg: z.string().optional(),
  lon_min: z.string().optional(),
  lon_sec: z.string().optional(),
  lon_dir: z.enum(['E', 'W']).optional(),
  timezone: z.string().optional(),
}).refine(
  (data) => data.place || (data.lat_deg && data.lon_deg),
  { message: 'Either place or coordinates are required', path: ['place'] }
);

type FormData = z.infer<typeof formSchema>;
type ActiveField = 'day' | 'year' | 'hour' | 'minute' | 'place' | 
  'lat_deg' | 'lat_min' | 'lat_sec' | 'lon_deg' | 'lon_min' | 'lon_sec' | 'timezone' | null;

const FIELD_ORDER: ActiveField[] = ['day', 'year', 'hour', 'minute', 'place', 
  'lat_deg', 'lat_min', 'lat_sec', 'lon_deg', 'lon_min', 'lon_sec', 'timezone'];

export default function FindRashi() {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showManualCoords, setShowManualCoords] = useState(false);
  const [activeField, setActiveField] = useState<ActiveField>(null);
  
  const dayRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const hourRef = useRef<HTMLInputElement>(null);
  const minuteRef = useRef<HTMLInputElement>(null);
  const placeRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      birth_day: '',
      birth_month: '',
      birth_year: '',
      time_hour: '',
      time_minute: '',
      time_ampm: 'AM',
      place: '',
      lat_deg: '',
      lat_min: '',
      lat_sec: '',
      lat_dir: 'N',
      lon_deg: '',
      lon_min: '',
      lon_sec: '',
      lon_dir: 'E',
      timezone: '5.5'
    }
  });

  const watchedFields = {
    day: watch('birth_day'),
    year: watch('birth_year'),
    hour: watch('time_hour'),
    minute: watch('time_minute'),
    place: watch('place'),
    lat_deg: watch('lat_deg'),
    lat_min: watch('lat_min'),
    lat_sec: watch('lat_sec'),
    lon_deg: watch('lon_deg'),
    lon_min: watch('lon_min'),
    lon_sec: watch('lon_sec'),
    timezone: watch('timezone')
  };

  // Filter cities based on search input
  const filteredCities = useMemo(() => {
    const searchTerm = (watchedFields.place || '').toLowerCase();
    if (!searchTerm) return CITY_KEYS;
    
    return CITY_KEYS.filter(cityKey => {
      const englishName = cityKey.toLowerCase();
      const translatedName = GUJARAT_CITIES[language][cityKey].toLowerCase();
      return englishName.includes(searchTerm) || translatedName.includes(searchTerm);
    });
  }, [watchedFields.place, language]);

  const handleKeyPress = (key: string) => {
    if (!activeField) return;
    
    const fieldMap: Record<NonNullable<ActiveField>, keyof FormData> = {
      day: 'birth_day',
      year: 'birth_year',
      hour: 'time_hour',
      minute: 'time_minute',
      place: 'place',
      lat_deg: 'lat_deg',
      lat_min: 'lat_min',
      lat_sec: 'lat_sec',
      lon_deg: 'lon_deg',
      lon_min: 'lon_min',
      lon_sec: 'lon_sec',
      timezone: 'timezone'
    };

    const field = fieldMap[activeField];
    if (!field) return;

    const currentValue = watchedFields[activeField as keyof typeof watchedFields] || '';
    
    // Apply max length restrictions
    const maxLengths: Partial<Record<ActiveField, number>> = {
      day: 2,
      year: 4,
      hour: 2,
      minute: 2,
      lat_deg: 3,
      lat_min: 2,
      lat_sec: 2,
      lon_deg: 3,
      lon_min: 2,
      lon_sec: 2
    };
    
    const maxLen = maxLengths[activeField];
    if (maxLen && currentValue.length >= maxLen) return;
    
    setValue(field, currentValue + key);
  };

  const handleBackspace = () => {
    if (!activeField) return;
    
    const fieldMap: Record<NonNullable<ActiveField>, keyof FormData> = {
      day: 'birth_day',
      year: 'birth_year',
      hour: 'time_hour',
      minute: 'time_minute',
      place: 'place',
      lat_deg: 'lat_deg',
      lat_min: 'lat_min',
      lat_sec: 'lat_sec',
      lon_deg: 'lon_deg',
      lon_min: 'lon_min',
      lon_sec: 'lon_sec',
      timezone: 'timezone'
    };

    const field = fieldMap[activeField];
    if (!field) return;

    const currentValue = watchedFields[activeField as keyof typeof watchedFields] || '';
    setValue(field, currentValue.slice(0, -1));
  };

  const handleNext = () => {
    if (!activeField) return;

    // Determine available fields based on mode
    const availableFields = showManualCoords 
      ? ['day', 'year', 'hour', 'minute', 'lat_deg', 'lat_min', 'lat_sec', 'lon_deg', 'lon_min', 'lon_sec', 'timezone']
      : ['day', 'year', 'hour', 'minute', 'place'];

    const currentAvailableIndex = availableFields.indexOf(activeField);
    if (currentAvailableIndex === -1) return;

    // Find next field
    const nextIndex = currentAvailableIndex + 1;
    if (nextIndex < availableFields.length) {
      const nextField = availableFields[nextIndex] as ActiveField;
      setActiveField(nextField);
    } else {
      // If at the last field, close keyboard
      setActiveField(null);
    }
  };

  const handleCitySelect = (cityKey: string) => {
    setValue('place', cityKey + ', Gujarat, India');
    setActiveField(null);
  };

  // Convert DMS to decimal degrees
  const dmsToDecimal = (deg: string, min: string, sec: string, dir: string): number | null => {
    const d = parseFloat(deg) || 0;
    const m = parseFloat(min) || 0;
    const s = parseFloat(sec) || 0;
    
    if (d === 0 && m === 0 && s === 0) return null;
    
    let decimal = d + (m / 60) + (s / 3600);
    if (dir === 'S' || dir === 'W') decimal = -decimal;
    return decimal;
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Format date as YYYY-MM-DD
      const day = data.birth_day.padStart(2, '0');
      const date_of_birth = `${data.birth_year}-${data.birth_month}-${day}`;
      
      // Format time as HH:MM (convert from 12-hour to 24-hour if needed)
      let time_of_birth: string | undefined;
      if (data.time_hour && data.time_minute) {
        let hour = parseInt(data.time_hour);
        const minute = data.time_minute.padStart(2, '0');
        
        // Convert 12-hour to 24-hour format
        if (data.time_ampm === 'PM' && hour !== 12) {
          hour += 12;
        } else if (data.time_ampm === 'AM' && hour === 12) {
          hour = 0;
        }
        
        time_of_birth = `${hour.toString().padStart(2, '0')}:${minute}`;
      }

      // Convert DMS to decimal
      const latitude = data.lat_deg 
        ? dmsToDecimal(data.lat_deg, data.lat_min || '0', data.lat_sec || '0', data.lat_dir || 'N')
        : null;
      const longitude = data.lon_deg 
        ? dmsToDecimal(data.lon_deg, data.lon_min || '0', data.lon_sec || '0', data.lon_dir || 'E')
        : null;

      const result = await computeRashi({
        date_of_birth,
        time_of_birth,
        place: data.place || undefined,
        latitude,
        longitude,
        timezone: data.timezone ? parseFloat(data.timezone) : null,
      });

      const rashi = getRashiByKey(result.rashi_key);
      
      navigate('/result', {
        state: {
          rashi,
          trees: result.trees,
          source: 'computed',
          computeResult: result
        }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : t('error.failedComputeRashi'));
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Layout showBack>
        <LoadingState message={t('loading.calculating')} />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout showBack>
        <ErrorState 
          message={error} 
          onRetry={() => setError(null)} 
        />
      </Layout>
    );
  }

  return (
    <Layout showBack>
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
            {t('findRashi.title')}
          </h1>
          <p className="text-muted-foreground">
            {t('findRashi.intro')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card variant="nature">
            <CardHeader>
              <CardTitle className="text-xl">{t('findRashi.birthDetails')}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Date of Birth */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-base font-medium">
                    <Calendar className="w-5 h-5 text-primary" />
                    {t('findRashi.dob')}
                  </Label>
                  
                  <div className="grid grid-cols-3 gap-3">
                    {/* Day */}
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">{t('findRashi.day')}</Label>
                      <Input
                        ref={dayRef}
                        type="text"
                        inputMode="none"
                        placeholder={t('findRashi.dayPlaceholder')}
                        maxLength={2}
                        className={`text-center text-lg h-14 touch-manipulation ${activeField === 'day' ? 'ring-2 ring-primary' : ''}`}
                        {...register('birth_day')}
                        onFocus={() => setActiveField('day')}
                        readOnly
                      />
                      {errors.birth_day && (
                        <p className="text-xs text-destructive">{errors.birth_day.message}</p>
                      )}
                    </div>

                    {/* Month Dropdown */}
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">{t('findRashi.month')}</Label>
                      <Controller
                        name="birth_month"
                        control={control}
                        render={({ field }) => (
                          <Select 
                            onValueChange={(val) => {
                              field.onChange(val);
                              setActiveField(null);
                            }} 
                            value={field.value}
                          >
                            <SelectTrigger className="h-14 text-base touch-manipulation">
                              <SelectValue placeholder={t('findRashi.monthPlaceholder')} />
                            </SelectTrigger>
                            <SelectContent className="max-h-60">
                              {MONTH_KEYS.map((monthKey, index) => (
                                <SelectItem 
                                  key={monthKey} 
                                  value={(index + 1).toString().padStart(2, '0')}
                                  className="text-base py-3 touch-manipulation"
                                >
                                  {t(`month.${monthKey}`)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.birth_month && (
                        <p className="text-xs text-destructive">{errors.birth_month.message}</p>
                      )}
                    </div>

                    {/* Year */}
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">{t('findRashi.year')}</Label>
                      <Input
                        ref={yearRef}
                        type="text"
                        inputMode="none"
                        placeholder={t('findRashi.yearPlaceholder')}
                        maxLength={4}
                        className={`text-center text-lg h-14 touch-manipulation ${activeField === 'year' ? 'ring-2 ring-primary' : ''}`}
                        {...register('birth_year')}
                        onFocus={() => setActiveField('year')}
                        readOnly
                      />
                      {errors.birth_year && (
                        <p className="text-xs text-destructive">{errors.birth_year.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Numeric Keyboard for Date */}
                  {(activeField === 'day' || activeField === 'year') && (
                    <OnScreenKeyboard
                      type="numeric"
                      onKeyPress={handleKeyPress}
                      onBackspace={handleBackspace}
                      onNext={handleNext}
                    />
                  )}
                </div>

                {/* Time of Birth with AM/PM */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-base font-medium">
                    <Clock className="w-5 h-5 text-primary" />
                    {t('findRashi.tob')}
                  </Label>
                  
                  <div className="grid grid-cols-3 gap-3">
                    {/* Hour */}
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">{t('findRashi.hour')}</Label>
                      <Input
                        ref={hourRef}
                        type="text"
                        inputMode="none"
                        placeholder={t('findRashi.hourPlaceholder')}
                        maxLength={2}
                        className={`text-center text-lg h-14 touch-manipulation ${activeField === 'hour' ? 'ring-2 ring-primary' : ''}`}
                        {...register('time_hour')}
                        onFocus={() => setActiveField('hour')}
                        readOnly
                      />
                    </div>

                    {/* Minute */}
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">{t('findRashi.minute')}</Label>
                      <Input
                        ref={minuteRef}
                        type="text"
                        inputMode="none"
                        placeholder={t('findRashi.minutePlaceholder')}
                        maxLength={2}
                        className={`text-center text-lg h-14 touch-manipulation ${activeField === 'minute' ? 'ring-2 ring-primary' : ''}`}
                        {...register('time_minute')}
                        onFocus={() => setActiveField('minute')}
                        readOnly
                      />
                    </div>

                    {/* AM/PM Toggle */}
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">{t('findRashi.ampm')}</Label>
                      <Controller
                        name="time_ampm"
                        control={control}
                        render={({ field }) => (
                          <div className="flex h-14 rounded-md border border-input overflow-hidden">
                            <button
                              type="button"
                              className={`flex-1 text-lg font-medium touch-manipulation transition-colors ${
                                field.value === 'AM' 
                                  ? 'bg-primary text-primary-foreground' 
                                  : 'bg-muted hover:bg-muted/80'
                              }`}
                              onClick={() => {
                                field.onChange('AM');
                                setActiveField(null);
                              }}
                            >
                              {t('findRashi.am')}
                            </button>
                            <button
                              type="button"
                              className={`flex-1 text-lg font-medium touch-manipulation transition-colors ${
                                field.value === 'PM' 
                                  ? 'bg-primary text-primary-foreground' 
                                  : 'bg-muted hover:bg-muted/80'
                              }`}
                              onClick={() => {
                                field.onChange('PM');
                                setActiveField(null);
                              }}
                            >
                              {t('findRashi.pm')}
                            </button>
                          </div>
                        )}
                      />
                    </div>
                  </div>

                  {/* Numeric Keyboard for Time */}
                  {(activeField === 'hour' || activeField === 'minute') && (
                    <OnScreenKeyboard
                      type="numeric"
                      onKeyPress={handleKeyPress}
                      onBackspace={handleBackspace}
                      onNext={handleNext}
                    />
                  )}

                  <p className="text-xs text-muted-foreground">
                    {t('findRashi.timeHelper')}
                  </p>
                </div>

                {/* Place of Birth */}
                {!showManualCoords && (
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2 text-base font-medium">
                      <MapPin className="w-5 h-5 text-primary" />
                      {t('findRashi.pob')} *
                    </Label>

                    {/* Combined Search Input */}
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">{t('findRashi.selectCity')}</Label>
                      <Input
                        ref={placeRef}
                        type="text"
                        inputMode="none"
                        placeholder={t('findRashi.pobPlaceholder')}
                        className={`text-base h-14 touch-manipulation ${activeField === 'place' ? 'ring-2 ring-primary' : ''}`}
                        {...register('place')}
                        onFocus={() => setActiveField('place')}
                        readOnly
                      />
                      {errors.place && (
                        <p className="text-xs text-destructive">{errors.place.message}</p>
                      )}
                    </div>

                    {/* Filtered City List - Shows when place field is active */}
                    {activeField === 'place' && (
                      <div className="space-y-3">
                        {/* City suggestions - always show exactly 3 rows */}
                        <div className="rounded-lg border border-border bg-background">
                          {[0, 1, 2].map((rowIndex) => {
                            const cityKey = filteredCities[rowIndex];
                            if (cityKey) {
                              return (
                                <button
                                  key={cityKey}
                                  type="button"
                                  className="w-full px-4 py-3 text-left hover:bg-muted transition-colors border-b border-border/50 last:border-b-0 touch-manipulation"
                                  onClick={() => handleCitySelect(cityKey)}
                                >
                                  <span className="font-medium">{GUJARAT_CITIES[language][cityKey]}</span>
                                  {language !== 'en' && (
                                    <span className="text-muted-foreground ml-2 text-sm">({cityKey})</span>
                                  )}
                                </button>
                              );
                            } else {
                              return (
                                <div 
                                  key={`empty-${rowIndex}`} 
                                  className="w-full px-4 py-3 border-b border-border/50 last:border-b-0 h-[52px]"
                                >
                                  {rowIndex === 0 && filteredCities.length === 0 && (
                                    <span className="text-muted-foreground">{t('findRashi.noResults')}</span>
                                  )}
                                </div>
                              );
                            }
                          })}
                        </div>

                        {/* Keyboard below the city list */}
                        <OnScreenKeyboard
                          type="alphanumeric"
                          size="large"
                          onKeyPress={handleKeyPress}
                          onBackspace={handleBackspace}
                          onNext={handleNext}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Manual Coordinates Toggle */}
                <div className="flex items-center justify-between py-4 px-4 rounded-lg bg-accent/30 border border-border/50 touch-manipulation">
                  <Label htmlFor="manual-coords" className="text-base cursor-pointer">
                    {t('findRashi.manualCoords')}
                  </Label>
                  <Switch
                    id="manual-coords"
                    checked={showManualCoords}
                    onCheckedChange={(checked) => {
                      setShowManualCoords(checked);
                      setActiveField(null);
                    }}
                    className="touch-manipulation"
                  />
                </div>

                {/* Manual Coordinates - DMS Format */}
                {showManualCoords && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 p-4 rounded-lg bg-muted/30 border border-border/50"
                  >
                    {/* Latitude DMS */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">{t('findRashi.latitude')}</Label>
                      <div className="grid grid-cols-4 gap-2">
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">{t('findRashi.degrees')}</Label>
                          <Input
                            type="text"
                            inputMode="none"
                            placeholder="23"
                            maxLength={3}
                            className={`text-center text-lg h-12 touch-manipulation ${activeField === 'lat_deg' ? 'ring-2 ring-primary' : ''}`}
                            {...register('lat_deg')}
                            onFocus={() => setActiveField('lat_deg')}
                            readOnly
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">{t('findRashi.minutes')}</Label>
                          <Input
                            type="text"
                            inputMode="none"
                            placeholder="01"
                            maxLength={2}
                            className={`text-center text-lg h-12 touch-manipulation ${activeField === 'lat_min' ? 'ring-2 ring-primary' : ''}`}
                            {...register('lat_min')}
                            onFocus={() => setActiveField('lat_min')}
                            readOnly
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">{t('findRashi.seconds')}</Label>
                          <Input
                            type="text"
                            inputMode="none"
                            placeholder="21"
                            maxLength={2}
                            className={`text-center text-lg h-12 touch-manipulation ${activeField === 'lat_sec' ? 'ring-2 ring-primary' : ''}`}
                            {...register('lat_sec')}
                            onFocus={() => setActiveField('lat_sec')}
                            readOnly
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">N/S</Label>
                          <Controller
                            name="lat_dir"
                            control={control}
                            render={({ field }) => (
                              <div className="flex h-12 rounded-md border border-input overflow-hidden">
                                <button
                                  type="button"
                                  className={`flex-1 text-sm font-medium touch-manipulation transition-colors ${
                                    field.value === 'N' 
                                      ? 'bg-primary text-primary-foreground' 
                                      : 'bg-muted hover:bg-muted/80'
                                  }`}
                                  onClick={() => field.onChange('N')}
                                >
                                  N
                                </button>
                                <button
                                  type="button"
                                  className={`flex-1 text-sm font-medium touch-manipulation transition-colors ${
                                    field.value === 'S' 
                                      ? 'bg-primary text-primary-foreground' 
                                      : 'bg-muted hover:bg-muted/80'
                                  }`}
                                  onClick={() => field.onChange('S')}
                                >
                                  S
                                </button>
                              </div>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Longitude DMS */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">{t('findRashi.longitude')}</Label>
                      <div className="grid grid-cols-4 gap-2">
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">{t('findRashi.degrees')}</Label>
                          <Input
                            type="text"
                            inputMode="none"
                            placeholder="72"
                            maxLength={3}
                            className={`text-center text-lg h-12 touch-manipulation ${activeField === 'lon_deg' ? 'ring-2 ring-primary' : ''}`}
                            {...register('lon_deg')}
                            onFocus={() => setActiveField('lon_deg')}
                            readOnly
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">{t('findRashi.minutes')}</Label>
                          <Input
                            type="text"
                            inputMode="none"
                            placeholder="34"
                            maxLength={2}
                            className={`text-center text-lg h-12 touch-manipulation ${activeField === 'lon_min' ? 'ring-2 ring-primary' : ''}`}
                            {...register('lon_min')}
                            onFocus={() => setActiveField('lon_min')}
                            readOnly
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">{t('findRashi.seconds')}</Label>
                          <Input
                            type="text"
                            inputMode="none"
                            placeholder="17"
                            maxLength={2}
                            className={`text-center text-lg h-12 touch-manipulation ${activeField === 'lon_sec' ? 'ring-2 ring-primary' : ''}`}
                            {...register('lon_sec')}
                            onFocus={() => setActiveField('lon_sec')}
                            readOnly
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">E/W</Label>
                          <Controller
                            name="lon_dir"
                            control={control}
                            render={({ field }) => (
                              <div className="flex h-12 rounded-md border border-input overflow-hidden">
                                <button
                                  type="button"
                                  className={`flex-1 text-sm font-medium touch-manipulation transition-colors ${
                                    field.value === 'E' 
                                      ? 'bg-primary text-primary-foreground' 
                                      : 'bg-muted hover:bg-muted/80'
                                  }`}
                                  onClick={() => field.onChange('E')}
                                >
                                  E
                                </button>
                                <button
                                  type="button"
                                  className={`flex-1 text-sm font-medium touch-manipulation transition-colors ${
                                    field.value === 'W' 
                                      ? 'bg-primary text-primary-foreground' 
                                      : 'bg-muted hover:bg-muted/80'
                                  }`}
                                  onClick={() => field.onChange('W')}
                                >
                                  W
                                </button>
                              </div>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Timezone */}
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">{t('findRashi.timezone')} (IST = 5.5)</Label>
                      <Input
                        type="text"
                        inputMode="none"
                        placeholder="5.5"
                        className={`text-center text-lg h-14 touch-manipulation ${activeField === 'timezone' ? 'ring-2 ring-primary' : ''}`}
                        {...register('timezone')}
                        onFocus={() => setActiveField('timezone')}
                        readOnly
                      />
                    </div>

                    {/* Numeric Keyboard for Coordinates */}
                    {(activeField === 'lat_deg' || activeField === 'lat_min' || activeField === 'lat_sec' ||
                      activeField === 'lon_deg' || activeField === 'lon_min' || activeField === 'lon_sec' ||
                      activeField === 'timezone') && (
                      <OnScreenKeyboard
                        type="numeric"
                        onKeyPress={handleKeyPress}
                        onBackspace={handleBackspace}
                        onNext={handleNext}
                      />
                    )}
                  </motion.div>
                )}

                {/* Info Note */}
                <div className="flex items-start gap-3 p-4 rounded-lg bg-accent/30 border border-primary/10">
                  <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    {t('findRashi.infoNote')}
                  </p>
                </div>

                <Button 
                  type="submit" 
                  variant="nature" 
                  size="lg" 
                  className="w-full h-16 text-lg touch-manipulation"
                  onClick={() => setActiveField(null)}
                >
                  {t('findRashi.calculate')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
}
