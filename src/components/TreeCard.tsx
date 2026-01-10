import { motion } from 'framer-motion';
import { Tree } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Leaf, MapPin, Sparkles } from 'lucide-react';

interface TreeCardProps {
  tree: Tree;
  index: number;
}

export function TreeCard({ tree, index }: TreeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card variant="tree" className="h-full overflow-hidden">
        <CardHeader className="pb-2 pt-4">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl">{tree.name}</CardTitle>
              <p className="text-sm italic text-muted-foreground">
                {tree.scientific_name}
              </p>
            </div>
            {tree.isPrimary && (
              <Badge className="bg-primary text-primary-foreground font-semibold shadow-lg">
                <Sparkles className="w-3 h-3 mr-1" />
                Primary Tree
              </Badge>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-sm text-foreground/80 leading-relaxed">
            {tree.description}
          </p>
          
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Leaf className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-medium text-primary">Care Tips</p>
                <p className="text-sm text-muted-foreground">{tree.care_tips}</p>
              </div>
            </div>
            
            {tree.ideal_region && (
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-earth mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-medium text-earth">Ideal Region</p>
                  <p className="text-sm text-muted-foreground">{tree.ideal_region}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
