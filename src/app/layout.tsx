import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { ChatWidget } from "@/components/chat-widget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Moreland Window Cleaning - Professional Window Cleaning Services",
  description: "Professional window cleaning services in Walton County, GA and surrounding areas. Residential and commercial window cleaning, gutter cleaning, and more.",
  keywords: "window cleaning, Walton County, Georgia, residential, commercial, gutter cleaning",
  authors: [{ name: "Moreland Window Cleaning" }],
  openGraph: {
    title: "Moreland Window Cleaning - Professional Window Cleaning Services",
    description: "Professional window cleaning services in Walton County, GA and surrounding areas.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          {children}
          <ChatWidget />
        </Providers>
      </body>
    </html>
  );
}
