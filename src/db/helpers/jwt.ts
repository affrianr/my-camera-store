import * as jose from "jose";

const secret_key = process.env.JWT_SECRET || "bukan secret";

export const readPayloadJose = async <T>(token: string) => {
  const secretKey = new TextEncoder().encode(secret_key);
  const payloadJose = await jose.jwtVerify<T>(token, secretKey);

  return payloadJose.payload;
};
