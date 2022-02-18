import express from "express";
import { Match } from "../../../models/index.js";

const matchesRouter = new express.Router();

matchesRouter.get("/", async (req, res) => {
  try {
    const Matches = await Match.query()
    return res.status(201).json({ Matches });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default matchesRouter;
