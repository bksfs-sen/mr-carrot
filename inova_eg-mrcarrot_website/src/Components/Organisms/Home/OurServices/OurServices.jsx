import ImagesSrc from "../../../../utils/ImagesSrc";
import { withTranslation } from "react-i18next";

const OurServices = ({ t }) => {
  const services = [
    {
      details: t("home.services.service_1"),
      img: ImagesSrc.Service1,
    },
    {
      details: t("home.services.service_2"),
      img: ImagesSrc.Service2,
    },
    {
      details: t("home.services.service_3"),
      img: ImagesSrc.Service3,
    },
  ];

  return (
    <div className="flex justify-between sm:space-x-[25px] lg:space-x-[40px] lg:flex-row flex-col items-center lg:items-start">
      {services.map((service, index) => {
        return (
          <div
            key={index}
            className="lg:w-[33%] sm:w-[70%] w-[100%] bg-orange/10 mb-5 rounded-xl h-full"
          >
            <figure className="flex justify-center relative ">
              <div className="absolute bg-[#f383283d] top-0 w-full h-full border-[6px] border-orange rounded-[19px] z-10"></div>
              <img
                className="w-[100%] rounded-[19px]"
                src={service.img}
                alt={"service" + index}
              />
            </figure>

            <p className="px-2 pb-3 lg:pb-0 text-center m-auto mt-[20px] text-[28px] ">
              {service.details}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default withTranslation()(OurServices);
