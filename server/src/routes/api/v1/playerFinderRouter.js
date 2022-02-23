import express from "express";
import { User } from "../../../models/index.js";
import got from "got";
import getDistance from "../../../services/getDistance.js";

const playerFinderRouter = new express.Router();

playerFinderRouter.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const currentUser = await User.query().findById(userId);
    const response = await got(
      `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=${currentUser.location}&benchmark=2020&format=json`
    );
    const body = JSON.parse(response.body);
    const data = body.result.addressMatches[0];
    currentUser.city = data.addressComponents.city;
    currentUser.state = data.addressComponents.state;
    currentUser.longitude = data.coordinates.x;
    currentUser.latitude = data.coordinates.y;

    const players = await User.query().where("id", "!=", userId);
    for (const player of players) {
      const response = await got(
        `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=${player.location}&benchmark=2020&format=json`
      );
      const body = JSON.parse(response.body);
      const data = body.result.addressMatches[0];
      player.city = data.addressComponents.city;
      player.state = data.addressComponents.state;
      player.longitude = data.coordinates.x;
      player.latitude = data.coordinates.y;
      player.distance = getDistance(currentUser.latitude, currentUser.longitude, player.latitude, player.longitude)
    }

    players.sort((a,b) => a.distance - b.distance)
    
    return res.status(201).json({ players });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default playerFinderRouter;
