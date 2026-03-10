import { useState } from "react";
import { Upload, User, BookOpen, FileText, ArrowRight, ArrowLeft, Check, Sparkles, Compass, GraduationCap, TrendingUp, Briefcase, Globe, BarChart3, RefreshCw, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StudentProfile } from "@/types/course";
import { supabase } from "@/integrations/supabase/client";

interface SetupWizardProps {
  onComplete: (profile: StudentProfile) => void;
  onBack: () => void;
}

const PROGRAMS = [
  { id: "mba", label: "MBA", icon: GraduationCap },
  { id: "mfin", label: "MFin", icon: TrendingUp },
  { id: "mban", label: "MBAn", icon: BarChart3 },
  { id: "emba", label: "EMBA", icon: Briefcase },
  { id: "sfmba", label: "SFMBA", icon: Globe },
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
  const [reqScanning, setReqScanning] = useState(false);
  const [catalogSyncing, setCatalogSyncing] = useState(false);
  const [catalogSynced, setCatalogSynced] = useState(false);
  const [catalogCount, setCatalogCount] = useState(0);
  const [catalogError, setCatalogError] = useState("");

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

  const handleSyncCatalog = async () => {
    setCatalogSyncing(true);
    setCatalogError("");
    try {
      const { data, error } = await supabase.functions.invoke("sync-mit-catalog");
      if (error) throw error;
      if (data?.success) {
        setCatalogSynced(true);
        setCatalogCount(data.count || 0);
      } else {
        setCatalogError(data?.error || "Sync failed");
      }
    } catch (err: any) {
      setCatalogError(err.message || "Failed to sync catalog");
    } finally {
      setCatalogSyncing(false);
    }
  };

  const handleTagClick = (tag: string) => {
    setCareerGoals(prev => {
      // Check if tag is already selected — if so, remove it
      const tags = prev.split(", ").filter(t => t.trim() !== "");
      if (tags.includes(tag)) {
        return tags.filter(t => t !== tag).join(", ");
      }
      return prev ? `${prev}, ${tag}` : tag;
    });
  };

  const backAction = step === 0 ? onBack : () => setStep(step - 1);
  const nextAction = step === 2 ? handleComplete : () => setStep(step + 1);
  const nextLabel = step === 2 ? "View My Schedule" : "Continue";
  const isReady = canProceed();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pb-28 pt-12">
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
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-display text-foreground">Select your Sloan program and dream role</h1>
          </div>

          {/* Program Grid */}
          <div className="grid grid-cols-5 gap-2 mb-5">
            {PROGRAMS.map((p) => {
              const Icon = p.icon;
              const selected = program === p.label;
              return (
                <button
                  key={p.id}
                  onClick={() => setProgram(p.label)}
                  className={`group relative flex flex-col items-center gap-2 rounded-xl border px-3 py-3 transition-all duration-300 cursor-pointer ${
                    selected
                      ? "border-primary/60 bg-accent/40 shadow-[0_0_20px_-6px_hsl(var(--primary)/0.25)]"
                      : "border-border/60 bg-card/60 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    selected ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground group-hover:text-primary/70"
                  }`}>
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div className="text-center">
                    <div className={`text-sm font-semibold ${selected ? "text-primary" : "text-foreground"}`}>{p.label}</div>
                    
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
          <div className="mb-5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Graduation Year</label>
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

        </div>
      )}

      {/* Step 2: Sync MIT Catalog */}
      {step === 2 && (
        <div className="w-full max-w-lg animate-slide-up">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-display text-foreground mb-3">Sync the MIT Catalog</h1>
            <p className="text-muted-foreground text-sm">We'll pull Sloan courses directly from MIT.</p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card/80 p-10 text-center space-y-6">
            {catalogSynced ? (
              <div className="space-y-4 animate-fade-in">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/15 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground">{catalogCount} Courses Synced</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your AI Bundles are now calibrated to the latest MIT schedule.
                  </p>
                </div>
              </div>
            ) : catalogSyncing ? (
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/15 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
                <div>
                  <p className="text-sm font-medium text-primary">Fetching Sloan courses from MIT...</p>
                  <p className="text-xs text-muted-foreground mt-1">This may take a moment</p>
                </div>
                <div className="w-40 h-1.5 mx-auto rounded-full bg-primary/20 overflow-hidden">
                  <div className="h-full bg-primary rounded-full animate-[pulse_1.5s_ease-in-out_infinite]" style={{ width: '65%' }} />
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                  <RefreshCw className="w-7 h-7 text-muted-foreground" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm text-foreground font-medium">Pull the latest Sloan course catalog</p>
                  <p className="text-xs text-muted-foreground mt-1">Sloan · Credits, Prerequisites & Time Slots</p>
                </div>
                <Button
                  onClick={handleSyncCatalog}
                  size="lg"
                  className="gap-2 px-8"
                >
                  <RefreshCw className="w-4 h-4" />
                  Sync MIT Catalog
                </Button>
              </div>
            )}

            {catalogError && (
              <p className="text-sm text-destructive mt-2">{catalogError}</p>
            )}
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Only Sloan (Dept. 15) courses are synced by default to keep things fast.
          </p>

        </div>
      )}

      {/* Sticky bottom navigation bar — consistent across all steps */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-background/80 backdrop-blur-md border-t border-border/50">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={backAction} className="gap-2 text-muted-foreground">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button
            onClick={nextAction}
            disabled={!isReady}
            className={`gap-2 px-6 transition-all duration-500 ${
              isReady
                ? "shadow-[0_0_20px_-4px_hsl(var(--primary)/0.4)]"
                : ""
            }`}
          >
            {nextLabel}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SetupWizard;
