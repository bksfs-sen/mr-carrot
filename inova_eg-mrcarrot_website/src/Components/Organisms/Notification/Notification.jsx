import React from "react";
import NotificationCard from "../../Molecules/NotificationCard/NotificationCard";
import dayjs from "dayjs";

function Notification({ t, notification }) {
  return (
    <>
      {notification?.map((val, index) => {
        if (index !== 0) {
          if (
            dayjs(val.created_at).format("DD/MM/YYYY") ===
            dayjs(notification[index - 1].created_at).format("DD/MM/YYYY")
          ) {
            return (
              <NotificationCard
                key={index}
                isPrev={true}
                t={t}
                notification={val}
              />
            );
          } else {
            return (
              <NotificationCard
                key={index}
                isPrev={false}
                t={t}
                notification={val}
              />
            );
          }
        } else {
          return (
            <NotificationCard
              key={index}
              isPrev={false}
              t={t}
              notification={val}
            />
          );
        }
      })}
    </>
  );
}

export default Notification;
