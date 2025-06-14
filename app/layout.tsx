import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import ToastProvider from "@/providers/ToastProvider";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"]
})

export const metadata: Metadata = {
  title: "Boots Shop",
  description: "Boots Shop Application",
  generator: 'Next.js',
  manifest: '/manifest.json',
  icons: { // recommended structur Next.js 13+
    icon: [ // size for Android
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' }, 
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' } //  default size for IOS
    ]
  },
  appleWebApp: { // config iOS
    capable: true,
    title: 'Boots Shop',
    statusBarStyle: 'black-translucent'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lato.className} antialiased`}
      >
        <ToastProvider />
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
