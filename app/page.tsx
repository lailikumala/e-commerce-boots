"use client"

import Hero from "@/components/Hero";
import ProductList from "@/components/ProductList";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(regs => regs);
    }

    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => reg)
      .catch(err => err);
    }
  },[])

  return (
    <div className="bg-[#F8F9FA] ">
      <Hero/>

      <h2 className="w-full text-center text-2xl md:text-4xl font-semibold py-6">All Products</h2>
      <ProductList/>
    </div>
  );
}
