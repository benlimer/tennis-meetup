import React from "react";
import federer from "../../assets/federer.jpeg";
import { format } from "timeago.js";


const Message = ({ user, messageContent }) => {
  return (
    <div className={user.name === messageContent.author ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageImg" src={federer} />
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
