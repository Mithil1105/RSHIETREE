import { ReactNode, useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TreeDeciduous, ArrowLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

interface LayoutProps {
  children: ReactNode;
  showBack?: boolean;
}

const INACTIVITY_TIMEOUT = 90; // 1.5 minutes in seconds

export function Layout({ children, showBack = false }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const [timeLeft, setTimeLeft] = useState(INACTIVITY_TIMEOUT);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    setTimeLeft(INACTIVITY_TIMEOUT);
  }, []);

  // Handle countdown and redirect
  useEffect(() => {
    if (isHome) {
      // Clear timers on home page
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    // Set up countdown interval
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          navigate('/');
          return INACTIVITY_TIMEOUT;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHome, navigate]);

  // Reset timer on user activity
  useEffect(() => {
    if (isHome) return;

    const events = [
      'mousedown',
      'mousemove',
      'keydown',
      'scroll',
      'touchstart',
      'touchmove',
      'click'
    ];

    events.forEach(event => {
      document.addEventListener(event, resetTimer, { passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, resetTimer);
      });
    };
  }, [resetTimer, isHome]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeLeft <= 10) return 'text-destructive';
    if (timeLeft <= 30) return 'text-yellow-500';
    return 'text-muted-foreground';
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <TreeDeciduous className="w-5 h-5 text-primary" />
            </div>
            <span className="font-display text-xl font-semibold text-foreground hidden sm:inline">
              Rashi Tree Guide
            </span>
          </Link>
          
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {/* Inactivity Timer Display - Only on non-home pages */}
            {!isHome && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/50 border border-border/50 ${getTimerColor()}`}
              >
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium tabular-nums">
                  {formatTime(timeLeft)}
                </span>
              </motion.div>
            )}
            
            {showBack && !isHome && (
              <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Home
                </Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8 sm:py-12">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/30 mt-auto">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          <p>
            Discover your celestial tree companions based on Vedic astrology
          </p>
          <p className="mt-2 text-xs">
            Moon sign (Chandra Rashi) calculated using Lahiri Ayanamsa
          </p>
        </div>
      </footer>
    </div>
  );
}
