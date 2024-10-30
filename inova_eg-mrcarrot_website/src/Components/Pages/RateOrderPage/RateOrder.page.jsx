import { useLocation, useNavigate, useParams } from "react-router";

import RateOrderTemplate from "../../Templates/RateOrderTemplate/RateOrder.template";
import { rateOrderRequest } from "../../../Services/modules/historicalOrders";
import { useDispatch } from "react-redux";

const RateOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const rateOrder = async (description, rate) => {
    const body = {
      sub_order_id: id,
      description: description,
      rate: Number(rate),
    };
    await dispatch(rateOrderRequest({ review: body }));
    navigate("/profile/my-orders/history");
  };
  return <RateOrderTemplate rateOrder={rateOrder} />;
};

export default RateOrderPage;
