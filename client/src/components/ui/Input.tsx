import React from "react";

interface Props {
  type: "text" | "email" | "password";
  className?: "string";
  label: string;
}

const Input = ({ type, className, label }: Props) => {
  return (
    <input
      type={type}
      placeholder={label}
      className={`my-3 rounded ${className}`}
    />
  );
};

export default Input;
