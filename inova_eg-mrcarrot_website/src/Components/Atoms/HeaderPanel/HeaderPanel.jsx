const HeaderPanel = ({ title, description }) => {
  return (
    <div className="bg-homeBannerBg bg-center bg-cover bg-no-repeat rounded-[30px] mt-[78px] py-16">
      <p className="text-[52px] text-white text-center font-bold font-[AraHamahBold]">
        {title}
      </p>
      <div className="flex justify-center">
        <p className="text-[27px] text-white text-center font-[AraHamah1964] sm:w-[40%]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default HeaderPanel;
