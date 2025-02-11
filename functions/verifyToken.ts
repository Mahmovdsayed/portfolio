import { jwtVerify, JWTPayload } from "jose";

export const verifyToken = async (
  token: string | undefined
): Promise<JWTPayload | null> => {
  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(process.env.LOGIN_SIG || "");
    const { payload } = await jwtVerify(token, secret);

    if (payload.exp && Date.now() >= payload.exp * 1000) {
      console.error("Token has expired");
      return null;
    }

    return payload;
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
};
