import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { IFormData } from '@/types/type'
import React from 'react'

interface ShippingFormProps {
  formData: IFormData
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>
}

const ShippingForm: React.FC<ShippingFormProps> = ({ formData, setFormData }) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {id, value} = e.target;
    setFormData(prev => ({...prev, [id]: value}));
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Shipping</h2>
      <form className="space-y-6" onSubmit={e => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label className='pb-2' htmlFor="firstName">First Name</Label>
            <Input id="firstName" placeholder="John" value={formData.firstName} onChange={handleChange}/>
          </div>
          <div>
            <Label className='pb-2' htmlFor="lastName">Last Name</Label>
            <Input id="lastName" placeholder="Doe" value={formData.lastName} onChange={handleChange}/>
          </div>
        </div>
        <div>
          <Label className='pb-2' htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange}/>
        </div>
        <div>
          <Label className='pb-2' htmlFor="address">Address</Label>
          <Input id="address" placeholder="123 Main St" value={formData.address} onChange={handleChange}/>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label className='pb-2' htmlFor="city">City</Label>
            <Input id="city" placeholder="New York" value={formData.city} onChange={handleChange}/>
          </div>
          <div>
            <Label className='pb-2' htmlFor="zipCode">Zip Code</Label>
            <Input id="zipCode" placeholder="10001" value={formData.zipCode} onChange={handleChange}/>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ShippingForm