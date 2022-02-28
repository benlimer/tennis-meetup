import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"


const MyUserProfile = (props) => {
  const userId = props.user.id;

  const [user, setUser] = useState({
    name: "",
    email: "",
    skillLevel: "",
    location: "",
  });
  const [friends, setFriends] = useState([])

  const getUserData = async () => {
    const response = await fetch(`/api/v1/users/${userId}`)
    if(!response.ok){
      throw new Error(`${response.status} ${response.statusText}`)
    }
    const body = await response.json()
    setUser(body.user)
  };

  const getFriends = async () => {
    try{
      const response = await fetch('/api/v1/friends')
      if(!response.ok){
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const body = await response.json()
      setFriends(body.friends)
    }catch(error){
      console.log(`Error in fetch: ${error}`)
    }
  }

  useEffect(() => {
    getUserData();
    getFriends()
  }, []);

  const friendsList = friends?.map((friend) => {
    return <Link to={`/users/${friend.id}`}>{friend.name}</Link>
  })

  return (
    <div className="grid-container profile">
      <div className="grid-x grid-margin-x my-stuff">
        <div className="cell small-12">
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
