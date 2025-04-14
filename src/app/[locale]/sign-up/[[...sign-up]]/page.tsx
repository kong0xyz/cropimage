import { SignUp } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export async function generateMetadata(): Promise<Metadata | undefined> {
  return constructMetadata({
    title: `Sign Up - ${siteConfig.title}`,
  });
}

export default function Page() {
  const { theme } = useTheme();
  return (
    <div className="flex justify-center items-center">
      <SignUp appearance={theme === "dark" ? { baseTheme: dark } : {}} />
    </div>
  );
}
