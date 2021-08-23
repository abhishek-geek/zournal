import { User } from "../types";
import { AppDispatch } from "./store";
import userService from "../services/userServices";

interface Action1 {
  type: "LOGIN";
  data: User;
}
interface Action2 {
  type: "LOGOUT";
}
type Action = Action1 | Action2;

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

    case "LOGOUT": {
      return null;
    }
    default: {
      return state;
    }
  }
};

export const loginUser = (content: { email: string; password: string }) => {
  return async (dispatch: AppDispatch) => {
    const user = await userService.login(content);
    if (!user) return;
    console.log(user);
    dispatch({
      type: "LOGIN",
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
