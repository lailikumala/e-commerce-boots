'use client'

import { numberWithCommas } from '@/lib/utils';
import { IProduct } from '@/types/type';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  
  const fetchData = async () => {
    try {
      const response = await axios.get('/api/fetch-products');
      setProducts(response.data.products);
    } catch (error) {
      // Handle offline mode
      console.log(`Error fetch data: ${(error as Error).message}`);
    }
  };

  useEffect(() => {
    fetchData();
  },[])


  return (
    <div id='product' className='px-4 md:px-12 py-5 md:py-10 flex justify-center items-center'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
        {products.map((product: IProduct, index) => (
          <Link href={`/product/${product._id}`} key={index}>
            <Image src={product.image} alt="dummy-img" width={1000} height={1000} className='max-w-[17rem] h-72 object-cover object-center rounded-lg'/>
            <div className='mt-4'>
              <h2 className='font-semibold text-lg'>{product.name}</h2>
              <p className='font-medium text-sm mt-1'>{`Rp${numberWithCommas(product.price)}`}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ProductList