import Button from "../../../Atoms/Buttons/Button";
import ImagesSrc from "../../../../utils/ImagesSrc";
import { withTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const AboutUsSummary = ({ t }) => {
  const lang = window.localStorage.getItem("language");
  const navigate = useNavigate();
  return (
    <section
      className={`sm:flex my-[120px] flex-wrap lg:flex-nowrap ${
        lang == "ar" ? "flex-row-reverse" : "flex-row"
      } `}
    >
      <img
        src={ImagesSrc.Summary}
        alt={"summary"}
        className="lg:mr-[57px]  lg:w-full 2xl:w-1/2"
      />
      <div className=" lg:ml-0 justify-center m-auto">
        <h1 className=" text-[30px] md:text-[36px] text-black font-[AraHamah1964]">
          {t("home.aboutUsTitle")}
        </h1>
        <h1 className="text-[35px] md:text-[46px] text-lightgrey font-[AraHamahBold]">
          {t("home.aboutUsSubTitle")}
        </h1>
        <p className="text-[25px] md:text-[30px] text-lightgrey font-[AraHamah1964]">
          {t("home.aboutUsDesc")}
        </p>
        <div className="flex justify-center sm:justify-start">
          <Button
            onClick={() => {
              navigate("/about");
            }}
            name={t("home.aboutUs")}
            buttonNameStyle={
              "font-[AraHamahBold] text-[30px] border border-1 border-lime-600 text-lime-600 mt-6 p-0 h-[46px] !w-[177px]"
            }
          />
        </div>
      </div>
    </section>
  );
};

export default withTranslation()(AboutUsSummary);
