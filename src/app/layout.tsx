import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sonjacircle.dk"),
  title: "Tid til en pause – Sonja Circle",
  description: "Meditation, ro og nærvær.",
  openGraph: {
    images: ["/opengraph-image.png"],
  },
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da">
      <body>
        <Header />
        <main className="max-w-5xl mx-auto px-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
