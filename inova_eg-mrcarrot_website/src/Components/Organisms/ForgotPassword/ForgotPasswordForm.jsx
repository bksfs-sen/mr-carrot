import { useDispatch, useSelector } from "react-redux";
import flag from "../../../Assets/Icons/flag.svg";
import { ForgetPasswordSchema } from "./validation";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { withTranslation } from "react-i18next";
import { useRef } from "react";
import { getUserExistanceRequest } from "../../../Services/modules/auth";
import { Checkverify } from "../../../Services/utils/checkPhone";
import Textfield from "../../Atoms/Textfields/Textfield";
import { LoadingSpinner } from "../../Atoms/LoadingSpinner/LoadingSpinner";
import Button from "../../Atoms/Buttons/Button";
const ForgotPasswordForm = ({ t }) => {
  const ref = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth.load);

  const formik = useFormik({
    initialValues: {
      mobile_number: "",
    },
    validationSchema: ForgetPasswordSchema,
    onSubmit: (values) => {
      values = {
        ...values,
        unconfirmed_mobile_number: values.unconfirmed_mobile_number.replaceAll(
          " ",
          ""
        ),
      };
      localStorage.setItem(
        "UNCONFIRMED_MOBILE_NUMBER",
        "+966".concat(values.mobile_number).trim()
      );
      const actions = () => {
        Checkverify(
          "+966".concat(values.mobile_number),
          navigate,
          ref.current.id,
          true
        );
      };
      dispatch(
        getUserExistanceRequest(
          "+966".concat(values.mobile_number).trim(),
          actions
        )
      );
    },
  });
  return (
    <form className="py-[20px]">
      <div id="test" ref={ref}></div>
      <div className="relative mt-[30px]">
        <Textfield
          placeholder={t("preRegister.mobileNumber")}
          placeholderStyle={
            "placeholder:text-slate-400 placeholder:text-[22px] placeholder:font-[AraHamah1964] ltr:!pl-[135px] rtl:!pr-[135px] py-2  bg-white text-black"
          }
          height="h-[46px]"
          width="w-full "
          name="mobile_number"
          value={formik.values.mobile_number}
          onChange={formik.handleChange}
          error={
            formik.touched.mobile_number && Boolean(formik.errors.mobile_number)
          }
          helperText={
            formik.touched.mobile_number && formik.errors.mobile_number
          }
        />
        <div className="top-[6px] ltr:left-[16px] rtl:right-[16px] rtl:left-auto absolute flex gap-[16px]">
          <img src={flag} alt="flag" />
          <p className="text-[22px] font-[AraHamah1964]">(+966)</p>
        </div>
      </div>
      <div className="mt-[40px]">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Button
            name={t("forgetPasswordPage.sendVerfCode")}
            buttonNameStyle={
              "bg-lime-400 hover:bg-lime-700 text-white font-[AraHamahBold] text-[30px] w-[100%]"
            }
            onClick={formik.handleSubmit}
          />
        )}
      </div>
    </form>
  );
};

export default withTranslation()(ForgotPasswordForm);
