import * as Yup from "yup";

export const ContactusSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required").trim(),
  message: Yup.string().required("Required"),
});
