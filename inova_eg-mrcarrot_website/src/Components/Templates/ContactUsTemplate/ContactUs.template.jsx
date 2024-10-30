import ContactUsSection from "../../Organisms/ContactUs/ContactUsSection.jsx/ContactUsSection";
import HeaderPanel from "../../Atoms/HeaderPanel/HeaderPanel";
import { withTranslation } from "react-i18next";

const ContactUsTemplate = ({ t }) => {
  return (
    <main>
      <div className="lg:w-[84%] w-[90%] mx-auto">
        <HeaderPanel
          title={t("contactUs.title")}
          // description={t('contactUs.desc')}
        />
      </div>
      <div className=" lg:w-[84%] w-[90%] mx-auto">
        <ContactUsSection />
      </div>
    </main>
  );
};

export default withTranslation()(ContactUsTemplate);
