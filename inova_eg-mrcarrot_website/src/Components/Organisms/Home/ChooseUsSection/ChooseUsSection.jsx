import { withTranslation } from "react-i18next";
import { BroccoliIcon, CherryIcon, LeafIcon } from "../../../../utils/IconsSrc";

const ChooseUsSection = ({ t }) => {


  return (
    <section className="sm:flex sm:justify-center bg-orange/10 py-8 mt-[40px] mb-[120px]">
      <div>
        <div className="flex justify-center mb-[8px] ">
          <LeafIcon className="w-20 h-20" />
        </div>
        <p className="text-[36px] text-lightgrey font-[AraHamah1964] text-center">
          {t('home.freshIngredients')}
        </p>
      </div>
      <div className="lg:mx-[162px] sm:my-0 my-7 mx-7 ">
        <div className="flex justify-center  mb-[8px]">
          <CherryIcon className="w-20 h-20" />
        </div>
        <p className="text-[36px] text-lightgrey font-[AraHamah1964] text-center">
          {t('home.adorableTaste')}
        </p>
      </div>
      <div>
        <div className="flex justify-center  mb-[8px]">
          <BroccoliIcon className="w-20 h-20" />
        </div>
        <p className="text-[36px] text-lightgrey font-[AraHamah1964] text-center">
          {t('home.finestQuality')}
        </p>
      </div>
    </section>
  );
};

export default withTranslation()(ChooseUsSection);
