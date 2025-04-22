import { Metadata } from "next";
import { constructMetadata } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { SignUpWrapper } from "./sign-up-wrapper";

export async function generateMetadata(): Promise<Metadata | undefined> {
  return constructMetadata({
    title: `Sign Up - ${siteConfig.title}`,
  });
}

export default function Page() {
  return (
    <div className="flex justify-center items-center">
      <SignUpWrapper />
    </div>
  );
}
