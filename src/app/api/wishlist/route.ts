import WishlistModel from "@/db/models/wishlist";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id") || "";
    const result = await WishlistModel.getByUserId(userId);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id") || "";
    const data = {
      userId: new ObjectId(userId),
      productId: new ObjectId(await request.json()),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const findDuplicate = await WishlistModel.find(data.userId, data.productId);
    if (findDuplicate) {
      throw new Error("You already added this item");
    }
    await WishlistModel.create(data);
    return NextResponse.json(
      {
        message: "Wishlist created successfully",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }
  }
}

export async function DELETE(request: NextRequest) {
  const id = await request.json();

  await WishlistModel.delete(id);

  return NextResponse.json({
    message: "Wishlist deleted successfully",
  });
}
