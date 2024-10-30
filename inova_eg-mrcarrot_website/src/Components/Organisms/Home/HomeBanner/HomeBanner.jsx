import Button from "../../../Atoms/Buttons/Button";
import ImagesSrc from "../../../../utils/ImagesSrc";
import { withTranslation } from "react-i18next";

const HomeBanner = ({ t }) => {
  const lang = window.localStorage.getItem("language");
  return (
    <section
      className={` bg-homeBannerBg bg-center bg-cover bg-no-repeat flex ${
        lang == "ar" ? "flex-row-reverse" : "flex-row"
      } justify-between rounded-[30px] mt-[78px]`}
    >
      <div className="w-[100%] sm:w-full lg:pr-0 px-[88px] my-auto py-[50px] md:py-[20px]">
        <p className="text-[36px]  font-[AraHamah1964] text-white ">
          {t("home.bannerTitle")}
        </p>
        <p className="md:text-[56px] xl:text-[66px] text-[40px] font-[AraHamahBold] text-white 2xl:w-[500px]">
          {t("home.bannerDesc")}
        </p>
        <div className="flex">
          <Button
            name={t("home.getStarted")}
            buttonNameStyle={"font-[AraHamahBold] text-[30px] !w-[177px]"}
          />
        </div>
      </div>
      <figure className="w-[0] lg:min-w-max">
        <img
          src={ImagesSrc.HomeBannerImage}
          alt="Home-Banner"
          className="h-full w-full"
        />
      </figure>
    </section>
  );
};

export default withTranslation()(HomeBanner);
