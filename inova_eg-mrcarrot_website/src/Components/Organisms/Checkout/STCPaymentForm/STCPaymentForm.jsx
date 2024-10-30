import Button from "../../../Atoms/Buttons/Button";
import { useNavigate } from "react-router";
import { useState } from "react";
import { withTranslation } from "react-i18next";

const STCPaymentForm = ({ t }) => {
  const [number, setNumber] = useState("");

  const navigate = useNavigate();
  return (
    <form
      className=""
      accept-charset="UTF-8"
      action="https://api.moyasar.com/v1/payments.html"
      method="POST"
    >
      <div className="flex flex-col bg-[#FEF3E9]  p-8 mt-[20px] space-y-6 mb-5">
        <input
          type="hidden"
          name="callback_url"
          value="http://staging.mrcarrot.co/sub-successful"
        />
        <input
          type="hidden"
          name="publishable_api_key"
          value="pk_test_1kRH2TW6ThY4MbRamd8XXZGs8Y44CAwU2yL89Seu"
        />
        <input type="hidden" name="amount" value="100" />
        <input type="hidden" name="source[type]" value="stcpay" />
        <input
          type="hidden"
          name="description"
          value="Order id 1234 by guest"
        />
        <input
          placeholder="Number"
          className="placeholder:text-slate-400 placeholder:text-[22px] placeholder:font-[AraHamah1964] px-4 py-2  bg-white text-black"
          type="text"
          name="source[mobile]"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <div></div>

      <div className="flex gap-4 justify-center mb-16">
        <Button
          type="button"
          name={t("applicantForm.Back")}
          width="w-[177px]"
          buttonNameStyle={
            "text-[25px] md:text-[30px] focus:ring-0 border border-2 border-lime-600 text-lime-600 font-bold"
          }
          onClick={() => navigate(-1)}
        />
        <Button
          type="submit"
          name={t("order.placeOrder")}
          width="w-[177px]"
          buttonNameStyle={
            "!px-0 text-[25px] md:text-[30px] focus:ring-0 border border-2 border-lime-400 bg-lime-400 text-white font-bold"
          }
          // onClick={() => console.log("test")}
        />
      </div>
    </form>
  );
};

export default withTranslation()(STCPaymentForm);
