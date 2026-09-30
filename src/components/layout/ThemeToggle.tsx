"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ThemeToggle() {
  const toggle = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      /* storage unavailable; theme still applies for this session */
    }
  };

  // Both icons are always rendered; CSS picks one, so there is no hydration mismatch.
  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle color theme">
      <Sun className="hidden size-4 dark:block" aria-hidden />
      <Moon className="size-4 dark:hidden" aria-hidden />
    </Button>
  );
}
