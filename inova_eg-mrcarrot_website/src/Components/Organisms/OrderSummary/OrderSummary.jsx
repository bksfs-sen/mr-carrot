import OrderSummaryCard from "../../Molecules/OrderSummaryCard/OrderSummaryCard";
import React from "react";
const OrderSummary = ({ t, order }) => {
  // console.log(order);
  return (
    <div className="mb-20 text-[#525252] ">
      <h3 className="mb-2.5 text-[30px] md:text-[36px] font-bold">
        {t("order.Order Summery")}
      </h3>
      {order?.sub_orders?.map((subOrder, i) => (
        <OrderSummaryCard
          t={t}
          key={i}
          order={subOrder}
          packageData={order?.package}
        />
      ))}
    </div>
  );
};

export default OrderSummary;
