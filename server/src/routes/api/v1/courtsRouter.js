import express from "express";
import { Court } from "../../../models/index.js";

const courtsRouter = new express.Router();

courtsRouter.get("/", async (req, res) => {
  try {
    const courts = await Court.query()
    return res.status(201).json({ courts });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default courtsRouter;
