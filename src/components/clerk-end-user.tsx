"use client";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

import { FC } from "react";

import {
  ClerkLoading,
  ClerkLoaded,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { featureConfig } from "@/config/feature";

export interface EndUserProps {
  className?: string;
}

const ClerkUser = () => {
  const t = useTranslations('common');
  const { theme } = useTheme();

  const resolveAppearance = theme === "dark" ? { baseTheme: dark } : {};
  return (
    <>
      <ClerkLoading>
        <Skeleton className="h-9 w-9 rounded-full" />
      </ClerkLoading>
      <ClerkLoaded>
        {/* Clerk Begin */}
        <SignedOut>
          <SignInButton appearance={resolveAppearance} mode="modal" >
            <Button>
              {t('signIn')}
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={resolveAppearance}
            userProfileProps={{ appearance: resolveAppearance }}
          />
        </SignedIn>
        {/* Clerk End */}
      </ClerkLoaded>
    </>
  );
}

export const ClerkEndUser: FC<EndUserProps> = () => {
  return featureConfig.clerkEnabled ? <ClerkUser /> : null;
};
