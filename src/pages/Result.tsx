import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RotateCcw, MapPin, Moon, Compass, TreeDeciduous } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Layout } from '@/components/Layout';
import { TreeCard } from '@/components/TreeCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Rashi, Tree, RashiComputeResponse } from '@/lib/types';
import { useLanguage } from '@/contexts/LanguageContext';
import nurseryQR from '@/assets/nursery-qr.png';

interface LocationState {
  rashi: Rashi;
  trees: Tree[];
  source: 'known' | 'computed';
  computeResult?: RashiComputeResponse;
}

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const state = location.state as LocationState | null;

  if (!state || !state.rashi || !state.trees) {
    return <Navigate to="/" replace />;
  }

  const { rashi, trees, source, computeResult } = state;

  // Generate QR code text with Rashi and tree info
  const qrText = `🌳 ${t('qr.title')}

${t('qr.moonSign')}: ${t(`rashi.${rashi.key}.label`)} (${t(`rashi.${rashi.key}.englishName`)})
${t('qr.element')}: ${t(`element.${rashi.element}`)}
${t('qr.rulingPlanet')}: ${t(`planet.${rashi.ruling_planet}`)}

${t('qr.recommendedTrees')}:
${trees.map((tree, i) => `${i + 1}. ${t(`tree.${tree.id}.name`) || tree.name} (${tree.scientific_name})${tree.isPrimary ? ` ⭐ ${t('tree.primary')}` : ''}`).join('\n')}

🌱 ${t('qr.plantTree')}`;

  const handleStartOver = () => {
    navigate('/');
  };

  const handleQRCodeClick = () => {
    // Navigate directly to external URL in the same tab
    window.location.href = 'https://forests.gujarat.gov.in/nursery-on-map.html';
  };

  return (
    <Layout showBack>
      <div className="max-w-5xl mx-auto min-h-[calc(100vh-120px)] flex flex-col">
        {/* Rashi Info Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4"
        >
          <div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent mb-2"
            style={{ 
              boxShadow: `0 8px 30px -8px ${rashi.color}40`,
              border: `3px solid ${rashi.color}30`
            }}
          >
            <span className="text-3xl">{rashi.symbol}</span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-1">
            {t('result.rashiIs')}
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-1">
            {t(`rashi.${rashi.key}.label`)}
          </h1>
          <p className="text-sm text-muted-foreground mb-2">
            {t(`rashi.${rashi.key}.englishName`)} • {t(`element.${rashi.element}`)}
          </p>
          
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Badge variant="outline" className="border-primary/30 text-primary text-xs">
              <Moon className="w-3 h-3 mr-1" />
              {t(`planet.${rashi.ruling_planet}`)}
            </Badge>
            {source === 'computed' && computeResult && (
              <Badge variant="outline" className="border-earth/30 text-earth text-xs">
                <Compass className="w-3 h-3 mr-1" />
                {computeResult.confidence_note}
              </Badge>
            )}
          </div>
        </motion.div>

        {/* Computation Details (if computed) */}
        {source === 'computed' && computeResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4"
          >
            <Card variant="nature" className="max-w-md mx-auto">
              <CardContent className="p-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span>{computeResult.location.timezone}</span>
                  </div>
                  <div className="text-muted-foreground">
                    {t('result.moon')}: {computeResult.sidereal_longitude.toFixed(2)}° {t('result.sidereal')}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Trees Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-4 flex-1"
        >
          <h2 className="font-display text-lg font-semibold text-foreground mb-3 text-center">
            {t('result.recommendedTrees')}
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {trees.map((tree, index) => (
              <TreeCard key={tree.id} tree={tree} index={index} />
            ))}
          </div>
        </motion.div>

        {/* QR Codes Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-4"
        >
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {/* Results QR */}
            <Card 
              variant="nature" 
              className="cursor-pointer hover:shadow-lg transition-shadow touch-manipulation"
              onClick={handleQRCodeClick}
            >
              <CardContent className="p-4 flex flex-col items-center">
                <h3 className="font-display text-sm font-semibold text-foreground mb-2 text-center">
                  {t('result.scanQR')}
                </h3>
                <div className="bg-white p-2 rounded-lg shadow-card">
                  <QRCodeSVG 
                    value={qrText}
                    size={100}
                    level="M"
                    includeMargin={false}
                    bgColor="#ffffff"
                    fgColor="#1a1a1a"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Nursery QR */}
            <Card 
              variant="nature" 
              className="bg-gradient-to-br from-earth/5 to-primary/5 border-earth/20 cursor-pointer hover:shadow-lg transition-shadow touch-manipulation"
              onClick={handleQRCodeClick}
            >
              <CardContent className="p-4 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2">
                  <TreeDeciduous className="w-4 h-4 text-earth" />
                  <h3 className="font-display text-sm font-semibold text-foreground text-center">
                    {t('result.nurseryQR')}
                  </h3>
                </div>
                <img 
                  src={nurseryQR} 
                  alt={t('result.nurseryQR')} 
                  className="w-[100px] h-[100px] rounded-lg shadow-card"
                />
                <p className="text-xs text-muted-foreground text-center mt-2">
                  {t('result.nurseryInfo')}
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center pb-4"
        >
          <Button variant="outline" size="lg" onClick={handleStartOver} className="touch-manipulation">
            <RotateCcw className="w-4 h-4 mr-2" />
            {t('result.startOver')}
          </Button>
        </motion.div>
      </div>
    </Layout>
  );
}