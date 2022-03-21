import React, { useEffect, useState } from "react";
import { Redirect, withRouter } from "react-router";
import MatchTile from "./MatchTile";

import PostMatchForm from "./PostMatchForm";

const UserProfile = (props) => {
  const currentUserId = props.user.id;
  const playerId = props.match.params.id;

  const [user, setUser] = useState({
    name: "",
    email: "",
    skillLevel: "",
    location: "",
    matches: [],
  });

  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [showPostMatchForm, setShowPostMatchForm] = useState(false);

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
    setShouldRedirect(true);
  };

  const postMatch = async (match) => {
    try {
      const response = await fetch(`/api/v1/users/${playerId}/matches/${currentUserId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(match),
      });
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const showPostMatchFormHandler = () => {
    setShowPostMatchForm(!showPostMatchForm);
  };

  const matchList = user.matches.map((match) => {
    if(currentUserId == match.hostId){
      return <MatchTile key={match.id} match={match} showId={match.hostId}/>;
    } else if(currentUserId == match.opponentId){
      return <MatchTile key={match.id} match={match} showId={match.opponentId}/>;
    }
  });

  if (shouldRedirect) {
    return <Redirect push to="/find-players" />;
  }

  return (
    <div className="grid-container profile">
      <div className="grid-x grid-margin-x my-stuff">
        <div className="cell nav-links small-12">
          <a className="btn back" onClick={goBackHandler}>
            Back
          </a>{" "}
          &nbsp;
          <a className="btn" onClick={showPostMatchFormHandler}>
            Post match results{" "}
          </a>
          {showPostMatchForm && (
            <PostMatchForm
              postMatch={postMatch}
              showPostMatchFormHandler={showPostMatchFormHandler}
            />
          )}
        </div>
        <div className="cell small-6">
          <h1>{user.name}</h1>

          <p className="user-info">
            Email: {user.email}
            <br />
            Zip: {user.location}
            <br />
            Skill Level: {user.skillLevel}
            <br />
          </p>
        </div>
        <div className="cell small-12 large-5">
          <h3>Matches</h3>
          <div className="overflow">{matchList}</div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(UserProfile);
