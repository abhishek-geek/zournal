import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Notification from "./components/ui/Notification";

function App() {
  // const [notification, setNotification] = useState({type: "error" | "info"})
  return (
    <div className="container p-4">
      <Notification type="error" message="oops 404" />
      <Notification type="info" message="Welcome" />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
