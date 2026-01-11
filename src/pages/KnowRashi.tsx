import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { RashiGrid } from '@/components/RashiGrid';
import { RashiPreviewModal } from '@/components/RashiPreviewModal';
import { ErrorState } from '@/components/ErrorState';
import { rashiList } from '@/lib/data';
import { getTreesByRashi } from '@/lib/api';
import { Rashi } from '@/lib/types';
import { useLanguage } from '@/contexts/LanguageContext';

export default function KnowRashi() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedRashi, setSelectedRashi] = useState<Rashi | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRashiClick = (rashi: Rashi) => {
    setSelectedRashi(rashi);
  };

  const handleConfirm = async (rashi: Rashi) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getTreesByRashi(rashi.key);
      setSelectedRashi(null);
      navigate('/result', { 
        state: { 
          rashi,
          trees: result.trees,
          source: 'known'
        } 
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : t('error.failedFetchTrees'));
      setSelectedRashi(null);
    } finally {
      setIsLoading(false);
    }
  };

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
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
            {t('knowRashi.title')}
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {t('knowRashi.subtitle')}
          </p>
        </motion.div>

        <RashiGrid rashiList={rashiList} onSelect={handleRashiClick} />

        <RashiPreviewModal
          rashi={selectedRashi}
          isOpen={!!selectedRashi}
          onClose={() => setSelectedRashi(null)}
          onConfirm={handleConfirm}
          isLoading={isLoading}
        />
      </div>
    </Layout>
  );
}
