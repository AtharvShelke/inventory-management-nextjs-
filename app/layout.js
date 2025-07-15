import localFont from "next/font/local";
import "../styles/main.scss";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/context/AuthProvider";
import { ThemeProvider } from "@/components/website/ThemesProvider";
import { Sen } from 'next/font/google';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const Josef = Sen({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// ✅ SEO + Social Metadata
export const metadata = {
  title: "Enrich Kitchen Studio | Custom Kitchen Designs & Remodeling",
  description:
    "Enrich Kitchen Studio offers high-end kitchen remodeling and custom kitchen designs, including modern, minimalist, luxury, and rustic styles. Tailored craftsmanship for your dream kitchen.",
  keywords: [
    "kitchen design",
    "custom kitchen",
    "kitchen remodeling",
    "modern kitchen",
    "minimalist kitchen",
    "rustic kitchen",
    "luxury kitchen",
    "bespoke kitchen design",
    "Enrich Kitchen Studio",
    "kitchen renovation",
    "premium kitchen studio",
  ],
  authors: [{ name: "Enrich Kitchen Studio", url: "https://www.enrichfurniture.com" }],
  metadataBase: new URL("https://www.enrichfurniture.com"),
  robots: "index, follow",
  openGraph: {
    title: "Enrich Kitchen Studio | Bespoke Kitchen Designs",
    description:
      "Discover modern, luxurious, and functional kitchen designs crafted uniquely for your space. Enrich Kitchen Studio makes dream kitchens a reality.",
    url: "https://www.enrichfurniture.com",
    siteName: "Enrich Kitchen Studio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Enrich Kitchen Studio - Bespoke Kitchen Designs",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enrich Kitchen Studio | Custom Kitchen Designs",
    description: "Explore premium kitchen remodeling and custom designs with Enrich Kitchen Studio.",
    images: ["/og-image.jpg"],
    site: "@enrichkitchen",
    creator: "@enrichkitchen",
  },
  alternates: {
    canonical: "https://www.enrichfurniture.com",
  },
  category: "Home Improvement",
};

// ✅ Move viewport and themeColor to their correct exports
export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 5,
  themeColor: "#ffffff", // ✅ THIS IS VALID HERE
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${Josef.className} antialiased`}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <Toaster position="top-center" reverseOrder={false} />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
