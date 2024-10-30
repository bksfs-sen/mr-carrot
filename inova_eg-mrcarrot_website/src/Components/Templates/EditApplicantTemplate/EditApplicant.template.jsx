import ApplicantForm from "../../Organisms/Applicants/ApplicantForm/ApplicantForm";
import { withTranslation } from "react-i18next";

const EditApplicantTemplate = ({
  t,
  schools,
  applicantData,
  educationalLevels,
  healthIssues,
}) => {
  return (
    <main className="w-full -mt-4">
      <h1 className=" text-[30px] text-lightgrey font-[AraHamahBold] ">
        {t("applicantForm.Edit Applicant")}
      </h1>
      <ApplicantForm
        schools={schools}
        edit={true}
        applicantData={applicantData}
        educationalLevels={educationalLevels}
        healthIssues={healthIssues}
      />
    </main>
  );
};
export default withTranslation()(EditApplicantTemplate);
