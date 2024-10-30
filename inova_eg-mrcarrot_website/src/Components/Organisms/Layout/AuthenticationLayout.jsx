import AuthenticationHeader from "../../Molecules/Common/Authentication/AuthenticationHeader";
import ImagesSrc from "../../../utils/ImagesSrc";
import { Link, useNavigate } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { useEffect, useState } from "react";
const AuthenticationLayout = ({
  children,
  title,
  subTitle,
  link,
  linkText,
}) => {
  const [lang, setLang] = useState("en");
  const navigate = useNavigate();
  useEffect(() => {
    setLang(window.localStorage.getItem("language"));
  }, [window.localStorage.getItem("language")]);
  return (
    <main
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="grid sm:grid-cols-7 min-[900px]:grid-cols-12 h-screen"
    >
      <section className="col-span-4 md:col-span-5 lg:col-span-4  min-[900px]:flex hidden max-w-full ">
        <img
          src={ImagesSrc.AuthImage}
          alt=""
          className="w-[100%] max-w-full h-[100%]"
        />
      </section>
      <section className="sm:col-span-12 md:col-span-7 lg:col-span-8 col-span-12  px-[5%] pt-[40px]">
        <div>
          <div className="flex justify-end ">
            <Link to={link}>
              <p className="text-orange underline underline-offset-8 text-[26px] font-[AraHamah1964]">
                {linkText}
              </p>
            </Link>
          </div>
          <AuthenticationHeader title={title} subTitle={subTitle} />
          {children}
        </div>
      </section>
    </main>
  );
};

export default withTranslation()(AuthenticationLayout);
