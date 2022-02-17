import React, { useEffect, useState } from "react";
import { Redirect, withRouter } from "react-router";

const UserProfile = (props) => {
  const currentUserId = props.user.id;
  const playerId = props.match.params.id;

  const [user, setUser] = useState({
    name: "",
    email: "",
    skillLevel: "",
    location: "",
  });

  const [shouldRedirect, setShouldRedirect] = useState(false)

  const getUserData = async () => {
    const response = await fetch(`/api/v1/users/${playerId}`);
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const body = await response.json();
    setUser(body.user);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const goBackHandler = (event) => {
    setShouldRedirect(true)
  }

  if(shouldRedirect){
      return <Redirect push to="/find-players"/>
  }

  return (
    <div className="grid-container profile">
      <div className="grid-x grid-margin-x my-stuff">
          <a onClick={goBackHandler}>Back to player list</a>
        <div className="cell small-12">
          <h1>{user.name}</h1>

          <p className="user-info">
            Email: {user.email}
            <br />
            location: {user.location}
            <br />
            Skill Level: {user.skillLevel}
            <br />
          </p>
        </div>
        <div className="cell small-12 large-5">
          <h3>Matches</h3>
        </div>
      </div>
    </div>
  );
};

export default withRouter(UserProfile);
