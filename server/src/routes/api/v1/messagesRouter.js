import express from "express";
import { Message } from "../../../models/index.js";

const messagesRouter = new express.Router();

messagesRouter.get("/", async (req, res) => {
  try {
    const messages = await Message.query()
    return res.status(201).json({ messages });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});



export default messagesRouter;
