import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const userToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("userToken="))
        ?.split("=")[1];

      setToken(userToken || null);

      if (!userToken) {
        router.push("/login");
      }
    };

    checkAuth();

    const observer = new MutationObserver(() => checkAuth());
    observer.observe(document, { subtree: true, childList: true });

    return () => observer.disconnect();
  }, [router]);

  return { token };
}
