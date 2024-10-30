import ApplicantForm from "../../Organisms/Applicants/ApplicantForm/ApplicantForm";
import { withTranslation } from "react-i18next";

const AddApplicantsTemplate = ({
  t,
  schools,
  educationalLevels,
  healthIssues,
}) => {
  return (
    <main className="w-full -mt-4">
      <h1 className=" text-[30px] text-lightgrey font-[AraHamahBold] !mt-[5px]">
        {t("applicantForm.Add Applicant")}
      </h1>
      <ApplicantForm
        schools={schools}
        educationalLevels={educationalLevels}
        healthIssues={healthIssues}
      />
    </main>
  );
};

export default withTranslation()(AddApplicantsTemplate);
