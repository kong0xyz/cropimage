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
      <Providers themeProps={{ attribute: "class", defaultTheme: "system" }}>
        <div className="min-h-screen flex flex-col">
          {/* header */}
          <Header />
          {/* main */}
          <main className="w-full flex-1 mx-auto container px-4 py-8">{children}</main>
          {/* footer */}
          <Footer />
        </div>
      </Providers>
    </TooltipProvider>
  );
}
