import classNames from "classnames";
import React from "react";

function UserShell({ children, className }) {
  const classes = classNames(
    className,
    "bg-[#FEF3E9] font-[AraHamah1964] rounded-[8px]"
  );
  return <div className={classes}>{children}</div>;
}

export default UserShell;
