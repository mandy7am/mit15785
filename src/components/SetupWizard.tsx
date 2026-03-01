import { useState } from "react";
import { Upload, User, BookOpen, FileText, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { StudentProfile } from "@/types/course";

interface SetupWizardProps {
  onComplete: (profile: StudentProfile) => void;
  onBack: () => void;
}

const PROGRAMS = [
  "MBA",
  "Master of Finance",
  "Master of Business Analytics",
  "Executive MBA",
  "Sloan Fellows MBA",
];

const SetupWizard = ({ onComplete, onBack }: SetupWizardProps) => {
  const [step, setStep] = useState(0);
  const [program, setProgram] = useState("");
  const [graduationYear, setGraduationYear] = useState("2026");
  const [careerGoals, setCareerGoals] = useState("");
  const [requirementsFile, setRequirementsFile] = useState<File | null>(null);
  const [coursesFile, setCoursesFile] = useState<File | null>(null);

  const steps = [
    { icon: User, label: "Program", description: "Tell us about yourself" },
    { icon: FileText, label: "Requirements", description: "Upload your curriculum guide" },
    { icon: BookOpen, label: "Courses", description: "Upload course offerings" },
  ];

  const handleComplete = () => {
    onComplete({
      program,
      graduationYear,
      careerGoals,
      interests: [],
    });
  };

  const canProceed = () => {
    if (step === 0) return program !== "";
    return true;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Step indicators */}
      <div className="flex items-center gap-3 mb-12 animate-fade-in">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                i < step
                  ? "bg-primary text-primary-foreground"
                  : i === step
                  ? "bg-primary/20 text-primary ring-2 ring-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {i < step ? <Check className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
            </div>
            {i < steps.length - 1 && (
              <div className={`w-12 h-0.5 transition-colors duration-500 ${i < step ? "bg-primary" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <Card className="w-full max-w-lg p-8 shadow-lg border-border/50 animate-slide-up bg-card/80 backdrop-blur-sm">
        <h2 className="text-2xl font-display text-foreground mb-2">{steps[step].label}</h2>
        <p className="text-muted-foreground mb-8">{steps[step].description}</p>

        {step === 0 && (
          <div className="space-y-4">
            <Label className="text-sm font-medium">Select your program</Label>
            <div className="grid gap-3">
              {PROGRAMS.map((p) => (
                <button
                  key={p}
                  onClick={() => setProgram(p)}
                  className={`text-left px-4 py-3 rounded-lg border transition-all duration-200 ${
                    program === p
                      ? "border-primary bg-accent text-accent-foreground"
                      : "border-border hover:border-primary/40 hover:bg-muted"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="pt-2">
              <Label className="text-sm font-medium">Expected graduation year</Label>
              <Input
                value={graduationYear}
                onChange={(e) => setGraduationYear(e.target.value)}
                placeholder="2026"
                className="mt-2"
              />
            </div>
            <div className="pt-2">
              <Label className="text-sm font-medium">Career aspirations (optional)</Label>
              <Textarea
                value={careerGoals}
                onChange={(e) => setCareerGoals(e.target.value)}
                placeholder="e.g., Transitioning from engineering to product management at a tech company..."
                className="mt-2 min-h-[80px] resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Helps us suggest elective tracks tailored to your goals.
              </p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <div
              className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/40 transition-colors cursor-pointer"
              onClick={() => document.getElementById("req-upload")?.click()}
            >
              <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">
                {requirementsFile ? (
                  <span className="text-primary font-medium">{requirementsFile.name}</span>
                ) : (
                  "Drop your graduation requirements PDF here, or click to browse"
                )}
              </p>
              <input
                id="req-upload"
                type="file"
                accept=".pdf,.xlsx,.csv"
                className="hidden"
                onChange={(e) => setRequirementsFile(e.target.files?.[0] || null)}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Don't have it handy? No worries — we'll use the standard MBA curriculum as default.
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div
              className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/40 transition-colors cursor-pointer"
              onClick={() => document.getElementById("course-upload")?.click()}
            >
              <BookOpen className="w-8 h-8 mx-auto text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">
                {coursesFile ? (
                  <span className="text-primary font-medium">{coursesFile.name}</span>
                ) : (
                  "Upload the course catalog or schedule (PDF, CSV, or XLSX)"
                )}
              </p>
              <input
                id="course-upload"
                type="file"
                accept=".pdf,.xlsx,.csv"
                className="hidden"
                onChange={(e) => setCoursesFile(e.target.files?.[0] || null)}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              We'll use the latest Sloan course offerings if you skip this step.
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-border">
          <Button
            variant="ghost"
            onClick={step === 0 ? onBack : () => setStep(step - 1)}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          {step < 2 ? (
            <Button onClick={() => setStep(step + 1)} disabled={!canProceed()} className="gap-2">
              Continue
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={handleComplete} className="gap-2">
              View My Schedule
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default SetupWizard;
