"use client"

import ProductList from '@/components/ProductList';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

interface IProduct {
  image: string;
  _id: string;
  name: string;
  price: string;
  link: string;
  description: string;
}

const ProductPage = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const params = useParams();
  const [product, setProduct] = useState<IProduct>();

  const handleDelete = async () => {
    const response = await axios.delete(`/api/products/${params.productId}`);

    toast.success(response.data.message)

    router.push("/");
  }

  useEffect(() => {
    axios
    .get(`/api/products/${params.productId}`)
    .then((response) => setProduct(response.data.products))
    .catch((error) => {
      console.log("Axios error:", error.message);
      console.log("Full error:", error);
    });
  },[params.productId])

  if(!product) {
    return <p>Loading...</p>
  }

  return (
    <div className='px-4 md:px-12 bg-[#F8F9FA]'>
      <p className="cursor-pointer py-3" onClick={() => router.back()}>
        &larr; Back
      </p>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center md:space-x-10">
        <Image
          src={product.image}
          alt='img-detail'
          width={1000}
          height={1000}
          className='max-w-full md:max-w-xl md:min-w-[30rem] min-h-[28rem] max-h-[28rem] object-cover object-center basic-1/2'
        />

        <div className="basic-1/2 py-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl">{product.name}</h2>

            <div className="text-2xl font-bold mt-2 relative cursor-pointer">
              <span 
              onClick={() => setOpen(!open)}>
                ...
              </span>

              {open && (
                <div className="absolute bg-white shadow-md pb-2 px-5 text-base font-normal right-0 top-10">
                  <Link href={`/product/${product._id}/update`}>
                    <p className="mb-2 pb-2 border-b border-gray-300">Update</p>
                  </Link>
                  <p className="text-red-500 cursor-pointer"
                    onClick={handleDelete}
                  >
                    Delete
                  </p>
                </div>
              )}
            </div>
          </div>

          <h3 className="text-3xl font-semibold mt-3">${product.price}</h3>

          <Link href={product.link} target='_blank'>
              <button className='mt-8 bg-[#212529] hover:bg-[#343A40] text-white px-3 py-2 w-full font-semibold'>
                Contact Seller
              </button>
          </Link>

          <p className="font-semibold mt-10 text-lg">Description</p>
          <p className="mt-1">{product.description}</p>
        </div>
      </div>

      <h2 className="w-full text-2xl font-semibold pt-20">
        You might also like
      </h2>
      <ProductList/>
    </div>
  )
}

export default ProductPage