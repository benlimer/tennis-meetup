import React from "react";
import federer from "../../assets/federer.jpeg"

const ChatOnline = (props) => {
  return (
    <div className="chatOnline">
        <div className="chatOnlineFriend">
            <div className="chatOnlineImgContainer">
                <img className="chatOnlineImg" src={federer}/>
                <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">Federer</span>
        </div>
    </div>
  );
};

export default ChatOnline;
