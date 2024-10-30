import React from "react";
import UserShell from "../../Atoms/Shells/UserShell";
import OrderCheckoutData from "../OrderCheckoutData/OrderCheckoutData";

const PaymentSummaryCard = ({ order, t }) => {
  return (
    <>
      <UserShell className="mt-1 px-[30px] md:px-[40px] py-[25px] space-y-1">
        <OrderCheckoutData
          className="justify-between"
          title={t("order.subtotal")}
          value={`${order?.total_amount} SAR`}
        />
        <OrderCheckoutData
          className="justify-between"
          title={t("order.vat")}
          value={"%15"}
        />
      </UserShell>
      <UserShell className="mt-1 px-[30px] md:px-[40px] py-[25px] space-y-1">
        <OrderCheckoutData
          className="justify-between"
          title={t("order.total")}
          value={`${order?.total_amount_with_vat} SAR`}
        />
      </UserShell>
    </>
  );
};

export default PaymentSummaryCard;
