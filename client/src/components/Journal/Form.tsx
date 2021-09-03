import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addJournal } from "../../reducers/journalReducer";
import Button from "../ui/Button/Button";
// import Input from "../ui/Input";
import "./journal.css";

const Form = () => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const handleForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(content);
    const d = new Date();
    const entry = {
      date: d,
      content,
    };
    setContent("");
    console.log(entry);

    dispatch(addJournal(entry));
  };
  const d = new Date();

  return (
    <div className="add-journal">
      <form className="">
        {/* <Input type="text" label="Start writing" /> */}
        <h1>{d.toUTCString().substr(0, d.toUTCString().length - 13)}</h1>
        <textarea
          className=""
          name="entry"
          rows={4}
          cols={50}
          placeholder="Start Writing..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button
          className="add-journal-btn"
          value="Submit"
          onClick={(e) => handleForm(e)}
        />
      </form>
    </div>
  );
};

export default Form;
