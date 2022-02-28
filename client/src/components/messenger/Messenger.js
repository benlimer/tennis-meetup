import React, { useEffect, useState, useRef } from "react"
import ChatOnline from "./ChatOnline"
import Chat from "./Chat"
import Message from "./Message"
import ScrollToBottom from "react-scroll-to-bottom"
import io from "socket.io-client"

const Messenger = ({ user }) => {
  const [chats, setChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [newMessage,setNewMessage] = useState("")
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([])
  const socket = useRef()

  useEffect(() => {
    socket.current = io("ws://localhost:3001");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        senderId: data.senderId,
        receiverId: data.receiverId,
        text: data.text,
        author: data.author,
        chatId: data.chatId,
        createdAt: Date.now(),
        updatedAt: Date.now()
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
      currentChat?.messages.some((message) => (message.senderId == arrivalMessage.senderId) || (message.receiverId == arrivalMessage.senderId)) &&
      setCurrentChat({...currentChat, messages: currentChat.messages.concat(arrivalMessage)})
  }, [arrivalMessage]);


  useEffect(() => {
    const getChats = async () => {
      try {
        const response = await fetch("/api/v1/chats")
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`)
        }
        const body = await response.json()
        setChats(body.chats)
      } catch (err) {
        console.log(err)
      }
    }
    getChats()
  }, [user.id, currentChat])

 
  const displayChatList = chats.map((chat) => {
    const firstIncomingMessage = chat.messages.find((message) => message.author !== user.name)
    chat.partnerName = firstIncomingMessage.author
    chat.partnerId = firstIncomingMessage.senderId
    return (
      <div onClick={()=>setCurrentChat(chat)}>
        <Chat name={firstIncomingMessage.author} image={user.image} />
      </div>
      )
  })

  const displayMessageList = currentChat?.messages.map((messageContent) => {
    return <Message messageContent={messageContent} user={user} />
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    const message = {
      senderId: user.id,
      receiverId: currentChat.partnerId,
      text: newMessage,
      chatId: currentChat.id,
      author: user.name
    };
    

    socket.current.emit("sendMessage", {
      senderId: user.id,
      receiverId: currentChat.partnerId,
      text: newMessage,
      chatId: currentChat.id,
      author: user.name
    });

    try {
      const response = await fetch(`/api/v1/chats`, {
          method: "post",
          body: JSON.stringify(message),
          headers: new Headers({
            "Content-Type": "application/json"
          })
      });
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json()
      const updatedMessages = currentChat.messages.concat(body)
      setCurrentChat({...currentChat, messages: updatedMessages});
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  
  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input placeholder="Search for friends" className="chatMenuInput" />
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
                    event.key === "Enter" && handleSubmit()
                  }}
                ></textarea>
                <button className="chatSubmitButton" onClick={handleSubmit} >
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
        <div className="chatOnlineWrapper">
          <ChatOnline onlineUsers={onlineUsers} currentId={user.id} image={user.image} />
        </div>
      </div>
    </div>
  )
}

export default Messenger
