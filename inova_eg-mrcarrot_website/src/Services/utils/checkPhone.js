import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../..";

const setUpRecaptcha = (phoneNumber, ref) => {
  window.recaptchaVerifier = new RecaptchaVerifier(
    ref,
    { size: "invisible" },
    auth
  );
  const rec = window.recaptchaVerifier;
  return signInWithPhoneNumber(auth, phoneNumber, rec);
};
export const Checkverify = (unconfirmed, navigate, ref, reset = false) => {
  setUpRecaptcha(`${unconfirmed}`, ref)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      navigate(reset ? "/verify?resetPassword=true" : "/verify");
    })
    .catch((error) => {
      toast.error(error.message);
    });
};
