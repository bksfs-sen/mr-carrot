import "dayjs/locale/ar";

import {
  ActiveCartIcon,
  CartIcon,
  LanguageIcon,
  Logo,
  NavbarActiveProfile,
  NotificationsIcon,
  ProfileIcon,
} from "../../../utils/IconsSrc";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import DropDownNotification from "../../Atoms/DropDownNotification/DropDownNotification";
import { LoadingSpinner } from "../../Atoms/LoadingSpinner/LoadingSpinner";
import axios from "axios";
import classnames from "classnames";
import dayjs from "dayjs";
import { getNotificationsRequest } from "../../../Services/modules/notifications";
import relativeTime from "dayjs/plugin/relativeTime";
import { useAuth } from "../../../Hooks/useAuth";
import { useEffect } from "react";
import { useLanguage } from "../../../Hooks/useLanguage";
import { useLocation } from "react-router";
import { useRef } from "react";
import { useState } from "react";
import uselistenForOutsideClicks from "../../../Hooks/useListenForOutsideClicks";
import { withTranslation } from "react-i18next";

const Navbar = ({ t, i18n }) => {
  const { pathname } = useLocation();
  const language = useLanguage();
  const { auth } = useAuth();
  dayjs.extend(relativeTime);
  const [openNotification, setOpenNotification] = useState(false);
  const dispatch = useDispatch();
  const {
    notifications,
    load: { isLoading },
  } = useSelector((state) => state.notifications);
  const handleOpenNotification = () => {
    setOpenNotification((currentStatus) => !currentStatus);
    if (!openNotification && pathname !== "/notification") {
      dispatch(getNotificationsRequest(1, 4, true));
    }
  };
  // Hide Dropdown on Outside Click
  const menuRef = useRef(null);
  const [listening, setListening] = useState(false);
  // const handleOptionClick = () => {
  //   setOpenNotification(false);
  // };
  useEffect(
    uselistenForOutsideClicks(
      listening,
      setListening,
      menuRef,
      setOpenNotification
    ),
    []
  );

  const onLanguageHandle = (event) => {
    let newLang = event;
    i18n.changeLanguage(newLang);
    if (newLang === "ar") {
      localStorage.setItem("language", "ar");
      axios.defaults.headers.common["Accept-Language"] = "ar";
    } else {
      localStorage.setItem("language", "en");
      axios.defaults.headers.common["Accept-Language"] = "en";
    }

    window.location.reload();
  };

  const navLinks = [
    { name: t("navbar.home"), href: "/" },
    { name: t("navbar.aboutUs"), href: "/about" },
    { name: t("navbar.contactUs"), href: "/contact" },
  ];
  return (
    <nav className="shadow-md py-2 flex-col">
      <div className="lg:w-[84%] w-[90%] mx-auto sm:flex relative justify-between  ">
        <div className="flex justify-center">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className="flex justify-center  my-auto flex-wrap ">
          {navLinks.map((link, index) => (
            <NavLink key={index} to={link.href}>
              {({ isActive }) => (
                <span
                  className={classnames(
                    "text-[26px] cursor-pointer lg:mx-10 sm:mx-5 mx-3",
                    {
                      "text-orange font-[AraHamahBold]": isActive,
                      "text-lightgrey font-[AraHamah1964] ": !isActive,
                    }
                  )}
                >
                  {link.name}
                </span>
              )}
            </NavLink>
          ))}
        </div>
        <div ref={menuRef} className="flex my-auto justify-center gap-4">
          {auth ? (
            <>
              <NavLink
                to="/profile/my-account/account-setting"
                className={"h-[26px] w-[26px]"}
              >
                {pathname.includes("/profile") ? (
                  <NavbarActiveProfile width={"32px"} height={"32px"} />
                ) : (
                  <ProfileIcon width={"29px"} height={"29px"} />
                )}
              </NavLink>
              <NavLink
                to="/cart/choose-applicants"
                className={"h-[26px] w-[26px]"}
              >
                {pathname.includes("/cart") ? (
                  <ActiveCartIcon width={"29px"} height={"29px"} />
                ) : (
                  <CartIcon width={"29px"} height={"29px"} />
                )}
              </NavLink>
              <div className=" font-[AraHamah1964]">
                <div
                  className="overflow-hidden cursor-pointer"
                  onClick={handleOpenNotification}
                >
                  <NotificationsIcon />
                </div>
                {/* list */}
                {openNotification && (
                  <DropDownNotification
                    title={t("notification.notifications")}
                    t={t}
                    buttonNameStyle="focus:ring-0 text-[28px] py-[10px] font-bold rounded-b-[30px]"
                    setOpenNotification={setOpenNotification}
                  >
                    {isLoading ? (
                      <LoadingSpinner />
                    ) : (
                      notifications?.map((notification, i) => (
                        <div
                          key={i}
                          className={
                            notification?.is_seen
                              ? "flex gap-[15px] px-[16px] py-[14px] items-center"
                              : "flex gap-[15px] px-[16px] py-[14px] bg-[#FEF9F4] items-center"
                          }
                        >
                          <p className="text-[24px] grow">
                            {localStorage.getItem("language") === "en"
                              ? notification?.title_en
                              : notification?.title_ar}
                          </p>
                          <h4 className="text-[20px] pr-3">
                            {language === "ar"
                              ? dayjs()
                                  .locale("ar")
                                  .to(dayjs(notification.created_at))
                              : dayjs().to(dayjs(notification.created_at))}
                          </h4>
                        </div>
                      ))
                    )}
                  </DropDownNotification>
                )}
              </div>
            </>
          ) : (
            <NavLink
              to="/signin"
              className={
                "text-[26px] cursor-pointer lg:mx-10 sm:mx-5 mx-3 text-orange font-[AraHamahBold]"
              }
            >
              {t("loginBtn.Signin")}
            </NavLink>
          )}

          {window.localStorage.getItem("language") === "ar" ? (
            <div
              onClick={() => onLanguageHandle("en")}
              className="cursor-pointer my-auto"
            >
              <LanguageIcon />
            </div>
          ) : (
            <div
              onClick={() => onLanguageHandle("ar")}
              className="cursor-pointer my-auto"
            >
              <LanguageIcon />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default withTranslation()(Navbar);
