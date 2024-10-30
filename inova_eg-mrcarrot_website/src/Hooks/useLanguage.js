import { useEffect, useState } from "react";

export const useLanguage = () => {
  const [language, setLanguage] = useState();
  useEffect(() => {
    if (localStorage.getItem("language") === "ar") {
      setLanguage("ar");
    } else {
      setLanguage("en");
    }
  }, []);

  return language;
};
