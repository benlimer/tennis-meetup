import got from 'got'

class GeoCode{
  static async getCoordinates(zipCode){
    try{
      const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
      const response = await got(`https://maps.googleapis.com/maps/api/geocode/json?key=${API_KEY}&components=postal_code:${zipCode}`)
      const body = await JSON.parse(response.body)
      const coordinates = {
        lat: body.results[0].geometry.location.lat,
        lng: body.results[0].geometry.location.lng
      }
      return coordinates
    }catch(error){
      console.log(error)
    }
  }
}

export default GeoCode