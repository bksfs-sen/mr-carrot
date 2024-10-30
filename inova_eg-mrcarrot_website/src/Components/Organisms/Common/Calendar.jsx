import { CalendarLeftArrow, CalendarRightArrow } from "../../../utils/IconsSrc";

import Button from "../../Atoms/Buttons/Button";
import { Calendar } from "react-calendar";
import Textfield from "../../Atoms/Textfields/Textfield";
import classNames from "classnames";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useState } from "react";
import { withTranslation } from "react-i18next";

const DateCalendar = ({
  t,
  officialVacations,
  // orderId,
  title,
  selectedApplicant,
  addApplicantToOrder,
  isApplicantInSubOrder,
  updateApplicantInOrder,
  currentStartDate,
  currentNumberOfMonths,
  disableOnChange,
  currentApplicantVacations,
  addApplicantVacation,
  subOrderId,
}) => {
  const [startingDate, setStartingDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [monthsNumber, setMonthsNumber] = useState(0);
  const [applicantVacations, setApplicantVacations] = useState([]);
  const [locale, setLocale] = useState("US-en");
  const [applicantVacationsCount, setApplicantVacationsCount] = useState(currentApplicantVacations?.length);
  const [applicantVacationsProcess, setApplicantVacationsProcess] = useState('increase');
  // const dispatch = useDispatch();

  console.log('currentApplicantVacations', currentApplicantVacations);

  const isDateApplicantVacation = (date) => {
    const result = applicantVacations?.find(
      (vacationDate) =>
        vacationDate.getMonth() === date.getMonth() &&
        date.getDate() === vacationDate.getDate() &&
        vacationDate.getFullYear() === date.getFullYear()
    );

    if (result) {
      return true;
    } else {
      return false;
    }
  };
  const isDateVacation = (date) => {
    const result = officialVacations?.find(
      (vacationDate) =>
        vacationDate.date.getMonth() === date.getMonth() &&
        date.getDate() === vacationDate.date.getDate() &&
        date.getFullYear() === vacationDate.date.getFullYear()
    );
    if (result) {
      return true;
    } else {
      return false;
    }
  };
  const getVacationName = (date) => {
    const result = officialVacations?.find(
      (vacationDate) =>
        vacationDate.date.getMonth() === date.getMonth() &&
        date.getDate() === vacationDate.date.getDate() &&
        date.getFullYear() === vacationDate.date.getFullYear()
    );
    return result.name;
  };

  useEffect(() => {
    if (currentApplicantVacations) {
      const result = currentApplicantVacations?.map((vacation) => {
        return new Date(vacation?.date);
      });
      setApplicantVacations(result);
    }
  }, [currentApplicantVacations]);

  useEffect(() => {
    if (currentStartDate && currentNumberOfMonths) {
      // setStartingDate(currentStartDate);
      setMonthsNumber(currentNumberOfMonths);
    }
  }, [currentStartDate, currentNumberOfMonths]);

  useEffect(() => {
    // setEndDate(
    //   new Date(
    //     endDate.setMonth(startingDate.getMonth() + Math.abs(monthsNumber))
    //   )
    // );
    let preEndDate = new Date(endDate.setMonth(startingDate.getMonth() + Math.abs(monthsNumber)));
    // setEndDate(new Date(preEndDate.setDate(preEndDate.getDate() + Math.abs(applicantVacationsCount -1))));
    // ? setEndDate(new Date(preEndDate.setDate(preEndDate.getDate() + Math.abs(applicantVacationsCount -1))))
    console.log('applicantVacationsCountProcess', applicantVacationsCount, applicantVacationsProcess);
    applicantVacationsProcess === 'increase' 
    ? setEndDate(new Date(preEndDate.setDate(preEndDate.getDate() + applicantVacationsCount-1)))
    : setEndDate(new Date(preEndDate.setDate(preEndDate.getDate() - applicantVacationsCount-1)));

    // console.log('finishDate-u', new Date(preEndDate.setDate(preEndDate.getDate() + Math.abs(applicantVacationsCount))))
  }, [monthsNumber, applicantVacationsCount]);
  // }, [monthsNumber, applicantVacationsCount, applicantVacationsProcess]);

  useEffect(() => {
    if (localStorage.getItem("language") === "ar") {
      setLocale("AR-ar");
    } else {
      setLocale("US-en");
    }
  }, []);
  // const submitApplicantToOrder = () => {
  //   const body = {
  //     order_id: orderId,
  //     applicant_id: selectedApplicant?.id,
  //     start_date: startingDate,
  //     num_of_months: monthsNumber,
  //   };
  //   dispatch(
  //     addApplicantToOrderRequest({
  //       sub_order: body,
  //     })
  //   );
  // };

  console.log('finishDate-r', dayjs(endDate));

  return (
    <div
      // /style={{ direction: "ltr" }}
      className="font-[Arahamah1964]  h-full w-full py-4 sm:px-4 "
    >
      <p
        className="relative sm:top-11 text-[32px] text-lightgrey  rtl:w-full ltr:w-fit px-4 sm:px-0 "
        style={{ direction: "ltr" }}
      >
        {title}
      </p>
      <Calendar
        locale={locale}
        calendarType={"Arabic"}
        //rtl:rotate-180
        nextLabel={<CalendarRightArrow className="mx-4 rtl:rotate-180" />}
        prevLabel={<CalendarLeftArrow className="mx-4  rtl:rotate-180" />}
        className={"text-center text-[20px] text-lightgrey mb-8 w-full"}
        tileClassName={({ activeStartDate, date, view }) => {
          const currentDate = dayjs(date);
          const startDate = dayjs(startingDate);
          const finishDate = dayjs(endDate);

          return classNames("border-[1px] text-[24px] h-[78px]", {
            "bg-white text-[30px]": isDateApplicantVacation(date),
            "bg-[#FEF3E9]":
              view === "month" &&
              currentDate.isAfter(startDate) &&
              currentDate.isBefore(finishDate) &&
              !(date.getDay() === 5 || date.getDay() === 6) &&
              !isDateApplicantVacation(date),
            "bg-orange text-white border-[1px] text-[24px] h-[78px]":
              view === "month" &&
              date.getDate() === startingDate.getDate() &&
              date.getMonth() === startingDate.getMonth(),
          });
        }}
        prev2Label={null}
        next2Label={null}
        onClickDay={
          disableOnChange
            ? (value, event) => {
              let applicantVacationsCountSwap = applicantVacationsCount;
                if (isDateApplicantVacation(value)) {
                  const newApplicantVacations = applicantVacations.filter(
                    (vacation) => vacation.getDate() !== value.getDate()
                  );
                  setApplicantVacations(newApplicantVacations);
                  // setApplicantVacationsCount(applicantVacationsCount - 1);
                  setApplicantVacationsProcess('decrease');
                  --applicantVacationsCountSwap;
                  console.log('dayOff off');
                } else {
                  setApplicantVacations([...applicantVacations, value]);
                  // setApplicantVacationsCount(applicantVacationsCount + 1);
                  setApplicantVacationsProcess('increase');
                  ++applicantVacationsCountSwap;
                  console.log('dayOff on');
                }
              // console.log('applicantVacationsCountSwap', applicantVacationsCountSwap)  ;
              setApplicantVacationsCount(applicantVacationsCountSwap)  ;

                // console.log("Clicked day: ", value);
              }
            : undefined
        }
        tileContent={({ date, view }) =>
          view === "month" && (date.getDay() === 5 || date.getDay() === 6) ? (
            <div className="flex justify-center">
              <p className="bg-[#65A141]/25 px-2 sm:text-[20px] text-[14px] ">
                {t("calendar.weekend")}
              </p>
            </div>
          ) : isDateVacation(date) && view === "month" ? (
            <div className="flex justify-center">
              <p className="bg-[#65A141]/25 px-2 sm:text-[20px] text-[14px]">
                {getVacationName(date)}
              </p>
            </div>
          ) : isDateApplicantVacation(date) ? (
            <div className="flex justify-center">
              <p className="bg-[#65A141]/25 px-2 sm:text-[20px] text-[14px]">
                {t("calendar.offDay")}
              </p>
            </div>
          ) : (
            <div className="mt-14 "></div>
          )
        }
        onChange={disableOnChange ? undefined : setStartingDate}
        value={startingDate}
      />

      {/* <p className="text-center">
        <span className="bold">Selected Date:</span>{" "}
        {startingDate.toDateString()}
      </p> */}
      <div className="sm:flex justify-between px-4 sm:px-0 flex-wrap">
        <div className="flex  rtl:flex-row-reverse space-x-4 items-center mb-3 xl:mb-0">
          <p className=" text-lightgrey text-[24px]">
            {t("calendar.noMonths")}
          </p>
          <Textfield
            readOnly={disableOnChange ? true : false}
            placeholderStyle={
              "placeholder:text-slate-400 placeholder:text-[24px] placeholder:font-[AraHamah1964]  bg-white text-black "
            }
            value={monthsNumber}
            onChange={(e) => setMonthsNumber(e.target.value)}
          />
        </div>

        {disableOnChange ? (
          <Button
            name={t("applicantForm.Save")}
            width="flex justify-end grow"
            buttonNameStyle={
              "bg-lime-600 hover:bg-lime-600 text-white font-[AraHamahBold] text-[30px] xl:w-full !w-[177px] sm:mt-0 mt-4"
            }
            onClick={() => {
              addApplicantVacation(applicantVacations, subOrderId);
            }}
          />
        ) : (
          <Button
            name={t("general.submit")}
            width="flex justify-center"
            buttonNameStyle={
              "bg-lime-600 hover:bg-lime-600 text-white font-[AraHamahBold] text-[30px] w-full sm:mt-0 mt-8 !w-[177px] "
            }
            onClick={() => {
              if (!isApplicantInSubOrder(selectedApplicant)) {
                addApplicantToOrder(startingDate, monthsNumber);
              } else {
                updateApplicantInOrder(
                  startingDate,
                  monthsNumber,
                  selectedApplicant
                );
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default withTranslation()(DateCalendar);
