"use client";

import { Toggle } from "@/components/ui/toggle";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
 
  useEffect(() => {
    setMounted(true);
  }, []);
 
  const handleToggle = (pressed: boolean) => {
    console.log("handleToggle", pressed);
    const newTheme = (pressed ? "dark" : "light")
    setTheme(newTheme);
  }
 
  // 如果组件还未挂载，显示初始化状态
  if (!mounted) {
    return (
      <div>
        <Toggle
          variant="default"
          className="group size-9 rounded-full data-[state=on]:bg-transparent data-[state=on]:hover:bg-muted"
          pressed={false}
          disabled={true}
          aria-label="Loading theme"
        >
          <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        </Toggle>
      </div>
    );
  }
 
  // 确保在首次渲染时有正确的初始状态
  const isDark = resolvedTheme === "dark";
 
  // console.log("isDark", isDark, resolvedTheme, theme);

  return (
    <div>
      <Toggle
        variant="default"
        className="group size-9 rounded-full data-[state=on]:bg-transparent data-[state=on]:hover:bg-muted"
        pressed={isDark}
        onPressedChange={handleToggle}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      >
        <Moon
          size={16}
          strokeWidth={2}
          className="shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100"
          aria-hidden="true"
        />
        <Sun
          size={16}
          strokeWidth={2}
          className="absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
          aria-hidden="true"
        />
      </Toggle>
    </div>
  );
}

export { ThemeToggle };
