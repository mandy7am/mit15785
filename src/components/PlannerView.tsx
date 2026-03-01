import { useState } from "react";
import { StudentProfile, Course, CourseBundle } from "@/types/course";
import { REQUIRED_COURSES, SAMPLE_BUNDLES } from "@/data/mockCourses";
import { DEFAULT_REQUIREMENTS } from "@/data/degreeRequirements";
import CourseCalendar from "./CourseCalendar";
import CourseBundleCard from "./CourseBundleCard";
import DegreeAudit from "./DegreeAudit";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import SettingsModal from "./SettingsModal";
import {
  TreePine,
  Calendar,
  Sparkles,
  BookOpen,
  GraduationCap,
  RefreshCw,
  ClipboardCheck,
  Lightbulb,
  X,
} from "lucide-react";

const DEFAULT_PROFILE: StudentProfile = {
  program: "MBA",
  graduationYear: "2026",
  careerGoals: "",
  interests: [],
};

const PlannerView = () => {
  const [profile, setProfile] = useState<StudentProfile>(DEFAULT_PROFILE);
  const [selectedBundleId, setSelectedBundleId] = useState<string | null>(null);
  const [prompt, setPrompt] = useState(profile.careerGoals);
  const [requirements, setRequirements] = useState(DEFAULT_REQUIREMENTS);
  const [sidebarTab, setSidebarTab] = useState<"tracks" | "audit">("tracks");
  const [showGuide, setShowGuide] = useState(true);

  const selectedBundle = SAMPLE_BUNDLES.find((b) => b.id === selectedBundleId);
  const selectedElectives = selectedBundle?.courses || [];

  const totalCredits =
    REQUIRED_COURSES.reduce((s, c) => s + c.credits, 0) +
    selectedElectives.reduce((s, c) => s + c.credits, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TreePine className="w-5 h-5 text-primary" />
            <span className="font-display text-lg text-foreground">Course Planner</span>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="gap-1">
              <GraduationCap className="w-3 h-3" />
              {profile.program}
            </Badge>
            <Badge variant="outline" className="gap-1">
              <BookOpen className="w-3 h-3" />
              {totalCredits} credits
            </Badge>
            <SettingsModal profile={profile} onSave={(p) => { setProfile(p); setPrompt(p.careerGoals); }} />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar - takes 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-display text-foreground">Fall Semester</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Required courses are pre-filled. Select a track to fill remaining slots.
              </p>
            </div>

            <Card className="p-6 bg-card/80 backdrop-blur-sm">
              <CourseCalendar
                requiredCourses={REQUIRED_COURSES}
                selectedElectives={selectedElectives}
              />
            </Card>

            {/* Summary stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 text-center">
                <p className="text-2xl font-display text-primary">{REQUIRED_COURSES.length}</p>
                <p className="text-xs text-muted-foreground mt-1">Core Courses</p>
              </Card>
              <Card className="p-4 text-center">
                <p className="text-2xl font-display text-primary">{selectedElectives.length}</p>
                <p className="text-xs text-muted-foreground mt-1">Electives</p>
              </Card>
              <Card className="p-4 text-center">
                <p className="text-2xl font-display text-primary">{totalCredits}</p>
                <p className="text-xs text-muted-foreground mt-1">Total Credits</p>
              </Card>
            </div>
          </div>

          {/* Sidebar - toggle between tracks & audit */}
          <div className="space-y-6">
            {/* Toggle buttons */}
            <div className="flex rounded-lg bg-muted p-1 gap-1">
              <button
                onClick={() => setSidebarTab("tracks")}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  sidebarTab === "tracks"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                Tracks
              </button>
              <button
                onClick={() => setSidebarTab("audit")}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  sidebarTab === "audit"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <ClipboardCheck className="w-4 h-4" />
                Degree Audit
              </button>
            </div>

            {sidebarTab === "tracks" ? (
              <>
                <div>
                  <h2 className="text-2xl font-display text-foreground">Suggested Tracks</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Based on your goals, here are curated elective bundles.
                  </p>
                </div>

                {/* First-time guidance tip */}
                {showGuide && (
                  <Card className="p-4 border-primary/30 bg-primary/5 relative animate-fade-in">
                    <button
                      onClick={() => setShowGuide(false)}
                      className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex gap-3">
                      <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div className="space-y-1.5 pr-4">
                        <p className="text-sm font-medium text-foreground">
                          These tracks are AI-curated for you
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Explore the elective bundles below — each one is tailored to a career path. Click a track to preview its courses on your calendar, then{" "}
                          <span className="font-medium text-foreground">commit to the one that fits</span>.
                        </p>
                      </div>
                    </div>
                  </Card>
                )}

                <Card className="p-4 bg-forest-mist border-forest-light/30">
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your target role or industry..."
                    className="min-h-[60px] text-sm resize-none bg-card border-border"
                  />
                  <Button size="sm" className="mt-3 gap-2 w-full">
                    <RefreshCw className="w-3 h-3" />
                    Update Recommendations
                  </Button>
                </Card>

                <div className="space-y-4">
                  {SAMPLE_BUNDLES.map((bundle) => (
                    <CourseBundleCard
                      key={bundle.id}
                      bundle={bundle}
                      isSelected={selectedBundleId === bundle.id}
                      onSelect={(b) =>
                        setSelectedBundleId(selectedBundleId === b.id ? null : b.id)
                      }
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                <div>
                  <h2 className="text-2xl font-display text-foreground">Degree Audit</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Click a course to mark it as completed.
                  </p>
                </div>

                <DegreeAudit
                  requirements={requirements}
                  onToggle={(catIdx, courseIdx) => {
                    setRequirements((prev) =>
                      prev.map((cat, ci) =>
                        ci !== catIdx
                          ? cat
                          : {
                              ...cat,
                              courses: cat.courses.map((c, coIdx) =>
                                coIdx !== courseIdx ? c : { ...c, completed: !c.completed }
                              ),
                            }
                      )
                    );
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlannerView;
