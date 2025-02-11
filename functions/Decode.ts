import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const DecodeAndVerifyJWT = async () => {
  const token = (await cookies()).get("userToken")?.value;
  const decoded = jwt.decode(token as any);
  return decoded;
};
export { DecodeAndVerifyJWT };
