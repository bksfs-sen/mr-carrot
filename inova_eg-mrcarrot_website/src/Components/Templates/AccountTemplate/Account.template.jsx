import { withTranslation } from "react-i18next";
import AccountCard from "../../Molecules/Account/AccountCard/AccountCard";
import { LoadingSpinner } from "../../Atoms/LoadingSpinner/LoadingSpinner";

const AccountTemplate = ({ t, user, isLoading }) => {
  return (
    <main className="w-full ">
      {isLoading ? (
        <LoadingSpinner spinnerStyle="h-full items-center" />
      ) : (
        <div className="space-y-10 w-full ">
          <AccountCard t={t} user={user} />
        </div>
      )}
    </main>
  );
};

export default withTranslation()(AccountTemplate);
