"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const LogoutFunc = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("userToken");
  redirect("/login");
};

export { LogoutFunc };
