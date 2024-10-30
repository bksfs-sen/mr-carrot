import { useEffect, useState } from "react";

export const useAuth = () => {
  const [auth, setAuth] = useState(true);
  useEffect(() => {
    if (
      localStorage.getItem("TOKEN") &&
      localStorage.getItem("IS_VERIFIED") === "true"
    ) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, []);

  return { auth };
};
