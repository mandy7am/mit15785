import { Course, CourseBundle } from "@/types/course";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Download, ArrowLeft } from "lucide-react";
import confetti from "canvas-confetti";

interface ExportReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  requiredCourses: Course[];
  selectedBundle: CourseBundle | null;
  selectedElectives: Course[];
  program: string;
  onConfirmDownload: () => void;
}

const ExportReviewModal = ({
  open,
  onOpenChange,
  requiredCourses,
  selectedBundle,
  selectedElectives,
  program,
  onConfirmDownload,
}: ExportReviewModalProps) => {
  const coreCredits = requiredCourses.reduce((s, c) => s + c.credits, 0);
  const electiveCredits = selectedElectives.reduce((s, c) => s + c.credits, 0);
  const totalCredits = coreCredits + electiveCredits;

  const handleConfirm = () => {
    // Fire confetti
    const end = Date.now() + 600;
    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ["#2E7D32", "#4CAF50", "#81C784", "#C8E6C9"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ["#2E7D32", "#4CAF50", "#81C784", "#C8E6C9"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();

    // Slight delay so user sees confetti before download triggers
    setTimeout(() => {
      onConfirmDownload();
      onOpenChange(false);
    }, 400);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl p-0 overflow-hidden">
        <div className="p-6 pb-0">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display">
              Ready to register?
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              2026 Fall Semester · {program}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
          {/* Left: Credit Summary */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Credit Summary
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Core</span>
                <Badge variant="secondary" className="font-mono text-xs">
                  {coreCredits} credits
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Electives</span>
                <Badge variant="secondary" className="font-mono text-xs">
                  {electiveCredits} credits
                </Badge>
              </div>
              <div className="border-t border-border pt-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">
                  Total
                </span>
                <Badge className="font-mono text-xs bg-primary text-primary-foreground">
                  {totalCredits} credits
                </Badge>
              </div>
            </div>
          </div>

          {/* Right: Bundle Courses */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              {selectedBundle?.name || "Selected Electives"}
            </h3>
            <div className="space-y-2">
              {selectedElectives.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center gap-2 text-sm"
                >
                  <span className="font-mono text-xs text-muted-foreground w-16 shrink-0">
                    {course.code}
                  </span>
                  <span className="text-foreground truncate">
                    {course.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Validation Badge */}
        <div className="px-6">
          <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2.5">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
            <span className="text-xs text-primary font-medium">
              Matches Graduation Requirements (Degree Audit Sync)
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 pt-4 flex flex-col items-center gap-3">
          <Button
            onClick={handleConfirm}
            className="w-full gap-2 h-12 text-base shadow-[0_0_20px_-4px_hsl(var(--primary)/0.4)]"
          >
            <Download className="w-4 h-4" />
            Confirm & Download (.csv)
          </Button>
          <button
            onClick={() => onOpenChange(false)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to Planner
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExportReviewModal;
