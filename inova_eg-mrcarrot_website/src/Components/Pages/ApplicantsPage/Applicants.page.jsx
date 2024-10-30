import {
  deleteApplicantRequest,
  listApplicantsRequest,
} from "../../../Services/modules/applicants";
import { useDispatch, useSelector } from "react-redux";

import ApplicantsTemplate from "../../Templates/ApplicantsTemplate/Applicants.template";
import { useEffect } from "react";

const ApplicantsPage = () => {
  const dispatch = useDispatch();
  const applicants = useSelector((state) => state.applicant.applicants);
  const { isLoading } = useSelector((state) => state.applicant.load);
  const deleteApplicant = async (id) => {
    await dispatch(deleteApplicantRequest(id));
    dispatch(listApplicantsRequest());
  };
  useEffect(() => {
    dispatch(listApplicantsRequest());
  }, []);

  return (
    <ApplicantsTemplate
      applicants={applicants?.applicants}
      deleteApplicant={deleteApplicant}
      isLoading={isLoading}
    />
  );
};

export default ApplicantsPage;
