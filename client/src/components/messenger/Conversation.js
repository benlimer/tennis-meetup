import React from "react";
import federer from "../../assets/federer.jpeg"

const Conversation = (props) => {
  return (
    <div className="conversation">
      <img className="conversationImg" src={federer} alt=""/>
      <span className="conversationName">Roger Federer</span>
    </div>
  )
};

export default Conversation;
