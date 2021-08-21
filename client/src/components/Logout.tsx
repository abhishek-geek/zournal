import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { logoutUser } from "../reducers/currentUserReducer";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUser());
  }, []);

  return <Redirect to="/" />;
};

export default Logout;
