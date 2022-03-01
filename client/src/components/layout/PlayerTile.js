import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import SendMessageForm from "./SendMessageForm";

const PlayerTile = ({ player, addFriend, deleteFriend, user }) => {
  const { id, name, skillLevel, city, state, age, gender, distance, friendship, image } = player;
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [isNewChat, setIsNewChat] = useState(false);

  let roundedDistance = Math.round(distance);

  const hasChat = async () => {
    try {
      const response = await fetch(`/api/v1/chats/user/${id}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const data = await response.json();
      data.message ? setIsNewChat(false) : setIsNewChat(true);
    } catch (error) {
      console.log(`Error in fetch: ${error}`);
    }
  };
  useEffect(() => {
    hasChat();
  }, []);

  const addFriendHandler = (event) => {
    event.preventDefault();
    addFriend(id);
  };

  const deleteFriendHandler = (event) => {
    event.preventDefault();
    deleteFriend(id);
  };

  let addFriendButton = friendship ? (
    <button className="friend-button" onClick={deleteFriendHandler}>
      Unfriend
    </button>
  ) : (
    <button className="friend-button" onClick={addFriendHandler}>
      Add Friend
    </button>
  );

  const handleInputChange = (event) => {
    setMessage(event.currentTarget.value);
  };

  const sendMessageHandler = (event) => {
    event.preventDefault();
    isNewChat ? setShowMessageForm((prev) => !prev) : setShouldRedirect(true);
  };

  const startChat = async (messageText) => {
    try {
      const message = {
        senderId: user.id,
        receiverId: player.id,
        text: messageText,
        author: user.name,
      };

      const response = await fetch(`/api/v1/chats/new`, {
        method: "post",
        body: JSON.stringify(message),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    startChat(message);
    setShouldRedirect(true);
  };

  if (shouldRedirect) {
    return <Redirect push to="/messenger" />;
  }
  let messageButton;
  if (friendship) {
    messageButton = (
      <button className="message-button" onClick={sendMessageHandler}>
        Send Message
      </button>
    );
  }

  return (
    <div className="Player cell card small-12 medium-6 large-4">
      <div className="card-section grid-x">
        <div className="Player-name cell small-6">
          <img className="profile-pic" src={image}></img>
          <h4>{name}</h4>
          <p className="distance">{roundedDistance}Km away</p>
        </div>
        <div className="Player-detail cell small-6">
          <Link to={`/users/${id}`}>
            <p>
              <strong>Skill Level: </strong>
              {skillLevel}
            </p>
            <p>
              <strong>Location: </strong>
              {city}, {state}
            </p>
            <p>
              <strong>Age: </strong>
              {age}{" "}
            </p>
            <p>
              <strong> Gender: </strong>
              {gender}
            </p>
          </Link>
          {messageButton}
          {addFriendButton}
          {showMessageForm && (
            <SendMessageForm
              message={message}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerTile;
