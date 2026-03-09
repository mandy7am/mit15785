import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AiAdvisor from "./AiAdvisor";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { StudentProfile, Course, CourseBundle } from "@/types/course";
import { REQUIRED_COURSES, SAMPLE_BUNDLES } from "@/data/mockCourses";
import { DEFAULT_REQUIREMENTS } from "@/data/degreeRequirements";
import CourseCalendar from "./CourseCalendar";
import CourseBundleCard from "./CourseBundleCard";
import DegreeAudit from "./DegreeAudit";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import SettingsModal from "./SettingsModal";
import ExportReviewModal from "./ExportReviewModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ManualCourseModal from "./ManualCourseModal";
import {
  TreePine,
  Calendar,
  Sparkles,
  BookOpen,
  GraduationCap,
  ClipboardCheck,
  Download,
  User,
  LogOut,
  Settings,
  ChevronDown,
  Pencil, // edit icon for program badge
  Plus,
} from "lucide-react";

const DEFAULT_PROFILE: StudentProfile = {
  program: "MBA",
  graduationYear: "2026",
  careerGoals: "",
  interests: [],
};

interface PlannerViewProps {
  initialProfile?: StudentProfile | null;
  onSwitchProgram?: () => void;
}

const PlannerView = ({ initialProfile, onSwitchProgram }: PlannerViewProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<StudentProfile>(initialProfile || DEFAULT_PROFILE);
  const [selectedBundleId, setSelectedBundleId] = useState<string | null>(null);
  const [prompt, setPrompt] = useState(profile.careerGoals);
  const [requirements, setRequirements] = useState(DEFAULT_REQUIREMENTS);
  const [sidebarTab, setSidebarTab] = useState<"bundles" | "audit">("bundles");
  const [hoveredBundle, setHoveredBundle] = useState<CourseBundle | null>(null);
  const [isEditingRole, setIsEditingRole] = useState(false);
  const [editingRoleText, setEditingRoleText] = useState("");
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportPulsed, setExportPulsed] = useState(false);
  const [prevBundleId, setPrevBundleId] = useState<string | null>(null);
  const [animatingIds, setAnimatingIds] = useState<Set<string>>(new Set());
  const [showSettings, setShowSettings] = useState(false);
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);
  const [manualCourses, setManualCourses] = useState<Course[]>([]);
  const roleInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = async () => {
    await signOut();
    toast({ title: "Signed out", description: "See you next time!" });
    navigate("/auth");
  };

  // Trigger pulse animation when a bundle is first selected
  useEffect(() => {
    if (selectedBundleId && selectedBundleId !== prevBundleId) {
      setExportPulsed(true);
      const timer = setTimeout(() => setExportPulsed(false), 1200);
      setPrevBundleId(selectedBundleId);
      return () => clearTimeout(timer);
    }
    if (!selectedBundleId) {
      setPrevBundleId(null);
    }
  }, [selectedBundleId, prevBundleId]);

  const selectedBundle = SAMPLE_BUNDLES.find((b) => b.id === selectedBundleId);
  const bundleCourses = selectedBundle?.courses || [];
  
  // Combine bundle courses and manual courses, avoiding duplicates by ID
  const selectedElectives = [
    ...bundleCourses,
    ...manualCourses.filter(mc => !bundleCourses.find(bc => bc.id === mc.id))
  ];

  const totalCredits =
    REQUIRED_COURSES.reduce((s, c) => s + c.credits, 0) +
    selectedElectives.reduce((s, c) => s + c.credits, 0);

  const dreamRoleLabel = profile.careerGoals
    ? profile.careerGoals.length > 40
      ? profile.careerGoals.slice(0, 40) + "…"
      : profile.careerGoals
    : "Your Goals";

  const handleSelectBundle = (bundle: CourseBundle) => {
    if (selectedBundleId === bundle.id) {
      // Remove
      setSelectedBundleId(null);
      setAnimatingIds(new Set());
    } else {
      // Add — trigger stagger
      setSelectedBundleId(bundle.id);
      const ids = new Set(bundle.courses.map((c) => c.id));
      setAnimatingIds(ids);
      // Clear animating flag after animations complete
      setTimeout(() => setAnimatingIds(new Set()), 800);
    }
  };

  const handleDownloadSchedule = () => {
    const allCourses = [...REQUIRED_COURSES, ...selectedElectives];
    const header = "Code,Title,Type,Day,Time,Credits";
    const rows = allCourses.map((c) =>
      `"${c.code}","${c.title}","${c.isRequired ? "Core" : "Elective"}","${c.day || ""}","${c.timeSlot || ""}","${c.credits}"`
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${profile.program}_Fall_Schedule.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Unified top bar */}
      <header className="sticky top-0 z-50 bg-accent/60 backdrop-blur-md border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
          {/* Left: Branding */}
          <div className="flex items-center gap-2">
            <TreePine className="w-5 h-5 text-primary" />
            <span className="font-display text-lg text-foreground">Course Planner</span>
          </div>

          {/* Center-right: Actions */}
          <div className="flex items-center gap-3">
            <Badge
              variant="secondary"
              className="gap-1 cursor-pointer group/badge hover:bg-secondary/80 transition-colors"
              onClick={() => setShowSwitchModal(true)}
            >
              <GraduationCap className="w-3 h-3" />
              {profile.program}
              <Pencil className="w-2.5 h-2.5 opacity-0 group-hover/badge:opacity-70 transition-opacity" />
            </Badge>
            <Button
              variant={selectedBundleId ? "default" : "outline"}
              size="sm"
              disabled={!selectedBundleId}
              onClick={() => setShowExportModal(true)}
              className={`gap-1.5 transition-all duration-300 ${
                !selectedBundleId
                  ? "opacity-30 cursor-not-allowed"
                  : exportPulsed
                  ? "animate-[pulse_0.6s_ease-in-out_2]"
                  : ""
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              Export Schedule
            </Button>
            <Badge variant="outline" className="gap-1">
              <BookOpen className="w-3 h-3" />
              {totalCredits} credits
            </Badge>

            {/* Right: User dropdown */}
            <div className="w-px h-5 bg-border mx-1" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground">
                  <User className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-xs max-w-[140px] truncate">
                    {user?.email || "Account"}
                  </span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5">
                  <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setShowSettings(true)}>
                  <Settings className="w-3.5 h-3.5 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                  <LogOut className="w-3.5 h-3.5 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
        {/* Strict 30/70 split */}
        <div className="flex gap-6" style={{ minHeight: "calc(100vh - 80px)" }}>
          {/* LEFT: Bundle Gallery — 30% */}
          <aside className="w-[30%] shrink-0 space-y-5 overflow-y-auto max-h-[calc(100vh-80px)] sticky top-[4.5rem] pr-1">
            {/* Toggle buttons */}
            <div className="flex rounded-lg bg-muted p-1 gap-1">
              <button
                onClick={() => setSidebarTab("bundles")}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  sidebarTab === "bundles"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                Bundles
              </button>
              <button
                onClick={() => setSidebarTab("audit")}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  sidebarTab === "audit"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <ClipboardCheck className="w-4 h-4" />
                Audit
              </button>
            </div>

            {sidebarTab === "bundles" ? (
              <>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-display text-foreground">AI Bundles for</h2>
                    {isEditingRole ? (
                      <input
                        ref={roleInputRef}
                        type="text"
                        value={editingRoleText}
                        onChange={(e) => setEditingRoleText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            setPrompt(editingRoleText);
                            setProfile((p) => ({ ...p, careerGoals: editingRoleText }));
                            setIsEditingRole(false);
                          }
                        }}
                        onBlur={() => {
                          setPrompt(editingRoleText);
                          setProfile((p) => ({ ...p, careerGoals: editingRoleText }));
                          setIsEditingRole(false);
                        }}
                        className="text-lg font-display font-bold text-primary bg-transparent border-b-2 border-primary outline-none min-w-[100px] max-w-full px-0.5"
                        autoFocus
                      />
                    ) : (
                      <button
                        onClick={() => {
                          setEditingRoleText(prompt || profile.careerGoals || "");
                          setIsEditingRole(true);
                          setTimeout(() => roleInputRef.current?.focus(), 0);
                        }}
                        className="text-lg font-display font-bold text-primary underline decoration-dotted decoration-primary/60 underline-offset-4 cursor-pointer hover:decoration-solid transition-all"
                      >
                        {dreamRoleLabel}
                      </button>
                    )}
                    <Sparkles className="w-4 h-4 text-primary shrink-0" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Pick one bundle to auto-fill your electives, or add courses manually below.
                  </p>
                </div>

                <div className="space-y-3">
                  {SAMPLE_BUNDLES.map((bundle) => (
                    <CourseBundleCard
                      key={bundle.id}
                      bundle={bundle}
                      isSelected={selectedBundleId === bundle.id}
                      onSelect={handleSelectBundle}
                      onHover={setHoveredBundle}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-2 mt-4 border-dashed"
                  onClick={() => setShowManualModal(true)}
                >
                  <Plus className="w-4 h-4" />
                  Add Courses Manually
                  {manualCourses.length > 0 && (
                    <Badge variant="secondary" className="ml-1 px-1.5 py-0 rounded-full h-5 min-w-5 flex items-center justify-center bg-primary/10 text-primary hover:bg-primary/20">
                      {manualCourses.length}
                    </Badge>
                  )}
                </Button>
              </>
            ) : (
              <>
                <div>
                  <h2 className="text-lg font-display text-foreground">Degree Audit</h2>
                  <p className="text-xs text-muted-foreground mt-1">
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
          </aside>

          {/* RIGHT: Calendar — 70% */}
          <main className="flex-1 min-w-0 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-display text-foreground">Fall Semester</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Required courses are pre-filled. Add a bundle from the left to fill remaining slots.
              </p>
            </div>

            <Card className="p-5 bg-card/80 backdrop-blur-sm">
              <CourseCalendar
                requiredCourses={REQUIRED_COURSES}
                selectedElectives={selectedElectives}
                hoveredBundle={hoveredBundle}
                animatingIds={animatingIds}
              />
            </Card>
          </main>
        </div>
      </div>

      <ExportReviewModal
        open={showExportModal}
        onOpenChange={setShowExportModal}
        requiredCourses={REQUIRED_COURSES}
        selectedBundle={selectedBundle || null}
        selectedElectives={selectedElectives}
        program={profile.program}
        onConfirmDownload={handleDownloadSchedule}
      />

      <SettingsModal
        profile={profile}
        onSave={(p) => { setProfile(p); setPrompt(p.careerGoals); }}
        open={showSettings}
        onOpenChange={setShowSettings}
      />

      <AiAdvisor />

      <AlertDialog open={showSwitchModal} onOpenChange={setShowSwitchModal}>
        <AlertDialogContent className="bg-background backdrop-blur-sm border-border sm:rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-display">Switch Academic Program?</AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-muted-foreground">
              Returning to the selection screen will clear your current draft for the{" "}
              <span className="font-semibold text-foreground">{profile.program}</span> planner.
              Do you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-lg">Stay in {profile.program}</AlertDialogCancel>
            <AlertDialogAction
              className="bg-[hsl(var(--deep-forest))] hover:bg-[hsl(var(--deep-forest))]/90 text-white rounded-lg"
              onClick={() => onSwitchProgram?.()}
            >
              Switch Program
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PlannerView;
