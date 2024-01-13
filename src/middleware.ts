import { error } from "console";
import * as jose from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  //   return NextResponse.redirect(new URL("/home", request.url));
  let cookie = request.cookies.get("Authorization");
  let token = cookie?.value.split(" ")[1] as string;
  try {
    if (request.nextUrl.pathname.startsWith("/products")) {
      if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);
      try {
        const data = await jose.jwtVerify<{ email: string; _id: string }>(
          token,
          secret
        );
      } catch (error) {
        return NextResponse.json(
          {
            message: "Invalid token",
          },
          {
            status: 401,
          }
        );
      }
    }
    // if (request.nextUrl.pathname.startsWith("/api/products/")) {
    //   const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);
    //   try {
    //     const data = await jose.jwtVerify<{ email: string; _id: string }>(
    //       token,
    //       secret
    //     );
    //   } catch (error) {
    //     return NextResponse.json(
    //       {
    //         message: "Invalid token",
    //       },
    //       {
    //         status: 401,
    //       }
    //     );
    //   }
    // }
    if (request.nextUrl.pathname.startsWith("/login")) {
      let cookie = request.cookies.get("Authorization");
      let token = cookie?.value.split(" ")[1] as string;
      if (token) {
        return NextResponse.redirect(new URL("/products", request.url));
      }
    }
    if (request.nextUrl.pathname.startsWith("/wishlist")) {
      if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);
      try {
        const data = await jose.jwtVerify<{ email: string; _id: string }>(
          token,
          secret
        );
      } catch (error) {
        return NextResponse.json(
          {
            message: "Invalid token",
          },
          {
            status: 401,
          }
        );
      }
    }
    if (request.nextUrl.pathname.startsWith("/api/wishlist")) {
      try {
        const secret = new TextEncoder().encode(
          process.env.JWT_SECRET as string
        );
        const data = await jose.jwtVerify<{ email: string; _id: string }>(
          token,
          secret
        );

        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-user-id", data.payload._id);
        requestHeaders.set("x-user-email", data.payload.email);

        const response = NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });

        return response;
      } catch (error) {
        return NextResponse.json(
          {
            message: "Invalid token",
          },
          {
            status: 401,
          }
        );
      }
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Invalid Token",
      },
      {
        status: 401,
      }
    );
  }
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/about/:path*",
// };

const secret_key = process.env.JWT_SECRET || "bukan secret";

export const readPayloadJose = async <T>(token: string) => {
  const secretKey = new TextEncoder().encode(secret_key);
  const payloadJose = await jose.jwtVerify<T>(token, secretKey);

  return payloadJose.payload;
};
