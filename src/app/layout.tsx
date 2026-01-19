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
  title: "Kids Activity App",
  description: "A fun and safe place for kids to learn and play",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Professional Theme Fonts */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" 
          rel="stylesheet" 
        />
        {/* Fun Theme Fonts */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@300;400;700&family=Quicksand:wght@300;400;500;600;700&family=Nunito:wght@300;400;500;600;700&family=Fredoka+One&family=Comfortaa:wght@300;400;500;600;700&family=Patrick+Hand&display=swap" 
          rel="stylesheet" 
        />
        {/* Ocean Theme Fonts */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Lato:wght@300;400;700&family=Open+Sans:wght@300;400;500;600;700&family=Merriweather:wght@300;400;700&family=Crimson+Text:wght@400;600&family=Lora:wght@400;500;600&family=Source+Code+Pro:wght@400;500;600&family=Inconsolata:wght@400;500;600&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
