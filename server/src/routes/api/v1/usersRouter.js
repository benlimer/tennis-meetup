import express from "express";
import passport from "passport";


import uploadImage from '../../../services/uploadImage.js'
import { User } from "../../../models/index.js";
import userMatchesRouter from "./userMatches.js";

const usersRouter = new express.Router();

usersRouter.get("/", async (req, res) => {
  const userId = req.body;
  try {
    const players = await User.query().where("id", "!=", userId);
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

usersRouter.post("/", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;
  try {
    const persistedUser = await User.query().insertAndFetch({
      email,
      password,
    });
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    console.log(error);
    return res.status(422).json({ errors: error });
  }
});

usersRouter.post('/additional', uploadImage.single('image'), async (req, res) => {
  try{
    const { body } = req
    const newBody = {...body}
    newBody.image = req.file?.location
    const user = await User.query().findById(req.user.id)
    const patch = await user.$query().patchAndFetch(newBody)
    return res.status(201).json({ userInfo: patch})
  }catch(error){
    console.log(error)
    return res.status(500).json({ error })
  }
})

usersRouter.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const userData = await User.query().findById(userId);
    let opponentMatches = await userData.$relatedQuery("opponentMatches");
    let hostMatches = await userData.$relatedQuery("hostMatches");
    const matches = opponentMatches.concat(hostMatches);
    userData.matches = matches;
    // after combined, might sort/ reorder based on creation date
    return res.status(201).json({ user: userData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error });
  }
});

usersRouter.use("/:opponentId/matches/:hostId", userMatchesRouter);

export default usersRouter;
