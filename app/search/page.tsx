"use client"

import { numberWithCommas } from '@/lib/utils';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'

interface IProduct {
  _id: string;
  image: string;
  name: string;
  price: number;
}

const SearchComponent = () => {
  const [products, setProducts] = useState([]);
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  useEffect(() => {
    const searchTermFromUrl = searchParams.get("searchTerm");
    if (searchTermFromUrl) {
      axios
        .get(`/api/search?searchTerm=${searchTermFromUrl}`)
        .then((response) => setProducts(response.data.products))
        .catch((error) => console.log("Error fetching serach result:", error))
    }
  }, [searchParams]);

  if(!products) {
    return <div className='flex justify-center items-center'>
      <Loader className='size-6 mr-4 mt-4 animate-spin' />
    </div>
  }

  return (
    <>
      {session?.user?.role == 'admin' && (
        <div className="px-4 md:px-12">
          <Link href="/add-product">
            <button className="bg-[#212529] text-white px-3 py-2 rounded-md cursor-pointer">Add Product</button>
          </Link>
        </div>
      )}
      <div id='product' className='px-4 md:px-12 py-5 md:py-10 flex justify-center items-center'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
          {products.map((product: IProduct, index) => (
            <Link href={`/product/${product._id}`} key={index}>
              <Image src={product.image} alt="dummy-img" width={1000} height={1000} className='max-w-[17rem] h-72 object-cover object-center rounded-lg' />
              <div className='mt-4'>
                <h2 className='font-semibold text-lg'>{product.name}</h2>
                <p className='font-medium text-sm mt-1'>{`Rp${numberWithCommas(product.price)}`}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

const SearchPage = () => {
  return <Suspense fallback={"Hello"}>
    <SearchComponent />
  </Suspense>
}

export default SearchPage