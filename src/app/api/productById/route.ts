import { products } from "@/app/mockProducts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { productIds } = await req.json();

  const product = products.filter((product) => productIds.includes(product.id));
  if (product) {
    return NextResponse.json(product);
  }
  return NextResponse.json(null);
}
