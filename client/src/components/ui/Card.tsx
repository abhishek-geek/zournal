import React, { FC, ReactElement } from "react";
import "./Card.css";

interface Props {
  className?: string;
  heading: string;
  description?: string;
  children?: FC | Element | ReactElement;
  //   children?: any;
}

const Card = ({ className, heading, description, children }: Props) => {
  return (
    <div className={`card ${className} `}>
      <h2 className="head">{heading}</h2>
      <p className="desc">{description}</p>
      {children}
    </div>
  );
};

export default Card;
