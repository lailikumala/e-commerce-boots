"use client"

import { addAction } from '@/utils/addActions'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react'
import toast from 'react-hot-toast';
import { Input } from './ui/input';
import { Button } from './ui/button';

const AddForm = () => {
  const router = useRouter();
  const [imageURL, setImageURL] = useState("");

  async function clientAddAction(formData: FormData) {
    const { error, success } = await addAction(formData);

    if (error) {
      // Toast notification
      toast.error(error)
    }

    if (success) {
      toast.success(success);

      router.push("/")

      setImageURL("")
    }
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileSize = file.size;

      if (Math.round(fileSize / 1024) > 1024) {
        toast.error("Image greater than 1mb is not allowed");
      } else {
        setImageURL(URL.createObjectURL(file));
      }
    }
  }

  return (
    <form action={clientAddAction} className='w-full max-w-xl mx-auto flex flex-col justify-center items-center space-y-4 mt-3 md:mt-5'>
      {imageURL&& (<Image src={imageURL} alt='imageURL' width={1000} height={1000} className='max-w-full max-h-72 object-cover object-center rounded-lg'/>)}
      <div className='flex flex-col w-full'>
        <label>Product Image: </label>
        <input
          type='file'
          accept='image/*'
          name='image'
          onChange={handleImageChange}
          className='w-full px-3 py-1 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500'
        />
      </div>

      <div className='flex flex-col w-full'>
        <label>Name: </label>
        <Input
          type='text'
          name='name'
          placeholder='Enter the product name'
          className='w-full px-3 py-1 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500'
        />
      </div>

      <div className='flex flex-col w-full'>
        <label>Price: </label>
        <Input
          type='number'
          name='price'
          placeholder='Enter the product price'
          className='w-full px-3 py-1 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500'
        />
      </div>

      <div className='flex flex-col w-full'>
        <label>Seller&apos;s Link: </label>
        <Input
          type='text'
          name='link'
          placeholder='Link to where buyers can find you'
          className='w-full px-3 py-1 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500'
        />
      </div>

      <div className='flex flex-col w-full'>
        <label>Description: </label>
        <textarea
          name='description'
          placeholder='Enter the product description'
          rows={4}
          className='w-full px-3 py-1 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500'
        >
        </textarea>
      </div>

      <Button type='submit' className='w-full bg-[#212529] text-white px-3 py-2 rounded-md cursor-pointer'>
        Add Product
      </Button>
    </form>
  )
}

export default AddForm