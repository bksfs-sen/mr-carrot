import { LocationIcon, PhoneIcon, TimeIcon } from "../../../../utils/IconsSrc";
import Map, { MyMapComponent } from "../../../Atoms/Map/map";
import { Status, Wrapper } from "@googlemaps/react-wrapper";

import ContactUsForm from "../../../Molecules/ContactUs/Form/ContactUs.form";
import ImagesSrc from "../../../../utils/ImagesSrc";
import { withTranslation } from "react-i18next";
import UserShell from "../../../Atoms/Shells/UserShell";

const ContactUsSection = ({ t }) => {
  const center = { lat: -34.397, lng: 150.644 };
  const zoom = 4;
  const render = (status) => {
    if (status === Status.LOADING) return <h3>{status} ..</h3>;
    if (status === Status.FAILURE) return <h3>{status} ...</h3>;
    return null;
  };
  return (
    <div className="flex flex-col  bg-white py-10 text-[22px] font-[AraHamahSahet] w-100 ">
      <div className="flex flex-row max-sm:flex-col justify-between py-8 mt-[40px] mb-[120px]  h-[600px] max-sm:h-full gap-4">
        <section className="w-2/3 max-sm:w-full h-full ">
          <ContactUsForm />
          <Wrapper
            apiKey="AIzaSyBxFCHeTttOlo-2nO_eWFT84wNBiRszTM0"
            render={render}
          >
            <MyMapComponent center={center} zoom={zoom} />
          </Wrapper>
        </section>
      </div>

      <UserShell className="px-6 py-[25px] mb-8 mt-[40px] md:mt-0 flex flex-col gap-5">
        <div className="flex flex-row items-center ">
          <LocationIcon />
          <p className="text-lightgrey text-[30px] font-[AraHamahBold] mx-2">
            {t("contactUs.location")}
          </p>
        </div>
        <div className="flex flex-row items-center ">
          <PhoneIcon />
          <p className="text-lightgrey text-[30px] font-[AraHamah1964] mx-2">
            +966531270787
          </p>
        </div>
        <div className="flex flex-row items-center ">
          <p className="text-lightgrey text-[30px] font-[AraHamah1964] mx-2">
            mrcarrot.sa@gmail.com
          </p>
        </div>
        {/* <div className="flex flex-row items-center ">
          <p className="text-lightgrey text-[30px] font-[AraHamah1964] mx-2">
            {t("contactUs.organizationName")}{" "}
          </p>
        </div>
        <div className="flex flex-row items-center ">
          <p className="text-lightgrey text-[30px] font-[AraHamah1964] mx-2">
            {t("contactUs.commercialRegisteration")}
          </p>
        </div>
        <div className="flex flex-row items-center ">
          <p className="text-lightgrey text-[30px] font-[AraHamah1964] mx-2">
            {t("contactUs.taxNumber")}
          </p>
        </div> */}
        <div className="flex flex-row items-center ">
          <TimeIcon />
          <p className="text-lightgrey text-[30px] font-[AraHamah1964] mx-2">
            {t("contactUs.time")}
          </p>
        </div>
        <div className="flex flex-row items-center ">
          <TimeIcon />
          <p className="text-lightgrey text-[30px] font-[AraHamah1964] mx-2">
            {t("contactUs.offDay")}
          </p>
        </div>
        <div className="flex flex-row items-center ">
          <TimeIcon />
          <p className="text-lightgrey text-[30px] font-[AraHamah1964] mx-2">
            {t("contactUs.saturday")}
          </p>
        </div>
      </UserShell>
    </div>
  );
};

export default withTranslation()(ContactUsSection);
