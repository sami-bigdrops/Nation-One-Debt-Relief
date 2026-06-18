import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import FormModalProvider from "../components/FormModalProvider";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home | Nation One Debt Relief",
  description: "Get debt relief and regain control of your finances. Free consultation, zero upfront fees. Pay up to 30% less than you owe.",
  keywords: "debt relief, debt settlement, credit card debt, medical bills, personal loans, debt consolidation",
  authors: [{ name: "Nation One Debt Relief" }],
  creator: "Nation One Debt Relief",
  publisher: "Nation One Debt Relief",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://nationonedebtrelief.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Nation One Debt Relief - Get Debt Free Today",
    description: "Professional debt relief services. Free consultation, zero upfront fees. Start your journey to financial freedom.",
    url: 'https://nationonedebtrelief.com',
    siteName: 'Nation One Debt Relief',
    images: [
      {
        url: '/brand.svg',
        width: 1200,
        height: 630,
        alt: 'Nation One Debt Relief Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Nation One Debt Relief - Get Debt Free Today",
    description: "Professional debt relief services. Free consultation, zero upfront fees.",
    images: ['/brand.svg'],
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <meta
          name="arohaa-verify"
          content="EaWlYZNHhU0a57NHsRGgDI6P73Y25mmX"
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "!function(w){if(w.arohaa)return;var a=function(){(a.q=a.q||[]).push(arguments)};a.q=[];a.l=Date.now();w.arohaa=a}(window);",
          }}
        />
        <script
          id="arohaa-sdk"
          src="https://cdn.arohaa.net/sdk.js"
          async
          data-wid="67255ffc-0f49-4686-82d4-ce85b58586eb"
          data-api="https://api.arohaa.net"
          data-lp-id="lp_HJlHLWMy4p8KTwFQ"
          data-page="nationonedebtrelief.com"
          data-formtype="single"
        />
      </head>
      <body
        className={`${onest.variable} antialiased`}
        style={{ fontFamily: 'var(--font-onest)' }}
        suppressHydrationWarning
      >
        <Analytics />
        <SpeedInsights />
        <FormModalProvider>
          {children}
        </FormModalProvider>
      </body>
    </html>
  );
}
