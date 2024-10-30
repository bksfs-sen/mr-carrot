import { useDispatch, useSelector } from "react-redux";

import Button from "../../../Atoms/Buttons/Button";
import { ChangePasswordSchema } from "./validation";
import { LoadingSpinner } from "../../../Atoms/LoadingSpinner/LoadingSpinner";
import Textfield from "../../../Atoms/Textfields/Textfield";
import { changePasswordRequest } from "../../../../Services/modules/auth";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { withTranslation } from "react-i18next";
import ShowHidePassword from "../../ShowHidePassword/ShowHidePassword";
import { useState } from "react";
import { setConfirmatonCode } from "../../../../Services/utils/HandelApi";

const NewPasswordForm = ({ t }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { jwt } = useSelector(
  //   (state) => state.auth.resetPasswordVerificationCode
  // );
  const { auth } = useSelector((state) => state);
  // console.log(auth.firebaseToken);
  const { isLoading } = useSelector((state) => state.auth.load);
  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: async (values) => {
      setConfirmatonCode(auth.firebaseToken);
      //dispatch update password with new password and verification code
      await dispatch(
        changePasswordRequest({
          password: values.password,
        })
      );
      toast.success("Password Changed Successfully.");
      navigate("/signin");
    },
  });
  return (
    <form>
      <div className="w-[100%] grow mt-8 relative">
        <Textfield
          type={showPassword ? "text" : "password"}
          placeholder={t("loginBtn.Password")}
          placeholderStyle={
            "placeholder:text-slate-400 placeholder:text-[22px] placeholder:font-[AraHamah1964] px-4 py-2  bg-white text-black "
          }
          name="password"
          height="h-[46px]"
          width="w-full"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <ShowHidePassword
          eyeIconStyle="top-2"
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      </div>
      <div className="w-[100%]  mt-8 relative">
        <Textfield
          type={showConfirmPassword ? "text" : "password"}
          placeholder={t("loginBtn.ConfirmPassword")}
          placeholderStyle={
            "placeholder:text-slate-400 placeholder:text-[22px] placeholder:font-[AraHamah1964] px-4 py-2  bg-white text-black"
          }
          height="h-[46px]"
          width="w-full "
          name="confirm_password"
          value={formik.values.confirm_password}
          onChange={formik.handleChange}
          error={
            formik.touched.confirm_password &&
            Boolean(formik.errors.confirm_password)
          }
          helperText={
            formik.touched.confirm_password && formik.errors.confirm_password
          }
        />
        <ShowHidePassword
          eyeIconStyle="top-2"
          showPassword={showConfirmPassword}
          setShowPassword={setShowConfirmPassword}
        />
      </div>
      <div className="mt-10">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Button
            name={t("forgetPasswordScreen.changePassword")}
            buttonNameStyle={
              "bg-lime-400 hover:bg-lime-700 text-white font-[AraHamahBold] text-[30px] w-[100%]"
            }
            onClick={() => formik.handleSubmit()}
          />
        )}
      </div>
    </form>
  );
};

export default withTranslation()(NewPasswordForm);
