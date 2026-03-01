import { useState } from "react";
import { StudentProfile } from "@/types/course";
import WelcomeScreen from "@/components/WelcomeScreen";
import SetupWizard from "@/components/SetupWizard";
import PlannerView from "@/components/PlannerView";

type AppStep = "welcome" | "setup" | "planner";

const Index = () => {
  const [step, setStep] = useState<AppStep>("welcome");
  const [profile, setProfile] = useState<StudentProfile | null>(null);

  const handleSetupComplete = (p: StudentProfile) => {
    setProfile(p);
    setStep("planner");
  };

  return (
    <>
      {step === "welcome" && <WelcomeScreen onStart={() => setStep("setup")} />}
      {step === "setup" && (
        <SetupWizard onComplete={handleSetupComplete} onBack={() => setStep("welcome")} />
      )}
      {step === "planner" && <PlannerView initialProfile={profile} />}
    </>
  );
};

export default Index;
