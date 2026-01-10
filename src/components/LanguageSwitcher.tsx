import { Language, useLanguage } from '@/contexts/LanguageContext';

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
  { code: 'gu', label: 'ગુજ', flag: '🇮🇳' },
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-card/80 backdrop-blur-sm rounded-full p-1 border border-border/50 shadow-sm">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`
            px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200
            ${language === lang.code 
              ? 'bg-primary text-primary-foreground shadow-md' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }
          `}
        >
          <span className="flex items-center gap-1.5">
            <span>{lang.flag}</span>
            <span>{lang.label}</span>
          </span>
        </button>
      ))}
    </div>
  );
}
