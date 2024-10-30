import Button from "../../Atoms/Buttons/Button";
import StarRatings from "react-star-ratings";
import UserShell from "../../Atoms/Shells/UserShell";
import { useState } from "react";
import { withTranslation } from "react-i18next";

const RateOrderTemplate = ({ rateOrder }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  return (
    <main className="lg:w-[84%] w-[90%] mx-auto my-10">
      <UserShell className={"text-center text-lightgrey"}>
        <h1 className="text-[42px] ">Rate your Order</h1>
        <StarRatings
          rating={rating}
          changeRating={setRating}
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
        <h1 className="text-[28px]">Write your feedback (optional)</h1>
        <section className="flex justify-center gap-8  py-8 px-10  h-full rounded-[8px]">
          <textarea
            value={feedback}
            className=" mt-1 rounded-md shadow-sm border-1 block w-1/2 h-full  border-gray-300 pl-7 pr-12
                 focus:outline-none focus:ring focus:ring-white sm:text-[22px]  text-black font-[AraHamah1964]"
            id="exampleFormControlTextarea1"
            rows="5"
            name="message"
            onChange={(e) => {
              setFeedback(e.target.value);
            }}
          />
        </section>
        <Button
          onClick={() => rateOrder(feedback, rating)}
          name={"Submit"}
          buttonNameStyle={
            "bg-lime-400 hover:bg-lime-700 text-white font-[AraHamahBold] text-[30px] w-fit mb-6"
          }
        />
      </UserShell>
    </main>
  );
};

export default withTranslation()(RateOrderTemplate);
