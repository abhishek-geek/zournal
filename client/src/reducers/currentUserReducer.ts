import { User } from "../types";
import { AppDispatch } from "./store";

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
  // console.log(content);
  const user = {
    id: 1,
    name: "Abhishek",
    email: content.email,
    password: content.password,
  };

  return async (dispatch: AppDispatch) => {
    // const anecdote = await anecService.create(content);
    // console.log("inside return fn");
    window.localStorage.setItem("user", JSON.stringify(user));
    console.log(window.localStorage.getItem("user"));

    dispatch({
      type: "LOGIN",
      data: user,
    });
  };
};

export const logoutUser = () => {
  return async (dispatch: AppDispatch) => {
    // const anecdotes = await anecService.getAll();
    window.localStorage.removeItem("user");
    dispatch({
      type: "LOGOUT",
    });
  };
};

export default reducer;
