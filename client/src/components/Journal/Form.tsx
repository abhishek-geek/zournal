import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addJournal } from "../../reducers/journalReducer";
import Button from "../ui/Button";
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
      id: Number(d.getTime()),
      date: d,
      content,
    };
    console.log(entry);

    dispatch(addJournal(entry));
  };

  return (
    <div className="bg-green-100 mx-5">
      <form className="">
        {/* <Input type="text" label="Start writing" /> */}
        <textarea
          className="mt-5 p-2"
          rows={4}
          cols={50}
          placeholder="Start Writing..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button
          className="journal-submit"
          value="Submit"
          onClick={(e) => handleForm(e)}
        />
      </form>
    </div>
  );
};

export default Form;
