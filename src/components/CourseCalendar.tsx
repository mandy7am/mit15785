import { Course } from "@/types/course";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen } from "lucide-react";

interface CourseCalendarProps {
  requiredCourses: Course[];
  selectedElectives: Course[];
  onCourseClick?: (course: Course) => void;
}

const DAYS = ["Mon/Wed", "Tue/Thu", "Fri"];
const TIME_SLOTS = ["9:00–10:30", "11:00–12:30", "2:00–3:30", "4:00–5:30"];

const CourseCalendar = ({ requiredCourses, selectedElectives, onCourseClick }: CourseCalendarProps) => {
  const getCourse = (day: string, timeSlot: string): Course | undefined => {
    return [...requiredCourses, ...selectedElectives].find(
      (c) => c.day === day && c.timeSlot === timeSlot
    );
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[700px]">
        {/* Header */}
        <div className="grid grid-cols-4 gap-2 mb-2">
          <div className="p-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Clock className="w-4 h-4" />
            Time
          </div>
          {DAYS.map((day) => (
            <div key={day} className="p-3 text-center text-sm font-medium text-foreground">
              {day}
            </div>
          ))}
        </div>

        {/* Time slots */}
        {TIME_SLOTS.map((timeSlot) => (
          <div key={timeSlot} className="grid grid-cols-4 gap-2 mb-2">
            <div className="p-3 text-sm text-muted-foreground flex items-center">
              {timeSlot}
            </div>
            {DAYS.map((day) => {
              const course = getCourse(day, timeSlot);
              if (!course) {
                return (
                  <div
                    key={`${day}-${timeSlot}`}
                    className="p-3 rounded-lg border border-dashed border-border/60 min-h-[80px] flex items-center justify-center"
                  >
                    <span className="text-xs text-muted-foreground/50">Open</span>
                  </div>
                );
              }
              return (
                <Card
                  key={`${day}-${timeSlot}`}
                  onClick={() => onCourseClick?.(course)}
                  className={`p-3 min-h-[80px] cursor-pointer transition-all duration-200 hover:shadow-md ${
                    course.isRequired
                      ? "bg-primary/10 border-primary/20 hover:border-primary/40"
                      : "bg-accent/60 border-accent hover:border-forest-light"
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-primary">{course.code}</span>
                      <Badge
                        variant={course.isRequired ? "default" : "secondary"}
                        className="text-[10px] px-1.5 py-0"
                      >
                        {course.isRequired ? "Core" : course.category}
                      </Badge>
                    </div>
                    <span className="text-xs text-foreground leading-tight font-medium">
                      {course.title}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{course.credits} credits</span>
                  </div>
                </Card>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-6 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-primary/20 border border-primary/30" />
          <span className="text-xs text-muted-foreground">Required Core</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-accent/60 border border-accent" />
          <span className="text-xs text-muted-foreground">Elective</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded border border-dashed border-border" />
          <span className="text-xs text-muted-foreground">Open Slot</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCalendar;
