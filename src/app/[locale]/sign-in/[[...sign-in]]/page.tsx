import { SignIn } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export async function generateMetadata(): Promise<Metadata | undefined> {
  return constructMetadata({
    title: `Sign In - ${siteConfig.title}`,
  });
}

export default function Page() {
  const { theme } = useTheme();
  return (
    <div className="flex justify-center items-center">
      <SignIn appearance={theme === "dark" ? { baseTheme: dark } : {}} />
    </div>
  );
}
