import Select from "react-select";
import classNames from "classnames";

export const DropdownSelect = ({ options, helperText, ...props }) => {
  return (
    <div>
      <Select
        {...props}
        options={options}
        components={{
          IndicatorSeparator: () => null,
        }}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            borderRadius: "6px",
            border: "solid 2px  rgb(229 231 235)",
            boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
          }),
          placeholder: (baseStyles) => ({
            ...baseStyles,
            color: "rgb(148 163 184)",
          }),
        }}
        classNames={{
          control: (state) =>
            "block w-full h-full  text-[22px] px-4 rtl:px-2  font-[AraHamah1964]",

          option: ({ isDisabled, isFocused, isSelected }) =>
            classNames(
              isSelected && "bg-orange",
              !isSelected && isFocused && "bg-[#fed7aa]"
            ),
        }}
      />
      <small className="text-red-700">{helperText}</small>
    </div>
  );
};
