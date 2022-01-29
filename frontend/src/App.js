import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

import ImageBrowser from "./components/ImageBrowser";
import ImageDetailPage from "./components/ImageDetail";
import Splash from "./components/Splash";
import UserDetailPage from "./components/UserDetail";


function App() {
  const dispatch = useDispatch();
  const [isRestored, setIsRestored] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.sessionRestore()).then(() => setIsRestored(true));
  }, [dispatch]);

  return (<>
    <nav><Navigation isRestored={isRestored} /></nav>
    <div className="content">
      {isRestored && (
        < Switch >
          <Route path="/" exact>
            <Splash />
          </Route>
          <Route path="/images/:imageId"><ImageDetailPage /></Route>
          <Route path="/images"><ImageBrowser /></Route>
          <Route path="/users/:userId"><UserDetailPage /></Route>
        </Switch>)
      }
    </div>
  </>)
}

export default App;
