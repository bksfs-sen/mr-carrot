import {
  FooterLogo,
  InovaLogo,
  InstagramIcon,
  LocationIconOrange,
  MailIcon,
  SnapchatIcon,
  TaxIcon,
  TiktokIcon,
  TwitterIcon,
  WebIcon,
  WhatsappIcon,
} from "../../../utils/IconsSrc";

import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

// import Button from "../../Atoms/Buttons/Button";
// import Textfield from "../../Atoms/Textfields/Textfield";

const Footer = ({ t }) => {
  const SocialLinks = [
    {
      text: "311322093900003",
      icon: <TaxIcon className="min-w-[38px]" />,
    },
    {
      text: " mrcarrot.sa",
      icon: <SnapchatIcon className="min-w-[38px]" />,
    },
    {
      text: "mrcarrot.sa",
      href: "https://www.tiktok.com/@mrcarrot.sa",
      icon: <TiktokIcon className="min-w-[38px]" />,
    },
    {
      text: "mrcarrotsa",
      href: "https://twitter.com/mrcarrotsa",
      icon: <TwitterIcon className="min-w-[38px]" />,
    },
    {
      text: "mrcarrot.co",
      href: "",
      icon: <WebIcon className="min-w-[38px]" />,
    },
    {
      text: "mrcarrot.sa@gmail.com",
      icon: <MailIcon className="min-w-[38px]" />,
    },
    {
      text: "mrcarrot.sa",
      href: "https://www.instagram.com/mrcarrot.sa/",
      icon: <InstagramIcon className="min-w-[38px]" />,
    },
    {
      text: "+966531270787",
      icon: <WhatsappIcon className="min-w-[38px]" />,
    },
    {
      text: t("contactUs.location"),
      icon: <LocationIconOrange className="min-w-[38px]" />,
    },
  ];

  return (
    <footer>
      <div className="bg-orange">
        <div className="lg:flex   lg:w-[84%] w-[90%] mx-auto py-[40px] ">
          <div className="flex justify-center items-center">
            <Link to="/">
              <FooterLogo />
            </Link>
          </div>
          <div className="sm:mx-[15%] mx-[5%] space-y-2">
            <p className="text-[30px] font-[AraHamah1964] text-white sm:mx-10">
              {t("footer.followUs")}
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1">
              {SocialLinks.map((link, i) => {
                return (
                  <div className="flex  col-span-1 mt-3 sm:mx-10" key={i}>
                    {/* <TaxIcon className="min-w-[38px]" /> */}

                    <a href={link.href} target="_blank" rel="noreferrer">
                      {link.icon}
                    </a>
                    <p className="text-[22px] font-[AraHamah1964] text-white mx-4">
                      <a href={link.href} target="_blank" rel="noreferrer">
                        {link.text}
                      </a>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center py-4">
        <p className="text-[23px] font-[AraHamah1964] text-lightgrey mr-5">
          {t("footer.developedBy")}
        </p>
        <a href="https://inovaeg.com" target="_blank" rel="noreferrer noopener">
          <InovaLogo className="mt-2" />
        </a>
      </div>
    </footer>
  );
};

export default withTranslation()(Footer);
