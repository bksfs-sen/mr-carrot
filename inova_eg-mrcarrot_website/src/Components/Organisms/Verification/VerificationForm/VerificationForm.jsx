import {
  resetPasswordVerifyRequest,
  verifyRequest,
} from "../../../../Services/modules/auth";
import { setConfirmatonCode } from "../../../../Services/utils/HandelApi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import Button from "../../../Atoms/Buttons/Button";
import { LoadingSpinner } from "../../../Atoms/LoadingSpinner/LoadingSpinner";
import VerificationInput from "react-verification-input";
import { toast } from "react-toastify";
import { useState } from "react";
import { useTimer } from "../../../../Hooks/useTimer";
import { withTranslation } from "react-i18next";
import { auth } from "../../../..";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useAuth } from "../../../../Hooks/useAuth";
import { useSearchParams } from "react-router-dom";
import { setFirebaseToken } from "../../../../Services/modules/auth/Actions";
const VerificationForm = ({ t }) => {
  const date = new Date();
  const { minutes, seconds } = useTimer(new Date(date.getTime() + 2 * 60000));
  const [verificationCode, setVerificationCode] = useState("");
  const { isLoading } = useSelector((state) => state.auth.load);
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const ph = `${localStorage.getItem("UNCONFIRMED_MOBILE_NUMBER")}`;
  const viewPh = ph?.substring(4); //remove +966
  let [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams.get("resetPassword"));
  const handleResendOtp = () => {
    if (minutes === 0 && seconds === 0) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "resend",
        {
          size: "invisible",
        },
        auth
      );
      const appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, ph, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          // console.log("success");
        })
        .catch((error) => {
          toast(error.message);
        });
    }
  };
  //auth?
  const submitForm = async (code) => {
    if (window.confirmationResult) {
      window.confirmationResult
        .confirm(code)
        .then((result) => {
          // User signed in successfully.
          setVerificationCode(code);
          // localStorage.setItem(
          //   "TOKEN_FIRE_BASE",
          //   result.user.stsTokenManager.accessToken
          // );
          // dispatch(setFirebaseToken(result.user.stsTokenManager.accessToken));
          if (!searchParams.get("resetPassword")) {
            setConfirmatonCode(result.user.stsTokenManager.accessToken);
            dispatch(verifyRequest());
          } else {
            dispatch(setFirebaseToken(result.user.stsTokenManager.accessToken));
            navigate("/resetpassword");
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      // console.log(window.confirmationResult);
    }
  };

  //Reset Password Verification
  const verifyResetPassword = async (code) => {
    //dispatch with the mobile number in body
    // we already have the otp in headers
    // if all goes well we navigate to reset password page
    // in reset password page we add the password and the authorization token to the body and voila
    // await setResetCode(result.user.stsTokenManager.accessToken);

    setConfirmatonCode(localStorage.getItem("TOKEN_FIRE_BASE"));
    await dispatch(
      resetPasswordVerifyRequest({
        mobile_number: localStorage.getItem("UNCONFIRMED_MOBILE_NUMBER"),
      })
    );
    if (!error) navigate("/resetpassword");
  };
  return (
    <div className="py-[20px]">
      <p
        className="text-center font-[AraHamah1964] text-[34px] text-lightgrey mt-4 mb-6"
        style={{ direction: "ltr" }}
      >
        {viewPh.replace(
          viewPh.substring(0, viewPh.length - 4),
          "*".repeat(viewPh.length - 4)
        )}
      </p>
      <div className="flex justify-center" style={{ direction: "ltr" }}>
        <VerificationInput
          value={verificationCode}
          validChars="0-9"
          length={6}
          placeholder=""
          classNames={{
            container: " w-full h-full ",
            character:
              "bg-white xl:h-[98px] xl:w-[98px] xl:pt-[20px] lg:h-[65px] lg:w-[65px] rounded-lg mx-[10px] w-[50px] h-[50px]",
            characterInactive: "character--inactive",
            characterSelected: "character--selected",
          }}
          onChange={(value) => setVerificationCode(value)}
        />
      </div>
      {/* px-[10%] */}
      <div className="mt-12 ">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Button
            name={t("general.submit")}
            buttonNameStyle={
              "bg-lime-400 hover:bg-lime-700 text-white font-[AraHamahBold] text-[30px] w-[100%] "
            }
            onClick={() => {
              if (location.state === "resetPassword")
                verifyResetPassword(verificationCode);
              else submitForm(verificationCode);
            }}
          />
        )}
      </div>
      {/* <Timer deadline={new Date(date.getTime() + 2 * 60000)} /> */}
      <p className="text-center font-[AraHamah1964] text-[34px] text-lightgrey mt-8 mb-4">
        {minutes}:{seconds}
      </p>
      <div id="resend"></div>
      <p className="text-center font-[AraHamah1964] text-[28px] text-lightgrey">
        {t("verificationPage.codeHint")}

        <span
          onClick={handleResendOtp}
          className={
            minutes === 0 && seconds === 0
              ? "cursor-pointer font-bold"
              : "cursor-default"
          }
        >
          {t("verificationPage.resend")}
        </span>
      </p>
    </div>
  );
};

export default withTranslation()(VerificationForm);
