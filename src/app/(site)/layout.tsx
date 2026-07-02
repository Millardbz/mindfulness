import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { NewsletterPopup } from "@/components/newsletter/NewsletterPopup";
import { sanityFetch } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/sanity/types";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await sanityFetch<SiteSettings | null>({
    query: siteSettingsQuery,
    tags: ["siteSettings"],
    fallback: null,
  });

  const logoUrl = settings?.logo?.asset
    ? urlFor(settings.logo).height(120).fit("max").auto("format").url()
    : null;

  return (
    <div className="flex min-h-dvh flex-col">
      <Header logoUrl={logoUrl} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
      {settings?.newsletterEnabled !== false && (
        <NewsletterPopup
          title={settings?.newsletterTitle || "Tilmeld dig nyhedsbrevet"}
          text={
            settings?.newsletterText ||
            "Få nyheder, tilbud og små pauser med ro – direkte i din indbakke, før alle andre."
          }
        />
      )}
    </div>
  );
}
