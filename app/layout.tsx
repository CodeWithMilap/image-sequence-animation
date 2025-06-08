import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Scroll Animation in Next.js 15 Using Blender Image Sequences | Tutorial",
  description: "Learn how to create smooth scroll-based animations in Next.js 15 using Blender image sequences. A step-by-step guide to implementing high-performance scroll animations with image sequences.",
  keywords: "Next.js 15, Blender, Image Sequences, Scroll Animation, Web Animation, React, Tutorial",
  authors: [{ name: "Milap Dave" }],
  openGraph: {
    title: "Scroll Animation in Next.js 15 Using Blender Image Sequences",
    description: "Learn how to create smooth scroll-based animations in Next.js 15 using Blender image sequences. A step-by-step guide to implementing high-performance scroll animations.",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // You'll need to add this image to your public folder
        width: 1200,
        height: 630,
        alt: "Scroll Animation Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scroll Animation in Next.js 15 Using Blender Image Sequences",
    description: "Learn how to create smooth scroll-based animations in Next.js 15 using Blender image sequences.",
    images: ["/og-image.jpg"], // You'll need to add this image to your public folder
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
