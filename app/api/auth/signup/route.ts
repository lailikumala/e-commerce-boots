import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import User from "@/app/api/models/user.model";
import { connectDB } from "../../db/connectDB";


export async function POST(request: Request) {
  const { name, email, password, confirmPassword, role, provider } = await request.json();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  if (!name || !email || !password || !confirmPassword) {
    return NextResponse.json({ message: "All fields are required" }, { status: 400 })
  }

  if (!isValidEmail) {
    return NextResponse.json({ message: "Invalid email format" }, { status: 400 })
  }

  if (confirmPassword !== password) {
    return NextResponse.json({ message: "Password do not match" }, { status: 400 })
  }

  if (password.length < 6) {
    return NextResponse.json({ message: "Password must be at least 6 character long" }, { status: 400 })
  }


  try {
    await connectDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ message: "User already exist" }, { status: 400 })
    }

    const hasedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      name,
      password: hasedPassword,
      role,
      provider
    });

    await newUser.save();
    return NextResponse.json({ message: "User createdh" }, { status: 201 })

  } catch (error) {
    return NextResponse.json({ message: (error as Error).message}, { status: 500})
  }
}