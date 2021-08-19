import React from "react";
// import logo from "../../img/logo.svg";
import bell from "../../img/bell.gif";

interface Props {
  type: "error" | "info";
  message: string;
}

const Notification = ({ type, message }: Props) => {
  if (type === "error") {
    return (
      <div className="p-6 max-w-sm bg-white rounded-xl shadow-md flex space-x-4 float-right">
        <div className="flex-shrink-0">
          <img className="h-10 w-10" src={bell} alt="Bell" />
        </div>
        <div>
          <div className="text-xl font-medium text-primary">Error!</div>
          <p className="text-primary">{message}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="p-6 max-w-sm bg-white rounded-xl shadow-md flex space-x-4 float-right">
      <div className="flex-shrink-0">
        <img className="h-12 w-12" src={bell} alt="ChitChat Logo" />
      </div>
      <div>
        <div className="text-xl font-medium text-black">Notification</div>
        <p className="text-gray-500">{message}</p>
      </div>
    </div>
  );
};

export default Notification;
