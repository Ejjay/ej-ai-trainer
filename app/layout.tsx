import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { useEffect } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Converso",
  description: "Real-time AI Teaching Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    function overrideClerkText() {
      const paragraphs = document.querySelectorAll('p');
      let targetElement = null;

      paragraphs.forEach(p => {
        if (p.textContent === "Development mode" && p.className.includes('cl-internal-')) {
          targetElement = p;
        }
      });

      if (targetElement) {
        targetElement.textContent = "Alloso mode";
      } else {
        console.warn("Clerk 'Development mode' text element not found for override.");
      }
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        overrideClerkText();
      });
    });

    if (typeof window !== 'undefined') {
      const config = { childList: true, subtree: true };
      observer.observe(document.body, config);

      // Cleanup on component unmount
      return () => observer.disconnect();
    }
  }, []);

  return (
    <html lang="en">
      <body className={`${bricolage.variable} antialiased`}>
        <ClerkProvider appearance={{ variables: { colorPrimary: '#fe5933' }} }>
          <Navbar />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}