import journalService from "../services/journalService";
import { IJournal, Journal } from "../types";
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
    _id: "string",
    date: new Date(2018, 11, 24, 10, 33, 30, 0),
    content: "This is content of this journal",
  },
];

const reducer = (state = initialState, action: Action): Journal[] | null => {
  switch (action.type) {
    case "ADD_JOURNAL": {
      let newState = state.concat(action.data);
      newState = newState.sort((a, b) => +new Date(b.date) - +new Date(a.date));
      return newState;
    }

    case "INIT_JOURNAL": {
      const newState = action.data.sort(
        (a, b) => +new Date(b.date) - +new Date(a.date)
      );
      return newState;
    }
    default: {
      const newState = state.sort(
        (a, b) => +new Date(b.date) - +new Date(a.date)
      );
      return newState;
    }
  }
};

export const addJournal = (content: IJournal) => {
  return async (dispatch: AppDispatch) => {
    const journal = await journalService.post(content);
    dispatch({
      type: "ADD_JOURNAL",
      data: journal,
    });
  };
};

export const initJournal = () => {
  return async (dispatch: AppDispatch) => {
    const journal = await journalService.getAll();
    dispatch({
      type: "INIT_JOURNAL",
      data: journal,
    });
  };
};

export default reducer;
