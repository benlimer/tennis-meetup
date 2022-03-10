import express from "express";
import { User } from "../../../models/index.js";
import getDistance from "../../../services/getDistance.js";
import GeoCode from "../../../services/geoCode.js";

const playerFinderRouter = new express.Router();

playerFinderRouter.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const currentUser = await User.query().findById(userId);
    const currentUserCoordinates = await GeoCode.getCoordinates(currentUser.location); 
    currentUser.city = currentUserCoordinates.city;
    currentUser.state = currentUserCoordinates.state;
    currentUser.latitude = currentUserCoordinates.lat;
    currentUser.longitude = currentUserCoordinates.lng;

    const players = await User.query().where("id", "!=", userId);
    for (const player of players) {
      const otherCoordinates = await GeoCode.getCoordinates(player.location);
      player.city = otherCoordinates.city;
      player.state = otherCoordinates.state;
      player.latitude = otherCoordinates.lat;
      player.longitude = otherCoordinates.lng;
      player.distance = getDistance(
        currentUser.latitude,
        currentUser.longitude,
        player.latitude,
        player.longitude
      );

      const currentUserFriends = await currentUser.$relatedQuery("friends");
      player.friendship = currentUserFriends?.some(
        (currentUserFriend) => currentUserFriend.id === player.id
      );
    }

    players.sort((a, b) => a.distance - b.distance);

    return res.status(201).json({ players });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error });
  }
});

export default playerFinderRouter;
