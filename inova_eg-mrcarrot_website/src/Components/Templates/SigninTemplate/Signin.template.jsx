import AuthenticationLayout from "../../Organisms/Layout/AuthenticationLayout";
import SigninForm from "../../Organisms/Signin/SigninForm/SigninForm";
import { withTranslation } from "react-i18next";

const SignInTemplate = ({ t }) => {
  return (
    <AuthenticationLayout
      title={t("signinPage.title")}
      subTitle={t("signinPage.subTitle")}
      link={"/signup"}
      linkText={t("signinPage.link")}
    >
      <SigninForm />
    </AuthenticationLayout>
  );
};

export default withTranslation()(SignInTemplate);
