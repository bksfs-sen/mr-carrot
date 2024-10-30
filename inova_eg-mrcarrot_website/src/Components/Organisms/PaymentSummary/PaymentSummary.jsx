import React from "react";
import PaymentSummaryCard from "../../Molecules/PaymentSummaryCard/PaymentSummaryCard";

const PaymentSummary = ({ t, order }) => {
  return (
    <div className="mb-[100px] text-[#525252] ">
      <h3 className="mb-2.5 text-[30px] md:text-[36px] font-bold ">
        {t("order.paymentSummary")}
      </h3>

      <PaymentSummaryCard t={t} order={order} />
    </div>
  );
};

export default PaymentSummary;
