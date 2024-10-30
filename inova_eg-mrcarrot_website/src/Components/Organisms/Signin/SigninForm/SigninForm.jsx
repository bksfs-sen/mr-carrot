import {
  getUserExistanceRequest,
  signinRequest,
} from "../../../../Services/modules/auth";
import { useDispatch, useSelector } from "react-redux";
import flag from "../../../../Assets/Icons/flag.svg";
import Button from "../../../Atoms/Buttons/Button";
import { LoadingSpinner } from "../../../Atoms/LoadingSpinner/LoadingSpinner";
import { SigninSchema } from "./validation";
import Textfield from "../../../Atoms/Textfields/Textfield";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { withTranslation } from "react-i18next";
import { useRef, useState } from "react";
import ShowHidePassword from "../../ShowHidePassword/ShowHidePassword";
import { Checkverify } from "../../../../Services/utils/checkPhone";
import { toast } from "react-toastify";
import Modal from "../../Common/Modal";
import TermsPrivacyModalChildren from "../../Common/TermsPrivacyModalChildren";
const SigninForm = ({ t }) => {
  const [showPassword, setShowPassword] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth.load);
  const [showModal, setShowModal] = useState(false);
  const lng = localStorage.getItem("language");

  // accept_terms attr for accept terms and privacy policy checkbox
  const formik = useFormik({
    initialValues: {
      mobile_number: "",
      password: "",
      accept_terms: false
    },
    validationSchema: SigninSchema,
    onSubmit: (values) => {
      if(!formik.values.accept_terms){
        toast.error(t("signinPage.acceptTermsError"))
      }else{
        dispatch(
          signinRequest({
            user: {
              mobile_number: "+966".concat(values.mobile_number).trim(),
              password: values.password.trim(),
              accept_terms: values.accept_terms
            },
          })
        );
      }
    },
  });

  // const resetPassword = async () => {
  //   if (formik.values.mobile_number) {
  //      localStorage.setItem(
  //       "UNCONFIRMED_MOBILE_NUMBER",
  //       formik.values.mobile_number
  //     );
  //     Checkverify(
  //       "+966".concat(formik.values.mobile_number),
  //       navigate,
  //       ref.current.id
  //     );

  //     // if (!error) navigate("/sendMessage", { state: "resetPassword" });
  //   }
  // };
  //////////////

  const checkUserExistance = () => {
    if (formik.values.mobile_number) {
      localStorage.setItem(
        "UNCONFIRMED_MOBILE_NUMBER",
        "+966".concat(formik.values.mobile_number).trim()
      );
      const actions = () => {
        Checkverify(
          "+966".concat(formik.values.mobile_number),
          navigate,
          ref.current.id,
          true
        );
      };
      dispatch(
        getUserExistanceRequest(
          "+966".concat(formik.values.mobile_number).trim(),
          actions
        )
      );
      // if (!error) navigate("/sendMessage", { state: "resetPassword" });
    }
  };
  //Sign in logic
  //Enter mobile and password
  //Click sign in
  //Send request to get authoization token
  //Save token in Local storage
  //move the user to home page
  //UX:
  // 1- Show loading indicator instead of the sign in button when the user clicks it to signin
  // 2- Show a toast letting the user know that he successfully logged in (Welcome message maybe)
  // 3- if there's a back-end error (invalid credentials) show it in a toast
  return (
    <>
    <form className="py-[20px]">
      <div id="test" ref={ref}></div>
      <div className="relative mt-[30px]  ">
        <Textfield
          placeholder={t("preRegister.mobileNumber")}
          placeholderStyle={
            " placeholder:text-slate-400 placeholder:text-[22px] placeholder:font-[AraHamah1964] ltr:pl-[135px] rtl:pr-[135px] py-2  bg-white text-black"
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
        <div className="z-10 top-[7px] ltr:left-[16px] rtl:right-[16px] rtl:left-auto absolute flex gap-[16px]">
          <img src={flag} alt="" />
          <p className="text-[22px] font-[AraHamah1964]">(+966)</p>
        </div>
      </div>
      <div className="mt-[32px] relative">
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
      <div className="flex justify-start mt-[32px]">
        <p
          className="text-[18px] font-[AraHamah1964] text-lightgrey font-medium cursor-pointer"
          onClick={() => navigate("/forgetPassword")}
        >
          {t("signinPage.forgotPassword")}
        </p>
      </div>

      <div className="flex justify-start mt-[32px]">
        <div className="space-x-2 flex gap-[5px]">
          <input
            type="checkbox"
            checked={formik.values.accept_terms}
            onChange={() =>
              formik.setFieldValue(
                "accept_terms",
                !formik.values.accept_terms
              )
            }
          />
          <label className="flex">            
            {t("signinPage.acceptTerms1")}
            <p
              className={`${lng == 'en' ? "text-[23px]" : "text-[18px]"} leading-6 font-[AraHamah1964] text-sky-500 underline font-medium cursor-pointer mx-2`}
              onClick={() => setShowModal(true)}
              >
              {t("signinPage.acceptTerms2")}
            </p>
            {t("signinPage.acceptTerms3")}
          </label>
        </div>
      </div>

      <div className="mt-[40px]">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Button
            name={t("loginBtn.Signin")}
            buttonNameStyle={
              "bg-lime-400 hover:bg-lime-700 text-white font-[AraHamahBold] text-[30px] !w-[100%]"
            }
            onClick={formik.handleSubmit}
          />
        )}
      </div>
    </form>

    {
      showModal ? 
      <Modal
        showModal={showModal}
        setShowModal={() => setShowModal(!showModal)}
        modalClassName="!w-[992px] !min-h-[185px] pb-8 px-10"
      >
        <TermsPrivacyModalChildren />
      </Modal>
      : null
    }
    </>
  );
};

export default withTranslation()(SigninForm);
