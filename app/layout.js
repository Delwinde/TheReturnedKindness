import { Fraunces, Work_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSettings } from "@/lib/data";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-work-sans",
  display: "swap",
});

const DEFAULT_DESCRIPTION =
  "A charity club that seeks to put a smile on the faces of the less privileged. Your pain is our pain and your joy is our joy.";

export async function generateMetadata() {
  const settings = await getSettings();
  const description = settings.metaDescription || DEFAULT_DESCRIPTION;
  const keywords = settings.keywords
    ? settings.keywords.split(",").map((k) => k.trim()).filter(Boolean)
    : undefined;

  return {
    title: "The Returned Kindness",
    description,
    keywords,
    openGraph: {
      title: "The Returned Kindness",
      description,
      images: ["/logo.png"],
      type: "website",
    },
    twitter: {
      card: "summary",
      title: "The Returned Kindness",
      description,
      images: ["/logo.png"],
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${workSans.variable}`}>
      <body className="bg-sand-50 text-ink font-body antialiased flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
