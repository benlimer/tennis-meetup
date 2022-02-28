import React, { useState, useEffect } from "react";
import { format } from "timeago.js";


const Message = ({ userId, friendId, messageContent }) => {
  
  const [user, setUser] = useState(null)
  const [friend, setFriend] = useState(null)
  useEffect(() => {

    const getUser = async () => {
      try {
        const response = await fetch(`/api/v1/users/${userId}`);
        const body = await response.json();
        setUser(body.user);
      } catch (err) {
        console.log(err);
      }
    };
    const getFriend = async () => {
      try {
        const response = await fetch(`/api/v1/users/${friendId}`);
        const body = await response.json();
        setFriend(body.user);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
    getFriend()
  }, [friendId]);

  return (
    <div className={user?.name === messageContent.author ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageImg" src={user?.name === messageContent.author ? user?.image : friend?.image} />
        <p className="messageText">{messageContent.text}</p>
      </div>
      <div className="messageBottom">
        <p id="time">{format(messageContent.createdAt)}</p>
        <p id="author">{messageContent.author}</p>
      </div>
    </div>
  );
};

export default Message;
