"use client"

import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import OrderSummary from './OrderSummary'
import { IFormData } from '@/types/type'
import ShippingForm from './ShippingForm'

const CheckoutPage = () => {
  const {productId} = useParams<{productId: string}>();

  const [formData, setFormData] = useState<IFormData>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
  })

  return (
    <main className="flex-1 py-12 px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ShippingForm
            formData={formData}
            setFormData={setFormData}
          />
          <OrderSummary 
            productId={productId}
            formData={formData}
            />
        </div>
    </main>
  )
}

export default CheckoutPage