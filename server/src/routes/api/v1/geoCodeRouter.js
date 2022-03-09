import express from "express";
import got from "got";

import GeoCode from "../../../services/geoCode.js";

const geoCodeRouter = new express.Router();

geoCodeRouter.get("/:zipCode", async (req, res) => {
  const zipCode = req.params.zipCode;
  try {
    const coordinates = await GeoCode.getCoordinates(zipCode);
    return res.status(200).json({ coordinates });
  } catch (error) {
    return res.status(500).json({ error });
  }
});
export default geoCodeRouter;
