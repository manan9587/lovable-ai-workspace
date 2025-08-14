
import { Brain, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NavigationBar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cinema-black/80 backdrop-blur-md border-b border-cinema-silver/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Brain className="w-8 h-8 text-cinema-electric-blue" />
              <Camera className="w-4 h-4 text-cinema-silver absolute -top-1 -right-1" />
            </div>
            <span className="text-xl font-bold text-cinema-silver">
              Director<span className="text-cinema-electric-blue">AI</span>
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="nav-link">Home</a>
            <a href="#" className="nav-link">Pricing</a>
            <a href="#" className="nav-link">Workspace</a>
            <a href="#" className="nav-link">About</a>
          </div>

          {/* Get Started Button */}
          <Button className="hero-button">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
