import { Metadata } from "next";
import { constructMetadata } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { SignInWrapper } from "./sign-in-wrapper";

export async function generateMetadata(): Promise<Metadata | undefined> {
  return constructMetadata({
    title: `Sign In - ${siteConfig.title}`,
  });
}

export default function Page() {
  return (
    <div className="flex justify-center items-center">
      <SignInWrapper />
    </div>
  );
}
