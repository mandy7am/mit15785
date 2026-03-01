import heroForest from "@/assets/hero-forest.png";
import { TreePine, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroForest}
          alt="Serene forest cafe overlooking a misty ravine"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-background/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto px-6 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/80 backdrop-blur-sm mb-8">
          <TreePine className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-accent-foreground">MIT Sloan Course Planner</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-display text-foreground mb-6 leading-tight">
          Plan your path,<br />
          <span className="text-primary">peacefully.</span>
        </h1>

        <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto leading-relaxed">
          A calm space to explore courses, fulfill your requirements, and chart a career you're excited about — one semester at a time.
        </p>

        <Button
          onClick={onStart}
          size="lg"
          className="gap-2 text-base px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Get Started
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
