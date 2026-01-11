import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ 
  title, 
  message, 
  onRetry 
}: ErrorStateProps) {
  const { t } = useLanguage();
  const displayTitle = title || t('error.title');
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
        <AlertTriangle className="w-8 h-8 text-destructive" />
      </div>
      <h3 className="font-display text-xl font-semibold text-foreground mb-2">
        {displayTitle}
      </h3>
      <p className="text-muted-foreground max-w-md mb-6">
        {message}
      </p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          <RefreshCw className="w-4 h-4 mr-2" />
          {t('error.tryAgain')}
        </Button>
      )}
    </motion.div>
  );
}
