import {
  getApplicantRequest,
  listEducationalLevelsRequest,
  listHealthIssuesRequest,
  listSchoolsNamesRequest,
} from "../../../Services/modules/applicants";
import { useDispatch, useSelector } from "react-redux";

import EditApplicantTemplate from "../../Templates/EditApplicantTemplate/EditApplicant.template";
import { useEffect } from "react";
import { useParams } from "react-router";

const EditApplicantPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const applicant = useSelector((state) => state?.applicant?.applicant);
  const educationalLevels = useSelector(
    (state) => state?.applicant?.educationalLevels
  );
  const healthIssues = useSelector((state) => state?.applicant?.healthIssues);
  const schools = useSelector((state) =>
    state?.applicant?.schools?.schools?.map((school) => {
      return { label: school.name, value: school.id };
    })
  );

  const submitEditForm = () => {};
  useEffect(() => {
    dispatch(listSchoolsNamesRequest());
    dispatch(getApplicantRequest(id));
    dispatch(listEducationalLevelsRequest());
    dispatch(listHealthIssuesRequest());
  }, []);
  return (
    <EditApplicantTemplate
      schools={schools}
      applicantData={applicant?.applicant}
      educationalLevels={educationalLevels?.education_levels}
      healthIssues={healthIssues?.medical_issues}
    />
  );
};

export default EditApplicantPage;
