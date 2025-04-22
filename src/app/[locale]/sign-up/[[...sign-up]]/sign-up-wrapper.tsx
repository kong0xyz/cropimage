"use client";

import { SignUp } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

export function SignUpWrapper() {
  const { theme } = useTheme();
  return <SignUp appearance={theme === "dark" ? { baseTheme: dark } : {}} />;
} 