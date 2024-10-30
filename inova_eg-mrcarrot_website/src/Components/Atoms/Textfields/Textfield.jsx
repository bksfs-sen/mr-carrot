import classNames from "classnames";

const Textfield = ({
  readOnly,
  label,
  placeholder,
  height,
  width,
  placeholderStyle,
  name,
  id,
  margin,
  value,
  onChange,
  helperText,
  error,
  type,
  dir,
  onBlur,
  onClick,
}) => {
  // console.log(helperText);
  return (
    <div className={margin} onClick={onClick}>
      {label && (
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div
        className={classNames(
          "relative mt-1 rounded-md shadow-sm border-2",
          height,
          width
        )}
      >
        <input
          readOnly={readOnly}
          dir={dir}
          type={type ? type : "text"}
          name={name}
          value={value}
          onChange={onChange}
          error={error}
          id={id}
          onBlur={onBlur}
          className={classNames(
            "block w-full h-full rounded-md border-gray-300 pl-7  focus:outline-orange focus:ring focus:ring-white sm:text-[22px]  text-white font-[AraHamah1964]",
            placeholderStyle
          )}
          placeholder={placeholder}
        />
        {helperText && (
          <small className="text-red-700 mt-3">{helperText}</small>
        )}
      </div>
    </div>
  );
};

export default Textfield;
