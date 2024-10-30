import AccountForm from "../../Organisms/Account/AccountForm/AccountForm";
import { withTranslation } from "react-i18next";

const EditAccountTemplate = ({ t, user }) => {
  return (
    <main className="w-full">
      <AccountForm edit={true} t={t} user={user} />
    </main>
  );
};
export default withTranslation()(EditAccountTemplate);
