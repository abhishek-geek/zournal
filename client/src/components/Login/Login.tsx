import React from "react";
import door from "../../img/in.svg";
import Button from "../ui/Button";
import Input from "../ui/Input";
import "./login.css";

const Login = () => {
  const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log("login");
  };
  return (
    <div className="modal bg-gray-300">
      <div className="modal-left">
        <h1 className="other">Welcome Back :)</h1>
        <form className="">
          <Input type="email" label="Email" />
          <Input type="password" label="Password" />
          <Button value="Submit" onClick={(e) => handleLogin(e)} />
        </form>
        {/* <div className="other">or</div> */}
      </div>
      <div className="modal-right">
        <img className="img" src={door} alt="door" />
      </div>
    </div>
  );
};

export default Login;
