import express from "express";
import { Match, User } from "../../../models/index.js";

const userMatchesRouter = new express.Router({ mergeParams: true });

userMatchesRouter.post("/", async (req, res) => {
  const hostId = parseInt(req.params.hostId);
  const opponentId = req.params.opponentId;
  const matchData = req.body
  const {type, date, result} = matchData
  console.log(hostId)
  try {
    const opponent = await User.query().findById(opponentId);
    const matches = await opponent.$relatedQuery("opponentMatches").insertAndFetch({type, date, result, hostId})
    return res.status(201).json({ matches });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error });
  }
});

export default userMatchesRouter;
