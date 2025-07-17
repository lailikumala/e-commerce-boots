"use client"

import { Loader } from 'lucide-react'
import React, { Suspense} from 'react'
import FinishTransaction from './finishTransaction'

const FinishPage = () => {
  return (
    <Suspense fallback={<div className='flex justify-center items-center'>
      <Loader className='size-6 mr-4 mt-4 animate-spin' />
    </div>}>
      <FinishTransaction/>
    </Suspense>
  )
}

export default FinishPage