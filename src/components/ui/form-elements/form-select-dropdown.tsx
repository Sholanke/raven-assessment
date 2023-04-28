import React, {
  Children,
  ReactNode,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { classNames } from "../../../utils";
import { SvgAngleDown, SvgCircleCheck } from "../icons";
import useClickOutside from "../../../hooks/useClickOutside";

interface FormSelectDropDownProps {
  options: { value: string; label: string; icon?: string }[];
  title: string;
  onChange: (value: string) => void;
  value: string;
  children?: ReactNode;
}

export default function FormSelectDropDown({
  options,
  title,
  onChange,
  value: selectedValue,
  children,
}: FormSelectDropDownProps) {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const selectedOptionData = useMemo(
    () => options.find((opt) => opt.value === selectedValue),
    [selectedValue]
  );

  const toggleDropdown = () => setIsOpen(!isOpen);

  const modifiedChildren = children
    ? Children.map(children, (child: any) =>
        cloneElement(child, { onClick: toggleDropdown })
      )
    : null;

  useEffect(() => {
    const firstOption = options?.[0]?.value;
    if (!firstOption) return;
    onChange(firstOption);
  }, []);

  useClickOutside(() => {
    setIsOpen(false);
  }, dropdownRef?.current);

  return (
    <div className="form-select-dropdown" ref={dropdownRef}>
      {modifiedChildren ? (
        modifiedChildren
      ) : (
        <button
          className="form-select-dropdown__trigger"
          onClick={toggleDropdown}
        >
          {selectedOptionData?.label || `Select ${title}`}
          <SvgAngleDown />
        </button>
      )}

      <div
        className={classNames("form-select-dropdown__dropdown", {
          "active": isOpen,
        })}
      >
        {options.map(({ label, value, icon }, i) => (
          <button
            className={classNames("form-select-dropdown__dropdown__item", {
              active: value === selectedValue,
            })}
            onClick={() => {
              setTimeout(() => setIsOpen(false), 80); // wait for select animation
              onChange(value);
            }}
            key={value}
          >
            {icon ? (
              <div className="form-select-dropdown__dropdown__item__icon-container">
                <img
                  className="form-select-dropdown__dropdown__item__icon"
                  src={icon}
                  alt={value}
                />
                {value === selectedValue ? (
                  <SvgCircleCheck className="form-select-dropdown__dropdown__item__tick" />
                ) : null}
              </div>
            ) : null}

            <div>
              <p>{label}</p>
              {icon ? value : null}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
