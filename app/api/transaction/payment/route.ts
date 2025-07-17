import {Snap} from "midtrans-client"
import { NextResponse } from 'next/server';

const snap = new Snap({
  isProduction: false,
  serverKey: process.env.SECRET!,
  clientKey: process.env.NEXT_PUBLIC_CLIENT!
});


interface ITransactionResponse {
  token: string,
  redirect_url: string
}

interface ITransactionError {
  message: string,
  httpStatusCode: number,
  ApiResponse: {
    error_messages: string[]
  }
}


export async function POST(request: Request) {
    const { _id, name, price, quantity, shippingAddress} = await request.json();
    
    const parameter = {
      item_details: {
        name,
        price,
        quantity
      },
      transaction_details: {
        order_id: `ORDER-${Date.now()}-${_id}`,
        gross_amount: price * quantity
      },
      customer_details: {
        first_name: shippingAddress.firstName,
        last_name: shippingAddress.lastName,
        email: shippingAddress.email,
        shipping_address: {
        first_name: shippingAddress.firstName,
        last_name: shippingAddress.lastName,
        email: shippingAddress.email,
        address: shippingAddress.address,
        city: shippingAddress.city,
        postal_code: shippingAddress.zipCode,
        country_code: "IDN"
        }
      }
    } 

    return snap.createTransaction(parameter)
    .then((transaction: ITransactionResponse) => {
      return NextResponse.json({ status: 200, token: transaction.token });
    })
    .catch((error: ITransactionError) => {
      // Return error response ke client
      return NextResponse.json(
        { 
          status: 400,
          error: error.ApiResponse?.error_messages[0] || '',
        },
        { status: error.httpStatusCode || 500 }
      );
    });
}