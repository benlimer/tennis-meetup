import express from "express";
import { User, Friend } from "../../../models/index.js";
const friendsRouter = new express.Router();

// friendsRouter.get("/", async (req, res) => {
//   try {
//     let friends = req.query.search
//       ? await User.query().where("location", "ilike", `%${req.query.search}%`)
//       : await User.query();

//     return res.status(200).json({ friends });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error });
//   }
// });

friendsRouter.get("/", async (req, res) => {
  try {
    const user = await User.query().findById(req.user.id);
    const friends = await user.$relatedQuery("friends");
    return res.status(200).json({ friends });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

friendsRouter.get("/friendship/:id", async (req, res) => {
  try {
    const user = await User.query().findById(req.user.id);
    const userFriends = await user.$relatedQuery("friends");
    let friendship = userFriends?.some((userFriend) => userFriend.id === req.params.id);
    return res.status(200).json({ friendship });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

friendsRouter.post("/:id", async (req, res) => {
  try {
    const user = await User.query().findById(req.user.id);
    const friend = await User.query().findById(req.params.id);
    const userFriends = await user.$relatedQuery("friends");
    let addedFriend = userFriends?.some((userFriend) => userFriend.id === friend.id)
      ? false
      : await user.$relatedQuery("friends").relate(friend);

    return res.status(201).json({ addedFriend });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

friendsRouter.delete("/:id", async (req, res) => {
  try {
    const deletedFriend = await Friend.query()
      .findOne({ baseUserId: req.user.id, counterUserId: req.params.id })
      .delete();
    return res.status(201).json({ deletedFriend });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

export default friendsRouter;
