import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  unconfirmed_mobile_number: Yup.string()
    .required("Required")
    .test(
      "len",
      "Phone number must be 9 digits, hint: Enter without +966",
      (val) => val?.length === 9
    )
    .matches(
      /^(?![+]?966).*/,
      "Enter a valid mobile number, hint: Enter without +966"
    )
    .matches(
      /^[0-9]*$/,
      "Enter a valid mobile number, hint: Must be numbers only."
    ),
  email: Yup.string().email("Invalid email").required("Required").trim(),
  password: Yup.string().required("Required"),
  password_conmfirmation: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});
