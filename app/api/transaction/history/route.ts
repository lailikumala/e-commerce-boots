import { NextResponse } from "next/server";
import { connectDB } from "../../db/connectDB";
import Transaction from "../../models/transaction.model";

export async function POST(request: Request) {
  const { order_id, transaction_date, status, amount, payment_type } = await request.json();

  try {
    connectDB()
    const newTransaction = new Transaction({ 
      order_id, 
      transaction_date, 
      status, 
      amount, 
      payment_type 
    });

    await newTransaction.save();
    return NextResponse.json({ message: "Transaction created" }, { status: 201 });

  } catch(error) {
    return NextResponse.json({ message: (error as Error).message}, { status: 500});
  }
}