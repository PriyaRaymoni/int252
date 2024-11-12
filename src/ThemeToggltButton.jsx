import React from "react";
import useThemeStore from "./store/useThemeStore";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useThemeStore();
  const handleToggle = () => {
    toggleTheme();
    toast.success("Theme changed");
  };
  return (
    <Button size="icon" variant="outline" onClick={handleToggle}>
      {theme === "light" ? <Moon /> : <Sun />}
    </Button>
  );
};

export default ThemeToggleButton;
