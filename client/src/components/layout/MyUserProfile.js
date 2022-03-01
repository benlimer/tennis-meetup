import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyUserProfile = ({ user }) => {
  const [friends, setFriends] = useState([]);

  const getFriends = async () => {
    try {
      const response = await fetch("/api/v1/friends");
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const body = await response.json();
      setFriends(body.friends);
    } catch (error) {
      console.log(`Error in fetch: ${error}`);
    }
  };

  useEffect(() => {
    getFriends();
  }, []);

  const friendsList = friends?.map((friend) => {
    return (
      <div>
        <div className="friend-tile">
          <Link to={`/users/${friend.id}`} className="friend-list">
            <img className="friend-profile-pic" src={friend.image} alt="profile-picture"></img>
            {friend.name}
          </Link>
        </div>
      </div>
    );
  });

  return (
    <div className="grid-container profile">
      <div className="grid-x grid-margin-x ">
        <div className="cell small-12">
          <img className="profile-pic my" src={user.image}></img>
          <h1>My profile</h1>
          <p className="user-info">
            Name: {user.name}
            <br />
            Email: {user.email}
            <br />
            location: {user.location}
            <br />
            Skill Level: {user.skillLevel}
            <br />
          </p>
        </div>
        <div className="cell small-12 large-5">
          <h3>My Matches</h3>
        </div>

        <div className="cell small-12 large-7">
          <h3>Friends</h3>
          {friendsList}
        </div>
      </div>
    </div>
  );
};

export default MyUserProfile;
