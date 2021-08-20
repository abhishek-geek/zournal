import React, { useEffect, useState } from "react";
import { Journal } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { addJournal, initJournal } from "../../reducers/journalReducer";
import { RootState } from "../../reducers/store";
import Button from "../ui/Button";
import Card from "../ui/Card";
import "./journal.css";
import Form from "./Form";

const JournalView = () => {
  const [showForm, setShowForm] = useState(false);

  const journal = useSelector((state: RootState): Journal[] => state.journal);
  const dispatch = useDispatch();

  useEffect(() => {
    const entry = {
      id: 2,
      date: new Date(2018, 11, 24, 10, 33, 30, 0),
      content: "This is content of this journal from useEffect",
    };
    dispatch(addJournal(entry));
  }, [dispatch]);

  const addNew = () => {
    const d = new Date();
    const entry = [
      {
        id: Number(d.getTime()),
        date: new Date(2018, 11, 24, 10, 33, 30, 0),
        content: "1",
      },
      {
        id: Number(d.getTime()) + 1,
        date: new Date(2018, 11, 24, 10, 33, 30, 0),
        content: "2",
      },
    ];
    console.log(entry);

    dispatch(initJournal(entry));
  };

  const toogleFormVisibility = () => {
    // console.log(e.value);
    setShowForm(!showForm);
  };

  return (
    <div className="jj">
      <Button className="new-journal" value="Initialize" onClick={addNew} />
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

      {journal &&
        journal.map((entry: Journal) => (
          <Card
            className="journal-card"
            heading={entry.date.toDateString()}
            key={entry.id}
            description={entry.content}
          />
        ))}
    </div>
  );
};

export default JournalView;
