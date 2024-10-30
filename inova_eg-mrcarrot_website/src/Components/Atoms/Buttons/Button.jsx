import classNames from "classnames";

const Button = ({
  name,
  width,
  height,
  buttonHoverStyle,
  buttonNameStyle,
  onClick,
  type,
  id,
  disabled,
  onSubmit,
}) => {
  return (
    <div className={classNames(width, height)}>
      <button
        disabled={disabled}
        id={id}
        onSubmit={onSubmit}
        onClick={onClick}
        className={classNames(
          "w-[177px] h-full  rounded-md  bg-white  font-medium text-orange  focus:outline-none focus:ring-2 focus:ring-transparent",
          buttonNameStyle,
          "w-auto",
          { "!bg-gray-400 !hover:bg-gray-400": disabled }
        )}
        type={type}
      >
        {name}
      </button>
    </div>
  );
};

export default Button;
