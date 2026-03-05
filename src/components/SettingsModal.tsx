import { useState } from "react";
import { StudentProfile } from "@/types/course";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, BookOpen, FileText } from "lucide-react";

const PROGRAMS = [
  "MBA",
  "Master of Finance",
  "Master of Business Analytics",
  "Executive MBA",
  "Sloan Fellows MBA",
];

interface SettingsModalProps {
  profile: StudentProfile;
  onSave: (profile: StudentProfile) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const SettingsModal = ({ profile, onSave, open: controlledOpen, onOpenChange: controlledOnOpenChange }: SettingsModalProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = controlledOnOpenChange || setInternalOpen;
  const [program, setProgram] = useState(profile.program);
  const [graduationYear, setGraduationYear] = useState(profile.graduationYear);
  const [careerGoals, setCareerGoals] = useState(profile.careerGoals);
  const [requirementsFile, setRequirementsFile] = useState<File | null>(null);
  const [coursesFile, setCoursesFile] = useState<File | null>(null);

  const handleSave = () => {
    onSave({ program, graduationYear, careerGoals, interests: [] });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Profile & Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {/* Program */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Program</Label>
            <div className="grid gap-2">
              {PROGRAMS.map((p) => (
                <button
                  key={p}
                  onClick={() => setProgram(p)}
                  className={`text-left px-4 py-2.5 rounded-lg border text-sm transition-all duration-200 ${
                    program === p
                      ? "border-primary bg-accent text-accent-foreground"
                      : "border-border hover:border-primary/40 hover:bg-muted"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Graduation year */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Expected graduation year</Label>
            <Input
              value={graduationYear}
              onChange={(e) => setGraduationYear(e.target.value)}
              placeholder="2026"
            />
          </div>

          {/* Career Goals */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Career goals</Label>
            <Textarea
              value={careerGoals}
              onChange={(e) => setCareerGoals(e.target.value)}
              placeholder="e.g., Transitioning from engineering to product management..."
              className="min-h-[100px] resize-none"
            />
          </div>

          {/* File uploads */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Documents (optional)</Label>
            <div
              className="border border-dashed border-border rounded-lg p-4 text-center hover:border-primary/40 transition-colors cursor-pointer"
              onClick={() => document.getElementById("settings-req-upload")?.click()}
            >
              <FileText className="w-5 h-5 mx-auto text-muted-foreground mb-1.5" />
              <p className="text-xs text-muted-foreground">
                {requirementsFile ? (
                  <span className="text-primary font-medium">{requirementsFile.name}</span>
                ) : (
                  "Graduation requirements (PDF, CSV, XLSX)"
                )}
              </p>
              <input
                id="settings-req-upload"
                type="file"
                accept=".pdf,.xlsx,.csv"
                className="hidden"
                onChange={(e) => setRequirementsFile(e.target.files?.[0] || null)}
              />
            </div>
            <div
              className="border border-dashed border-border rounded-lg p-4 text-center hover:border-primary/40 transition-colors cursor-pointer"
              onClick={() => document.getElementById("settings-course-upload")?.click()}
            >
              <BookOpen className="w-5 h-5 mx-auto text-muted-foreground mb-1.5" />
              <p className="text-xs text-muted-foreground">
                {coursesFile ? (
                  <span className="text-primary font-medium">{coursesFile.name}</span>
                ) : (
                  "Course catalog (PDF, CSV, XLSX)"
                )}
              </p>
              <input
                id="settings-course-upload"
                type="file"
                accept=".pdf,.xlsx,.csv"
                className="hidden"
                onChange={(e) => setCoursesFile(e.target.files?.[0] || null)}
              />
            </div>
          </div>

          <Button onClick={handleSave} className="w-full">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
