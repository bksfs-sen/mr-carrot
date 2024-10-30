import { CalendarIcon, CalenderIcon } from "../../../utils/IconsSrc";
import {
  addApplicantToOrderRequest,
  removeApplicantFromOrderRequest,
  updateApplicantInOrderRequest,
} from "../../../Services/modules/orders";

import DateCalendar from "../../Organisms/Common/Calendar";
import Modal from "../../Organisms/Common/Modal";
import { NavLink } from "react-router-dom";
import Textfield from "../../Atoms/Textfields/Textfield";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { withTranslation } from "react-i18next";
import EmptyState from "../../Organisms/EmptyState.jsx/EmptyState";
import { LoadingSpinner } from "../../Atoms/LoadingSpinner/LoadingSpinner";

const ChooseApplicantsTemplate = ({ applicants, order, t }) => {
  const [selectedApplicants, setSelectedApplicants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [officialVacationsDates, setOfficialVacationsDates] = useState([]);
  const orderLoading = useSelector((state) => state);
  // console.log(orderLoading.orders?.load.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    const filteredDates = order?.official_vacations.map((vacation) => {
      return { date: new Date(vacation.date), name: vacation.name };
    });
    setOfficialVacationsDates(filteredDates);
  }, [order]);
  useEffect(() => {
    const applicantsInOrder = order?.sub_orders.map(
      (applicant) => applicant?.applicant_id
    );
    setSelectedApplicants(applicantsInOrder);
  }, [order]);

  const isApplicantSelected = (id) => {
    return selectedApplicants?.includes(Number(id));
  };
  const isApplicantInSubOrder = (applicant) => {
    const subOrder = order?.sub_orders.find(
      (subOrder) => subOrder?.applicant_id == applicant?.id
    );

    if (subOrder) {
      return true;
    } else {
      return false;
    }
  };
  const selectUnSelectApplicant = async (applicant) => {
    if (isApplicantSelected(applicant?.id)) {
      // remove from backend

      const subOrder = order?.sub_orders.find(
        (subOrder) => subOrder?.applicant_id == applicant?.id
      );

      if (subOrder) {
        await dispatch(removeApplicantFromOrderRequest(subOrder?.id));
        toast.success("Applicant has been successfully removed from cart.");
      } else {
        const filteredSelectedApplicants = selectedApplicants.filter(
          (id) => applicant?.id != id
        );

        setSelectedApplicants(filteredSelectedApplicants);
      }
    } else {
      //add to front end list (not confirmed in backend until the user enters start date and number of months)
      setSelectedApplicants([...selectedApplicants, Number(applicant?.id)]);
    }
  };
  const addApplicantToOrder = async (startingDate, monthsNumber) => {
    const body = await {
      order_id: order?.id,
      applicant_id: selectedApplicant?.id,
      start_date: startingDate,
      num_of_months: monthsNumber,
    };
    if (startingDate.getDay() !== 0) {
      toast.error("Please pick sunday as starting date.");
    } else {
      await dispatch(
        addApplicantToOrderRequest({
          sub_order: body,
        })
      );
      toast.success("Applicant has been added to order.");
      setShowModal(!showModal);
    }
  };

  const updateApplicantInOrder = async (
    startingDate,
    monthsNumber,
    applicant
  ) => {
    const subOrder = await order?.sub_orders.find(
      (subOrder) => subOrder?.applicant_id == applicant?.id
    );

    const body = await {
      order_id: order?.id,
      sub_order_id: subOrder?.id,
      start_date: startingDate,
      num_of_months: monthsNumber,
    };
    if (startingDate.getDay() !== 0) {
      toast.error("Please pick sunday as starting date.");
    } else {
      await dispatch(
        updateApplicantInOrderRequest({
          sub_order: body,
        })
      );
      toast.success("Applicant has been successfully updated in order.");
      setShowModal(!showModal);
    }
  };

  const getStartDate = (applicant) => {
    const result = order?.sub_orders?.find(
      (subOrder) => subOrder?.applicant_id === Number(applicant?.id)
    );
    const date = new Date(result?.start_date);
    if (result?.start_date)
      return (
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
      );
    else return null;
  };

  const getNoMonths = (applicant) => {
    const result = order?.sub_orders?.find(
      (subOrder) => subOrder?.applicant_id === Number(applicant?.id)
    );

    return result?.num_of_months;
  };

  return (
    <div className="text-lightgrey max-w-md w-full m-auto ">
      {orderLoading.orders?.load.isLoading ? (
        <LoadingSpinner spinnerStyle="h-[400px] items-center " />
      ) : !order ? (
        <EmptyState
          path="/"
          title={t("emptyState.package.title")}
          message={t("emptyState.package.description")}
          buttonName={t("emptyState.package.button")}
        />
      ) : (
        <>
          <Modal
            showModal={showModal}
            setShowModal={() => setShowModal(!showModal)}
          >
            <DateCalendar
              updateApplicantInOrder={updateApplicantInOrder}
              isApplicantInSubOrder={isApplicantInSubOrder}
              addApplicantToOrder={addApplicantToOrder}
              officialVacations={officialVacationsDates}
              selectedApplicant={selectedApplicant}
              title={t("calendar.cartTitle")}
              disableOnChange={false}
              orderId={order?.id}
            />
          </Modal>
          {applicants?.length > 0 && (
            <h1 className="font-[AraHamahBold] text-[36px]">
              {" "}
              {t("packages.chooseApplicant")}{" "}
            </h1>
          )}

          {applicants?.length > 0 ? (
            applicants?.map((applicant) => {
              return (
                <div className="mb-5" key={applicant?.id}>
                  <div className="flex space-x-3 rtl:space-x-reverse">
                    <input
                      className="accent-[#FEF3E9] "
                      type="checkbox"
                      checked={isApplicantSelected(applicant?.id)}
                      onChange={() => selectUnSelectApplicant(applicant)}
                    />
                    <p className="text-[30px]">{applicant?.attributes?.name}</p>
                  </div>
                  {isApplicantSelected(applicant?.id) && (
                    <div
                      className="ml-6 rtl:mr-6 cursor-pointer"
                      onClick={() => {
                        setSelectedApplicant(applicant);
                        setShowModal(!showModal);
                      }}
                    >
                      <div className="flex my-6">
                        <p className="text-[30px] w-1/2">
                          {" "}
                          {t("order.startDate")}{" "}
                        </p>
                        <div className="bg-white rounded-md px-2 py-2 border-gray-200 border-2 w-full text-[24px] flex justify-between">
                          <p>
                            {getStartDate(applicant)
                              ? getStartDate(applicant)
                              : ""}
                          </p>
                          <CalenderIcon className="my-2 mx-2 " />
                        </div>
                      </div>
                      <div className="flex">
                        <p className="text-[30px] w-1/2">
                          {" "}
                          {t("calendar.noMonths")}{" "}
                        </p>
                        <div className="bg-white rounded-md px-2 py-2 border-gray-200 border-2 w-full text-[24px]">
                          <p>
                            {getNoMonths(applicant)
                              ? getNoMonths(applicant)
                              : ""}
                          </p>
                        </div>
                      </div>
                      {/* <Textfield
                  placeholderStyle={
                    "placeholder:text-slate-400 placeholder:text-[22px] placeholder:font-[AraHamah1964] px-4 py-2  bg-white text-black"
                  }
                  height="h-[46px]"
                  width="w-full "
                  name="name"
                  type={"date"}
                  value={() => getStartDate(applicant)?.start_date}
                  onChange={() => getStartDate(applicant)}
                  onClick={() => {
                    setSelectedApplicant(applicant);
                    setShowModal(!showModal);
                  }}
                />
                <Textfield
                  placeholderStyle={
                    "placeholder:text-slate-400 placeholder:text-[22px] placeholder:font-[AraHamah1964] px-4 py-2  bg-white text-black"
                  }
                  height="h-[46px]"
                  width="w-full "
                  name="name"
                /> */}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <EmptyState
              path="/cart/add-applicant"
              title={t("emptyState.applicant.title")}
              message={t("emptyState.applicant.description")}
              buttonName={t("emptyState.applicant.button")}
            />
          )}
          {applicants?.length > 0 && (
            <NavLink
              to="/cart/add-applicant"
              className={"text-[30px] font-bold"}
            >
              {t("applicantForm.addNewApplicant")}
            </NavLink>
          )}
        </>
      )}
    </div>
  );
};

export default withTranslation()(ChooseApplicantsTemplate);
