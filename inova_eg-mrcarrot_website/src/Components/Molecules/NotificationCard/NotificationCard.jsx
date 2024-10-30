import React from "react";
import UserShell from "../../Atoms/Shells/UserShell";
import dayjs from "dayjs";

function NotificationCard({ notification, isPrev, t }) {
  const lang = localStorage.getItem("language");
  return (
    <UserShell>
      <div className="text-[24px] py-[24px] md:px-[40px] px-[20px] mt-1 flex justify-between items-center ">
        <div className="md:w-[80%] w-[70%]">
          {!isPrev && (
            <h2 className=" text-[#F38328]">
              {/* {dayjs(notification.created_at).format("DD/MM/YYYY")} */}
              {dayjs(notification?.created_at).isToday()
                ? t("notification.today")
                : dayjs(notification?.created_at).isYesterday()
                ? t("notification.yesterday")
                : dayjs(notification?.created_at).format("DD/MM/YYYY")}
            </h2>
          )}
          <h3 className=" text-[#525252] font-bold">
            {lang === "en" ? notification?.title_en : notification?.title_ar}
          </h3>
          <h4 className="text-[#6D6D6D] ">
            {lang === "en"
              ? notification?.message_en
              : notification?.message_ar}
          </h4>
        </div>
        <p className="text-[#525252] h-min">
          {dayjs(notification?.created_at).format("h:mm A")}
        </p>
      </div>
    </UserShell>
  );
}

export default NotificationCard;
