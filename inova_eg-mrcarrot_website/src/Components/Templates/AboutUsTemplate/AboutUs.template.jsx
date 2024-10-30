import AboutUsSection from "../../Organisms/AboutUs/AboutUsSection/AboutUsSection";
import HeaderPanel from "../../Atoms/HeaderPanel/HeaderPanel";
import { withTranslation } from "react-i18next";

const AboutUsTemplate = ({ t }) => {
  return (
    <main>
      <div className="align-middle lg:w-[84%] w-[90%] mx-auto">
        <HeaderPanel
          title={t("aboutUs.title")}
          description={t("aboutUs.desc")}
        />
      </div>
      <div className="lg:w-[84%] w-[90%] mx-auto">
        <AboutUsSection />
      </div>
      <div className="align-middle lg:w-[84%] w-[90%] mx-auto mb-2 flex text-center" style={{flexDirection: 'column'}}>
        <p className="text-lightgrey text-[46px] font-[AraHamahBold]">
        {t("aboutUs.AboutUsData.conclusion.title")}
        </p>
          <p className="text-lightgrey text-[30px] font-[AraHamah1964]">
          {t("aboutUs.AboutUsData.conclusion.details")}
          </p>
      </div>
    </main>
  );
};

export default withTranslation()(AboutUsTemplate);
