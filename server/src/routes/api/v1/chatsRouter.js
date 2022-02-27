import express from "express";
import { Chat, User, Message } from "../../../models/index.js";

const chatsRouter = new express.Router();

chatsRouter.get("/", async (req, res) => {
  const userId = req.user.id
  try {
    const currentUser = await User.query().findById(userId)
    const chats = await currentUser.$relatedQuery("chats").distinctOn('chatId')
    for(const chat of chats){
      chat.messages = await chat.$relatedQuery("messages")
    }
    return res.status(201).json({ chats });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

chatsRouter.get("/chatId", async (req, res) => {
  try {
    const chat = await Chat.query().findById(req.params.chatId)
    return res.status(201).json({ chat });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});



chatsRouter.post("/", async (req,res) => {
  const { senderId, receiverId, text, author, chatId } = req.body
  try {
      const newMessage = await Message.query().insertAndFetch({senderId, receiverId, text, author, chatId})
      return res.status(200).json(newMessage)
  } catch (error) {
    console.log(error);
      res.status(500).json(error)
  }
})



export default chatsRouter;
