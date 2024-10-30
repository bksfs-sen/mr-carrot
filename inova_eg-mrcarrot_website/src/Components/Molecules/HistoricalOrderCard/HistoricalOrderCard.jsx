import Button from "../../Atoms/Buttons/Button";
import { NavLink } from "react-router-dom";
import React from "react";
import StarRatings from "react-star-ratings";
import UserShell from "../../Atoms/Shells/UserShell";
import classNames from "classnames";

const HistoricalOrderCard = ({ order, t, Reorder }) => {
  const date = new Date(order?.start_date);
  const Data = [
    { title: order?.package_name },
    { title: t("order.applicantName"), value: order?.applicant_name },
    {
      title: t("order.startDate"),
      value: order?.start_date
        ? date.getDate() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getFullYear()
        : "",
    },
    { title: t("order.numOfMonths"), value: order?.num_of_months },
  ];
  return (
    <UserShell className="px-6 py-[25px] mb-8 mt-[40px] md:mt-0">
      <div className="space-y-1">
        {Data.map((row, i) => (
          <div className="sm:flex relative gap-3" key={i}>
            <h3
              className={classNames(
                "font-[AraHamahBold] text-[30px] text-lightgrey w-[25%]",
                { "text-[36px]": i === 0 }
              )}
            >
              {row.title}
            </h3>
            <p className="font-[AraHamah1964] text-[30px] text-lightgrey">
              {row.value}
            </p>
          </div>
        ))}
      </div>
      <div className="w-1/3">
        {order?.review ? (
          <StarRatings
            rating={order?.review?.rate}
            numberOfStars={5}
            name="rating"
            starRatedColor="#F38328"
            starHoverColor="#F38328"
            starEmptyColor="#BBBBBB"
            starDimension="25px"
            starSpacing="2px"
            svgIconViewBox="0 0 22 21"
            svgIconPath="M22 8.138a.956.956 0 0 1-.344.635l-4.8 4.685 1.137 6.616a1.968 1.968 0 0 1 .013.265.781.781 0 0 1-.139.47.467.467 0 0 1-.4.192 1.067 1.067 0 0 1-.529-.159L11 17.718l-5.936 3.123a1.121 1.121 0 0 1-.529.159.48.48 0 0 1-.416-.192.784.784 0 0 1-.139-.47 2.165 2.165 0 0 1 .026-.265l1.137-6.616L.331 8.773A1.008 1.008 0 0 1 0 8.138q0-.489.741-.609l6.637-.966 2.974-6.02Q10.6 0 11 0t.648.543l2.975 6.021 6.637.966q.741.119.741.609z"
          />
        ) : (
          <NavLink
            className={"w-fit text-lime-600 text-[30px] font-[AraHamahBold]"}
            to={`/add-review/${order?.id}`}
          >
            Rate Order
          </NavLink>
        )}
        <Button
          name={t("Reorder")}
          buttonNameStyle={
            "bg-lime-400 hover:bg-lime-700 text-white font-[AraHamahBold] text-[30px]  mt-10"
          }
          onClick={() => Reorder(order)}
        />
      </div>
    </UserShell>
  );
};

export default HistoricalOrderCard;
