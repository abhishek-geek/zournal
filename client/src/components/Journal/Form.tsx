import React from "react";
import Button from "../ui/Button";
// import Input from "../ui/Input";
import "./journal.css";

const Form = () => {
  const handleForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log("Form");
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
