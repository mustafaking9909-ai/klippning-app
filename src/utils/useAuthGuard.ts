import { useEffect } from "react";
import { useRouter } from "expo-router";
import { isLoggedIn } from "./auth";

export const useAuthGuard = () => {
  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      const ok = await isLoggedIn();

      if (!ok) {
        router.replace("/login");
      }
    };

    check();
  }, []);
};