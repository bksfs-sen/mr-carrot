import ApplicantCard from "../../Molecules/Applicants/ApplicantCard/ApplicantCard";
import EmptyState from "../../Organisms/EmptyState.jsx/EmptyState";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../../Atoms/LoadingSpinner/LoadingSpinner";
import { withTranslation } from "react-i18next";

const ApplicantsTemplate = ({ t, applicants, deleteApplicant, isLoading }) => {
  return (
    <main className="w-full -mt-0 ">
      {isLoading ? (
        <LoadingSpinner spinnerStyle="h-full items-center" />
      ) : applicants?.length > 0 ? (
        <>
          <h1 className=" text-[30px] text-lightgrey font-[AraHamahBold]">
            {t("applicantsData.Applicants Data")}
          </h1>
          <div className="space-y-10">
            {applicants?.map((applicant) => (
              <ApplicantCard
                key={applicant?.id}
                id={applicant?.id}
                applicantName={applicant?.attributes?.name}
                schoolName={applicant?.attributes?.school_name}
                educationLevel={applicant?.attributes?.education_level}
                medicalIssues={applicant?.attributes?.medical_issues}
                medicalIssueDescripion={
                  applicant?.attributes?.medical_issue_description
                }
                address={applicant?.attributes?.address}
                deleteApplicant={deleteApplicant}
                t={t}
              />
            ))}
            <Link
              to="/profile/my-account/applicants/add-applicants"
              className="text-[#65A141] text-[30px] font-[AraHamahBold] mt-[40px]"
            >
              {t("applicantsData.Add Another Applicant")}
            </Link>
          </div>
        </>
      ) : (
        <EmptyState
          path="/profile/my-account/applicants/add-applicants"
          title={t("emptyState.applicant.title")}
          message={t("emptyState.applicant.description")}
          buttonName={t("emptyState.applicant.button")}
        />
      )}
    </main>
  );
};

export default withTranslation()(ApplicantsTemplate);
