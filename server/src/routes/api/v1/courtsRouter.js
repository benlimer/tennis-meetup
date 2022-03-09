import express from "express";
import got from "got";

import CourtSerializer from "../../../serializers/CourtSerializer.js";
import GeoCode from "../../../services/geoCode.js";

const courtsRouter = new express.Router();

courtsRouter.get("/", async (req, res) => {
  const { zipCode, radius } = req.query;
  const coordinates = await GeoCode.getCoordinates(zipCode);
  const lat = coordinates.lat;
  const lng = coordinates.lng;
  try {
    const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const response = await got(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=Tennis%20Court&location=${lat}%2C${lng}&radius=${radius}&key=${API_KEY}`
    );
    const body = JSON.parse(response.body);
    const serializedCourts = await CourtSerializer.getSummary(body.results);
    return res.status(200).json({ courts: serializedCourts });
  } catch (error) {
    return res.status(500).json({ error });
  }
});
export default courtsRouter;
