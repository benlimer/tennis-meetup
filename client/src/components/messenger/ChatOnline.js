import React, { useState, useEffect } from "react";
import federer from "../../assets/federer.jpeg";

const ChatOnline = ({ onlineUser}) => {
  // const [friends, setFriends] = useState([])
  // const [onlineFriends, setOnlineFriends] = useState([])
  const [user, setUser] = useState(null)
  useEffect(() => {

    const getUser = async () => {
      try {
        const response = await fetch(`/api/v1/users/${onlineUser.userId}`);
        const body = await response.json();
        setUser(body.user);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [onlineUser]);

  
  return (
    <div className="chatOnline">
        <div className="chatOnlineFriend">
          <div className="chatOnlineImgContainer">
            <img className="chatOnlineImg" src={user?.image} />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{user?.name}</span>
        </div>
    </div>
  );
};

export default ChatOnline;
