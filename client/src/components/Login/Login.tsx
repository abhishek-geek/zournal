import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import door from "../../img/in.svg";
import { loginUser, googleLogin } from "../../reducers/userReducer";
import Button from "../ui/Button/Button";
import Input from "../ui/Input";
import "./login.css";
import { RootState } from "../../reducers/store";
import { User } from "../../types";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

const Login = () => {
  const [email, setEmail] = useState("test@zournal.com");
  const [password, setPassword] = useState("test");
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
  const googleSuccess = async (
    res: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ("tokenId" in res) {
      const result = res?.profileObj;
      const token = res?.tokenId;
      console.log(token);

      const user = {
        name: result.name,
        email: result.email,
        token: token,
      };
      try {
        dispatch(googleLogin(user, routerHistory));
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
        <div className="other">
          <GoogleLogin
            clientId={String(process.env.REACT_APP_GOOGLE_CLIENT_ID)}
            buttonText="Signin with Google"
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

export default Login;
