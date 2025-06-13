import cloudinary from "@/utils/cloudinary";
import { connectDB } from "../../db/connectDB";
import Product from "../../models/product.model";

export async function GET(
  request: Request, 
  {params}: {params: Promise<{productId: string}>}
) {
  await connectDB();
  const productId = (await params).productId;

  try {
    const products = await Product.findById(productId)
    if(!products) {
      return Response.json({message: "Product not found"}, {status: 400})
    } 

    return Response.json({products}, {status: 200})
  } catch (error) {
      return Response.json({message: (error as Error).message}, {status: 400})  
  }
}

export async function DELETE(
  request: Request, 
  {params}: {params: Promise<{productId: string}>}
) {
  await connectDB;
  const productId = (await params).productId;

  try {
    const product = await Product.findById(productId);

    if(!product) {
      return Response.json({message: "Product not found"}, {status: 400})
    }

    // delete the image in cloudinary first
    const parts = product.image.split("/");
      const fileName = parts[parts.length - 1];
      const imageId = fileName.split(".")[0];

      cloudinary.uploader
        .destroy(`ecommerce/${imageId}`)
        .then((result) => console.log("result", result));

    // delete from databse

    await Product.findByIdAndDelete(productId);
    return Response.json({message: "Product deleted successfully"}, {status: 200})
  } catch (error) {
    return Response.json({message: (error as Error).message}, {status: 400})
  }
}

