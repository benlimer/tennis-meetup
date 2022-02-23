import React from "react";
import federer from "../../assets/federer.jpeg"


const Message = ({own}) => {
  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
            <img className="messageImg" src={federer}/>
            <p className="messageText">Hello this is message</p>
        </div>
        <div className="messageBottom">1 hour ago</div>
    </div>
  );
};

export default Message;
