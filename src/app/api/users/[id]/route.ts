import UserModel from "@/db/models/users";
import { MyResponse } from "@/type/response";
import { User } from "@/type/type";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await UserModel.findById(params.id);

  return NextResponse.json<MyResponse<User>>({
    data: user,
  });
}
