import express from "express";
import { Match, User } from "../../../models/index.js";

const userMatchesRouter = new express.Router({ mergeParams: true });

userMatchesRouter.post("/", async (req, res) => {
  // const hostId = parseInt(req.params.hostId);
  const hostId = req.user.id
  const opponentId = req.params.opponentId;
  const matchData = req.body
  const {type, date, result} = matchData
  try {
    const host = await User.query().findById(hostId);
    // const match = await Match.query().insertAndFetch()
    // write in perspective of current user rather than opponent
    const matches = await host.$relatedQuery("hostMatches").insertAndFetch({type, date, result, opponentId})
    return res.status(201).json({ matches });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default userMatchesRouter;
