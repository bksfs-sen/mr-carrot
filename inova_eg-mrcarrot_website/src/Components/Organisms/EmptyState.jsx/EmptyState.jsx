import React from "react";
import emptyStateLogo from "../../../Assets/Icons/emptyStateLogo.svg";
import UserShell from "../../Atoms/Shells/UserShell";
import Button from "../../Atoms/Buttons/Button";
import { useNavigate } from "react-router";
const EmptyState = ({ path, title, message, buttonName }) => {
  let navigate = useNavigate();
  return (
    <UserShell className=" h-full p-[10px] lg:p-[32px] mt-[30px] md:mt-0">
      <div className="text-center">
        <img className="mx-auto" src={emptyStateLogo} alt="logo" />
        <h3 className="font-bold text-[34px] text-[#F38328] mt-[15px] ">
          {title}
        </h3>
        <h4 className="text-[#A8A8A8] text-[26px] mb-[25px]">{message}</h4>
        <Button
          onClick={() => navigate(path)}
          name={buttonName}
          buttonNameStyle="font-bold text-[26px] !px-[24px] text-white bg-[#65A141] w-auto"
        />
      </div>
    </UserShell>
  );
};

export default EmptyState;
