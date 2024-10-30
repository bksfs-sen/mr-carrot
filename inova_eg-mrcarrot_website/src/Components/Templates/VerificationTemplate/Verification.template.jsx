import AuthenticationLayout from "../../Organisms/Layout/AuthenticationLayout";
import VerificationForm from "../../Organisms/Verification/VerificationForm/VerificationForm";
import { withTranslation } from "react-i18next";

const VerificationTemplate = ({ t }) => {
  return (
    <AuthenticationLayout
      title={t("verificationPage.title")}
      subTitle={t("verificationPage.subTitle")}
    >
      <VerificationForm />
    </AuthenticationLayout>
  );
};

export default withTranslation()(VerificationTemplate);
