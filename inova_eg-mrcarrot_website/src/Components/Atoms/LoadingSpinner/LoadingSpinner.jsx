import classNames from "classnames";
import { FadeLoader } from "react-spinners";

export const LoadingSpinner = ({ spinnerStyle }) => {
  return (
    <div className={classNames(spinnerStyle, "flex justify-center")}>
      <FadeLoader color="#f38328" size="40" />
    </div>
  );
};
