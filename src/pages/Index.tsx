import { useState } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import PlannerView from "@/components/PlannerView";

const Index = () => {
  const [started, setStarted] = useState(false);

  if (!started) {
    return <WelcomeScreen onStart={() => setStarted(true)} />;
  }

  return <PlannerView />;
};

export default Index;
