import { ButtonHTMLAttributes } from "react";
import classes from "./botton.module.scss";
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  outline?: boolean;
  size?: "small" | "medium" | "large";
};
const Botton = ({
  outline,
  children,
  className,
  size = "large",
  ...others
}: ButtonProps) => {
  return (
    <button
      {...others}
      className={`${classes.button} ${classes[size]} ${
        outline ? classes.outline : ""
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Botton;
