import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "./providers";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://morphly.sagarsaini.com"),
  title: "Morphly — File Converter & Smart Tools",
  description:
    "Morphly is a fast and reliable file conversion platform supporting PDF ↔ DOCX, TXT, image formats, background removal (AI-powered), file merge, split, history, and secure cloud storage.",
  keywords: [
    "File Converter",
    "PDF to DOCX",
    "DOCX to PDF",
    "TXT Converter",
    "Image Converter",
    "PNG to JPG",
    "JPG to PNG",
    "WebP Converter",
    "Background Removal",
    "AI Background Removal",
    "File Merge",
    "File Split",
    "PDF Tools",
    "Online Converter",
    "Morphly",
  ],
  authors: [{ name: "Sagar Saini", url: "https://sagarsaini.com" }],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/apple-touch-icon.png", rel: "apple-touch-icon" },
    ],
  },
  openGraph: {
    title: "Morphly — File Converter & Smart Tools",
    description:
      "Convert files instantly with Morphly. PDF ↔ DOCX, TXT, images, AI background removal, file merging, splitting, and cloud history — all in one platform.",
    url: "https://morphly.sagarsaini.com",
    siteName: "Morphly",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "Morphly File Converter Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Morphly — File Converter & Smart Tools",
    description:
      "Fast file conversions for PDF, DOCX, images, TXT, merge, split, and AI-powered background removal.",
    images: ["/banner.webp"],
    creator: "@not_sagar1410",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-manrope">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClientProviders>{children}</ClientProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
