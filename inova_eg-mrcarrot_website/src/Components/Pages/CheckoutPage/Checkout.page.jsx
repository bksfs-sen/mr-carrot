import {
  checkoutRequest,
  getOrderRequest,
} from "../../../Services/modules/orders";
import { useDispatch, useSelector } from "react-redux";

import CheckoutTemplate from "../../Templates/CheckoutTemplate/Checkout.template";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { LoadingSpinner } from "../../Atoms/LoadingSpinner/LoadingSpinner";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const order = useSelector((state) => state.orders.order);
  const { load } = useSelector((state) => state.orders);
  const placeOrder = async (id) => {
    await dispatch(checkoutRequest(id));
    navigate("/sub-successful");
  };

  useEffect(() => {
    dispatch(getOrderRequest());
  }, []);
  return (
    <>
      {load.isLoading ? (
        <LoadingSpinner spinnerStyle="h-[100vh] items-center" />
      ) : (
        <CheckoutTemplate placeOrder={placeOrder} order={order} />
      )}
    </>
  );
};

export default CheckoutPage;
