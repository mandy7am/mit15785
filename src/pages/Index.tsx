import { useState } from "react";
import { AppStep, StudentProfile } from "@/types/course";
import WelcomeScreen from "@/components/WelcomeScreen";
import SetupWizard from "@/components/SetupWizard";
import PlannerView from "@/components/PlannerView";

const Index = () => {
  const [step, setStep] = useState<AppStep>("welcome");
  const [profile, setProfile] = useState<StudentProfile | null>(null);

  const handleSetupComplete = (p: StudentProfile) => {
    setProfile(p);
    setStep("calendar");
  };

  return (
    <>
      {step === "welcome" && <WelcomeScreen onStart={() => setStep("setup")} />}
      {step === "setup" && (
        <SetupWizard onComplete={handleSetupComplete} onBack={() => setStep("welcome")} />
      )}
      {step === "calendar" && profile && (
        <PlannerView profile={profile} onBack={() => setStep("setup")} />
      )}
    </>
  );
};

export default Index;
