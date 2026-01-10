import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { TreeDeciduous, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
          <TreeDeciduous className="w-10 h-10 text-muted-foreground" />
        </div>
        <h1 className="font-display text-4xl font-bold text-foreground mb-3">
          Page Not Found
        </h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          The path you're looking for doesn't exist. Let's get you back to discovering your sacred trees.
        </p>
        <Button variant="nature" size="lg" asChild>
          <Link to="/">
            <Home className="w-4 h-4 mr-2" />
            Return Home
          </Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
