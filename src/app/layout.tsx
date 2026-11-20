import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { isIndexable, siteUrl } from "@/config/deployment";
import { site } from "@/config/site";
import "@/styles/globals.css";

const dmSans = localFont({
  src: "../assets/fonts/dm-sans.ttf",
  weight: "100 1000",
  style: "normal",
  display: "swap",
  variable: "--font-dm",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.homeTitle,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  robots: isIndexable
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={dmSans.variable}>
      <body id="top">
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
