import { useDispatch, useSelector } from "react-redux";

import CartTemplate from "../../Templates/CartTemplate/Cart.template";
import { getOrderRequest } from "../../../Services/modules/orders";
import { listApplicantsRequest } from "../../../Services/modules/applicants";
import { useEffect } from "react";

const CartPage = () => {
  //GET ORDER REQUEST HERE BECAUSE THE PACKAGE IS SHOWN IN BOTH CHILDREN (choose applicants and add applicant)
  const order = useSelector((state) => state.orders.order);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderRequest());
  }, []);
  return <CartTemplate order={order} />;
};

export default CartPage;
