import AboutUsSummary from "../../Organisms/Home/AboutUsSummary/AboutUsSummary";
import ChooseUsSection from "../../Organisms/Home/ChooseUsSection/ChooseUsSection";
import HomeBanner from "../../Organisms/Home/HomeBanner/HomeBanner";
import { OurPackages } from "../../Organisms/Home/OurPackages/OurPackages";
import OurServices from "../../Organisms/Home/OurServices/OurServices";
import { withTranslation } from "react-i18next";

const HomeTemplate = ({ t, packages, packagesLoading }) => {
  return (
    <main>
      <div className="lg:w-[84%] w-[90%] mx-auto">
        <HomeBanner />
      </div>
      <div className="lg:w-[84%] w-[90%] mx-auto">
        <AboutUsSummary />
      </div>
      <h1 className="text-center text-[50px] font-[AraHamahBold] text-lightgrey">
        {t("home.whyChooseUs")}
      </h1>
      <ChooseUsSection />
      <h1 className="text-center text-[50px] font-[AraHamahBold] text-lightgrey">
        {t("home.ourServices")}
      </h1>
      <div className="lg:w-[84%] w-[90%] mx-auto flex justify-center pb-[120px] font-[AraHamah1964] text-[#525252]">
        <OurServices />
      </div>
      {/* <div className="xl:px-[120px] pb-[120px]">

        <PreRegister />
      </div> */}

      <div className="lg:w-[84%] w-[90%] mx-auto pb-[120px]">
        <OurPackages
          t={t}
          packages={packages}
          packagesLoading={packagesLoading}
        />
      </div>
    </main>
  );
};

export default withTranslation()(HomeTemplate);
