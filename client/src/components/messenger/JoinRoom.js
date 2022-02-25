import React, { useState } from "react";
import io from "socket.io-client";
import Messenger from "./Messenger";

const socket = io.connect("http://localhost:3001");

const JoinRoom = (props) => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true)
    }
  };

  return (
    <div className="join-room">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.currentTarget.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.currentTarget.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Messenger socket={socket} username={username} room={room} />
      )}
    </div>
  );
};

export default JoinRoom;