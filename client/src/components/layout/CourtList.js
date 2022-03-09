import React, { useState, useEffect } from "react";
import Map from "./Map";

const CourtList = (props) => {
  const [allCourts, setAllCourts] = useState([]);
  const [location, setLocation] = useState({
    zipCode: '02145',
    radius: 10
  })
  const [mapCenter, setMapCenter] = useState('02145')

  const getAllCourts = async ({zipCode, radius}) => {
    try {
      const response = await fetch(`/api/v1/courts/?zipCode=${zipCode}&radius=${radius*1000}`);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const body = await response.json();
      setAllCourts(body.courts);
    } catch (error) {
      console.log(`Error in fetch: ${error}`);
    }
  };

  useEffect(() => {
    getAllCourts(location)
  }, []);
 
  const handleSubmit = (event) => {
    event.preventDefault()
    getAllCourts(location)
    setMapCenter(location.zipCode)
  }

  const handleInputChange = (event) => {
    setLocation({...location, 
      [event.currentTarget.name]: event.currentTarget.value})
  }

  return (
    <div className="grid-x grid-margin-x">
      <div className="map-form-container">
      <p className="map-header">Find Nearby Courts!</p>
      <form className = "map-form cell small-12 medium-6" onSubmit={handleSubmit}>
        <label htmlFor="zipCode">ZipCode</label>
        <input type="text" name="zipCode" id="zipCode" onChange={handleInputChange}></input>
        <label htmlFor="radius">Radius(km)</label>
        <input type="text" name="radius" id="radius" onChange={handleInputChange}></input>
        <input className="button" type="submit"></input>
      </form>
      </div>
      <Map courts={allCourts} location={mapCenter}/>
    </div>
  );
};

export default CourtList;
