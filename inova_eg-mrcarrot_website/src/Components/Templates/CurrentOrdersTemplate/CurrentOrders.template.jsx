import { withTranslation } from "react-i18next";
import { LoadingSpinner } from "../../Atoms/LoadingSpinner/LoadingSpinner";
import DateCalendar from "../../Organisms/Common/Calendar";
import EmptyState from "../../Organisms/EmptyState.jsx/EmptyState";
import UserShell from "../../Atoms/Shells/UserShell";

const CurrentOrderCard = ({
  packageName,
  applicantName,
  officialVacations,
  currentNumberOfMonths,
  currentStartDate,
  currentApplicantVacations,
  addApplicantVacation,
  subOrderId,
  t,
}) => {
  return (
    <UserShell className="px-6 py-[25px] mt-[30px] md:mt-0 text-lightgrey mb-8">
      <h1 className="text-[36px]">{packageName}</h1>
      <div className="flex  mb-8 text-[30px] space-x-8 rtl:space-x-reverse">
        <h1 className="font-[AraHamahBold]">
          {" "}
          {t("applicantForm.Applicant name")}{" "}
        </h1>
        <h1>{applicantName}</h1>
      </div>
      <div className="bg-white">
        <DateCalendar
          officialVacations={officialVacations}
          currentNumberOfMonths={currentNumberOfMonths}
          currentStartDate={new Date(currentStartDate)}
          currentApplicantVacations={currentApplicantVacations}
          addApplicantVacation={addApplicantVacation}
          subOrderId={subOrderId}
          title={t("calendar.currentOrdersTitle")}
          disableOnChange={true}
        />
      </div>
    </UserShell>
  );
};

const CurrentOrdersTemplate = ({
  currentOrders,
  officialVacations,
  addApplicantVacation,
  isLoading,
  t,
}) => {
  return (
    <main className="w-full">
      {isLoading ? (
        <LoadingSpinner spinnerStyle="h-full items-center" />
      ) : currentOrders?.length > 0 ? (
        currentOrders?.map((order) => (
          <CurrentOrderCard
            key={order?.id}
            packageName={order?.package_name}
            applicantName={order?.applicant_name}
            currentNumberOfMonths={order?.num_of_months}
            currentStartDate={order?.start_date}
            currentApplicantVacations={order?.vacancies}
            subOrderId={order?.id}
            officialVacations={officialVacations}
            addApplicantVacation={addApplicantVacation}
            t={t}
          />
        ))
      ) : (
        <EmptyState
          path="/"
          title={t("emptyState.currentorders.title")}
          message={t("emptyState.currentorders.description")}
          buttonName={t("emptyState.currentorders.button")}
        />
      )}
    </main>
  );
};

export default withTranslation()(CurrentOrdersTemplate);
