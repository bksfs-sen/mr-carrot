import { useDispatch, useSelector } from "react-redux";

import React from "react";
import SubscriptionConfirmTemplate from "../../Templates/SubscriptionConfirmTemplate/SubscriptionConfirm.template";
import { getOrderRequest } from "../../../Services/modules/orders";
import { setPaymentInfoRequest } from "../../../Services/modules/payment";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

function SubscriptionConfirmPage() {
  const [queryParameters] = useSearchParams();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.orders.order);
  const actions = (data) => {
    if (data?.subscription_status === "pending") {
      dispatch(
        setPaymentInfoRequest({
          payment: {
            payment_id: queryParameters.get("id"),
            status: queryParameters.get("status"),
            message: queryParameters.get("message"),
            order_id: data?.id,
            payment_type: "creditcard",
          },
        })
      );
    }
  };
  useEffect(() => {
    dispatch(getOrderRequest(actions));
  }, []);
  // useEffect(() => {
  //   if (order?.id) {

  //   }
  // }, [order]);

  return <SubscriptionConfirmTemplate />;
}

export default SubscriptionConfirmPage;
