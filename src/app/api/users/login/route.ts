import { comparePass } from "@/db/helpers/bcrypt";
import UserModel from "@/db/models/users";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { ZodError, z } from "zod";

const UserInput = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(5, { message: "Password must be 5 or more characters long" }),
});

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const userJson = {
      email,
      password,
    };
    const parseResult = UserInput.safeParse(userJson);
    if (!parseResult.success) {
      throw parseResult.error;
    }
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new Error("Invalid email/password");
    }

    const checkPass = comparePass(password, user.password);
    if (!checkPass) {
      throw new Error("Invalid email/password");
    }

    const token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET as string
    );

    return NextResponse.json(
      {
        message: "Login successful",
        access_token: token,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: error.issues[0].message,
        },
        {
          status: 400,
        }
      );
    } else {
      return NextResponse.json(
        {
          message: "Invalid email/password",
        },
        {
          status: 400,
        }
      );
    }
  }
}
