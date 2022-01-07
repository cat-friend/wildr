import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isRestored, setIsRestored] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.sessionRestore()).then(() => setIsRestored(true));
  }, [dispatch]);

  return isRestored && (
    <Switch>
      <Route path="/login">
        <LoginFormPage />
      </Route>
    </Switch>
  );
}

export default App;
