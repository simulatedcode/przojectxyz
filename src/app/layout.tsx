import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/core/provider/Providers";

const plexsans = IBM_Plex_Sans({
  variable: "--font-ibm-sans",
  subsets: ["latin"],
});

const plexmono = IBM_Plex_Mono({
  weight: "400",
  variable: "--font-ibm-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Przoject xyz",
  description: "WebGL storytelling experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plexsans.variable} ${plexmono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
