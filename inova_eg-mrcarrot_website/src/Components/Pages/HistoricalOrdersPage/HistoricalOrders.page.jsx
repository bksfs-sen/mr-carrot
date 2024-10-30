import React, { useEffect } from "react";
import {
  addApplicantToOrderRequest,
  addOrderRequest,
  getHistoricalOrdersRequest,
} from "../../../Services/modules/orders";
import { useDispatch, useSelector } from "react-redux";

import HistoricalOrdersTemplate from "../../Templates/HistoricalOrdersTemplate/HistoricalOrders.template";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import weekday from "dayjs/plugin/weekday";

const HistoricalOrdersPage = () => {
  dayjs.extend(weekday);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    historicalOrders,
    load: { isLoading },
  } = useSelector((state) => state?.orders);
  const order = useSelector((state) => state.orders.order);

  const subscribeToPackage = async (id) => {
    await dispatch(addOrderRequest({ order: { package_id: id } }));
  };

  const addApplicantToOrder = async (applicant) => {
    const body = await {
      order_id: order?.id,
      applicant_id: applicant?.applicant_id,
      //start_date first sunday in current week
      start_date: dayjs().weekday(7).toDate(),
      num_of_months: applicant?.num_of_months,
    };

    await dispatch(
      addApplicantToOrderRequest({
        sub_order: body,
      })
    );
    toast.success("Applicant has been added to order.");
  };
  const Reorder = async (applicant) => {
    //add package to orderw
    await subscribeToPackage(applicant?.package_id);
    //add applicants in current historical order to new order
    await addApplicantToOrder(applicant);
    navigate("/cart/choose-applicants");
  };
  useEffect(() => {
    dispatch(getHistoricalOrdersRequest());
  }, []);
  return (
    <HistoricalOrdersTemplate
      historicalOrders={historicalOrders}
      isLoading={isLoading}
      Reorder={Reorder}
    />
  );
};

export default HistoricalOrdersPage;
