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
      <div className="relative">
        <div className="p-6 max-w-sm bg-white rounded-xl shadow-md flex space-x-4 ">
          <div className="flex-shrink-0">
            <img className="h-12 w-12" src={bell} alt="ChitChat Logo" />
          </div>
          <div>
            <div className="text-xl font-medium text-primary">Error!</div>
            <p className="text-primary">{message}</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative">
      <div className="p-6 max-w-sm bg-white rounded-xl shadow-md flex space-x-4">
        <div className="flex-shrink-0">
          <img className="h-12 w-12" src={bell} alt="ChitChat Logo" />
        </div>
        <div>
          <div className="text-xl font-medium text-primary">Notification</div>
          <p className="text-gray-500">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
