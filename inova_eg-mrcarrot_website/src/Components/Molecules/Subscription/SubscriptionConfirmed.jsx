import React from "react";
import UserShell from "../../Atoms/Shells/UserShell";
import checkMark from "../../../Assets/Images/checkMark.webp";
import thumbsUp1 from "../../../Assets/Images/thumbsUp1.png";
import thumbsUp2 from "../../../Assets/Images/thumbsUp2.png";

function SubscriptionConfirmed({ t }) {
  return (
    <UserShell className="relative w-[82%] my-16 mx-auto py-16   ">
      <figure className="absolute left-0 bottom-[60px] xs:hidden lg:block">
        <img src={thumbsUp2} alt="checkMark" />
      </figure>
      <figure className="absolute right-0 bottom-[60px] xs:hidden lg:block">
        <img src={thumbsUp1} alt="checkMark" />
      </figure>

      <div className="flex flex-col items-center ">
        <figure className="flex justify-center mb-9">
          <img src={checkMark} alt="checkMark" />
        </figure>
        <h1 className="text-[42px] text-[#525252] text-center w-[90%]">
          {t("subscriptionConfirm.message")} !
        </h1>
        <p className="text-center xs:w-[80%] lg:w-[40%] text-[#525252] text-[28px]">
          {t("subscriptionConfirm.details")}
        </p>
      </div>
    </UserShell>
  );
}
//how to center p?

export default SubscriptionConfirmed;
