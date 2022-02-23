import express from "express";
import { Conversation } from "../../../models/index.js";

const conversationsRouter = new express.Router();

conversationsRouter.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
        names: { $in: [req.params.userId]}
    })
    return res.status(201).json({ conversation });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

conversationsRouter.post("/", async (req,res) => {
    const newConversation = new Conversation({
        names: [req.body.senderId, req.body.receiverId]
    })

    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation)
    } catch (error) {
        res.status(500).json(error)
    }
})

export default conversationsRouter;
