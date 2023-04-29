import React, { ReactNode } from "react";
import { classNames } from "../../../utils";
import "./index.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "gradient" | "success" | "danger";
  full?: boolean;
}

export default function Button({
  children,
  variant,
  full,
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames({
        "base-button": !variant,
        [`base-button--${variant}`]: variant,
        "w-full": full,
      })}
      {...props}
    >
      {children}
    </button>
  );
}
