import { useNavigate, useSearchParams } from "react-router-dom";
import { FailIcon } from "../../../utils/IconsSrc";
import ImagesSrc from "../../../utils/ImagesSrc";
import UserShell from "../../Atoms/Shells/UserShell";
import { withTranslation } from "react-i18next";
import Button from "../../Atoms/Buttons/Button";

const SubscriptionFailed = ({ t }) => {
  const navigate = useNavigate();
  return (
    <UserShell className="relative w-[82%] my-16 mx-auto py-16   ">
      <figure className="absolute left-0 bottom-[150px] xs:hidden lg:block">
        <img src={ImagesSrc.Thumbsdown1} alt="checkMark" />
      </figure>
      <figure className="absolute right-0 bottom-[150px] xs:hidden lg:block">
        <img src={ImagesSrc.Thumbsdown2} alt="checkMark" />
      </figure>
      <div className="flex flex-col items-center ">
        <figure className="flex justify-center mb-9">
          <FailIcon />
        </figure>
        <h1 className="text-[42px] text-[#525252] text-center w-[90%]">
          {t("subscriptionFailed.message")} !
        </h1>
        <p className="text-center xs:w-[80%] lg:w-[40%] text-[#525252] text-[28px] mb-5">
          {t("subscriptionFailed.details")}
        </p>

        <Button
          onClick={() => {
            navigate("/checkout");
          }}
          name={t("general.tryAgain")}
          buttonNameStyle={
            " bg-lime-400 hover:bg-lime-700 text-white font-[AraHamahBold] text-[30px] "
          }
        />
      </div>
    </UserShell>
  );
};

export default withTranslation()(SubscriptionFailed);
