import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/constants/site";
import { ConditionalChrome } from "@/components/layout/ConditionalChrome";

const fontHeading = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  // style defaults to "normal" only (next/font/google docs). Added "italic" here
  // because /coming-soon's tagline needs true italic Playfair glyphs, not a
  // browser-faked slant on the normal weight. Purely additive — every existing
  // heading still gets normal style exactly as before, nothing here changes for them.
  style: ["normal", "italic"],
});

const fontBody = Poppins({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontHeading.variable} ${fontBody.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">
        <ConditionalChrome>{children}</ConditionalChrome>
      </body>
    </html>
  );
}
