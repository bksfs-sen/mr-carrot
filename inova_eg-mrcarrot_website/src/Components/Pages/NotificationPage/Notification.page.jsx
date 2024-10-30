import React, { useEffect, useState } from "react";
import NotificationTemplate from "../../Templates/NotificationTemplate/Notification.template";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotificationsRequest,
  getPaginationsRequest,
} from "../../../Services/modules/notifications";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
function NotificationPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const {
    notifications,
    pagination,
    load: { isLoading },
  } = useSelector((state) => state.notifications);
  dayjs.extend(isToday);
  dayjs.extend(isYesterday);
  useEffect(() => {
    dispatch(getNotificationsRequest(1, 4));
  }, []);
  // useEffect(() => {
  //   setData(notifications);
  // }, [notifications]);
  // useEffect(() => {
  //   setData([...pagination]);
  // }, [pagination]);
  const handlePagination = () => {
    setPageNumber((prev) => prev + 1);
    if (pageNumber === 1) {
      dispatch(getPaginationsRequest(1, 8));
    } else {
      dispatch(getPaginationsRequest(pageNumber + 1, 4));
    }
  };
  return (
    <NotificationTemplate
      handlePagination={handlePagination}
      isToday={isToday}
      isYesterday={isYesterday}
      notification={pagination?.length > 0 ? pagination : notifications}
      isLoading={isLoading}
    />
  );
}

export default NotificationPage;
