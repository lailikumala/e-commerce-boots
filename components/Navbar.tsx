import Link from "next/link";
import { Search } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="px-4 md:px-12 py-4 md:py-6 bg-white text-balck">
      <div className="flex justify-between items-center">
        <Link href="/" className="hidden md:inline-block text-lg font-semibold">My Ecommerce</Link>
        <div className="relative max-w-[300px] md:w-[400px]">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Search className="w-4 h-4 flex"/>
          </div>
          <input className="h-[36px] relative pl-10 border-[1px] border-black/[0.7] text-sm rounded-[8px] w-full py-2 px-3 focus:outline-none bg-transparent" type="text" placeholder="Search" />
        </div>

        <Link href="/add-product">
          <button className="bg-[#212529] text-white px-3 py-2 rounded-md cursor-pointer">Add Product</button>
        </Link>
      </div>
    </nav>
  )
}