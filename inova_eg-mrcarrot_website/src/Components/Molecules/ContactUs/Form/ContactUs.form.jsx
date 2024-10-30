import Button from "../../../Atoms/Buttons/Button";
import { ContactusSchema } from "./validation";
import React from "react";
import Textfield from "../../../Atoms/Textfields/Textfield";
import { contactusRequest } from "../../../../Services/modules/contact";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { withTranslation } from "react-i18next";
import UserShell from "../../../Atoms/Shells/UserShell";

const ContactUsForm = ({ t }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    validationSchema: ContactusSchema,
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    onSubmit: (values) => {
      dispatch(
        contactusRequest({
          contact: { ...values },
        })
      );
    },
  });
  // console.log(formik.errors);
  return (
    <UserShell className="px-6 py-[25px] mb-8 mt-[40px] md:mt-0 flex flex-col gap-5">
      <p className="text-lightgrey text-[46px] font-[AraHamahBold]">
        {t("contactUs.getInTouch")}
      </p>
      <Textfield
        placeholder={t("contactUs.firstName")}
        placeholderStyle={
          "placeholder:text-slate-400 placeholder:text-[22px] placeholder:font-[AraHamah1964] px-4 py-2  bg-white text-black"
        }
        height="h-[46px]"
        width="w-full"
        id="name"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <Textfield
        placeholder={t("contactUs.emailAddress")}
        placeholderStyle={
          "placeholder:text-slate-400 placeholder:text-[22px] placeholder:font-[AraHamah1964] px-4 py-2  bg-white text-black"
        }
        height="h-[46px]"
        width="w-full "
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <textarea
        className=" mt-1 rounded-md shadow-sm border-1 block w-full h-full  border-gray-300 pl-7 pr-12 pb-[2.5rem] pt-[0.5rem]
                 focus:outline-none focus:ring focus:ring-white sm:text-[22px]  text-black font-[AraHamah1964]"
        id="exampleFormControlTextarea1"
        rows="5"
        placeholder={t("contactUs.yourMessage")}
        name="message"
        value={formik.values.message}
        onChange={formik.handleChange}
        error={formik.touched.message && Boolean(formik.errors.message)}
      />
      <small className="text-red-700">
        {formik.touched.message && formik.errors.message}
      </small>
      <Button
        name={t("contactUs.send")}
        buttonNameStyle={
          "bg-lime-400 hover:bg-lime-700 text-white font-[AraHamahBold] text-[30px] w-[30%]"
        }
        onClick={formik.handleSubmit}
      />
    </UserShell>
  );
};

export default withTranslation()(ContactUsForm);
