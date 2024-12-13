import { InputHTMLAttributes } from "react";
import classes from "./input.module.scss";
type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: string;
  size?: "small" | "medium" | "large";
};
const Input = ({ label, size, width, ...others }: InputProps) => {
  return (
    <div className={`${classes.root} ${classes[size || "large"]}`}>
      {label ? (
        <label className={classes.label} htmlFor={others.id}>
          {label}
        </label>
      ) : null}
      <input
        {...others}
        style={{
          width: width ? `${width}px` : "100%",
        }}
      />
    </div>
  );
};

export default Input;
