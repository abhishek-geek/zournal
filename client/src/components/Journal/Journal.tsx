import React, { useState } from "react";
import { Journal, User } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/store";
import Button from "../ui/Button";
import Card from "../ui/Card";
import "./journal.css";
import Form from "./Form";
import Modal from "./Modal";
import { Redirect } from "react-router-dom";

const JournalView = () => {
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState<Journal | undefined>();

  const journal = useSelector((state: RootState): Journal[] => state.journal);
  const user = useSelector(
    (state: RootState): User | null => state.currentUser
  );

  const toogleFormVisibility = () => {
    setShowForm(!showForm);
  };

  const openModal = (entry: Journal) => {
    console.log("opening modal view", entry);
    setShowModal(true);
    setModal(entry);
  };

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="jj">
      {showForm ? (
        <Button
          className="new-journal"
          value="Close"
          onClick={() => toogleFormVisibility()}
        />
      ) : (
        <Button
          className="new-journal"
          value="New"
          onClick={() => toogleFormVisibility()}
        />
      )}

      {showForm && <Form />}

      {showModal && modal && (
        <Modal entry={modal} setShowModal={setShowModal} />
      )}

      {journal &&
        journal.map((entry: Journal) => (
          <Card
            onClick={() => openModal(entry)}
            key={entry.id}
            className="journal-card"
            heading={entry.date.toDateString()}
            description={entry.content}
          />
        ))}
    </div>
  );
};

export default JournalView;
