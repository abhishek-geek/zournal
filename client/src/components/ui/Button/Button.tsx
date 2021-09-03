import React from "react";
import classes from "./Button.module.css";

interface Props {
  className?: string;
  value: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ value, className, onClick }: Props) => {
  return (
    <button onClick={onClick} className={`${className} ${classes.btn}`}>
      {value}
    </button>
  );
};

export default Button;
