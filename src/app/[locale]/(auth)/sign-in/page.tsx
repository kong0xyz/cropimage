import { SignInForm } from "@/components/auth/sign-in-form";
import { SiteLogo } from "@/components/blocks/site-logo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "登录",
  description: "登录您的账户",
};

export default function SignInPage() {
  return (
    <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <SiteLogo />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;这个平台帮助我快速构建了现代化的应用程序，节省了大量开发时间。&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex justify-center">
            <SiteLogo />
          </div>
          <SignInForm />
        </div>
      </div>
    </div>
  );
} 