import * as Yup from "yup";

export const AddApplicantSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  school: Yup.object().required("Required"),
  education_level: Yup.object().required("Required"),
  medical_issues: Yup.array().required("Required"),
  medical_issue_check: Yup.bool()
    .oneOf([true], "Must accept condition")
    .required("Required"),
  // health_issue_description: "",
  // home_address: Yup.object().shape({
  //   area: Yup.string().required("Required"),
  //   street_name: Yup.string().required("Required"),
  //   building_name: Yup.string().required("Required"),
  //   land_mark: Yup.string().required("Required"),
  // }),
  // school_address: Yup.object().shape({
  //   area: Yup.string().required("Required"),
  //   street_name: Yup.string().required("Required"),
  //   building_name: Yup.string().required("Required"),
  //   land_mark: Yup.string().required("Required"),
  // }),
});
