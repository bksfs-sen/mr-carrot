import classNames from "classnames";
import React from "react";

const OrderCheckoutData = ({
  title,
  value,
  children,
  className,
  titleStyle,
}) => {
  return (
    <div className={classNames("flex text-[24px] md:text-[30px]", className)}>
      <h4 className={classNames("font-bold w-[30%]", titleStyle)}>{title}</h4>
      <p>{value}</p>
      {children}
    </div>
  );
};

export default OrderCheckoutData;
