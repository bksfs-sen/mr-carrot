import React from "react";
import Notification from "../../Organisms/Notification/Notification";
import Button from "../../Atoms/Buttons/Button";
import { withTranslation } from "react-i18next";
import { LoadingSpinner } from "../../Atoms/LoadingSpinner/LoadingSpinner";

function NotificationTemplate({
  t,
  notification,
  handlePagination,
  isLoading,
}) {
  return (
    <div className="font-[AraHamah1964] lg:w-[84%] w-[90%] mx-auto mb-20 mt-10">
      <h1 className="font-bold text-[30px] text-[#525252] mb-[15px]">
        {t("notification.notifications")}
      </h1>
      <Notification t={t} notification={notification} />
      {isLoading ? (
        <LoadingSpinner spinnerStyle="mt-16" />
      ) : (
        <Button
          onClick={handlePagination}
          width="w-max mx-auto"
          buttonNameStyle={
            "!px-5 text-[30px] focus:ring-0 border border-2 border-lime-600 text-lime-600 mt-16 h-[46px]"
          }
          name={t("notification.loadMoreNotifications")}
        />
      )}
    </div>
  );
}

export default withTranslation()(NotificationTemplate);
