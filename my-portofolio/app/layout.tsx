import type { Metadata } from "next";
import { Mystery_Quest, Charis_SIL, PT_Serif_Caption } from "next/font/google";
import "./globals.css";

const mysteryQuest = Mystery_Quest({
  weight: "400",
  variable: "--font-mystery-quest",
  subsets: ["latin"],
});

const charisSil = Charis_SIL({
  weight: "400",
  variable: "--font-charis-sil",
  subsets: ["latin"],
});

const ptSerifCaption = PT_Serif_Caption({
  weight: "400",
  variable: "--font-pt-serif-caption",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aqila's Portfolio",
  description: "My portofolio website",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${mysteryQuest.variable} ${charisSil.variable} ${ptSerifCaption.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
