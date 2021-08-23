import axios from "axios";
import { NewUser } from "../types";
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

const userService = { login, register };

export default userService;
