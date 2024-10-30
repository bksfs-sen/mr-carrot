import { CalenderIcon } from "../../../utils/IconsSrc";
import OrderCheckoutData from "../OrderCheckoutData/OrderCheckoutData";
import React from "react";
import UserShell from "../../Atoms/Shells/UserShell";
import dayjs from "dayjs";

const OrderSummaryCard = ({ order, packageData, t }) => {
  // const date = new Date(order?.start_date);
  console.log(order);
  const lang = localStorage.getItem("language");
  return (
    <UserShell className="mt-1 px-7 md:px-8 py-6 space-y-2">
      <OrderCheckoutData
        titleStyle="text-[30px] md:text-[36px]"
        className="gap-1 justify-between"
        title={packageData?.name}
        value={`${packageData?.price} SAR`}
      />

      <OrderCheckoutData
        className="gap-4"
        title={t("order.applicantName")}
        value={order?.applicant_name}
      />
      <OrderCheckoutData
        className="gap-4 relative"
        title={t("order.startDate")}
        value={dayjs(order?.start_date).format("DD-MM-YYYY")}
        // value={
        //   order?.start_date
        //     ? date.getDate() +
        //       "-" +
        //       (date.getMonth() + 1) +
        //       "-" +
        //       date.getFullYear()
        //     : ""
        // }
      >
        <CalenderIcon className="absolute right-0 h-full cursor-pointer rtl:left-0 rtl:right-auto" />
      </OrderCheckoutData>
      <OrderCheckoutData
        className="gap-4"
        title={t("order.numOfMonths")}
        value={order?.num_of_months}
      />
    </UserShell>
  );
};

export default OrderSummaryCard;
