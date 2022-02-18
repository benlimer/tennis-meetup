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
    matches: []
  });

  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [showPostMatchForm, setShowPostMatchForm] = useState(false)

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
        body: JSON.stringify(match)
      });
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
    } catch (error) {
        console.log(error)
    }
  };

  const showPostMatchFormHandler = () => {
      setShowPostMatchForm(!showPostMatchForm)
  }

  const matchList= user.matches.map((match) => {
    return <MatchTile key={match.id} match={match} />;
  });
  
  if (shouldRedirect) {
    return <Redirect push to="/find-players" />;
  }

  return (
    <div className="grid-container profile">
      <div className="grid-x grid-margin-x my-stuff">
        <a onClick={goBackHandler}>Back</a> &nbsp;
        <a onClick={showPostMatchFormHandler}>Post match results with this player</a>
        {showPostMatchForm && (
        <PostMatchForm
          postMatch={postMatch}
          showPostMatchFormHandler={showPostMatchFormHandler}
        />
      )}
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
          {matchList}
        </div>
      </div>
    </div>
  );
};

export default withRouter(UserProfile);
