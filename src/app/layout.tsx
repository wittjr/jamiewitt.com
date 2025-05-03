import { Geist, Geist_Mono } from "next/font/google";
import { GoogleTagManager } from '@next/third-parties/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import "./globals.css";
import Navigation from "@/components/Navigation";

// Type check environment variables
if (!process.env.NEXT_PUBLIC_GTM_ID || !process.env.NEXT_PUBLIC_ANALYTICS_ID) {
  throw new Error('Missing required environment variables');
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en" className="light">
      <head>
        {/* Google Tag Manager */}
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID as string} />
        {/* End Google Tag Manager */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_ANALYTICS_ID as string} />
    </html>
  );
}
