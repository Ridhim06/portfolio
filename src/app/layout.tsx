import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorField } from "@/components/CursorField";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: "Ridhim Garg — Backend Software Engineer | Python, Django, Fintech & GenAI",
  description: site.description,
  authors: [{ name: site.name }],
  keywords: [
    "Ridhim Garg",
    "Backend Engineer",
    "Python",
    "Django",
    "Celery",
    "Fintech",
    "GenAI",
    "LLM",
    "REST APIs",
    "Software Engineer",
  ],
  openGraph: {
    title: "Ridhim Garg — Backend Software Engineer",
    description: site.description,
    url: site.siteUrl,
    siteName: `${site.name} | Portfolio`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ridhim Garg — Backend Software Engineer",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Runs before first paint so the saved theme (dark by default) applies with no flash
const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t="dark"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="dark"}})()`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="antialiased">
        <CursorField />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
