import express from "express";
import { User } from "../../../models/index.js";

const playerFinderRouter = new express.Router();

playerFinderRouter.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const players = await User.query().where("id", "!=", userId);
    return res.status(201).json({ players });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default playerFinderRouter;
