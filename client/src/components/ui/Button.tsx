import React from "react";

interface Props {
  className?: string;
  value: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ value, className, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`${className} bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded`}
    >
      {value}
    </button>
  );
};

export default Button;
