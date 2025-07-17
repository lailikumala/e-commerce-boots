"use client"
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import ToastProvider from "@/providers/ToastProvider";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

const disableNavbar = ["/sign-up", "/sign-in", "/finish"]

export default function GlobalLayout({children}: {children: React.ReactNode}) {

  const pathname = usePathname();
  const isLogged = disableNavbar.includes(pathname);

  return (
    <SessionProvider>
      {!isLogged && <Navbar />}
      <ToastProvider />
      {children}
      {!isLogged && <Footer />}
    </SessionProvider>
  );
}
