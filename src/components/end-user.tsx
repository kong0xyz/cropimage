"use client";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

import { FC } from "react";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import { Button } from "./ui/button";

export interface EndUserProps {
  className?: string;
}

export const EndUser: FC<EndUserProps> = ({ className }) => {
  const t = useTranslations('common');
  const { theme } = useTheme();
  const resolveAppearance = theme === "dark" ? { baseTheme: dark } : {};
  return (
    <>
      {/* Clerk Begin */}
      <SignedOut>
        <SignInButton appearance={resolveAppearance} mode="modal" >
          <Button size="lg">
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
    </>
  );
};
