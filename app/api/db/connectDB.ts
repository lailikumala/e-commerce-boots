import mongoose from "mongoose"

export const connectDB = async () => {
    try{
      const conn = await mongoose.connect(process.env.MONGO_URI as string);
      console.log(`mongodb conected: ${conn.connection.host}`)
    } catch (error) {
    console.log(`Error connecting to mongodb: ${(error as Error).message}`);
    process.exit(1);
    }
}