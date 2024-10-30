import {
  createApplicantVacationRequest,
  getOfficialVacationsRequest,
} from "../../../Services/modules/vacations";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import CurrentOrdersTemplate from "../../Templates/CurrentOrdersTemplate/CurrentOrders.template";
import { getCurrentOrdersRequest } from "../../../Services/modules/orders";
import { toast } from "react-toastify";
import { withTranslation } from "react-i18next";

const CurrentOrdersPage = ({ t }) => {
  const [officialVacationsDates, setOfficialVacationsDates] = useState([]);
  const dispatch = useDispatch();
  const currentOrders = useSelector((state) => state.orders.currentOrders);
  const officialVacations = useSelector(
    (state) => state.vacations.officialVacations
  );
  const { orders } = useSelector((state) => state);
  const addApplicantVacation = async (applicantVacations, id) => {
    const applicantVacationsFormatted = applicantVacations.map((vacation) => {
      return (
        vacation.getFullYear() +
        "-" +
        (vacation.getMonth() + 1) +
        "-" +
        vacation.getDate()
      );
    });
    const applicantVacationsString = applicantVacationsFormatted.join(",");
    const body = {
      vacancies: { sub_order_id: id, dates: applicantVacationsString },
    };
    await dispatch(createApplicantVacationRequest(body));
    toast.success(t("calendar.offDaySuccessMsg"));
  };
  useEffect(() => {
    const filteredDates = officialVacations?.map((vacation) => {
      return { date: new Date(vacation.date), name: vacation.name };
    });
    setOfficialVacationsDates(filteredDates);
  }, [officialVacations]);

  useEffect(() => {
    dispatch(getCurrentOrdersRequest());
    dispatch(getOfficialVacationsRequest());
  }, []);

  return (
    <CurrentOrdersTemplate
      isLoading={orders.load.isLoading}
      currentOrders={currentOrders}
      officialVacations={officialVacationsDates}
      addApplicantVacation={addApplicantVacation}
    />
  );
};

export default withTranslation()(CurrentOrdersPage);
