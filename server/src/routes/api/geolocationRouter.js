import express from "express"
import got from 'got'

const geolocationRouter = new express.Router()

geolocationRouter.get('/:location', async (req, res) => {
    let location = req.params.location
    location = location.replace(/ /g, "+")
    location = location.replace(/,/g, "%2C")
   
  try {
    const response = await got(`https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=${location}&benchmark=2020&format=json`)
    const body = JSON.parse(response.body)
    const data = body.result.addressMatches[0]
    const city = data.addressComponents.city
    const state = data.addressComponents.state
    const longitude = data.coordinates.x
    const latitude = data.coordinates.y

    return res.status(200).json({ city, state, longitude, latitude })
  } catch(error) {
    return res.status(500).json({ errors: error })
  }

})

export default geolocationRouter

