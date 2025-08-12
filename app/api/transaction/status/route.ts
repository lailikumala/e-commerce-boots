import { NextRequest } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get('order_id');

  if (!orderId) {
    return new Response(JSON.stringify({ error: 'Missing order_id' }), {
      status: 400,
    });
  }

  try {
    const midtransResponse = await axios.get(
      `https://api.sandbox.midtrans.com/v2/${orderId}/status`,
      {
        auth: {
          username: process.env.SECRET as string,
          password: '',
        },
      }
    );

    return new Response(JSON.stringify(midtransResponse.data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    console.error('Midtrans error:', (err as Error).message);
    return new Response(JSON.stringify({ error: 'Failed to fetch transaction status' }), {
      status: 500,
    });
  }
}
