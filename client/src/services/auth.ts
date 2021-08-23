import jwtDecode from "jwt-decode";
import { User } from "../types";

export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(authToken: string): User | null {
  console.log(authToken);

  window.localStorage.setItem("token", JSON.stringify(authToken));
  return getCurrentUser();
}

export function logout() {
  localStorage.removeItem("token");
}

export function getCurrentUser(): User | null {
  try {
    const jwt = String(localStorage.getItem("token"));
    return jwtDecode(jwt);
  } catch (ex) {
    console.error(ex.message);

    return null;
  }
}

const ex = {
  logout,
  getCurrentUser,
  getToken,
  setToken,
};

export default ex;
