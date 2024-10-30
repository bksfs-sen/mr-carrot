import * as Yup from "yup";

export const ForgetPasswordSchema = Yup.object().shape({
  mobile_number: Yup.string()
    .required("Required")
    .matches(/^(?![+]?966).*/, "Enter a valid mobile number"),
});
