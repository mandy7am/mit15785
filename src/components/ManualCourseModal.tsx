import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Course } from "@/types/course";
import { ELECTIVE_COURSES } from "@/data/mockCourses";
import { Check, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ManualCourseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCourses: Course[];
  onSave: (courses: Course[]) => void;
}

const ManualCourseModal = ({ open, onOpenChange, selectedCourses, onSave }: ManualCourseModalProps) => {
  const [localSelection, setLocalSelection] = useState<Course[]>([]);

  // Sync local selection when modal opens
  useEffect(() => {
    if (open) {
      setLocalSelection([...selectedCourses]);
    }
  }, [open, selectedCourses]);

  const toggleCourse = (course: Course) => {
    setLocalSelection((prev) => {
      const isSelected = prev.some((c) => c.id === course.id);
      if (isSelected) {
        return prev.filter((c) => c.id !== course.id);
      } else {
        return [...prev, course];
      }
    });
  };

  const handleSave = () => {
    onSave(localSelection);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-background border-border shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-display">Add Electives Manually</DialogTitle>
          <DialogDescription>
            Select courses to add to your schedule alongside your bundle (if you have one).
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-4 max-h-[60vh] overflow-y-auto pr-2">
          {ELECTIVE_COURSES.map((course) => {
            const isSelected = localSelection.some((c) => c.id === course.id);
            return (
              <div
                key={course.id}
                onClick={() => toggleCourse(course)}
                className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                    : "border-border hover:border-primary/40 hover:shadow-sm"
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-primary">{course.code}</span>
                    <span className="text-sm font-medium text-foreground">{course.title}</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {isSelected ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1 mb-2">
                  {course.description}
                </p>
                <div className="flex flex-wrap items-center gap-1.5 mt-auto">
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                    {course.category}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground ml-auto">
                    {course.day} · {course.timeSlot}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <DialogFooter className="sm:justify-between items-center mt-2">
          <div className="text-sm text-muted-foreground hidden sm:block">
            {localSelection.length} {localSelection.length === 1 ? "course" : "courses"} selected
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1 sm:flex-none">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 sm:flex-none">
              Save Selection
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManualCourseModal;