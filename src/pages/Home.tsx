import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TreeDeciduous, Moon, ArrowRight, Leaf } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

// Floating leaf component
const FloatingLeaf = ({ delay, x, size, duration }: { delay: number; x: string; size: number; duration: number }) => (
  <motion.div
    className="absolute text-primary/20 pointer-events-none"
    style={{ left: x, top: '-20px' }}
    initial={{ y: -20, rotate: 0, opacity: 0 }}
    animate={{ 
      y: ['0vh', '100vh'],
      rotate: [0, 360],
      opacity: [0, 0.6, 0.6, 0]
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "linear"
    }}
  >
    <Leaf size={size} />
  </motion.div>
);

// Tree silhouette SVG component
const TreeSilhouette = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 150" className={className} fill="currentColor">
    <ellipse cx="50" cy="40" rx="35" ry="35" />
    <ellipse cx="35" cy="55" rx="25" ry="25" />
    <ellipse cx="65" cy="55" rx="25" ry="25" />
    <ellipse cx="50" cy="70" rx="30" ry="25" />
    <rect x="45" y="85" width="10" height="60" />
  </svg>
);

export default function Home() {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="min-h-[calc(100vh-120px)] flex flex-col justify-center relative overflow-hidden">
        {/* Floating Leaves Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FloatingLeaf delay={0} x="10%" size={20} duration={12} />
          <FloatingLeaf delay={2} x="25%" size={16} duration={15} />
          <FloatingLeaf delay={4} x="40%" size={24} duration={10} />
          <FloatingLeaf delay={1} x="60%" size={18} duration={14} />
          <FloatingLeaf delay={3} x="75%" size={22} duration={11} />
          <FloatingLeaf delay={5} x="90%" size={14} duration={13} />
          <FloatingLeaf delay={6} x="5%" size={26} duration={16} />
          <FloatingLeaf delay={7} x="85%" size={20} duration={12} />
        </div>

        {/* Tree Silhouettes */}
        <div className="absolute inset-0 pointer-events-none">
          <TreeSilhouette className="absolute -left-8 bottom-0 w-32 h-48 text-primary/5" />
          <TreeSilhouette className="absolute -right-4 bottom-0 w-24 h-40 text-earth/5" />
          <TreeSilhouette className="absolute left-1/4 bottom-0 w-16 h-28 text-moss/5 hidden md:block" />
          <TreeSilhouette className="absolute right-1/4 bottom-0 w-20 h-32 text-forest/5 hidden md:block" />
        </div>

        {/* Decorative leaf corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full text-primary/10">
            <path d="M0,0 Q50,20 30,60 Q10,40 0,0" fill="currentColor" />
            <path d="M10,0 Q40,30 20,70 Q5,50 10,0" fill="currentColor" opacity="0.5" />
          </svg>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none transform scale-x-[-1]">
          <svg viewBox="0 0 100 100" className="w-full h-full text-earth/10">
            <path d="M0,0 Q50,20 30,60 Q10,40 0,0" fill="currentColor" />
            <path d="M10,0 Q40,30 20,70 Q5,50 10,0" fill="currentColor" opacity="0.5" />
          </svg>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-earth/20 backdrop-blur-sm text-sm text-foreground mb-4 border border-primary/20"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Leaf className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="font-medium">Vedic Astrology meets Nature</span>
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            >
              <TreeDeciduous className="w-4 h-4 text-earth" />
            </motion.div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            {t('home.title')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base text-muted-foreground max-w-xl mx-auto"
          >
            {t('home.subtitle')}
          </motion.p>
        </div>

        {/* Philosophy Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="max-w-3xl mx-auto mb-6 relative z-10"
        >
          <div className="relative p-4 rounded-xl bg-gradient-to-br from-accent/40 via-primary/5 to-earth/10 backdrop-blur-sm border border-primary/15 shadow-soft">
            {/* Decorative leaf icons in corners */}
            <Leaf className="absolute -top-2 -left-2 w-5 h-5 text-primary/30 rotate-[-30deg]" />
            <Leaf className="absolute -bottom-2 -right-2 w-5 h-5 text-earth/30 rotate-[150deg]" />
            
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              {t('home.philosophy')}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('home.philosophyDetails')}
            </p>
          </div>
        </motion.div>

        {/* CTA Cards */}
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link to="/know-rashi" className="block h-full">
              <Card variant="cta" className="h-full group hover:scale-[1.02] transition-transform duration-300 bg-gradient-to-br from-card via-card to-primary/5 overflow-hidden relative">
                {/* Decorative background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-2 right-2">
                    <Moon className="w-24 h-24 text-primary" />
                  </div>
                </div>
                
                <CardContent className="p-6 flex flex-col items-center text-center h-full relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-primary/20 transition-colors shadow-md">
                    <Moon className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                    {t('home.knowRashi')}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">
                    {t('home.knowRashiDesc')}
                  </p>
                  <Button variant="nature" className="w-full group/btn">
                    {t('home.knowRashi')}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/find-rashi" className="block h-full">
              <Card variant="cta" className="h-full group hover:scale-[1.02] transition-transform duration-300 bg-gradient-to-br from-card via-card to-earth/5 overflow-hidden relative">
                {/* Decorative background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-2 right-2">
                    <TreeDeciduous className="w-24 h-24 text-earth" />
                  </div>
                </div>
                
                <CardContent className="p-6 flex flex-col items-center text-center h-full relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-earth/20 to-earth/10 flex items-center justify-center mb-4 group-hover:from-earth/30 group-hover:to-earth/20 transition-colors shadow-md">
                    <TreeDeciduous className="w-8 h-8 text-earth" />
                  </div>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                    {t('home.findRashi')}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">
                    {t('home.findRashiDesc')}
                  </p>
                  <Button variant="outline" className="w-full group/btn border-earth/30 hover:border-earth hover:bg-earth/5">
                    {t('home.findRashi')}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
