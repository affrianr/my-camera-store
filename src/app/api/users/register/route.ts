import UserModel from "@/db/models/users";
import { User } from "@/type/type";
import { NextRequest, NextResponse } from "next/server";
import { ZodError, z } from "zod";

const UserInput = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: "Invalid email address " }),
  username: z.string(),
  password: z
    .string()
    .min(5, { message: "Password must be 5 or more characters long" }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parseResult = UserInput.safeParse(body);
    if (!parseResult.success) {
      throw parseResult.error;
    }

    await UserModel.create(body);

    return NextResponse.json({
      message: "User created successfully",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const err = error.issues[0].message;
      return NextResponse.json(
        {
          message: err,
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
