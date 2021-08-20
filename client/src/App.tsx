import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import NavBar from "./components/NavBar/NavBar";
import Journal from "./components/Journal/Journal";

function App() {
  // const [notification, setNotification] = useState({type: "error" | "info"})
  return (
    <div className="container">
      <NavBar />
      <div className="mt-12">
        <Switch>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/journals" exact>
            <Journal />
          </Route>
          <Route path="/404" exact>
            <h1 className="head">4 0 4</h1>
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
          <Redirect to="/404" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
