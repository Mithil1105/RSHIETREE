import { motion } from 'framer-motion';
import { Rashi } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

interface RashiCardProps {
  rashi: Rashi;
  onClick: (rashi: Rashi) => void;
  index: number;
}

export function RashiCard({ rashi, onClick, index }: RashiCardProps) {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card
        variant="rashi"
        className="group overflow-hidden"
        onClick={() => onClick(rashi)}
      >
        {/* Image Section */}
        {rashi.image && (
          <div className="relative h-28 sm:h-32 overflow-hidden">
            <img 
              src={rashi.image} 
              alt={`${t(`rashi.${rashi.key}.label`)} background`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div 
              className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent"
            />
            {/* Symbol overlay */}
            <div 
              className="absolute bottom-2 right-2 text-4xl opacity-80"
              style={{ 
                textShadow: `0 2px 8px ${rashi.color}80`,
                color: rashi.color 
              }}
            >
              {rashi.symbol}
            </div>
          </div>
        )}
        
        {/* Content Section */}
        <div className="p-4 text-center">
          <div 
            className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 transition-transform duration-300 group-hover:scale-110"
            style={{ 
              backgroundColor: `${rashi.color}20`,
              border: `2px solid ${rashi.color}40`
            }}
          >
            <span 
              className="text-2xl"
              style={{ color: rashi.color }}
            >
              {rashi.symbol}
            </span>
          </div>
          
          <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-1">
            {t(`rashi.${rashi.key}.label`)}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            {t(`rashi.${rashi.key}.englishName`)}
          </p>
          
          <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <span 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: rashi.color }}
              />
              <span>{t(`element.${rashi.element}`)}</span>
            </div>
            <span className="text-muted-foreground/40">•</span>
            <span>{t(`planet.${rashi.ruling_planet}`)}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
