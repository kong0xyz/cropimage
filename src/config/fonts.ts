import { Inter as FontSans, Noto_Sans as FontNotoSans } from "next/font/google";

export const fontNotoSans = FontNotoSans({
  subsets: ["latin"],
});

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
