import React, { useEffect, useState } from "react";

import Footer from "../../Molecules/Footer/Footer";
import Navbar from "../../Molecules/Navs/Navbar";
import { useLocation } from "react-router";
import { getUserRequest } from "../../../Services/modules/user";
import { useDispatch } from "react-redux";

const Layout = ({ children }) => {
  const [lang, setLang] = useState("en");
  const [navFooter, setNavFooter] = useState(true);
  const { pathname } = useLocation();

  //A useEffect that checks whether the page needs to contain Nav and footer or not
  //For Authentication Pages
  //If the page does not require a Nav and Footer navfooter state is set to false
  // useEffect(() => {
  //   switch (pathname) {
  //     case "/signup":
  //       setNavFooter(false);
  //       break;
  //     case "/signin":
  //       setNavFooter(false);
  //       break;
  //     case "/verify":
  //       setNavFooter(false);
  //       break;
  //     case "/resetpassword":
  //       setNavFooter(false);
  //       break;
  //     default:
  //       setNavFooter(true);
  //   }
  // }, [pathname]);
  const dispatch = useDispatch();
  useEffect(() => {
    setLang(window.localStorage.getItem("language"));
  }, [window.localStorage.getItem("language")]);
  useEffect(() => {
    if (localStorage.getItem("USER_ID")) {
      dispatch(getUserRequest(localStorage.getItem("USER_ID")));
    }
  }, [localStorage.getItem("USER_ID")]);
  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
