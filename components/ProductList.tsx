'use client'

import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface IProduct {
  _id: string;
  image: string;
  name: string;
  price: number;
}

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isOffline, setIsOffline] = useState(false);
  
  const fetchData = async () => {
    try {
      const response = await axios.get('/api/fetch-products');
      setProducts(response.data.products);

      // save to cache if available
      if ('caches' in window) {
        const cache = await caches.open('api-cache');
        await cache.put(
          '/api/fetch-products',
          new Response(JSON.stringify(response.data))
        );
      }
    } catch (error) {
      // Handle offline mode
      console.log(`Error fetch data: ${(error as Error).message}`);

      if (!navigator.onLine) {
        setIsOffline(true);
        
        // if offline mode get from cache
        const cachedResponse = await caches.match('/api/fetch-products');
        if (cachedResponse) {
          const data = await cachedResponse.json();
          setProducts(data.products);
        }
      }
    }
  };

  useEffect(() => {
    fetchData();

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(regs => regs);
    }

    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => reg)
      .catch(err => err);
    }
  },[])

  if(isOffline && products.length === 0) {
    return <div className='text-center font-semibold'>Anda sedang offline. Data tidak tersedia</div>
  }

  return (
    <div id='product' className='px-4 md:px-12 py-5 md:py-10 flex justify-center items-center'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
        {products.map((product: IProduct, index) => (
          <Link href={`/product/${product._id}`} key={index}>
            <Image src={product.image} alt="dummy-img" width={1000} height={1000} className='max-w-[17rem] h-72 object-cover object-center rounded-lg'/>
            <div className='mt-4'>
              <h2 className='font-semibold text-lg'>{product.name}</h2>
              <p className='font-medium text-sm mt-1'>{`$${product.price}`}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ProductList