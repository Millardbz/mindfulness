import { Fraunces, Inter } from "next/font/google";

/** Body / UI typeface — clean, calm, highly legible. */
export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/** Display / heading typeface — soft, organic serif for warmth. */
export const fontSerif = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
});
