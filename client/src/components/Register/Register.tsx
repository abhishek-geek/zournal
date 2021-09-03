import React, { useEffect, useState } from "react";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import door from "../../img/in.svg";
import { RootState } from "../../reducers/store";
import { googleSignup, registerUser } from "../../reducers/userReducer";
import { User } from "../../types";
import Button from "../ui/Button/Button";
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
  };

  const googleSuccess = async (
    res: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ("tokenId" in res) {
      const result = res?.profileObj;
      const token = res?.tokenId;
      const user = {
        name: result.name,
        email: result.email,
        token: token,
      };
      try {
        dispatch(googleSignup(user, routerHistory));
      } catch (error) {
        console.log(error);
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const googleError = (er: any) => {
    console.log("Google Sign In was unsuccessful. Try again later");
    console.log(er);
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
        <div className="other">
          {console.log("id", process.env.REACT_APP_GOOGLE_CLIENT_ID)}
          <GoogleLogin
            clientId={String(process.env.REACT_APP_GOOGLE_CLIENT_ID)}
            buttonText="Signup with Google"
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy={"single_host_origin"}
            // responseType="code,token"
          />
        </div>
      </div>
      <div className="modal-right">
        <img className="img" src={door} alt="door" />
      </div>
    </div>
  );
};

export default Register;
