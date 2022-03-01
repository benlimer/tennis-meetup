import React from "react";

const SendMessageForm = ({ message, handleInputChange, handleSubmit }) => {
  const ignoreClick = (event) => {
    event.preventDefault();
  };
  return (
    <form className="send-message-form" onSubmit={handleSubmit}>
      <textarea
        name="message"
        placeholder="write something..."
        value={message}
        onChange={handleInputChange}
        onClick={ignoreClick}
      ></textarea>
      <input type="submit" value="Send" className="send-button" ></input>
    </form>
  );
};

export default SendMessageForm;
