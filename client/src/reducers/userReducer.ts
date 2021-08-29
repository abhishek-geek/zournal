import { GoogleUser, NewUser, User } from "../types";
import { AppDispatch } from "./store";
import userService from "../services/userServices";
import { getCurrentUser } from "../services/auth";
import { History } from "history";

interface Action1 {
  type: "LOGIN";
  data: User;
}
interface Action2 {
  type: "LOGOUT";
}
interface Action3 {
  type: "REGISTER";
  data: User;
}
interface Action4 {
  type: "INIT_USER";
  data: User | null;
}
interface Action5 {
  type: "GOOGLE_SIGNUP";
  data: User | null;
}
interface Action6 {
  type: "GOOGLE_LOGIN";
  data: User | null;
}
type Action = Action1 | Action2 | Action3 | Action4 | Action5 | Action6;

// const initialState = {
//   id: 1,
//   name: "Abhishek",
//   email: "root@root.com",
// };

const reducer = (state = null, action: Action): User | null => {
  switch (action.type) {
    case "LOGIN": {
      const newState = action.data;
      return newState;
    }

    case "GOOGLE_SIGNUP": {
      const newState = action.data;
      return newState;
    }

    case "GOOGLE_LOGIN": {
      const newState = action.data;
      return newState;
    }

    case "LOGOUT": {
      return null;
    }

    case "REGISTER": {
      return action.data;
    }

    case "INIT_USER": {
      return action.data;
    }

    default: {
      return state;
    }
  }
};

export const registerUser = (content: NewUser) => {
  return async (dispatch: AppDispatch) => {
    const [user, error] = await userService.register(content);
    if (error) {
      console.error(error.data.error);
      return error.data.error;
    }
    console.log(user);
    dispatch({
      type: "REGISTER",
      data: user,
    });
  };
};

export const googleSignup = (
  content: GoogleUser,
  history: History<unknown>
) => {
  return async (dispatch: AppDispatch) => {
    const [user, error] = await userService.registerWithGoogle(content);
    if (error) {
      console.error(error.data.error);
      alert(error.data.error);
      return;
    }
    console.log(user);
    dispatch({
      type: "GOOGLE_SIGNUP",
      data: user,
    });
    history.push("/");
  };
};

export const googleLogin = (content: GoogleUser, history: History<unknown>) => {
  return async (dispatch: AppDispatch) => {
    const [user, error] = await userService.loginWithGoogle(content);
    if (error) {
      console.error(error);
      // alert(error.data.error);
      return;
    }
    console.log(user);
    dispatch({
      type: "GOOGLE_LOGIN",
      data: user,
    });
    history.push("/");
  };
};

export const loginUser = (content: { email: string; password: string }) => {
  return async (dispatch: AppDispatch) => {
    const [user, error] = await userService.login(content);
    if (error) {
      console.error(error.data.error);
      return error.data.error;
    }
    console.log(user);
    dispatch({
      type: "LOGIN",
      data: user,
    });
  };
};

export const initUser = () => {
  return async (dispatch: AppDispatch) => {
    const user = getCurrentUser();
    console.log(user);
    dispatch({
      type: "INIT_USER",
      data: user,
    });
  };
};

export const logoutUser = () => {
  return async (dispatch: AppDispatch) => {
    window.localStorage.removeItem("token");
    dispatch({
      type: "LOGOUT",
    });
  };
};

export default reducer;
