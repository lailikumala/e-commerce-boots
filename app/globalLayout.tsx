"use client"
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import ToastProvider from "@/providers/ToastProvider";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

const disableNavbar = ["/sign-up", "/sign-in"]

export default function GlobalLayout({children}: {children: React.ReactNode}) {

  const pathname = usePathname();

  return (
    <SessionProvider>
      {!disableNavbar.includes(pathname) && <Navbar />}
      <ToastProvider />
      {children}
      <Footer />
    </SessionProvider>
  );
}
