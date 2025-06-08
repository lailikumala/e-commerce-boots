import React from 'react'

const AddForm = () => {
  return (
    <form className='w-full max-w-xl mx-auto flex flex-col justify-center items-center space-y-4 mt-3 md:mt-5'>
      <div className='flex flex-col w-full'>
        <label>Product Image: </label>
        <input 
          type='file' 
          accept='image/*' 
          name='image' 
          className='w-full px-3 py-1 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500'
        />
      </div>

      <div className='flex flex-col w-full'>
        <label>Name: </label>
        <input 
          type='text' 
          name='name' 
          placeholder='Enter the product name'
          className='w-full px-3 py-1 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500'
        />
      </div>

      <div className='flex flex-col w-full'>
        <label>Price: </label>
        <input 
          type='number' 
          name='price' 
          placeholder='Enter the product price'
          className='w-full px-3 py-1 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500'
        />
      </div>

      <div className='flex flex-col w-full'>
        <label>Seller's Link: </label>
        <input 
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
    </form>
  )
}

export default AddForm