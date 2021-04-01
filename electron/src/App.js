import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Home from './components/Home';
import Users from "./components/Users";
import Groups from "./components/Groups";
import { getChannelMessages } from './store/channelMessages';
import { getChannel } from './store/channels';
import { getDirectMessages } from './store/directMessages';
import { getGroup } from './store/groups';
import { getNotification } from './store/notifications';
import { getUserGroup } from './store/userGroups';
import { getUsers } from './store/users';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(getChannelMessages());
    dispatch(getChannel());
    dispatch(getDirectMessages());
    dispatch(getGroup());
    dispatch(getNotification());
    dispatch(getUserGroup());
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path= '/users' >
            <Users />
          </Route>
          <Route path= '/groups' >
            <Groups />
          </Route>
          <Route path='/' exact >
            <Home />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
