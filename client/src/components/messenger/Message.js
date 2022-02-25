import React from "react";
import federer from "../../assets/federer.jpeg";

const Message = ({ username, messageContent }) => {
  return (
    <div className={username === messageContent.author ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageImg" src={federer} />
        <p className="messageText">{messageContent.message}</p>
      </div>
      <div className="messageBottom">
        <p id="time">{messageContent.time}</p>
        <p id="author">{messageContent.author}</p>
      </div>
    </div>
  );
};

export default Message;

