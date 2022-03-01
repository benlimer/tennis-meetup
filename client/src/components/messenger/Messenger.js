import React, { useEffect, useState, useRef } from "react";
import ChatOnline from "./ChatOnline";
import Chat from "./Chat";
import Message from "./Message";
import ScrollToBottom from "react-scroll-to-bottom";
import io from "socket.io-client";

const Messenger = ({ user }) => {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [search, setSearch] = useState("")
  const socket = useRef();

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      socket.current = io("ws://localhost:3001");
    } else {
      socket.current = io("https://tennis-meetup.herokuapp.com/");
    }
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        senderId: data.senderId,
        receiverId: data.receiverId,
        text: data.text,
        author: data.author,
        chatId: data.chatId,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user.id, user.name);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.messages.some(
        (message) =>
          message.senderId == arrivalMessage.senderId ||
          message.receiverId == arrivalMessage.senderId
      ) &&
      setCurrentChat({ ...currentChat, messages: currentChat.messages.concat(arrivalMessage) });
  }, [arrivalMessage]);

  useEffect(() => {
    const getChats = async () => {
      try {
        const response = await fetch("/api/v1/chats");
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        const body = await response.json();
        setChats(body.chats);
      } catch (err) {
        console.log(err);
      }
    };
    getChats();
  }, [user.id, currentChat]);

  const onChangeHandler = (event) => {
    setSearch(event.currentTarget.value)
  }
  let searchedChats = chats.filter((chat) => {
    const friendMessage = chat.messages.find((message) => message.author !== user.name)
    const friendName = friendMessage.author.toLowerCase()
    return friendName.includes(search)
  })
  let mappedChat = search ? searchedChats : chats

  const displayChatList = mappedChat.map((chat) => {
    const firstIncomingMessage = chat.messages.find((message) => message.author !== user.name);
    if(firstIncomingMessage){
      chat.partnerId = firstIncomingMessage.senderId;
    } else {
      chat.partnerId = chat.messages[0].receiverId
    }
    return (
      <div onClick={() => setCurrentChat(chat)}>
        <Chat chat={chat} currentUser={user} search={search}/>
      </div>
    );
  });
  

  const displayMessageList = currentChat?.messages.map((messageContent) => {
    return (
      <Message messageContent={messageContent} userId={user.id} friendId={currentChat.partnerId} />
    );
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const message = {
      senderId: user.id,
      receiverId: currentChat.partnerId,
      text: newMessage,
      chatId: currentChat.id,
      author: user.name,
    };
    if (onlineUsers.some((onlineUser) => onlineUser.userId == currentChat.partnerId)) {
      socket.current.emit("sendMessage", {
        senderId: user.id,
        receiverId: currentChat.partnerId,
        text: newMessage,
        chatId: currentChat.id,
        author: user.name,
      });
    }

    try {
      const response = await fetch(`/api/v1/chats`, {
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
      const updatedMessages = currentChat.messages.concat(body);
      setCurrentChat({ ...currentChat, messages: updatedMessages });
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  const displayOnlineUsersList = onlineUsers.map((onlineUser) => {
    return <ChatOnline onlineUser={onlineUser} />;
  });

  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input placeholder="Search for friends" className="chatMenuInput" onChange={onChangeHandler} value={search}/>
          {displayChatList}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {currentChat ? (
            <>
              <div className="chatBoxTop">
                <ScrollToBottom className="message-container">{displayMessageList} </ScrollToBottom>
              </div>
              <div className="chatBoxBottom">
                <textarea
                  placeholder="write something..."
                  className="chatMessageInput"
                  onChange={(event) => setNewMessage(event.target.value)}
                  value={newMessage}
                  onKeyPress={(event) => {
                    event.key === "Enter" && handleSubmit();
                  }}
                ></textarea>
                <button className="chatSubmitButton" onClick={handleSubmit}>
                  Send &#9658;
                </button>
              </div>{" "}
            </>
          ) : (
            <span className="noConversationText">Open a conversation to start a chat</span>
          )}
        </div>
      </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">{displayOnlineUsersList}</div>
      </div>
    </div>
  );
};

export default Messenger;
