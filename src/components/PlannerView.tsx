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
import {
  TreePine,
  Calendar,
  Sparkles,
  Send,
  BookOpen,
  ArrowLeft,
  GraduationCap,
  RefreshCw,
  ClipboardCheck,
} from "lucide-react";

interface PlannerViewProps {
  profile: StudentProfile;
  onBack: () => void;
}

const PlannerView = ({ profile, onBack }: PlannerViewProps) => {
  const [selectedBundleId, setSelectedBundleId] = useState<string | null>(null);
  const [prompt, setPrompt] = useState(profile.careerGoals);
  const [requirements, setRequirements] = useState(DEFAULT_REQUIREMENTS);
  const [showBundles, setShowBundles] = useState(true);

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
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2">
              <TreePine className="w-5 h-5 text-primary" />
              <span className="font-display text-lg text-foreground">Course Planner</span>
            </div>
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

          {/* Sidebar - course bundles */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-display text-foreground">Suggested Tracks</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Based on your goals, here are curated elective bundles.
              </p>
            </div>

            {/* Career prompt */}
            <Card className="p-4 bg-forest-mist border-forest-light/30">
              <div className="flex items-start gap-3">
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your target role or industry..."
                  className="min-h-[60px] text-sm resize-none bg-card border-border"
                />
              </div>
              <Button size="sm" className="mt-3 gap-2 w-full">
                <RefreshCw className="w-3 h-3" />
                Update Recommendations
              </Button>
            </Card>

            {/* Bundle cards */}
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
          </div>
        </div>

        {/* Degree Audit */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex items-center gap-2 mb-4">
            <ClipboardCheck className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-display text-foreground">Degree Audit</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Click a course to mark it as completed. Track your progress toward graduation.
          </p>
          <DegreeAudit
            requirements={requirements}
            onToggle={(catIdx, courseIdx) => {
              setRequirements((prev) => {
                const updated = prev.map((cat, ci) => {
                  if (ci !== catIdx) return cat;
                  return {
                    ...cat,
                    courses: cat.courses.map((c, coIdx) =>
                      coIdx === courseIdx ? { ...c, completed: !c.completed } : c
                    ),
                  };
                });
                return updated;
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PlannerView;
