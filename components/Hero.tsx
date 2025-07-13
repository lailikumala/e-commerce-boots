
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <div className='min-h-[70vh] md:min-h-[60vh] lg:min-h-[90vh] flex flex-col md:flex-row justify-center items-center bg-white px-4 md:px-12 text-black'>
      <div className='max-w-2xl'>
        <h1 className='text-5xl pt-6 md:pt-0 md:text-7xl leading-tight font-semibold'>Unmatched Durability for Every Adventure</h1>
        <p className='text-[#495957] mt-4'>Step into the wild with confidence. Our premium boots are designed to withstand the toughest terrains while keeping your style rugged and refined.</p>

        <Link href='#product'>
          <button className='mt-8 bg-[#212529] text-white px-3 py-2 rounded-md cursor-pointer'>Shop the Collection</button>
        </Link>
      </div>

      <div>
        <Image src={"/hero-img.jpg"} alt='hero-img' width={1000} height={1000}/>
      </div>
    </div>
  )
}

export default Hero