import React, { useEffect, useState } from "react";
import { Journal, User } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers/store";
import Button from "../ui/Button/Button";
import Card from "../ui/Card";
import "./journal.css";
import Form from "./Form";
import Modal from "./Modal";
import { Redirect } from "react-router-dom";
import { initJournal } from "../../reducers/journalReducer";

const JournalView = () => {
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState<Journal | undefined>();

  const journal = useSelector((state: RootState): Journal[] => state.journal);
  const user = useSelector(
    (state: RootState): User | null => state.currentUser
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initJournal());
  }, []);

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
    <div className="journal-view">
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

      <div className="journals">
        {journal &&
          journal.map((entry: Journal) => {
            const d = new Date(entry.date);

            return (
              <Card
                onClick={() => openModal(entry)}
                key={entry._id}
                className="journal-card"
                heading={d.toUTCString().substr(0, d.toUTCString().length - 13)}
                description={entry.content}
              />
            );
          })}
      </div>
    </div>
  );
};

export default JournalView;
