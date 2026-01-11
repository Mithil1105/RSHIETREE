import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Rashi } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/LanguageContext';

interface RashiPreviewModalProps {
  rashi: Rashi | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (rashi: Rashi) => void;
  isLoading?: boolean;
}

const rashiDetails: Record<string, { traits: string[]; lucky: string; mantra: string }> = {
  MESHA: {
    traits: ["Courageous", "Energetic", "Ambitious", "Independent"],
    lucky: "Tuesday, Red, 9",
    mantra: "Om Kraam Kreem Kraum Sah Bhaumaya Namah"
  },
  VRISHABHA: {
    traits: ["Patient", "Reliable", "Devoted", "Practical"],
    lucky: "Friday, Green, 6",
    mantra: "Om Draam Dreem Draum Sah Shukraya Namah"
  },
  MITHUNA: {
    traits: ["Curious", "Adaptable", "Clever", "Expressive"],
    lucky: "Wednesday, Yellow, 5",
    mantra: "Om Braam Breem Braum Sah Budhaya Namah"
  },
  KARKA: {
    traits: ["Intuitive", "Nurturing", "Protective", "Emotional"],
    lucky: "Monday, White, 2",
    mantra: "Om Shraam Shreem Shraum Sah Chandraya Namah"
  },
  SIMHA: {
    traits: ["Creative", "Generous", "Confident", "Leader"],
    lucky: "Sunday, Gold, 1",
    mantra: "Om Hraam Hreem Hraum Sah Suryaya Namah"
  },
  KANYA: {
    traits: ["Analytical", "Modest", "Diligent", "Perfectionist"],
    lucky: "Wednesday, Green, 5",
    mantra: "Om Braam Breem Braum Sah Budhaya Namah"
  },
  TULA: {
    traits: ["Harmonious", "Fair", "Diplomatic", "Artistic"],
    lucky: "Friday, White, 6",
    mantra: "Om Draam Dreem Draum Sah Shukraya Namah"
  },
  VRISHCHIKA: {
    traits: ["Passionate", "Determined", "Intuitive", "Magnetic"],
    lucky: "Tuesday, Red, 9",
    mantra: "Om Kraam Kreem Kraum Sah Bhaumaya Namah"
  },
  DHANU: {
    traits: ["Optimistic", "Adventurous", "Philosophical", "Honest"],
    lucky: "Thursday, Yellow, 3",
    mantra: "Om Graam Greem Graum Sah Gurave Namah"
  },
  MAKARA: {
    traits: ["Disciplined", "Ambitious", "Patient", "Responsible"],
    lucky: "Saturday, Blue, 8",
    mantra: "Om Praam Preem Praum Sah Shanaischaraya Namah"
  },
  KUMBHA: {
    traits: ["Progressive", "Humanitarian", "Independent", "Original"],
    lucky: "Saturday, Black, 8",
    mantra: "Om Praam Preem Praum Sah Shanaischaraya Namah"
  },
  MEENA: {
    traits: ["Compassionate", "Artistic", "Intuitive", "Spiritual"],
    lucky: "Thursday, Yellow, 3",
    mantra: "Om Graam Greem Graum Sah Gurave Namah"
  }
};

export function RashiPreviewModal({ rashi, isOpen, onClose, onConfirm, isLoading }: RashiPreviewModalProps) {
  const { t } = useLanguage();
  
  if (!rashi) return null;

  const details = rashiDetails[rashi.key] || {
    traits: ["Unique", "Special"],
    lucky: "Everyday is lucky",
    mantra: "Om Namah Shivaya"
  };

  // Translate lucky info (day, color, number)
  const translateLuckyInfo = (lucky: string): string => {
    if (lucky === "Everyday is lucky") {
      return t('result.everydayLucky');
    }
    
    const parts = lucky.split(', ');
    if (parts.length === 3) {
      const [day, color, number] = parts;
      const dayKey = `day.${day.toLowerCase()}`;
      const colorKey = `color.${color.toLowerCase()}`;
      const translatedDay = t(dayKey) !== dayKey ? t(dayKey) : day;
      const translatedColor = t(colorKey) !== colorKey ? t(colorKey) : color;
      return `${translatedDay}, ${translatedColor}, ${number}`;
    }
    return lucky;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg p-0 overflow-hidden border-2" style={{ borderColor: `${rashi.color}40` }}>
        {/* Header Image */}
        {rashi.image && (
          <div className="relative h-48 overflow-hidden">
            <img 
              src={rashi.image} 
              alt={rashi.label}
              className="w-full h-full object-cover"
            />
            <div 
              className="absolute inset-0"
              style={{ 
                background: `linear-gradient(to top, hsl(var(--card)) 0%, transparent 60%)` 
              }}
            />
            <div 
              className="absolute top-4 right-4 text-6xl"
              style={{ 
                color: rashi.color,
                textShadow: `0 4px 20px ${rashi.color}80`
              }}
            >
              {rashi.symbol}
            </div>
          </div>
        )}

        <div className="p-6 -mt-8 relative">
          {/* Title */}
          <DialogHeader className="mb-4">
            <DialogTitle className="flex items-center gap-3">
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center text-3xl"
                style={{ 
                  backgroundColor: `${rashi.color}20`,
                  border: `3px solid ${rashi.color}`
                }}
              >
                {rashi.symbol}
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  {t(`rashi.${rashi.key}.label`)}
                </h2>
                <p className="text-muted-foreground font-normal text-base">
                  {t(`rashi.${rashi.key}.englishName`)}
                </p>
              </div>
            </DialogTitle>
          </DialogHeader>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div 
              className="p-3 rounded-lg"
              style={{ backgroundColor: `${rashi.color}10` }}
            >
              <p className="text-xs text-muted-foreground mb-1">{t('modal.element')}</p>
              <p className="font-semibold text-foreground">{t(`element.${rashi.element}`)}</p>
            </div>
            <div 
              className="p-3 rounded-lg"
              style={{ backgroundColor: `${rashi.color}10` }}
            >
              <p className="text-xs text-muted-foreground mb-1">{t('modal.rulingPlanet')}</p>
              <p className="font-semibold text-foreground">{t(`planet.${rashi.ruling_planet}`)}</p>
            </div>
          </div>

          {/* Traits */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-2">{t('modal.keyTraits')}</p>
            <div className="flex flex-wrap gap-2">
              {details.traits.map((trait) => {
                const traitKey = trait === "Unique" ? "result.unique" : trait === "Special" ? "result.special" : `trait.${trait}`;
                return (
                  <span 
                    key={trait}
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{ 
                      backgroundColor: `${rashi.color}20`,
                      color: rashi.color
                    }}
                  >
                    {t(traitKey)}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Lucky Info */}
          <div 
            className="p-4 rounded-lg mb-6"
            style={{ backgroundColor: `${rashi.color}10` }}
          >
            <p className="text-xs text-muted-foreground mb-1">{t('modal.luckyInfo')}</p>
            <p className="font-medium text-foreground">{translateLuckyInfo(details.lucky)}</p>
          </div>

          {/* CTA Button */}
          <Button 
            className="w-full h-12 text-lg font-semibold"
            style={{ 
              backgroundColor: rashi.color,
              color: 'white'
            }}
            onClick={() => onConfirm(rashi)}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
                {t('modal.findingTrees')}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                {t('modal.discoverTrees')}
              </span>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
