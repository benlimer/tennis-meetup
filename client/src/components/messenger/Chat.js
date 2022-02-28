import React, { useState, useEffect } from "react";

const Chat = ({ chat, currentUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {

    const getUser = async () => {
      try {
        const response = await fetch(`/api/v1/users/${chat.partnerId}`);
        const body = await response.json();
        setUser(body.user);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, chat]);

  return (
    <div className="chat">
      <img className="chatImg" src={user?.image} alt="" />
      <span className="chatName">{user?.name}</span>
    </div>
  );
};

export default Chat;
