import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PlayerTile = ({ player, addFriend, deleteFriend }) => {
  const { id, name, skillLevel, city, state, age, gender, distance, friendship, image } = player;

  let roundedDistance = Math.round(distance);

  const getFriendship = async () => {
    try {
      const response = await fetch(`/api/v1/friends/friendship/${id}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const data = await response.json();
    } catch (error) {
      console.log(`Error in fetch: ${error}`);
    }
  };

  useEffect(() => {
    getFriendship();
  }, []);

  const addFriendHandler = (event) => {
    event.preventDefault();
    addFriend(id);
  };

  const deleteFriendHandler = (event) => {
    event.preventDefault();
    deleteFriend(id);
  };

  let addFriendButton = friendship ? (
    <button className="friend-button" onClick={deleteFriendHandler}>
      Unfriend
    </button>
  ) : (
    <button className="friend-button" onClick={addFriendHandler}>
      Add Friend
    </button>
  );

  return (
    <div className="Player cell card small-12 medium-6 large-4">
      <Link to={`/users/${id}`}>
        <div className="card-section grid-x">
          <div className="Player-name cell small-6">
          <img className="profile-pic" src={image} alt="profile-picture"></img>
            <h4>{name}</h4>
            <p className="distance">{roundedDistance}Km away</p>
          </div>
          <div className="Player-detail cell small-6">
            <p>
              <strong>Skill Level: </strong>
              {skillLevel}
            </p>
            <p>
              <strong>Location: </strong>
              {city}, {state}
            </p>
            <p>
              <strong>Age: </strong>
              {age}{" "}
            </p>
            <p>
              <strong> Gender: </strong>
              {gender}
            </p>

            {addFriendButton}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PlayerTile;
