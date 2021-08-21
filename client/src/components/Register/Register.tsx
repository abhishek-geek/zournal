import React, { useState } from "react";
import door from "../../img/in.svg";
import Button from "../ui/Button";
import Input from "../ui/Input";
import "./register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleRegister = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log("register");
  };
  return (
    <div className="modal bg-gray-300">
      <div className="modal-left">
        <h1 className="other">Hi, Let`s get started</h1>
        <form className="">
          <Input
            type="text"
            label="Name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <Input
            type="password"
            label="Repeat Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
          />
          <Button value="Submit" onClick={(e) => handleRegister(e)} />
        </form>
        {/* <div className="other">or</div> */}
      </div>
      <div className="modal-right">
        <img className="img" src={door} alt="door" />
      </div>
    </div>
  );
};

export default Register;
