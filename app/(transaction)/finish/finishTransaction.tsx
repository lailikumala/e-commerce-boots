"use client"

import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { numberWithCommas } from '@/lib/utils'
import { ITransaction } from '@/types/type'
import axios from 'axios'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'

const FinishTransaction = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const order_id = searchParams.get("order_id");
  const [transaction, setTransaction] = useState<ITransaction>({
    order_id: '',
    transaction_date: '',
    status: '',
    amount: 0,
    payment_type: ''
  });

  useEffect(() => {
    axios.get(`/api/transaction/status?order_id=${order_id}`)
      .then((res) => {
        const data = res?.data;
        if (data?.status_code == '200') {
          setTransaction({
            order_id: data?.order_id,
            transaction_date: data?.transaction_time,
            status: data?.status_code,
            amount: data?.gross_amount,
            payment_type: data?.payment_type
          });
        }
      })
      .catch((err) => console.error('Error:', err.message));
  }, [order_id]);

  const responsePayment = useMemo(() => {
    const message = transaction?.status == '200' ? 'Payment Successful' : 'Payment Failure'
    const imgPayment = transaction?.status == '200' ? '/success.png' : '/failed.png'
    return { imgPayment, message }

  }, [transaction?.status]);

  const handleHistoryTransaction = async () => {
    try {
      const result = await fetch("/api/transaction/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction)
      });

      const data = await result.json();

      if (result?.ok) {
        router.push('/')
      } else if (result.status === 500) {
        console.log(data.message)
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='h-full flex items-center justify-center'>
      <Card className='md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8'>
        <CardHeader>
          <div className='flex justify-center items-center'>
            <Image
              className=''
              src={responsePayment?.imgPayment}
              alt='success'
              width={60}
              height={60}
            />
          </div>
          <CardTitle className='text-center mt-3'>
            {responsePayment?.message}
          </CardTitle>
          <CardDescription className='text-sm mt-3 text-center text-accent-foreground'>
            <p >Amount Paid</p>
            <p className='font-semibold mt-3'>Rp{numberWithCommas(transaction?.amount)}</p>
          </CardDescription>
        </CardHeader>
        <div className='flex justify-center items-center'>
          <Button
            className='w-1/2'
            size="default"
            onClick={handleHistoryTransaction}
          >
            Back to Home
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default FinishTransaction