import AboutUsRow from "../../../Molecules/AboutUs/AboutUsRow/AboutUsRow";
import ImagesSrc from "../../../../utils/ImagesSrc";
import { withTranslation } from "react-i18next";

const AboutUsSection = ({ t }) => {
  const AboutUsData = [
    {
      image: ImagesSrc.AboutUs1,
      placement: "left",
    },
    {
      image: ImagesSrc.AboutUs2,
      placement: "right",
    },
    {
      image: ImagesSrc.AboutUs3,
      placement: "left",
    },
    {
      image: ImagesSrc.AboutUs1,
      placement: "right",
    },
    {
      image: ImagesSrc.AboutUs2,
      placement: "left",
    },
    {
      image: ImagesSrc.AboutUs2,
      placement: "right",
    },
    {
      image: ImagesSrc.AboutUs3,
      placement: "left",
    },
  ];
  return (
    <div className="bg-white mt-[100px] mb-20 flex flex-col gap-14">
      {AboutUsData.map((item, index) => {
        return (
          <AboutUsRow
            key={index}
            index={index}
            img={item.image}
            title={t(`aboutUs.AboutUsData.data_${index + 1}.title`)}
            details={(index+1 != 3 && index+1 != 4) ? t(`aboutUs.AboutUsData.data_${index + 1}.details`) : null}
            list={
              (index+1 == 3 || index+1 == 4 || index+1 == 6) ? {
                details_title_1: index+1 == 6 ? t(`aboutUs.AboutUsData.data_${index + 1}.details_title_1`) : null,
                details_1: t(`aboutUs.AboutUsData.data_${index + 1}.details_1`),
                details_title_2: index+1 == 6 ? t(`aboutUs.AboutUsData.data_${index + 1}.details_title_2`) : null,
                details_2: t(`aboutUs.AboutUsData.data_${index + 1}.details_2`),
                details_title_3: index+1 == 6 ? t(`aboutUs.AboutUsData.data_${index + 1}.details_title_3`) : null,
                details_3: t(`aboutUs.AboutUsData.data_${index + 1}.details_3`),
                details_title_4: index+1 == 6 ? t(`aboutUs.AboutUsData.data_${index + 1}.details_title_4`) : null,
                details_4: index+1 != 3 ? t(`aboutUs.AboutUsData.data_${index + 1}.details_4`) : null,
              } : null
            }
            imgPlacement={item.placement}
          />
        );
      })}
    </div>
  );
};

export default withTranslation()(AboutUsSection);
