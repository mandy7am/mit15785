import { useState } from "react";
import { CourseBundle, Course } from "@/types/course";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Check, ChevronDown, ChevronUp, Zap, Undo2, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CourseBundleCardProps {
  bundle: CourseBundle;
  isSelected: boolean;
  onSelect: (bundle: CourseBundle) => void;
  onHover?: (bundle: CourseBundle | null) => void;
}

const CourseBundleCard = ({ bundle, isSelected, onSelect, onHover }: CourseBundleCardProps) => {
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);

  const toggleCourse = (courseId: string) => {
    setExpandedCourseId(expandedCourseId === courseId ? null : courseId);
  };

  return (
    <Card
      className={`p-5 transition-all duration-300 ${
        isSelected
          ? "border-primary bg-primary/5 shadow-md ring-1 ring-primary/20"
          : "border-border hover:border-primary/30 hover:shadow-sm"
      }`}
      onMouseEnter={() => !isSelected && onHover?.(bundle)}
      onMouseLeave={() => onHover?.(null)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="min-w-0">
          <h3 className="font-display text-base text-foreground">{bundle.name}</h3>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-accent shrink-0 ml-2">
          <Sparkles className="w-3 h-3 text-primary" />
          <span className="text-xs font-medium text-accent-foreground">{bundle.matchScore}%</span>
        </div>
      </div>

      {bundle.targetRole && (
        <Badge variant="secondary" className="mb-3 text-xs">
          {bundle.targetRole}
        </Badge>
      )}


      <div className="space-y-1.5 mb-4">
        {bundle.courses.map((course) => {
          const isExpanded = expandedCourseId === course.id;
          return (
            <div key={course.id}>
              <button
                onClick={() => toggleCourse(course.id)}
                className={`w-full flex items-center justify-between py-2 px-2.5 rounded-lg transition-colors text-left ${
                  isExpanded
                    ? "bg-primary/10 border border-primary/20"
                    : "bg-muted/50 hover:bg-muted/80"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xs font-medium text-primary shrink-0">{course.code}</span>
                  <span className="text-xs text-foreground truncate">{course.title}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <span className="text-[10px] text-muted-foreground hidden sm:inline">
                    {course.day} · {course.timeSlot}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-3 h-3 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-3 h-3 text-muted-foreground" />
                  )}
                </div>
              </button>
              <AnimatePresence>
                {isExpanded && course.aiReason && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mx-2.5 mt-1 mb-1 px-2.5 py-2 rounded-md bg-accent/50 border border-border/40">
                      <div className="flex gap-2">
                        <Zap className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <p className="text-[11px] text-muted-foreground leading-relaxed">{course.aiReason}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <Button
        onClick={() => onSelect(bundle)}
        variant={isSelected ? "outline" : "default"}
        size="sm"
        className={`w-full gap-2 transition-all duration-300 ${
          isSelected
            ? "border-destructive/40 text-destructive hover:bg-destructive/10 hover:border-destructive"
            : ""
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isSelected ? (
            <motion.span
              key="remove"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <Undo2 className="w-4 h-4" />
              Remove Bundle
            </motion.span>
          ) : (
            <motion.span
              key="add"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add to Calendar
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </Card>
  );
};

export default CourseBundleCard;
