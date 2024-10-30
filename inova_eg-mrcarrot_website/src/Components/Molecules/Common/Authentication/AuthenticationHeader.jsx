import { useNavigate } from "react-router";
import { Logo } from "../../../../utils/IconsSrc";

const AuthenticationHeader = ({ title, subTitle }) => {
  const navigate = useNavigate();
  return (
    <section>
      <div className="flex justify-center  ">
        <Logo
          data-tooltip-target="tooltip-light"
          data-tooltip-style="light"
          className="cursor-pointer "
          onClick={() => navigate("/")}
        />
      </div>

      <p className="text-center font-[AraHamahBold] text-[48px] text-orange">
        {title}
      </p>
      <p className="text-center font-[AraHamah1964] text-[34px] text-lightgrey max-w-lg mx-auto">
        {subTitle}
      </p>
    </section>
  );
};

export default AuthenticationHeader;
