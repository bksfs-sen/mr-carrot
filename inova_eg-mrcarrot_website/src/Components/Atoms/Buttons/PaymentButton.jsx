import classNames from "classnames";
import React from "react";

const PaymentButton = ({ onClick, title, styleClass }) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "px-1 rounded-lg drop-shadow-[0_1px_5px_#B7B7B7]  py-[15px] bg-[#FEF3E9] font-[AraHamah1964]  text-[#525252] text-[30px] font-bold w-[100%] md:w-[30%] lg:w-[20%]",
        styleClass
      )}
    >
      {title}
    </button>
  );
};

export default PaymentButton;
