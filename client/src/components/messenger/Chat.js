import React from "react";
import federer from "../../assets/federer.jpeg"

const Chat = (props) => {
  return (
    <div className="chat">
      <img className="chatImg" src={federer} alt=""/>
      <span className="chatName">{props.name}</span>
    </div>
  )
};

export default Chat;
