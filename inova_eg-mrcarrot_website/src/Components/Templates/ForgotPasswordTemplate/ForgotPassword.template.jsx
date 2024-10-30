import ForgotPasswordForm from "../../Organisms/ForgotPassword/ForgotPasswordForm";
import AuthenticationLayout from "../../Organisms/Layout/AuthenticationLayout";
import { withTranslation } from "react-i18next";

const ForgotPasswordTemplate = ({ t }) => {
  return (
    <AuthenticationLayout
      title={t("signinPage.forgotPassword")}
      subTitle={t("forgetPasswordPage.subTitle")}
      link={"/signin"}
      linkText={t("signupPage.link")}
    >
      <ForgotPasswordForm />
    </AuthenticationLayout>
  );
};

export default withTranslation()(ForgotPasswordTemplate);
