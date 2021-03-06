import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import MyUserProfile from "./layout/MyUserProfile";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute";
import Index from "./layout/Index";
import PlayerList from "./layout/PlayerList";
import CourtList from "./layout/CourtList";
import UserProfile from "./layout/UserProfile";
import Messenger from "./messenger/Messenger";
import AdditionalRegForm from "./registration/AdditionalRegForm";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (err) {
      setCurrentUser(undefined);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/" component={Index} />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/users/additional">
            <AdditionalRegForm user={currentUser} setCurrentUser={setCurrentUser}/>
        </Route>
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <AuthenticatedRoute exact path="/find-players" component={PlayerList} user={currentUser} />
        <AuthenticatedRoute
          exact
          path="/my-user-profile"
          component={MyUserProfile}
          user={currentUser}
        />
        <AuthenticatedRoute exact path="/users/:id" component={UserProfile} user={currentUser} />
        <AuthenticatedRoute exact path="/messenger" component={Messenger} user={currentUser} />
        <Route exact path="/courts" component={CourtList} />
      </Switch>
    </Router>
  );
};

export default hot(App);
