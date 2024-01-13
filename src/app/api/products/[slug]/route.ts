import ProductModel from "@/db/models/products";
import { Product } from "@/type/type";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const result = (await ProductModel.getBySlug(params.slug)) as Product;

  return NextResponse.json(result);
}
