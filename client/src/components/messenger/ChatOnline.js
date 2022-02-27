import React, { useState } from "react";
import federer from "../../assets/federer.jpeg";

const ChatOnline = ({ onlineUsers, currentId }) => {
  // const [friends, setFriends] = useState([])
  // const [onlineFriends, setOnlineFriends] = useState([])
  return (
    <div className="chatOnline">
      {onlineUsers.map((onlineUser) => (
        <div className="chatOnlineFriend">
          <div className="chatOnlineImgContainer">
            <img className="chatOnlineImg" src={federer} />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{onlineUser.userName}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatOnline;
