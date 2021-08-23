import axios from "axios";
import { setToken } from "./auth";

const login = async (user: { email: string; password: string }) => {
  const res = await axios.post("/user/login", user);
  const thisUser = setToken(res.data.token);
  return thisUser;
};

const toExport = { login };

export default toExport;
