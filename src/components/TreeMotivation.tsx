import { motion } from 'framer-motion';
import { Leaf, Heart, TreeDeciduous } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

export function TreeMotivation() {
  const { t } = useLanguage();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mb-10"
    >
      <Card className="bg-gradient-nature text-primary-foreground overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-8">
            <TreeDeciduous className="w-24 h-24" />
          </div>
          <div className="absolute bottom-4 right-8">
            <Leaf className="w-20 h-20" />
          </div>
        </div>
        
        <CardContent className="p-6 sm:p-8 relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-primary-foreground/90" />
            <h3 className="font-display text-xl sm:text-2xl font-semibold">
              {t('motivation.title')}
            </h3>
          </div>
          
          <div className="space-y-3 text-primary-foreground/90">
            <p className="text-sm sm:text-base leading-relaxed">
              🌳 {t('motivation.message')}
            </p>
          </div>
          
          <div className="mt-6 pt-4 border-t border-primary-foreground/20">
            <p className="text-xs sm:text-sm italic text-primary-foreground/80 text-center">
              "वृक्षो रक्षति रक्षितः" — A tree, when protected, protects us in return.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
