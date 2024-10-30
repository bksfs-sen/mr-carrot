import { useNavigate } from "react-router";
import { useFormik } from "formik";
import { withTranslation } from "react-i18next";
import { EditAccountSchema } from "./validation";
import Textfield from "../../../Atoms/Textfields/Textfield";
import Button from "../../../Atoms/Buttons/Button";
import UserShell from "../../../Atoms/Shells/UserShell";
import { useDispatch } from "react-redux";
import { editUserRequest } from "../../../../Services/modules/user";
import { useEffect, useRef, useState } from "react";
import flag from "../../../../Assets/Icons/flag.svg";
import { toast } from "react-toastify";
import { Checkverify } from "../../../../Services/utils/checkPhone";

const AccountForm = ({ t, user, edit }) => {
  const ref = useRef();
  localStorage.setItem(
    "UNCONFIRMED_MOBILE_NUMBER",
    user?.unconfirmed_mobile_number
  );
  const [disabled, setDisabled] = useState(true);
  const id = localStorage.getItem("USER_ID");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      mobile_number: user?.mobile_number,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      values = {
        ...values,
        unconfirmed_mobile_number: values.unconfirmed_mobile_number.replaceAll(
          " ",
          ""
        ),
      };
      let formData = {};
      // if mobile number changes then update
      if (user?.mobile_number !== values?.mobile_number.trim()) {
        formData = {
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          unconfirmed_mobile_number: "+966"
            .concat(values?.mobile_number)
            .trim(),
        };
      } else {
        formData = {
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
        };
      }
      const action = () => {
        if (
          user?.unconfirmed_mobile_number !== "" &&
          user?.mobile_number !== values?.mobile_number.trim()
        ) {
          Checkverify(
            "+966".concat(values.mobile_number),
            navigate,
            ref.current.id
          );
        } else {
          //if we did not change mobile number, no need to verify
          toast.success("Account data has been updated successfully");
          navigate("/profile/my-account/account-setting");
        }
      };
      await dispatch(editUserRequest(formData, id, action));
    },
    validationSchema: EditAccountSchema,
  });
  const { values, touched, errors, handleChange, handleSubmit, handleBlur } =
    formik;
  const handleDisable = () => {
    if (
      user?.mobile_number !== values?.mobile_number ||
      user?.first_name !== values?.first_name ||
      user?.last_name !== values?.last_name ||
      user?.email !== values?.email
    ) {
      setDisabled(false);
    }
  };
  useEffect(() => handleDisable(), [values]);
  return (
    <form onSubmit={handleSubmit}>
      <div id="test" ref={ref}></div>
      <UserShell className="p-8 space-y-4">
        <div className="flex gap-4 flex-wrap md:flex-nowrap">
          <div className="w-full md:w-[50%]">
            <label className="text-slate-500 text-2xl">
              {t("preRegister.firstName")}
            </label>
            <Textfield
              placeholder={t("preRegister.firstName")}
              placeholderStyle={
                "placeholder:text-slate-400 placeholder:text-[22px] placeholder:font-[AraHamah1964] pl-3 rtl:pr-3 py-2   bg-white text-black"
              }
              height="h-[46px]"
              width="w-full"
              name="first_name"
              value={values.first_name}
              onChange={handleChange}
              error={touched.first_name && errors.first_name}
              helperText={touched.first_name && errors.first_name}
              onBlur={handleBlur}
            />
          </div>
          <div className="w-full md:w-[50%]">
            <label className="text-slate-500 text-2xl">
              {t("preRegister.lastName")}
            </label>
            <Textfield
              placeholder={t("preRegister.lastName")}
              placeholderStyle={
                "placeholder:text-slate-400 placeholder:text-[22px] placeholder:font-[AraHamah1964] pl-3 rtl:pr-3 py-2   bg-white text-black"
              }
              height="h-[46px]"
              width="w-full"
              name="last_name"
              value={values.last_name}
              onChange={handleChange}
              error={touched.last_name && errors.last_name}
              helperText={touched.last_name && errors.last_name}
              onBlur={handleBlur}
            />
          </div>
        </div>
        <div>
          <label className="text-slate-500 text-2xl">
            {t("my-account.email")}
          </label>
          <Textfield
            placeholder={t("my-account.email")}
            placeholderStyle={
              "placeholder:text-slate-400 placeholder:text-[22px] placeholder:font-[AraHamah1964]  pl-3 rtl:pr-3 py-2  bg-white text-black"
            }
            height="h-[46px]"
            width="w-full "
            name="email"
            value={values.email}
            onChange={handleChange}
            error={touched.email && errors.email}
            onBlur={handleBlur}
            helperText={touched.email && errors.email}
          />
        </div>
        <div className=" relative">
          <label className="text-slate-500 text-2xl ">
            {t("my-account.mobileNumber")}
          </label>
          <Textfield
            placeholder={t("my-account.mobileNumber")}
            placeholderStyle={
              "placeholder:text-slate-400 placeholder:text-[22px] placeholder:font-[AraHamah1964] ltr:pl-[135px] rtl:pr-[135px] rtl:pr-3 py-2  bg-white text-black"
            }
            height="h-[46px]"
            width="w-full "
            name="mobile_number"
            value={values.mobile_number}
            error={touched.mobile_number && errors.mobile_number}
            helperText={touched.mobile_number && errors.mobile_number}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className="top-[42px]  ltr:left-[16px] rtl:right-[16px] rtl:left-auto  absolute flex gap-[16px]">
            <img src={flag} />
            <p className="text-[22px] font-[AraHamah1964]">(+966)</p>
          </div>
        </div>
      </UserShell>
      <div className="flex justify-center my-[3.2rem] space-x-4 rtl:space-x-reverse">
        <Button
          name={t("applicantForm.Back")}
          buttonNameStyle={
            "bg-white  border-2 border-lime-400 text-lime-400 font-[AraHamahBold] text-[30px] !w-[177px]"
          }
          type="button"
          onClick={() => navigate(-1)}
        />
        <Button
          disabled={disabled}
          name={t("applicantForm.Save")}
          buttonNameStyle={
            "bg-lime-400 hover:bg-lime-700 text-white font-[AraHamahBold] text-[30px] !w-[177px]"
          }
          type="submit"
        />
      </div>
    </form>
  );
};

export default withTranslation()(AccountForm);
