import { useDispatch, useSelector } from "react-redux";

import ChooseApplicantsTemplate from "../../Templates/ChooseApplicantsTemplate/ChooseApplicants.template";
import { getOrderRequest } from "../../../Services/modules/orders";
import { listApplicantsRequest } from "../../../Services/modules/applicants";
import { useEffect } from "react";

const ChooseApplicantsPage = ({}) => {
  const dispatch = useDispatch();
  const applicants = useSelector((state) => state.applicant.applicants);
  const order = useSelector((state) => state.orders.order);
  const { isLoading } = useSelector((state) => state.applicant.load);

  useEffect(() => {
    dispatch(listApplicantsRequest());
  }, []);
  return (
    <ChooseApplicantsTemplate
      applicants={applicants?.applicants}
      order={order}
    />
  );
};

export default ChooseApplicantsPage;
