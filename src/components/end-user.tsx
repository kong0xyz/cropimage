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
import { SwitchProps } from "@heroui/switch";
import { useTranslations } from "next-intl";

export interface EndUserProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const EndUser: FC<EndUserProps> = ({ className, classNames }) => {
  const t = useTranslations('common');
  const { theme } = useTheme();
  const resolveAppearance = theme === "dark" ? { baseTheme: dark } : {};
  return (
    <>
      {/* Clerk Begin */}
      <SignedOut>
        <SignInButton appearance={resolveAppearance} mode="modal" >
          {t('signIn')}
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
