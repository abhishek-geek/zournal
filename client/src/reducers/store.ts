import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import journalReducer from "./journalReducer";
import currentUserReducer from "./currentUserReducer";

const reducer = combineReducers({
  journal: journalReducer,
  currentUser: currentUserReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
