"use client";

import { SignIn } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

export function SignInWrapper() {
  const { theme } = useTheme();
  return <SignIn appearance={theme === "dark" ? { baseTheme: dark } : {}} />;
} 