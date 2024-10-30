import Button from "../../Atoms/Buttons/Button";
import { CheckmarkIcon } from "../../../utils/IconsSrc";
import { withTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import Modal from "../../Organisms/Common/Modal";

const PackageCard = ({ item, t, subscribeToPackage, showButton }) => {
  let cartPage = window.location.pathname.includes("cart");
  const [showModal, setShowModal] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const dataForDisplay = expanded
    ? item?.package_meals
    : item?.package_meals?.slice(0, 2);
  return (
    <div
      className={
        cartPage
          ? "border-[3px] border-orange rounded-[1.7rem] w-full  sm:w-[400px] flex flex-col !h-full bg-[#fff] "
          : "border-[3px] border-orange rounded-[1.7rem]  lg:w-full flex flex-col  bg-[#fff]"
      }
    >
      <figure>
        <img
          src={item?.image_url}
          className=" rounded-t-3xl w-[100%] m-auto h-[100%] max-h-[300px]"
        />
      </figure>
      <div className="pl-4 xl:pl-8 pt-5 pr-3">
        <p className="mb-3 text-[36px]"> {item?.name}</p>
        <div className="flex mb-6 space-x-2 ">
          <p className="xl:text-[80px]  text-[50px] leading-[1.2rem] text-orange  items-end">
            {`${item?.price} SAR`}{" "}
            <sub className="xl:text-[28px] text-[20px] !text-[#525252] whitespace-nowrap">
              {" "}
              {t("packages.perMonth")}{" "}
            </sub>
          </p>
        </div>
      </div>

      <div className={"grow pl-4 xl:pl-8 space-y-3 pr-3"}>
        {dataForDisplay?.map((meal, i) => {
          return (
            <div className="flex items-center  gap-4" key={meal?.meal_id}>
              <figure>
                <CheckmarkIcon className="" />
              </figure>
              <p className="text-[22px]">
                {expanded
                  ? meal?.meal_description
                  : i >= 1 && item?.package_meals?.length > 2
                  ? meal?.meal_description.length > 100
                    ? meal?.meal_description.substring(0, 100).concat("...")
                    : meal?.meal_description
                  : meal?.meal_description}
              </p>
            </div>
          );
        })}
        {dataForDisplay?.length !== 0 && item?.package_meals?.length !== 2 && (
          <Button
            type="button"
            // onClick={() => setExpanded(!expanded)}
            // name={expanded ? t("packages.showLess") : t("packages.showMore")}
            onClick={() => setShowModal(true)}
            name={t("packages.showMore")}
            buttonNameStyle={
              "text-[25px] focus:ring-0  border-lime-600 text-lime-600 font-bold mb-2 !pl-0"
            }
          />
        )}
      </div>

      {showButton && (
        <Button
          name={t("packages.subscribe")}
          buttonNameStyle={
            "mx-8 mb-6 h-max bg-lime-400 hover:bg-lime-700  !px-0 text-white font-[AraHamahBold] text-[30px] !w-[177px] mt-2"
          }
          onClick={() => subscribeToPackage(item?.id)}
        />
      )}
      {
        showModal ?
          <Modal
            showModal={showModal}
            setShowModal={() => setShowModal(!showModal)}
            modalClassName="!w-[616px] !min-h-[185px]  pb-8 px-10"
          >
            <figure className="mt-8">
              <img
                src={item?.image_url}
                className=" rounded-t-3xl w-[100%] m-auto h-[100%] max-h-[300px]"
              />
            </figure>
            <div className=" pt-5 px-4  ">
              <p className="mb-3 text-[36px]"> {item?.name}</p>
              <div className="flex mb-2 space-x-2">
                <p className="sm:text-[80px] text-[50px] leading-10 text-orange">{`${item?.price} SAR`}</p>
                <p className="text-[28px] mt-3"> {t("packages.perMonth")} </p>
              </div>
            </div>
            <div className={"grow  px-4 space-y-3"}>
              {item?.package_meals?.map((meal) => {
                return (
                  <div className="flex items-center  gap-4" key={meal?.meal_id}>
                    <figure>
                      <CheckmarkIcon className="" />
                    </figure>
                    <p className="text-[22px]">{meal?.meal_description}</p>
                  </div>
                );
              })}
            </div>
            {showButton && (
              <Button
                name={t("packages.subscribe")}
                buttonNameStyle={
                  "mx-8 mb-6 h-max bg-lime-400 hover:bg-lime-700  !sm:px-7 !px-0 text-white font-[AraHamahBold] text-[30px] !w-[177px] mt-2 "
                }
                onClick={() => subscribeToPackage(item?.id)}
              />
            )}
          </Modal>
        : null
      }
    </div>
  );
};

export default withTranslation()(PackageCard);
