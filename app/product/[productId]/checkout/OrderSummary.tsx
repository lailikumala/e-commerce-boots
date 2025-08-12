"use client"

import { Button } from '@/components/ui/button'
import { numberWithCommas } from '@/lib/utils'
import { IFormData, IProduct } from '@/types/type'
import { Separator } from '@radix-ui/react-separator'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

const OrderSummary = ({ productId, formData }: {
  productId: string,
  formData: IFormData
}) => {

  const [product, setProduct] = useState<IProduct>({
    _id: '',
    name: '',
    price: 0,
    image: '',
    link: '',
    description: ''
  });

  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js"
    const clientKey = process.env.NEXT_PUBLIC_CLIENT as string
    const script = document.createElement('script')
    script.src = snapScript
    script.setAttribute('data-client-key', clientKey)
    script.async = true

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  },[])

  useEffect(() => {
    axios.get(`/api/products/${productId}`)
      .then((response) => setProduct(response.data.products))
      .catch((error) => {
        console.log("Axios error:", error.message);
      });
  }, [productId]);

  const priceWithTax = useMemo(() => {
    const total = (product?.price || 0) * 0.11;
    return total
  }, [product?.price]);

  const totalPrice = (product?.price || 0) + priceWithTax;

  const checkout = async () => {
      const data = {
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        shippingAddress: formData
      }

      await fetch(`/api/transaction/payment`, {
        method: "POST",
        body:JSON.stringify(data)
      }).then(async (value) => {
          const result = await value.json();
          if(result?.status == 200) {
            window.snap.pay(result.token);
          } else {
            toast.error('Failed Transaction')
          }
        
      }).catch((error) => console.log(error.message))
    }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <Image
                src={product?.image}
                alt='img-checkout'
                width={80}
                height={80}
                className='w-full rounded-md object-cover'
              />
            </div>
            <div className="flex-1 ml-4">
              <h3 className="text-lg font-medium">{product?.name}</h3>
              <p className="text-gray-500 dark:text-gray-400">Quantity: 1</p>
            </div>
            <div className="text-lg font-bold">Rp{numberWithCommas(product?.price)}</div>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <div>Subtotal</div>
            <div className="font-bold">Rp{numberWithCommas(product?.price)}</div>
          </div>
          <div className="flex justify-between items-center">
            <div>Tax 11%</div>
            <div className="font-bold">Rp{numberWithCommas(priceWithTax)}</div>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold">Total</div>
            <div className="text`-xl font-bold">Rp{numberWithCommas(totalPrice)}</div>
          </div>
          <Button
            className='w-full'
            size="lg"
            onClick={checkout}
          >
            Pay Order
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary