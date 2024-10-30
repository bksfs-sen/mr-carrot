import React, { useEffect, useState } from "react";

import CreditPaymentForm from "../../Organisms/Checkout/CreditPaymentForm/CreditPaymentForm";
import OrderSummary from "../../Organisms/OrderSummary/OrderSummary";
import PaymentMethod from "../../Organisms/PaymentMethod/PaymentMethod";
import PaymentSummary from "../../Organisms/PaymentSummary/PaymentSummary";
import STCPaymentForm from "../../Organisms/Checkout/STCPaymentForm/STCPaymentForm";
import { withTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import UserShell from "../../Atoms/Shells/UserShell";
import MoyasarPayment from "../../Molecules/MoyasarPayment/MoyasarPayment";
// let Moyasar;
function CheckoutTemplate({ t, order }) {
  const [selectedPayment, setSelectedPayment] = useState("credit");

  return (
    <div className="lg:w-[84%] w-[90%] mx-auto pt-[80px] font-[AraHamah1964] ">
      <OrderSummary t={t} order={order} />
      <PaymentSummary t={t} order={order} />
      <PaymentMethod
        t={t}
        order={order}
        selectedPayment={selectedPayment}
        setSelectedPayment={setSelectedPayment}
      />
      {selectedPayment === "credit" && (
        <MoyasarPayment
          paymentMethod={"credit"}
          amount={order?.total_amount_with_vat}
        />
      )}
      {selectedPayment === "stc" && (
        <MoyasarPayment
          paymentMethod={"stc"}
          amount={order?.total_amount_with_vat}
        />
      )}
      {selectedPayment === "apple" && (
        <MoyasarPayment
          paymentMethod={"apple"}
          amount={order?.total_amount_with_vat}
        />
      )}

      {/* {selectedPayment === "credit" ? (
        <CreditPaymentForm order={order?.total_amount_with_vat} />
      ) : selectedPayment === "stc" ? (
        <STCPaymentForm />
      ) : (
        <div>Apple</div>
      )} */}
    </div>
  );
}
//https://staging.mrcarrot.co
export default withTranslation()(CheckoutTemplate);
