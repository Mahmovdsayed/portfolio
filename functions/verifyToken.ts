import { jwtVerify } from "jose";

export const verifyToken = async (token: string) => {
  try {
    const secret = new TextEncoder().encode(process.env.LOGIN_SIG || "");
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    throw new Error("Invalid token");
  }
};
