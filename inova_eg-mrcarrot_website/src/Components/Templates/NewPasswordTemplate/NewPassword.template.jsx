import AuthenticationLayout from "../../Organisms/Layout/AuthenticationLayout";
import NewPasswordForm from "../../Organisms/NewPassword/NewPasswordForm/NewPasswordForm";
import { withTranslation } from "react-i18next";

const NewPasswordTemplate = ({ t }) => {
  return (
    <AuthenticationLayout
      title={t("forgotPasswordPage.title")}
      subTitle={t("forgotPasswordPage.subTitle")}
    >
      <NewPasswordForm />
    </AuthenticationLayout>
  );
};

export default withTranslation()(NewPasswordTemplate);
