import React, { useEffect } from "react";
import UserShell from "../../Atoms/Shells/UserShell";
const baseUrl = "https://staging.mrcarrot.co";
const MoyasarPayment = ({ paymentMethod, amount }) => {
  const lang = localStorage.getItem("i18nextLng");

  useEffect(() => {
    switch (paymentMethod) {
      case "credit":
        window["Moyasar"]?.init({
          element: ".visa-form",
          // Amount in the smallest currency unit.
          // For example:
          // 10 SAR = 10 * 100 Halalas
          // 10 KWD = 10 * 1000 Fils
          // 10 JPY = 10 JPY (Japanese Yen does not have fractions)
          amount: amount * 100,
          currency: "SAR",
          language: lang,
          fixed_width: false,
          description: "Order id 1234 by guest",
          publishable_api_key:
            "pk_test_1kRH2TW6ThY4MbRamd8XXZGs8Y44CAwU2yL89Seu",
          callback_url: `${baseUrl}/sub-successful`,
          methods: ["creditcard"],
        });
        break;
      case "stc":
        window["Moyasar"]?.init({
          element: ".stc-form",
          amount: amount * 100,
          currency: "SAR",
          language: lang,
          fixed_width: false,
          description: "Order id 1234 by guest",
          publishable_api_key:
            "pk_test_1kRH2TW6ThY4MbRamd8XXZGs8Y44CAwU2yL89Seu",
          callback_url: `${baseUrl}/sub-successful`,
          methods: ["stcpay"],
        });
        break;
      case "apple":
        window["Moyasar"]?.init({
          element: ".apple-form",
          amount: amount * 100,
          currency: "SAR",
          language: lang,
          fixed_width: false,
          description: "Order id 1234 by guest",
          publishable_api_key:
            "pk_test_1kRH2TW6ThY4MbRamd8XXZGs8Y44CAwU2yL89Seu",
          callback_url: `${baseUrl}/sub-successful`,
          methods: ["applepay"],
          apple_pay: {
            country: "SA",
            label: "Awesome Cookie Store",
            validate_merchant_url:
              "https://api.moyasar.com/v1/applepay/initiate",
          },
        });
        break;
      default:
        break;
    }
  }, []);

  const getContainer = () => {
    switch (paymentMethod) {
      case "credit":
        return <div className="visa-form"></div>;
      case "stc":
        return <div className="stc-form"></div>;
      case "apple":
        return <div className="apple-form"></div>;
      default:
        break;
    }
  };
  return (
    <UserShell className={"px-6 py-[25px] mb-8 md:mt-0"}>
      {getContainer()}
    </UserShell>
  );
};

export default MoyasarPayment;
