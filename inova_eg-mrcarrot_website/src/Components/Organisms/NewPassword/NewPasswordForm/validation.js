import * as Yup from "yup";

export const ChangePasswordSchema = Yup.object().shape({
  password: Yup.string().required("Required"),
  confirm_password: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});
