import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ClerkTextOverrider from "@/components/ClerkTextOverrider";
import { useEffect } from "react";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Converso",
  description: "Real-time AI Teaching Platform",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    document.documentElement.style.setProperty("touch-action", "none");
    document.body.style.setProperty("touch-action", "none");
    document.documentElement.style.setProperty("-webkit-overflow-scrolling", "touch");
  }, []);

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#fe5933" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no" />
      </head>
      <body className={`${bricolage.variable} antialiased`}>
        <ClerkProvider appearance={{ variables: { colorPrimary: '#fe5933' }} }>
          <Navbar />
          {children}
          <ClerkTextOverrider />
        </ClerkProvider>
      </body>
    </html>
  );
}