import { Course } from "@/types/course";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";
import { useState } from "react";

interface RequirementCategory {
  name: string;
  courses: { code: string; title: string; completed: boolean }[];
}

interface DegreeAuditProps {
  requirements: RequirementCategory[];
  onToggle: (categoryIdx: number, courseIdx: number) => void;
}

const DegreeAudit = ({ requirements, onToggle }: DegreeAuditProps) => {
  const totalCourses = requirements.reduce((s, r) => s + r.courses.length, 0);
  const completedCourses = requirements.reduce(
    (s, r) => s + r.courses.filter((c) => c.completed).length,
    0
  );
  const progress = totalCourses > 0 ? (completedCourses / totalCourses) * 100 : 0;

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm font-medium text-foreground whitespace-nowrap">
          {completedCourses}/{totalCourses} completed
        </span>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {requirements.map((category, catIdx) => {
          const catCompleted = category.courses.filter((c) => c.completed).length;
          const allDone = catCompleted === category.courses.length;
          return (
            <Card
              key={category.name}
              className={`p-4 transition-colors ${allDone ? "bg-primary/5 border-primary/20" : ""}`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-display text-foreground">{category.name}</h4>
                <span className="text-[10px] text-muted-foreground">
                  {catCompleted}/{category.courses.length}
                </span>
              </div>
              <div className="space-y-2">
                {category.courses.map((course, courseIdx) => (
                  <button
                    key={course.code}
                    onClick={() => onToggle(catIdx, courseIdx)}
                    className="flex items-center gap-2 w-full text-left group py-1"
                  >
                    {course.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-muted-foreground/40 group-hover:text-muted-foreground shrink-0" />
                    )}
                    <span
                      className={`text-xs ${
                        course.completed
                          ? "text-muted-foreground line-through"
                          : "text-foreground"
                      }`}
                    >
                      <span className="font-medium">{course.code}</span>{" "}
                      {course.title}
                    </span>
                  </button>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DegreeAudit;
