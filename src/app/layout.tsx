import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MoonPeer — Anonymous Menstrual Health Peer Support",
  description: "Safe, 100% anonymous peer support for menstrual health journeys. Share your story, find 3 peers who understand, and connect with mutual opt-in. Peer support only, never medical advice.",
  keywords: ["menstrual health", "peer support", "anonymous chat", "period health", "women's health", "endometriosis support", "PCOS support"],
  authors: [{ name: "MoonPeer Community" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#faf7f2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body 
        className="min-h-full flex flex-col bg-[#faf7f2] text-stone-800 antialiased selection:bg-[#fbeee9] selection:text-[#c26d60]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
