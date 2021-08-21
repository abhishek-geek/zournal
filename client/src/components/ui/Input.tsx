import React from "react";

interface Props {
  type: "text" | "email" | "password";
  className?: "string";
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Input = ({ type, className, label, value, onChange }: Props) => {
  return (
    <input
      type={type}
      placeholder={label}
      className={`my-3 rounded ${className}`}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
