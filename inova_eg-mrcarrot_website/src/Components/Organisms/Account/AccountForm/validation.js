import * as Yup from "yup";

export const EditAccountSchema = Yup.object().shape({
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email"),
  mobile_number: Yup.string()
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
});
