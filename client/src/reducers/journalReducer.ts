import { Journal } from "../types";
import { AppDispatch } from "./store";

interface Action1 {
  type: "ADD_JOURNAL";
  data: Journal;
}
interface Action2 {
  type: "INIT_JOURNAL";
  data: Journal[];
}
type Action = Action1 | Action2;

const initialState = [
  {
    id: 1,
    date: new Date(2018, 11, 24, 10, 33, 30, 0),
    content: "This is content of this journal",
  },
];

const reducer = (state = initialState, action: Action): Journal[] => {
  switch (action.type) {
    case "ADD_JOURNAL": {
      console.log("inside addJo");

      return state.concat(action.data);
    }

    case "INIT_JOURNAL": {
      return action.data;
    }
    default: {
      const newState = state;
      return newState;
    }
  }
};

export const addJournal = (content: Journal) => {
  console.log(content);

  return async (dispatch: AppDispatch) => {
    // const anecdote = await anecService.create(content);
    console.log("inside return fn");

    dispatch({
      type: "ADD_JOURNAL",
      data: content,
    });
  };
};

export const initJournal = (anecdotes: Journal[]) => {
  return async (dispatch: AppDispatch) => {
    // const anecdotes = await anecService.getAll();
    dispatch({
      type: "INIT_JOURNAL",
      data: anecdotes,
    });
  };
};

export default reducer;
