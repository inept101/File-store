import "./App.css";

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./Components/Signup";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Nav from "./Components/Nav";
import Check from "./Components/Check";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuth(true);
      setToken(localStorage.getItem("token"));
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  // console.log(token, user);

  return (
    <Router>
      <Nav user={user} />
      <Switch>
        <Route exact path="/" render={() => <Check isAuth={isAuth} />} />
        <Route
          exact
          path="/login"
          render={() => <Login user={user} setUser={setUser} />}
        />
        <Route exact path="/signup" render={() => <SignUp user={user} />} />
        <Route
          exact
          path="/dashboard"
          render={() => <Dashboard user={user} token={token} />}
        />
      </Switch>
    </Router>
  );
}

export default App;
