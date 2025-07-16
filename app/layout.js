import localFont from "next/font/local";
import "../styles/main.scss";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/context/AuthProvider";
import { ThemeProvider } from "@/components/website/ThemesProvider";
import { Sen } from 'next/font/google';
import React from "react";

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
  title: "Enrich Furniture & Kitchen Studio | Custom Kitchen Designs & Remodeling",
  description:
  "Enrich Furniture & Kitchen Studio in Chhatrapati Sambhajinagar (Aurangabad) specializes in modular kitchens, premium furniture, and customized interior solutions. Visit us to explore your dream living spaces.",
keywords: [
    "Enrich Furniture",
    "Aurangabad kitchen studio",
    "Chhatrapati Sambhajinagar furniture",
    "modular furniture",
    "modular kitchen",
    "furniture showroom Aurangabad",
    "kitchen interior Aurangabad",
    "Enrich Modular",
    "Enrich Kitchen Studio",
    "luxury kitchen design Aurangabad",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Enrich Kitchen Studio",
  "url": "https://www.enrichfurniture.com",
  "logo": "/favicon.ico",
  "description": "Enrich Kitchen Studio offers high-end kitchen remodeling and custom kitchen designs, including modern, minimalist, luxury, and rustic styles.",
  "sameAs": [
    "https://www.facebook.com/enrichkitchenstudio",
    "https://www.instagram.com/enrichkitchenstudio"
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${Josef.className} antialiased`}>
        
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <Toaster position="top-center" reverseOrder={false} />
            <main id="main-content">
              {children}
            </main>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

// Add skip-link styles (can be moved to global CSS)
// .skip-link {
//   position: absolute;
//   left: -999px;
//   top: auto;
//   width: 1px;
//   height: 1px;
//   overflow: hidden;
//   z-index: 100;
// }
// .skip-link:focus {
//   left: 0;
//   top: 0;
//   width: auto;
//   height: auto;
//   background: #fff;
//   color: #000;
//   padding: 1rem;
//   font-size: 1rem;
//   text-decoration: underline;
// }
