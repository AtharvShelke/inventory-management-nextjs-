import localFont from "next/font/local";
import "../styles/main.scss";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/context/AuthProvider";
import { ThemeProvider } from "@/components/website/ThemesProvider";
import { Sen } from 'next/font/google'

// Import fonts with localFont
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


export const metadata = {
  title: "Enrich Kitchen Studio - Custom Kitchen Designs & Remodeling",
  description: "Enrich Kitchen Studio specializes in creating bespoke, modern, and functional kitchen designs. We offer custom kitchen remodeling and unique kitchen styles like minimalist, rustic, and luxury kitchens tailored to your needs.",
  keywords: "kitchen design, custom kitchen, kitchen remodeling, modern kitchen, minimalist kitchen, rustic kitchen, luxury kitchen, bespoke kitchen design, Enrich Kitchen Studio",
  author: "Enrich Kitchen Studio",
  
  // robots: "index, follow", 
  
};
export const viewport = {
  width: "device-width",
  initialScale: 1.0,
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
