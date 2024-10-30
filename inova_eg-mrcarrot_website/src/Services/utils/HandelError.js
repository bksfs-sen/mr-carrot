import { toast } from "react-toastify";

export default function handleErrors(error) {
  let errorData = error?.response?.data;
  if (errorData) {
    if (Array.isArray(errorData?.error)) {
      errorData?.error?.map((data) => {
        toast.error(data);
        throw data;
      });
    } else if (Array.isArray(errorData?.message)) {
      errorData?.message?.map((data) => {
        toast.error(data);
        throw data;
      });
    } else {
      if (
        errorData?.message === "translation missing: en.invalid_token" ||
        errorData?.message === "translation missing: ar.invalid_token"
      ) {
        localStorage.removeItem("TOKEN");
        localStorage.removeItem("USER_ID");
        localStorage.removeItem("USER_TYPE");
        //redirect to home page
        window.location.replace("/");
      }
      toast.error(errorData?.message);
    }
  } else {
    // error.message
    if (
      error?.message === "translation missing: en.invalid_token" ||
      error?.message === "translation missing: ar.invalid_token"
    ) {
      localStorage.removeItem("TOKEN");
      localStorage.removeItem("USER_ID");
      localStorage.removeItem("USER_TYPE");
      //redirect to home page
      window.location.replace("/");
    }
    console.log(error?.message);
    toast.error(error?.message);

    throw error?.message;
  }
}
