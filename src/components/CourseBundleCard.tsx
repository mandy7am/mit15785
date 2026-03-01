import { CourseBundle } from "@/types/course";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Plus, Check } from "lucide-react";

interface CourseBundleCardProps {
  bundle: CourseBundle;
  isSelected: boolean;
  onSelect: (bundle: CourseBundle) => void;
}

const CourseBundleCard = ({ bundle, isSelected, onSelect }: CourseBundleCardProps) => {
  return (
    <Card
      className={`p-6 transition-all duration-300 ${
        isSelected
          ? "border-primary bg-primary/5 shadow-md ring-1 ring-primary/20"
          : "border-border hover:border-primary/30 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-display text-lg text-foreground">{bundle.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{bundle.description}</p>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-accent">
          <Sparkles className="w-3 h-3 text-primary" />
          <span className="text-xs font-medium text-accent-foreground">{bundle.matchScore}%</span>
        </div>
      </div>

      {bundle.targetRole && (
        <Badge variant="secondary" className="mb-4 text-xs">
          {bundle.targetRole}
        </Badge>
      )}

      <div className="space-y-2 mb-5">
        {bundle.courses.map((course) => (
          <div
            key={course.id}
            className="flex items-center justify-between py-2 px-3 rounded-md bg-muted/50"
          >
            <div>
              <span className="text-xs font-medium text-primary">{course.code}</span>
              <span className="text-xs text-foreground ml-2">{course.title}</span>
            </div>
            <span className="text-[10px] text-muted-foreground">
              {course.day} · {course.timeSlot}
            </span>
          </div>
        ))}
      </div>

      <Button
        onClick={() => onSelect(bundle)}
        variant={isSelected ? "default" : "outline"}
        className="w-full gap-2"
      >
        {isSelected ? (
          <>
            <Check className="w-4 h-4" />
            Added to Calendar
          </>
        ) : (
          <>
            <Plus className="w-4 h-4" />
            Add to Calendar
          </>
        )}
      </Button>
    </Card>
  );
};

export default CourseBundleCard;
