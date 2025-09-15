import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { ChatWidget } from "@/components/chat-widget";
import { Navigation } from "@/components/navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
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
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);} gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `,
              }}
            />
          </>
        ) : null}
        {process.env.NEXT_PUBLIC_GTM_ID ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
            `,
            }}
          />
        ) : null}
        <Providers>
          <Navigation />
          {children}
          <ChatWidget />
        </Providers>
      </body>
    </html>
  );
}
