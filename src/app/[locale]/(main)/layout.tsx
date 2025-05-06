import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { TooltipProvider } from "@/components/ui/tooltip";
import React from "react";
import { Providers } from "./providers";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TooltipProvider>
      <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
        <div className="min-h-screen flex flex-col">
          {/* header */}
          <Header />
          {/* main */}
          <main className="flex flex-1 container mx-auto pt-6 px-6">
            {children}
          </main>
          {/* footer */}
          <Footer />
        </div>
      </Providers>
    </TooltipProvider>
  );
}
