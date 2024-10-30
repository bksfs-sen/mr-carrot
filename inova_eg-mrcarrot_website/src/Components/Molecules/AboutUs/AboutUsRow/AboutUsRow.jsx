const AboutUsRow = ({ index, img, imgPlacement, title, details, list }) => {
  return (
    <div
      className={
        imgPlacement === "left"
          ? "sm:flex flex-row-reverse justify-center lg:justify-between md-justify-center  items-center lg:w-[100%] w-[93%] mx-auto flex-wrap"
          : "sm:flex justify-center lg:justify-between md-justify-center  lg:w-[100%] w-[93%] mx-auto flex-wrap"
      }
    >
      {/* <div
      // className={imgPlacement === "left" ? "xl:mr-[180px]" : "xl:ml-[180px] "}
      // className="m-auto"
      >
        <img
          src={img}
          alt={"about-us"}
          className="rounded-[1.8rem]  border-[6px] border-orange bg-[rgba(243, 131, 40, 0.24)] m-auto"
        />
      </div> */}
      <figure
        className="flex justify-center relative mx-auto"
        style={
          (index == 3 || index == 5) ? {
            maxHeight: "290px",
            marginBlock: "auto"        
          } : null
        }
      >
        <div className="absolute bg-[#f383283d] top-0 w-full h-full border-[6px] border-orange rounded-[19px] z-10"></div>
        <img className="w-[100%] rounded-[19px]" src={img} alt={"about-us"} />
      </figure>
      <div className="text-center w-[100%] md:w-[50%] lg:w-[40%] 2xl:w-[50%] ">
        <p className="text-lightgrey text-[46px] font-[AraHamahBold]">
          {title}
        </p>
        {
          details ? 
        <p className="text-lightgrey text-[30px] font-[AraHamah1964] ">
          {details}
        </p> : null
        }
        {
          list ? 
          <ul>
            <li>
              <p className="text-lightgrey text-[30px] font-[AraHamah1964] ">
                {list.details_title_1 ? <span className="block"> {list.details_title_1} </span> : null}
                {list.details_1}
              </p>
            </li>
            <li>
              <p className="text-lightgrey text-[30px] font-[AraHamah1964] ">
                {list.details_title_2 ? <span className="block"> {list.details_title_2} </span> : null}
                {list.details_2}
              </p>
            </li>
            <li>
              <p className="text-lightgrey text-[30px] font-[AraHamah1964] ">
                {list.details_title_3 ? <span className="block"> {list.details_title_3} </span> : null}
                {list.details_3}
              </p>
            </li>
            {
              list.details_4 ? <li>
                <p className="text-lightgrey text-[30px] font-[AraHamah1964] ">
                  {list.details_title_4 ? <span className="block"> {list.details_title_4} </span> : null}
                  {list.details_4}
                </p>
              </li> : null
            }
          </ul> : null
        }
      </div>
    </div>
  );
};

export default AboutUsRow;
