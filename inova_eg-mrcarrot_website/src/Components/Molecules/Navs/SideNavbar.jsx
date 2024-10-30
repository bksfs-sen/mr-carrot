import {
  ActiveOrdersIcon,
  ActiveProfileIcon,
  DrawerArrow,
  InactiveOrdersIcon,
  InactiveProfileIcon,
  LogoutIcon,
} from "../../../utils/IconsSrc";
import { NavLink, useLocation } from "react-router-dom";

import classNames from "classnames";
import { useState } from "react";
import { withTranslation } from "react-i18next";
import Modal from "../../Organisms/Common/Modal";
import Button from "../../Atoms/Buttons/Button";

const SideNavbar = ({ t }) => {
  const [hideMyAccount, setHideMyAccount] = useState(false);
  const [hideMyOrders, setHideMyOrders] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const MyAccountLinks = [
    {
      name: t("sideNav.Account"),
      path: "/profile/my-account/account-setting",
    },
    { name: t("sideNav.Applicants"), path: "/profile/my-account/applicants" },
    // { name: t("sideNav.Payment"), path: "/profile/my-account/payment" },
  ];
  const MyOrdersLinks = [
    {
      name: t("sideNav.Current Orders"),
      path: "/profile/my-orders/current-orders",
    },
    { name: t("sideNav.History"), path: "/profile/my-orders/history" },
  ];
  const handleLogOut = () => {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("USER_ID");
    localStorage.removeItem("USER_TYPE");
    //redirect to home page
    window.location.replace("/");
  };
  const { pathname } = useLocation();
  return (
    <div className=" h-full w-full md:max-w-xs space-y-1  font-[AraHamah1964]">
      <div className="bg-[#FEF3E9] px-6 py-4">
        <div
          className="flex justify-between cursor-pointer"
          onClick={() => setHideMyAccount(!hideMyAccount)}
        >
          <div className="flex  space-x-2 rtl:space-x-reverse items-center	">
            {pathname.includes("my-account") ? (
              <ActiveProfileIcon className=" h-6 w-8 " />
            ) : (
              <InactiveProfileIcon className="h-6 w-8 " />
            )}
            <h1
              className={classNames(
                {
                  "text-orange": pathname.includes("my-account"),
                  "text-lightgrey": !pathname.includes("my-account"),
                },
                "text-[32px]"
              )}
            >
              {t("sideNav.My Account")}
            </h1>
          </div>
          <DrawerArrow
            className={classNames({ "rotate-180": hideMyAccount }, "mt-5")}
          />
        </div>
        {hideMyAccount ? (
          <></>
        ) : (
          <div className="px-10 flex flex-col">
            {MyAccountLinks.map((link) => {
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    classNames(
                      {
                        "text-orange": isActive,
                        "text-lightgrey": !isActive,
                      },
                      " text-[26px]"
                    )
                  }
                >
                  {link.name}
                </NavLink>
              );
            })}
          </div>
        )}
      </div>
      <div className="bg-[#FEF3E9] px-6 py-4">
        <div
          className="flex justify-between cursor-pointer"
          onClick={() => setHideMyOrders(!hideMyOrders)}
        >
          <div
            className="flex space-x-2 rtl:space-x-reverse items-center	"
            onClick={() => setHideMyOrders(!hideMyOrders)}
          >
            {pathname.includes("my-orders") ? (
              <ActiveOrdersIcon className="h-6 w-8" />
            ) : (
              <InactiveOrdersIcon className="h-6 w-8" />
            )}

            <h1
              className={classNames(
                {
                  "text-orange": pathname.includes("my-orders"),
                  "text-lightgrey": !pathname.includes("my-orders"),
                },
                "text-[32px]"
              )}
            >
              {t("sideNav.My Orders")}
            </h1>
          </div>
          <DrawerArrow
            className={classNames({ "rotate-180": hideMyOrders }, "mt-5")}
          />
        </div>
        {hideMyOrders ? (
          <></>
        ) : (
          <div className="px-10 flex flex-col">
            {MyOrdersLinks.map((link) => {
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    classNames(
                      {
                        "text-orange": isActive,
                        "text-lightgrey": !isActive,
                      },
                      " text-[26px]"
                    )
                  }
                >
                  {link.name}
                </NavLink>
              );
            })}
          </div>
        )}
      </div>
      <div className="bg-[#FEF3E9] px-6	py-4">
        <Modal
          showModal={showModal}
          setShowModal={() => setShowModal(!showModal)}
          modalClassName="!w-[616px] !min-h-[185px] pb-8 px-10"
        >
          <p className="text-[36px] my-[30px] text-[#525252]">
            {t("Profile.logoutConfirm")}
          </p>
          <div className="flex justify-end gap-[24px]">
            {/* <button onClick={() => setShowModal(false)}>Cancel</button>
            <button onClick={handleLogOut}>Logout</button> */}
            <Button
              name={t("general.Cancel")}
              buttonNameStyle={
                "text-[24px]  border border-2 border-lime-400 text-lime-400 !px-[27px] h-[46px]"
              }
              onClick={() => setShowModal(false)}
            />
            <Button
              name={t("sideNav.Log out")}
              buttonNameStyle={
                "bg-lime-400  hover:bg-lime-700 text-white font-[AraHamahBold] text-[24px] !px-[27px]"
              }
              onClick={handleLogOut}
            />
          </div>
        </Modal>
        <div
          onClick={() => setShowModal(true)}
          className="flex  space-x-2 cursor-pointer rtl:space-x-reverse items-center	"
        >
          <LogoutIcon className="h-6 w-8" />
          <h1 className={classNames("text-[32px] text-lightgrey")}>
            {t("sideNav.Log out")}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(SideNavbar);
