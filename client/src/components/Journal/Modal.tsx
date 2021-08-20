import React from "react";
import { Journal } from "../../types";
import "./journal.css";

interface Props {
  entry: Journal;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ entry, setShowModal }: Props) => {
  return (
    <div className="journal modal mt-40 h-40 bg-green-100  ">
      <div>
        <h1 className="modal-head">{entry.date.toString()}</h1>
        <p className="modal-content">{entry.content}</p>
      </div>
      <span
        onClick={() => setShowModal(false)}
        className="close-modal flex float-right cursor-pointer"
      >
        X
      </span>
    </div>
  );
};

export default Modal;
