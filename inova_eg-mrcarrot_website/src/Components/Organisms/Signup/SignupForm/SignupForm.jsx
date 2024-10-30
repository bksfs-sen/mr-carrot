import { useDispatch, useSelector } from "react-redux";
import Button from "../../../Atoms/Buttons/Button";
import { LoadingSpinner } from "../../../Atoms/LoadingSpinner/LoadingSpinner";
import { SignupSchema } from "./validation";
import Textfield from "../../../Atoms/Textfields/Textfield";
import { signupRequest } from "../../../../Services/modules/auth";
import { useFormik } from "formik";
import { withTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import flag from "../../../../Assets/Icons/flag.svg";
import { useRef, useState } from "react";
import ShowHidePassword from "../../ShowHidePassword/ShowHidePassword";
import { Checkverify } from "../../../../Services/utils/checkPhone";
import Modal from "../../Common/Modal";
import TermsPrivacyModalChildren from "../../Common/TermsPrivacyModalChildren";
import { toast } from "react-toastify";

const SignupForm = ({ t }) => {
  window.confirmationResult = null;
  window.recaptchaVerifier = null;
  const ref = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth.load);
  const [showModal, setShowModal] = useState(false);
  const lng = localStorage.getItem("language");
  
  // accept_terms attr for accept terms and privacy policy checkbox
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      unconfirmed_mobile_number: "",
      password: "",
      password_conmfirmation: "",
      accept_terms: false
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      values = {
        ...values,
        unconfirmed_mobile_number: values.unconfirmed_mobile_number.replaceAll(
          " ",
          ""
        ),
      };
      const actions = () => {
        localStorage.setItem(
          "UNCONFIRMED_MOBILE_NUMBER",
          "+966".concat(values.unconfirmed_mobile_number)
        );
        Checkverify(
          "+966".concat(values.unconfirmed_mobile_number),
          navigate,
          ref.current.id
        );
      };
      if(!formik.values.accept_terms){
        toast.error(t("signinPage.acceptTermsError"))
      }else{
        dispatch(
          signupRequest(
            {
              user: {
                first_name: values.first_name.trim(),
                last_name: values.last_name.trim(),
                email: values.email.trim(),
                unconfirmed_mobile_number: "+966"
                  .concat(values.unconfirmed_mobile_number)
                  .trim(),
                password: values.password.trim(),
                password_confirmation: values.password_conmfirmation.trim(),
                accept_terms: values.accept_terms
              },
              device: {
                uuid: "uuid",
                fcm_token: "fcm_token",
              },
            },
            actions
          )
        );
      }
    },
  });

  return (
    <>
    <form onSubmit={formik.handleSubmit} className="py-[20px]">
      <div id="test" ref={ref}></div>
      <div className="w-[100%] flex flex-row gap-4 grow mt-7">
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
          error={formik.touched.first_name && Boolean(formik.errors.first_name)}
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
          error={formik.touched.last_name && Boolean(formik.errors.last_name)}
          helperText={formik.touched.last_name && formik.errors.last_name}
        />
      </div>
      <div className="mt-6">
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
      </div>
      <div className="mt-6 relative">
        <Textfield
          placeholder={t("preRegister.mobileNumber")}
          placeholderStyle={
            " placeholder:text-slate-400 placeholder:text-[22px] placeholder:font-[AraHamah1964] px-4 py-2 ltr:!pl-[135px] rtl:!pr-[135px] bg-white text-black"
          }
          height="h-[46px]"
          width="w-full "
          name="unconfirmed_mobile_number"
          value={formik.values.unconfirmed_mobile_number}
          onChange={formik.handleChange}
          error={
            formik.touched.unconfirmed_mobile_number &&
            Boolean(formik.errors.unconfirmed_mobile_number)
          }
          helperText={
            formik.touched.unconfirmed_mobile_number &&
            formik.errors.unconfirmed_mobile_number
          }
        />
        <div className="top-[6px] ltr:left-[16px] rtl:right-[16px] rtl:left-auto absolute flex gap-[16px]">
          <img src={flag} alt="flag" />
          <p className="text-[22px] font-[AraHamah1964]">(+966)</p>
        </div>
      </div>

      <div className=" flex flex-row gap-4 grow mt-6 ">
        <div className="w-[100%] relative">
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
            eyeIconStyle="top-3"
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        </div>
        <div className="w-[100%] relative">
          <Textfield
            type={showConfirmPassword ? "text" : "password"}
            placeholder={t("loginBtn.ConfirmPassword")}
            placeholderStyle={
              "relative placeholder:text-slate-400 placeholder:text-[22px] placeholder:font-[AraHamah1964] px-4 py-2  bg-white text-black"
            }
            height="h-[46px]"
            width="w-full "
            name="password_conmfirmation"
            value={formik.values.password_conmfirmation}
            onChange={formik.handleChange}
            error={
              formik.touched.password_conmfirmation &&
              Boolean(formik.errors.password_conmfirmation)
            }
            helperText={
              formik.touched.password_conmfirmation &&
              formik.errors.password_conmfirmation
            }
          />
          <ShowHidePassword
            eyeIconStyle="top-3"
            showPassword={showConfirmPassword}
            setShowPassword={setShowConfirmPassword}
          />
        </div>
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
      <div className="mt-8">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Button
            type="submit"
            name={t("loginBtn.Signup")}
            buttonNameStyle={
              "bg-lime-400 hover:bg-lime-700 text-white font-[AraHamahBold] text-[30px] !w-[100%]"
            }
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

export default withTranslation()(SignupForm);
