import classNames from "classnames";
import eye from "../../../Assets/Icons/eye.svg";
import unvisibleEye from "../../../Assets/Icons/unvisibleEye.svg";

const ShowHidePassword = ({ showPassword, setShowPassword, eyeIconStyle }) => {
  return (
    <>
      {showPassword ? (
        <img
          onClick={() => setShowPassword(!showPassword)}
          className={classNames(
            eyeIconStyle,
            "absolute ltr:right-[16px] rtl:left-[16px] cursor-pointer"
          )}
          src={unvisibleEye}
          alt="eyeHide"
        />
      ) : (
        <img
          onClick={() => setShowPassword(!showPassword)}
          className={classNames(
            eyeIconStyle,
            "absolute ltr:right-[16px] rtl:left-[16px] cursor-pointer"
          )}
          src={eye}
          alt="eye"
        />
      )}
    </>
  );
};

export default ShowHidePassword;
