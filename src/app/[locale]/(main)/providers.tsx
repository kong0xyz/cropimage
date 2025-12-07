"use client";

import type { ThemeProviderProps } from "next-themes";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <NextThemesProvider 
      scriptProps={{ 
        'data-cfasync': 'false'
      }} 
      enableSystem={true}
      disableTransitionOnChange={false}
      {...themeProps}
    >
      {children}
    </NextThemesProvider>
  );
}
