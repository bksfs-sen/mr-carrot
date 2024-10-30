import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import Button from "../../../Atoms/Buttons/Button";
import Textfield from "../../../Atoms/Textfields/Textfield";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { preRegisterRequest } from "../../../../Services/modules/auth";

const PreRegister = ({ t }) => {
  const [display, setDisplay] = useState(true);
  const dispatch = useDispatch();
  const formik = useFormik({
    // validationSchema: PreRegisterSchema,
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
    },
    onSubmit: (values) => {
      dispatch(
        preRegisterRequest({
          pre_registered_user: { ...values },
        })
      );
      setTimeout(() => {
        setDisplay(false);
      }, 1000);
    },
  });
  return (
    <div style={{ display: display ? "block" : "none" }}>
      <h1 className="text-center text-[50px] font-[AraHamahBold] text-lightgrey">
        {t("home.joinUsNow")}
      </h1>
      <form onSubmit={formik.handleSubmit}>
        <section className="flex flex-col rounded-[25px] border-4 border-orange mt-[40px] mb-[120px] p-16  gap-6">
          <div className="w-[100%] flex flex-row gap-4 grow">
            <Textfield
              margin="w-[50%]"
              placeholder={t("preRegister.firstName")}
              placeholderStyle={
                "placeholder:text-slate-400 placeholder:text-[22px] placeholder:font-[AraHamah1964] px-4 py-2  bg-white text-black "
              }
              name="first_name"
              height="h-[46px]"
              width="w-full"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              error={
                formik.touched.first_name && Boolean(formik.errors.first_name)
              }
              helperText={formik.touched.first_name && formik.errors.first_name}
            />
            <Textfield
              margin="w-[50%]"
              placeholder={t("preRegister.lastName")}
              placeholderStyle={
                "placeholder:text-slate-400 placeholder:text-[22px] placeholder:font-[AraHamah1964] px-4 py-2  bg-white text-black"
              }
              height="h-[46px]"
              width="w-full "
              name="last_name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              error={
                formik.touched.last_name && Boolean(formik.errors.last_name)
              }
              helperText={formik.touched.last_name && formik.errors.last_name}
            />
          </div>
          <Textfield
            placeholder={t("preRegister.emailAddress")}
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
          <Textfield
            placeholder={t("preRegister.mobileNumber")}
            placeholderStyle={
              "placeholder:text-slate-400 placeholder:text-[22px] placeholder:font-[AraHamah1964] px-4 py-2  bg-white text-black"
            }
            height="h-[46px]"
            width="w-full "
            name="phone_number"
            value={formik.values.phone_number}
            onChange={formik.handleChange}
            error={
              formik.touched.phone_number && Boolean(formik.errors.phone_number)
            }
            helperText={
              formik.touched.phone_number && formik.errors.phone_number
            }
          />
          <Button
            name={t("preRegister.preRegister")}
            buttonNameStyle={
              "bg-lime-400 hover:bg-lime-700 text-white font-[AraHamahBold] text-[30px] w-[100%]"
            }
          />
        </section>
      </form>
    </div>
  );
};

export default withTranslation()(PreRegister);
