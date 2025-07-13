import { NextResponse } from "next/server";
import withAuth from "./middlewares/withAuth";

export function mainMiddleware() {
  const result = NextResponse.next();
  return result;
}

export default withAuth(mainMiddleware, ["/add-product", "/product", "/sign-in", "/sign-up"])