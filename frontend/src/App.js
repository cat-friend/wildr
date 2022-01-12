import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LoginFormPage from "./components/LoginFormPage";
import { SignUpFormPage } from "./components/SignupFormPage";
import ImageBrowser from "./components/ImageBrowser";


function App() {
  const dispatch = useDispatch();
  const [isRestored, setIsRestored] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.sessionRestore()).then(() => setIsRestored(true));
  }, [dispatch]);

  return (<>
    <nav><Navigation isRestored={isRestored} /></nav>
    <div>
      {isRestored && (< Switch >
        <Route path="/signup">
          <SignUpFormPage />
        </Route>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/images/:imageId"><h1>Hello!</h1></Route>
        <Route path="/images"><ImageBrowser /></Route>
      </Switch>)
      }
    </div>
  </>)
}

export default App;
