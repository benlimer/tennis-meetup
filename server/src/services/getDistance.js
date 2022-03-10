function getDistance(lat1, lon1, lat2, lon2) 
{
  let RadiusOfEarthInKm = 6371; // km
  let radianLat = toRad(lat2-lat1);
  let radianLon = toRad(lon2-lon1);
  let radianLat1 = toRad(lat1);
  let radianLat2 = toRad(lat2);

  let a = Math.sin(radianLat/2) * Math.sin(radianLat/2) +
    Math.sin(radianLon/2) * Math.sin(radianLon/2) * Math.cos(radianLat1) * Math.cos(radianLat2); 
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  let distanceInKm = RadiusOfEarthInKm * c;
  return distanceInKm;
}

// Converts numeric degrees to radians
function toRad(Value) 
{
    return Value * Math.PI / 180;
}

export default getDistance