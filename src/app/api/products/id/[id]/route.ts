import ProductModel from "@/db/models/products";
import { Product } from "@/type/type";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const result = (await ProductModel.getByID(params.id)) as Product;

  return NextResponse.json(result);
}
