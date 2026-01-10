import { Rashi } from '@/lib/types';
import { RashiCard } from './RashiCard';

interface RashiGridProps {
  rashiList: Rashi[];
  onSelect: (rashi: Rashi) => void;
}

export function RashiGrid({ rashiList, onSelect }: RashiGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {rashiList.map((rashi, index) => (
        <RashiCard
          key={rashi.key}
          rashi={rashi}
          onClick={onSelect}
          index={index}
        />
      ))}
    </div>
  );
}
