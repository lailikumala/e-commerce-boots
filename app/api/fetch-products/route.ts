import { connectDB } from "../db/connectDB";
import Product from "../models/product.model";

export async function GET() {
  await connectDB();

  try {
    const products = await Product.find({}).sort({createAt: -1});

    return Response.json({products}, {status: 200});
    
  } catch (error) {
      return Response.json({message: (error as Error).message}, {status: 400})
    }
}