import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import door from "../../img/in.svg";
import { RootState } from "../../reducers/store";
import { registerUser } from "../../reducers/userReducer";
import { User } from "../../types";
import Button from "../ui/Button";
import Input from "../ui/Input";
import "./register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const routerHistory = useHistory();

  const user = useSelector(
    (state: RootState): User | null => state.currentUser
  );

  useEffect(() => {
    if (user) routerHistory.push("/");
  }, [user]);

  const handleRegister = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error("Validation failed");
      window.alert("Password missmatched");
      return;
    }
    const newUser = { name, email, password };
    const p = await registerUser(newUser)(dispatch);
    if (typeof p === typeof "error") {
      alert(p);
      console.log(p);
      return;
    }
    // console.log("reduse", p);

    // dispatch(p);
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
