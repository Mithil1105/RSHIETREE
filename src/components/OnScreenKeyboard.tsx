import { motion } from 'framer-motion';
import { Delete, Space, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OnScreenKeyboardProps {
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  onNext?: () => void;
  type?: 'numeric' | 'alphanumeric';
  size?: 'normal' | 'large';
  className?: string;
}

export function OnScreenKeyboard({ 
  onKeyPress, 
  onBackspace,
  onNext,
  type = 'alphanumeric',
  size = 'normal',
  className = ''
}: OnScreenKeyboardProps) {
  const numericKeys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', 'del']
  ];

  const alphaRow1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const alphaRow2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  const alphaRow3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

  const handleKeyPress = (key: string) => {
    if (key === 'del') {
      onBackspace();
    } else if (key === 'space') {
      onKeyPress(' ');
    } else if (key === 'next') {
      onNext?.();
    } else {
      onKeyPress(key);
    }
  };

  const isLarge = size === 'large';

  if (type === 'numeric') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`grid grid-cols-3 gap-2 p-3 bg-muted/50 rounded-xl border border-border/50 ${className}`}
      >
        {numericKeys.flat().map((key) => (
          <Button
            key={key}
            type="button"
            variant={key === 'del' ? 'destructive' : 'secondary'}
            className="h-14 text-xl font-medium touch-manipulation"
            onClick={() => handleKeyPress(key)}
          >
            {key === 'del' ? <Delete className="w-5 h-5" /> : key}
          </Button>
        ))}
        {onNext && (
          <Button
            type="button"
            variant="default"
            className="col-span-3 h-14 text-lg font-medium touch-manipulation bg-primary"
            onClick={() => handleKeyPress('next')}
          >
            Next <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`space-y-2 p-3 bg-muted/50 rounded-xl border border-border/50 ${className}`}
    >
      {/* Number row */}
      <div className="flex gap-1 justify-center">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((key) => (
          <Button
            key={key}
            type="button"
            variant="secondary"
            className={`${isLarge ? 'h-14 w-11 sm:w-12 text-lg' : 'h-11 w-9 sm:w-10 text-base'} font-medium touch-manipulation p-0`}
            onClick={() => handleKeyPress(key)}
          >
            {key}
          </Button>
        ))}
      </div>

      {/* Alpha row 1 */}
      <div className="flex gap-1 justify-center">
        {alphaRow1.map((key) => (
          <Button
            key={key}
            type="button"
            variant="secondary"
            className={`${isLarge ? 'h-14 w-10 sm:w-11 text-base' : 'h-11 w-8 sm:w-9 text-sm'} font-medium touch-manipulation p-0`}
            onClick={() => handleKeyPress(key.toLowerCase())}
          >
            {key}
          </Button>
        ))}
      </div>

      {/* Alpha row 2 */}
      <div className="flex gap-1 justify-center">
        {alphaRow2.map((key) => (
          <Button
            key={key}
            type="button"
            variant="secondary"
            className={`${isLarge ? 'h-14 w-10 sm:w-11 text-base' : 'h-11 w-8 sm:w-9 text-sm'} font-medium touch-manipulation p-0`}
            onClick={() => handleKeyPress(key.toLowerCase())}
          >
            {key}
          </Button>
        ))}
      </div>

      {/* Alpha row 3 with delete */}
      <div className="flex gap-1 justify-center">
        {alphaRow3.map((key) => (
          <Button
            key={key}
            type="button"
            variant="secondary"
            className={`${isLarge ? 'h-14 w-10 sm:w-11 text-base' : 'h-11 w-8 sm:w-9 text-sm'} font-medium touch-manipulation p-0`}
            onClick={() => handleKeyPress(key.toLowerCase())}
          >
            {key}
          </Button>
        ))}
        <Button
          type="button"
          variant="destructive"
          className={`${isLarge ? 'h-14 w-16' : 'h-11 w-14'} text-sm font-medium touch-manipulation`}
          onClick={onBackspace}
        >
          <Delete className="w-5 h-5" />
        </Button>
      </div>

      {/* Space bar, comma, period, and Next button */}
      <div className="flex gap-1 justify-center">
        <Button
          type="button"
          variant="secondary"
          className={`${isLarge ? 'h-14 w-14' : 'h-11 w-12'} text-sm font-medium touch-manipulation`}
          onClick={() => handleKeyPress(',')}
        >
          ,
        </Button>
        <Button
          type="button"
          variant="secondary"
          className={`${isLarge ? 'h-14' : 'h-11'} flex-1 text-sm font-medium touch-manipulation`}
          onClick={() => handleKeyPress(' ')}
        >
          <Space className="w-5 h-5 mr-2" />
          Space
        </Button>
        <Button
          type="button"
          variant="secondary"
          className={`${isLarge ? 'h-14 w-14' : 'h-11 w-12'} text-sm font-medium touch-manipulation`}
          onClick={() => handleKeyPress('.')}
        >
          .
        </Button>
        {onNext && (
          <Button
            type="button"
            variant="default"
            className={`${isLarge ? 'h-14 w-20' : 'h-11 w-16'} text-sm font-medium touch-manipulation bg-primary`}
            onClick={() => handleKeyPress('next')}
          >
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
    </motion.div>
  );
}
