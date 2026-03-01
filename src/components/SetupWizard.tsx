import { useState } from "react";
import { Upload, User, BookOpen, FileText, ArrowRight, ArrowLeft, Check, Sparkles, Compass, GraduationCap, TrendingUp, Briefcase, Globe, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StudentProfile } from "@/types/course";

interface SetupWizardProps {
  onComplete: (profile: StudentProfile) => void;
  onBack: () => void;
}

const PROGRAMS = [
  { id: "mba", label: "MBA", icon: GraduationCap, desc: "Master of Business Administration" },
  { id: "mfin", label: "MFin", icon: TrendingUp, desc: "Master of Finance" },
  { id: "mban", label: "MBAn", icon: BarChart3, desc: "Master of Business Analytics" },
  { id: "emba", label: "EMBA", icon: Briefcase, desc: "Executive MBA" },
  { id: "sfmba", label: "SFMBA", icon: Globe, desc: "Sloan Fellows MBA" },
];

const ROLE_TAGS = [
  "Venture Capital", "Product Management", "Sustainability",
  "Consulting", "Private Equity", "Entrepreneurship",
  "Operations", "Data Science", "Investment Banking",
];

const YEARS = ["2026", "2027"];

const SetupWizard = ({ onComplete, onBack }: SetupWizardProps) => {
  const [step, setStep] = useState(0);
  const [program, setProgram] = useState("");
  const [graduationYear, setGraduationYear] = useState("2026");
  const [careerGoals, setCareerGoals] = useState("");
  const [requirementsFile, setRequirementsFile] = useState<File | null>(null);
  const [coursesFile, setCoursesFile] = useState<File | null>(null);
  const [reqScanning, setReqScanning] = useState(false);
  const [courseScanning, setCourseScanning] = useState(false);

  const steps = [
    { icon: User, label: "Profile" },
    { icon: FileText, label: "Requirements" },
    { icon: BookOpen, label: "Catalog" },
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

  const handleReqFile = (file: File | null) => {
    setRequirementsFile(file);
    if (file) {
      setReqScanning(true);
      setTimeout(() => setReqScanning(false), 2500);
    }
  };

  const handleCourseFile = (file: File | null) => {
    setCoursesFile(file);
    if (file) {
      setCourseScanning(true);
      setTimeout(() => setCourseScanning(false), 2500);
    }
  };

  const handleTagClick = (tag: string) => {
    setCareerGoals(prev => {
      if (prev.includes(tag)) return prev;
      return prev ? `${prev}, ${tag}` : tag;
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Step indicators */}
      <div className="flex items-center gap-3 mb-10 animate-fade-in">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                  i < step
                    ? "bg-primary text-primary-foreground"
                    : i === step
                    ? "bg-primary/15 text-primary ring-2 ring-primary/60"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i < step ? <Check className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
              </div>
              <span className={`text-[10px] font-medium tracking-wide uppercase ${
                i <= step ? "text-primary" : "text-muted-foreground"
              }`}>{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-16 h-px mb-5 transition-colors duration-500 ${i < step ? "bg-primary" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 0: Profile */}
      {step === 0 && (
        <div className="w-full max-w-2xl animate-slide-up">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-display text-foreground mb-3">Tell us about yourself</h1>
            <p className="text-muted-foreground text-sm">Select your journey at Sloan to help us calibrate your compass.</p>
          </div>

          {/* Program Grid */}
          <div className="grid grid-cols-5 gap-3 mb-8">
            {PROGRAMS.map((p) => {
              const Icon = p.icon;
              const selected = program === p.label;
              return (
                <button
                  key={p.id}
                  onClick={() => setProgram(p.label)}
                  className={`group relative flex flex-col items-center gap-3 rounded-xl border px-4 py-5 transition-all duration-300 cursor-pointer ${
                    selected
                      ? "border-primary/60 bg-accent/40 shadow-[0_0_20px_-6px_hsl(var(--primary)/0.25)]"
                      : "border-border/60 bg-card/60 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    selected ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground group-hover:text-primary/70"
                  }`}>
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div className="text-center">
                    <div className={`text-sm font-semibold ${selected ? "text-primary" : "text-foreground"}`}>{p.label}</div>
                    <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">{p.desc}</div>
                  </div>
                  {selected && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Graduation Year Pill Toggle */}
          <div className="mb-8">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 block">Graduation Year</label>
            <div className="inline-flex rounded-full border border-border/60 bg-card/60 p-1 gap-0.5">
              {YEARS.map((y) => (
                <button
                  key={y}
                  onClick={() => setGraduationYear(y)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    graduationYear === y
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          {/* Dream Role */}
          <div className="rounded-2xl bg-accent/30 border border-border/40 p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <label className="text-sm font-semibold text-foreground">What's your dream role?</label>
              <span className="text-[10px] text-muted-foreground/60 ml-auto italic">optional</span>
            </div>
            <textarea
              value={careerGoals}
              onChange={(e) => setCareerGoals(e.target.value)}
              placeholder="e.g. Product Manager in Climate Tech"
              rows={2}
              className="w-full rounded-xl border border-border/60 bg-card/80 px-4 py-3 text-base font-medium text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all resize-none"
            />
            <div className="flex flex-wrap gap-2">
              {ROLE_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                    careerGoals.includes(tag)
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground/70 italic">We use this to suggest curated course bundles for your specific career goals.</p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-10 pt-6 border-t border-border/40">
            <Button variant="ghost" onClick={onBack} className="gap-2 text-muted-foreground">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <Button onClick={() => setStep(1)} disabled={!canProceed()} className="gap-2">
              Continue
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 1: Requirements Upload */}
      {step === 1 && (
        <div className="w-full max-w-lg animate-slide-up">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-display text-foreground mb-3">What are your graduation requirements?</h1>
            <p className="text-muted-foreground text-sm">Upload your degree audit to map your core.</p>
          </div>

          <div
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-500 cursor-pointer group ${
              reqScanning
                ? "border-primary/50 bg-primary/5"
                : requirementsFile
                ? "border-primary/40 bg-accent/30"
                : "border-border/50 hover:border-primary/30 hover:bg-muted/30"
            }`}
            onClick={() => document.getElementById("req-upload")?.click()}
          >
            {reqScanning ? (
              <div className="space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/15 flex items-center justify-center animate-pulse">
                  <Compass className="w-6 h-6 text-primary animate-spin" style={{ animationDuration: '3s' }} />
                </div>
                <p className="text-sm font-medium text-primary">Scanning your requirements...</p>
                <div className="w-32 h-1 mx-auto rounded-full bg-primary/20 overflow-hidden">
                  <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: '70%' }} />
                </div>
              </div>
            ) : requirementsFile ? (
              <div className="space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/15 flex items-center justify-center">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-primary">{requirementsFile.name}</p>
                <p className="text-xs text-muted-foreground">Click to replace</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Compass className="w-6 h-6 text-muted-foreground group-hover:text-primary/70 transition-colors" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm text-foreground font-medium">Drop your degree audit here</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, CSV, or XLSX</p>
                </div>
              </div>
            )}
            <input
              id="req-upload"
              type="file"
              accept=".pdf,.xlsx,.csv"
              className="hidden"
              onChange={(e) => handleReqFile(e.target.files?.[0] || null)}
            />
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4">
            Don't have it handy? We'll use the standard curriculum as default.
          </p>

          <div className="flex justify-between mt-10 pt-6 border-t border-border/40">
            <Button variant="ghost" onClick={() => setStep(0)} className="gap-2 text-muted-foreground">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <Button onClick={() => setStep(2)} className="gap-2">
              Continue
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Course Catalog Upload */}
      {step === 2 && (
        <div className="w-full max-w-lg animate-slide-up">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-display text-foreground mb-3">Scan the horizon</h1>
            <p className="text-muted-foreground text-sm">Upload the course catalog to discover electives.</p>
          </div>

          <div
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-500 cursor-pointer group ${
              courseScanning
                ? "border-primary/50 bg-primary/5"
                : coursesFile
                ? "border-primary/40 bg-accent/30"
                : "border-border/50 hover:border-primary/30 hover:bg-muted/30"
            }`}
            onClick={() => document.getElementById("course-upload")?.click()}
          >
            {courseScanning ? (
              <div className="space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/15 flex items-center justify-center animate-pulse">
                  <Compass className="w-6 h-6 text-primary animate-spin" style={{ animationDuration: '3s' }} />
                </div>
                <p className="text-sm font-medium text-primary">Scanning the catalog...</p>
                <div className="w-32 h-1 mx-auto rounded-full bg-primary/20 overflow-hidden">
                  <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: '60%' }} />
                </div>
              </div>
            ) : coursesFile ? (
              <div className="space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/15 flex items-center justify-center">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-primary">{coursesFile.name}</p>
                <p className="text-xs text-muted-foreground">Click to replace</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Compass className="w-6 h-6 text-muted-foreground group-hover:text-primary/70 transition-colors" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm text-foreground font-medium">Drop your course catalog here</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, CSV, or XLSX</p>
                </div>
              </div>
            )}
            <input
              id="course-upload"
              type="file"
              accept=".pdf,.xlsx,.csv"
              className="hidden"
              onChange={(e) => handleCourseFile(e.target.files?.[0] || null)}
            />
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4">
            We'll use the latest Sloan course offerings if you skip this step.
          </p>

          <div className="flex justify-between mt-10 pt-6 border-t border-border/40">
            <Button variant="ghost" onClick={() => setStep(1)} className="gap-2 text-muted-foreground">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <Button onClick={handleComplete} className="gap-2">
              View My Schedule
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetupWizard;
