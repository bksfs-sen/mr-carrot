import { useSearchParams } from "react-router-dom";
import SubscriptionConfirmed from "../../Molecules/Subscription/SubscriptionConfirmed";
import SubscriptionFailed from "../../Molecules/Subscription/SubscriptionFailed";
import { withTranslation } from "react-i18next";

function SubscriptionConfirmTemplate({ t }) {
  let [searchParams, setSearchParams] = useSearchParams();
  let message = searchParams.get("message");
  return (
    <>
      {message.includes("Succeeded") ? (
        <SubscriptionConfirmed t={t} />
      ) : (
        <SubscriptionFailed />
      )}
    </>
  );
}

export default withTranslation()(SubscriptionConfirmTemplate);
