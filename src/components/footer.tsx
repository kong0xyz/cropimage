'use client'
import { FooterResource } from "./blocks/footer-resource";
import { PageBadges } from "./page-badges";
import SocialShares from "./social-shares";

export const Footer = () => {
  return (
    <div className="container flex flex-col justify-center items-center mx-auto">
      <SocialShares />
      <FooterResource />
      <PageBadges />
    </div>
  )
};
