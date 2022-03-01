import express from "express";
import { Chat, User, Message } from "../../../models/index.js";

const chatsRouter = new express.Router();

chatsRouter.get("/", async (req, res) => {
  const userId = req.user.id;
  try {
    const currentUser = await User.query().findById(userId);
    const senderChats = await currentUser.$relatedQuery("senderChats").distinctOn("chatId");
    for (const chat of senderChats) {
      chat.messages = await chat.$relatedQuery("messages");
    }
    const receiverChats = await currentUser.$relatedQuery("receiverChats").distinctOn("chatId");
    for (const chat of receiverChats) {
      chat.messages = await chat.$relatedQuery("messages");
    }
    const receiverChatsIds = receiverChats.map((receiverChat) => receiverChat.id)
    const noDuplicateChat = senderChats.filter((senderChat) => {
      return !receiverChatsIds.includes(senderChat.id) 
    })
    const chats = noDuplicateChat.concat(receiverChats)
    return res.status(201).json({ chats });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

chatsRouter.get("/chatId", async (req, res) => {
  try {
    const chat = await Chat.query().findById(req.params.chatId);
    return res.status(201).json({ chat });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

chatsRouter.get("/user/:playerId", async (req, res) => {
  try {
    let message = await Message.query().findOne({
      senderId: req.params.playerId,
      receiverId: req.user.id,
    });
    if (!message) {
      message = await Message.query().findOne({
        senderId: req.user.id,
        receiverId: req.params.playerId,
      });
    }
    return res.status(201).json({ message });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error });
  }
});

chatsRouter.post("/", async (req, res) => {
  const { senderId, receiverId, text, author, chatId } = req.body;
  try {
    const newMessage = await Message.query().insertAndFetch({
      senderId,
      receiverId,
      text,
      author,
      chatId,
    });
    return res.status(200).json(newMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

chatsRouter.post("/new", async (req, res) => {
  const { senderId, receiverId, text, author } = req.body;
  try {
    const newChat = await Chat.query().insertAndFetch({});
    const newMessage = await newChat.$relatedQuery("messages").insertAndFetch({
      senderId,
      receiverId,
      text,
      author,
    });
    return res.status(200).json(newMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default chatsRouter;
