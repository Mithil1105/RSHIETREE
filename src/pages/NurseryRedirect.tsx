import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';

const NURSERY_URL = 'https://forests.gujarat.gov.in/nursery-on-map.html';
const REDIRECT_DELAY = 60000; // 1 minute in milliseconds

export default function NurseryRedirect() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [iframeError, setIframeError] = useState(false);
  const [hasNavigated, setHasNavigated] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Set up countdown timer
    countdownRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Set up redirect timer - redirect to home after 1 minute
    timerRef.current = setTimeout(() => {
      if (!hasNavigated) {
        navigate('/', { replace: true });
      }
    }, REDIRECT_DELAY);

    // Check for iframe load error after a short delay
    const errorCheckTimeout = setTimeout(() => {
      // If iframe hasn't loaded content, it likely failed due to CSP
      if (iframeRef.current) {
        try {
          // Try to access iframe content - will throw if blocked
          const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
          if (!iframeDoc || iframeDoc.location.href === 'about:blank') {
            setIframeError(true);
          }
        } catch (e) {
          // CSP blocks access - show error state
          setIframeError(true);
        }
      }
    }, 2000);

    // Cleanup
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      clearTimeout(errorCheckTimeout);
    };
  }, [navigate, hasNavigated]);

  const handleNavigateToExternal = () => {
    setHasNavigated(true);
    // Clear timers
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    // Store timestamp for potential redirect check
    sessionStorage.setItem('nurseryNavTimestamp', Date.now().toString());
    // Navigate to external URL in same tab
    window.location.href = NURSERY_URL;
  };

  const handleReturnHome = () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    navigate('/', { replace: true });
  };

  return (
    <Layout showBack={false}>
      <div className="fixed inset-0 w-screen h-screen" style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
        {/* Timer overlay */}
        <div className="absolute top-4 right-4 z-50 bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
          <span>{t('nursery.redirecting')} {timeRemaining}{t('nursery.seconds')}</span>
        </div>

        {/* Iframe container - will attempt to load external site */}
        <div className="w-full h-full relative">
          <iframe
            ref={iframeRef}
            src={NURSERY_URL}
            className="w-full h-full border-0"
            title="Nursery Map"
            allow="geolocation"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            onError={() => setIframeError(true)}
          />
        </div>

        {/* Error overlay - shown if iframe fails due to CSP */}
        {iframeError && (
          <div className="absolute inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center z-40">
            <div className="text-center max-w-md mx-4 p-6 bg-card rounded-lg shadow-lg border border-primary/20">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                {t('result.nurseryQR')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('nursery.errorMessage')}
              </p>
              
              <div className="bg-accent/50 rounded-lg p-4 mb-6">
                <div className="text-3xl font-bold text-foreground mb-1">
                  {timeRemaining}
                </div>
                <div className="text-xs text-muted-foreground">
                  {t('nursery.secondsUntilRedirect')}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleNavigateToExternal}
                  className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  {t('nursery.openMap')}
                </button>
                <button
                  onClick={handleReturnHome}
                  className="flex-1 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors font-medium"
                >
                  {t('nursery.returnHome')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

