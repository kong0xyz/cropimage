import { Inter as FontSans } from "next/font/google";
import { Noto_Sans as FontNotoSans } from "next/font/google";
import { Noto_Sans_SC as FontNotoSansSC } from "next/font/google";
import { Noto_Sans_JP as FontNotoSansJP } from "next/font/google";
import { Noto_Sans_KR as FontNotoSansKR } from "next/font/google";

// 基础 Noto Sans 字体，用于拉丁文、西里尔文等
export const fontNotoSans = FontNotoSans({
  subsets: [
    "latin",      // 英语、德语、法语、意大利语、葡萄牙语等
    "latin-ext",  // 扩展拉丁字符
    "cyrillic",   // 俄语
    "cyrillic-ext",
    "greek",
    "greek-ext",
    "vietnamese"
  ],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: true,
});

// 简体中文支持
export const fontNotoSansSC = FontNotoSansSC({
  weight: ["400", "500", "700"],
  display: "swap",
  preload: true,
  subsets: ["latin"],
});

// 日文支持
export const fontNotoSansJP = FontNotoSansJP({
  weight: ["400", "500", "700"],
  display: "swap",
  preload: true,
  subsets: ["latin"],
});

// 韩文支持
export const fontNotoSansKR = FontNotoSansKR({
  weight: ["400", "500", "700"],
  display: "swap",
  preload: true,
  subsets: ["latin"],
});

export const fontSans = FontSans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  variable: "--font-sans",
});
