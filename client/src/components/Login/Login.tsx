import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import door from "../../img/in.svg";
import { loginUser } from "../../reducers/userReducer";
import Button from "../ui/Button";
import Input from "../ui/Input";
import "./login.css";
import { RootState } from "../../reducers/store";
import { User } from "../../types";

const Login = () => {
  const [email, setEmail] = useState("root@zournal.com");
  const [password, setPassword] = useState("root");
  const dispatch = useDispatch();
  const routerHistory = useHistory();

  const user = useSelector(
    (state: RootState): User | null => state.currentUser
  );

  useEffect(() => {
    if (user) routerHistory.push("/");
  }, [user]);

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const user = { email, password };
    // dispatch(loginUser(user));
    const p = await loginUser(user)(dispatch);
    if (typeof p === typeof "error") {
      alert(p);
      console.log(p);
      return;
    }
  };
  return (
    <div className="modal bg-gray-300">
      <div className="modal-left">
        <h1 className="other">Welcome Back :)</h1>
        <form className="">
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
