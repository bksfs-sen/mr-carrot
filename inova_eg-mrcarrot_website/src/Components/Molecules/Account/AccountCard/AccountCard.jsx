import { EditIcon } from "../../../../utils/IconsSrc";

import classNames from "classnames";
import { useNavigate } from "react-router";
import { withTranslation } from "react-i18next";
import UserShell from "../../../Atoms/Shells/UserShell";

const AccountCard = ({ t, user }) => {
  const navigate = useNavigate();
  const Data = [
    { title: t("my-account.fullname"), value: user?.full_name },
    { title: t("my-account.email"), value: user?.email },
    {
      title: t("my-account.mobileNumber"),
      value: "966".concat(user?.mobile_number),
    },
  ];
  return (
    <UserShell className="px-6 py-[25px] mt-[30px] md:mt-0">
      <div className="space-y-6 relative ">
        {Data.map((title, i) => {
          return (
            <div className="sm:flex relative gap-3" key={title.title}>
              <h3 className="font-[AraHamahBold] text-[28px] text-lightgrey w-[55%] sm:w-[25%]">
                {title.title}
              </h3>

              <p
                className={classNames(
                  "font-[AraHamah1964] text-[28px] text-lightgrey"
                )}
              >
                {title.value}
              </p>
            </div>
          );
        })}
        <div className="absolute top-0 ltr:right-0 rtl:left-0 !mt-1">
          <EditIcon
            className="w-8 h-8 cursor-pointer"
            onClick={() => navigate(`/profile/my-account/account-setting/edit`)}
          />
        </div>
      </div>
    </UserShell>
  );
};

export default AccountCard;
