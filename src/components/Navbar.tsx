import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, GraduationCap } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Hide global navbar on the planner page — it has its own unified header
  if (!user || location.pathname === "/") return null;

  const handleLogout = async () => {
    await signOut();
    toast({ title: "Signed out", description: "See you next time!" });
    navigate("/auth");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-primary" />
          <span className="font-semibold text-foreground text-sm tracking-tight">
            MIT Course Planner
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground hidden sm:block">
            {user.email}
          </span>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-1.5 text-muted-foreground hover:text-foreground">
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
