import React from "react";
import Button from "../Buttons/Button";
import { useNavigate } from "react-router";

function DropDownNotification({ title, children, t, setOpenNotification }) {
  const navigate = useNavigate();
  return (
    <div className="drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-col w-max divide-y-[2px]  z-10 absolute right-[3%]  lg:right-0 rtl:left-[9%] rtl:right-auto mt-[30px] bg-white rounded-[30px] ">
      <h3 className="text-center py-[10px] text-[28px] font-bold text-[#525252]">
        {title}
      </h3>
      {children}
      <Button
        onClick={() => {
          navigate("/notification");
          setOpenNotification(false);
        }}
        name={t("notification.showAllNotifications")}
        width={"!text-center"}
        buttonNameStyle="focus:ring-0 text-[28px] py-[10px] font-bold rounded-b-[30px]"
      />
    </div>
  );
}

export default DropDownNotification;
