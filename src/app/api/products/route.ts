import ProductModel from "@/db/models/products";
import { MyResponse } from "@/type/response";
import { Pagination, Product } from "@/type/type";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams;
  const page = query.get("page") ?? 1;
  const search = query.get("search") ?? "";
  const limit = 8;
  const result = await ProductModel.getAll(limit, +page, search);
  return NextResponse.json({
    totalItem: result.totalItem,
    data: result.data,
  });
}
