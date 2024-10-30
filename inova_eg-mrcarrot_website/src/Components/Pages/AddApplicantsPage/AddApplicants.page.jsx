import {
  listEducationalLevelsRequest,
  listHealthIssuesRequest,
  listSchoolsNamesRequest,
} from "../../../Services/modules/applicants";
import { useDispatch, useSelector } from "react-redux";

import AddApplicantsTemplate from "../../Templates/AddApplicantsTemplate/AddApplicants.template";
import { useEffect } from "react";

const AddApplicantsPage = () => {
  const dispatch = useDispatch();
  const schools = useSelector((state) =>
    state?.applicant?.schools?.schools?.map((school) => {
      return { label: school.name, value: school.id };
    })
  );
  const educationalLevels = useSelector(
    (state) => state?.applicant?.educationalLevels
  );
  const healthIssues = useSelector((state) => state?.applicant?.healthIssues);

  const submitForm = () => {};
  useEffect(() => {
    dispatch(listSchoolsNamesRequest());
    dispatch(listEducationalLevelsRequest());
    dispatch(listHealthIssuesRequest());
  }, []);
  return (
    <AddApplicantsTemplate
      schools={schools}
      educationalLevels={educationalLevels?.education_levels}
      healthIssues={healthIssues?.medical_issues}
    />
  );
};

export default AddApplicantsPage;
