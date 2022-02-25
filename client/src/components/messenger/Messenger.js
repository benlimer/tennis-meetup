import React, { useEffect, useState } from "react";
import ChatOnline from "./ChatOnline";
import Conversation from "./Conversation";
import Message from "./Message";
import ScrollToBottom from "react-scroll-to-bottom";

const Messenger = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage.trim() !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + (new Date(Date.now()).getMinutes()<10?'0':'') + new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("")
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  const displayMessageList = messageList.map((messageContent) => {
    return <Message messageContent={messageContent} username={username} />;
  });

  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input placeholder="Search for friends" className="chatMenuInput" />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          <div className="chatBoxTop">
            <ScrollToBottom className="message-container">{displayMessageList}</ScrollToBottom>
          </div>
          <div className="chatBoxBottom">
            <textarea
              placeholder="write something..."
              className="chatMessageInput"
              value={currentMessage}
              onChange={(event) => {
                setCurrentMessage(event.currentTarget.value);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
              }}
            ></textarea>
            <button className="chatSubmitButton" onClick={sendMessage}>
              Send &#9658;
            </button>
          </div>
        </div>
      </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">
          <ChatOnline />
        </div>
      </div>
    </div>
  );
};

export default Messenger;
