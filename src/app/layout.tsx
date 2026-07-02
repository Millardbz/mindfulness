import type { Metadata, Viewport } from "next";

import "./globals.css";
import { fontSans, fontSerif } from "@/lib/fonts";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — mindfulness, mindful yoga & healing`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "mindfulness",
    "meditation",
    "mindful yoga",
    "healing",
    "nærvær",
    "ro",
    "åndedræt",
    "meditationskort",
    "forløb",
    "Ringsted",
  ],
  openGraph: {
    type: "website",
    locale: SITE.locale,
    siteName: SITE.name,
    title: `${SITE.name} — mindfulness, mindful yoga & healing`,
    description: SITE.description,
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — mindfulness, mindful yoga & healing`,
    description: SITE.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f6f0",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="da" className={`${fontSans.variable} ${fontSerif.variable}`}>
      <body className="min-h-dvh bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
