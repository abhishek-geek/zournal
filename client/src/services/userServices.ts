import axios from "axios";
import { GoogleUser, NewUser } from "../types";
import { setToken } from "./auth";

const login = async (user: { email: string; password: string }) => {
  try {
    const res = await axios.post("/user/login", user);
    const thisUser = setToken(res.data.token);
    return [thisUser, null];
  } catch (er) {
    console.error(er.response.data.error);
    return [null, er.response];
  }
};

const register = async (user: NewUser) => {
  try {
    const res = await axios.post("/user", user);
    const thisUser = setToken(res.data.token);
    return [thisUser, null];
  } catch (er) {
    console.error(er.response.data.error);
    return [null, er.response];
  }
};

const registerWithGoogle = async (user: GoogleUser) => {
  try {
    console.log("dfghj", user.token);

    const res = await axios.post("/user/google-signup", user, {
      headers: {
        Authorization: user.token,
      },
    });
    const thisUser = setToken(res.data.token);
    return [thisUser, null];
  } catch (er) {
    console.error(er.response.data.error);
    return [null, er.response];
  }
};

const loginWithGoogle = async (user: GoogleUser) => {
  try {
    const res = await axios.post("/user/google-login", user, {
      headers: {
        Authorization: user.token,
      },
    });
    const thisUser = setToken(res.data.token);
    return [thisUser, null];
  } catch (er) {
    console.error(er);
    return [null, er.response];
  }
};

const userService = { login, register, registerWithGoogle, loginWithGoogle };

export default userService;
