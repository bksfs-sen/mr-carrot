import PaymentButton from "../../Atoms/Buttons/PaymentButton";
import React from "react";

const PaymentMethod = ({ t, setSelectedPayment, selectedPayment }) => {
  return (
    <div className=" text-[#525252]">
      <h3 className="mb-2.5 text-[30px] font-bold md:text-[36px]">
        {t("order.Payment Method")}
      </h3>
      <div className="flex gap-5 md:gap-8  mb-6 flex-wrap md:flex-nowrap">
        <PaymentButton
          styleClass={
            selectedPayment === "credit" &&
            "border-[3px] !border-orange !text-orange"
          }
          title="Visa / Credit cards"
          onClick={() => setSelectedPayment("credit")}
        />
        <PaymentButton
          styleClass={
            selectedPayment === "stc" &&
            "border-[3px] !border-orange !text-orange"
          }
          title="STC Pay"
          onClick={() => setSelectedPayment("stc")}
        />
        <PaymentButton
          styleClass={
            selectedPayment === "apple" &&
            "border-[3px] !border-orange !text-orange"
          }
          title="Apple Pay"
          onClick={() => setSelectedPayment("apple")}
        />
      </div>
    </div>
  );
};

export default PaymentMethod;
