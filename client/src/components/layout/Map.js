import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import mapStyles from "../../assets/mayStyles";

const Map = ({ courts, location }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const mapSize = {
    height: "90vh",
    width: "100vw",
  };

  const [defaultCenter, setDefaultCenter] = useState({
    lat: 42.3931,
    lng: -71.0884,
  });

  const getCoordinates = async () => {
    try {
      const response = await fetch(`/api/v1/geoCode/${location}`);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const body = await response.json();
      setDefaultCenter(body.coordinates);
    } catch (error) {
      console.log(`Error in fetch: ${error}`);
    }
  };

  useEffect(() => {
    getCoordinates();
  }, [location]);

  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  };
  const [selected, setSelected] = useState(null);

  const markers = courts.map((court) => {
    const lat = court.geometry.location.lat;
    const lng = court.geometry.location.lng;
    return (
      <Marker
        key={`${lat}-${lng}`}
        position={{ lat: lat, lng: lng }}
        onClick={() => {
          setSelected(court);
        }}
      />
    );
  });
  let infoWindow;
  if (selected) {
    const lat = selected.geometry.location.lat;
    const lng = selected.geometry.location.lng;
    const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    infoWindow = (
      <InfoWindow
        position={{ lat: lat, lng: lng }}
        onCloseClick={() => {
          setSelected(null);
        }}
      >
        <div>
          {selected?.photos ? (
            <img
              src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=300
            &photoreference=${selected.photos[0].photo_reference}&key=${API_KEY}`}
            />
          ) : null}

          <p className="court-name">
            <strong>{selected.name}</strong>
          </p>
          <p>
            Rating: <strong>{selected.rating}</strong>/5
          </p>
          {selected.opening_hours ? (
            selected.opening_hours.open_now ? (
              <p>
                Currently <strong>Open</strong>
              </p>
            ) : (
              <p>
                Currently <strong>Closed</strong>
              </p>
            )
          ) : null}
          <a
            href={`https://www.google.com/maps?saddr=My+Location&daddr=${lat},${lng}`}
            target="_blank"
          >
            <strong>Directions</strong>
          </a>
        </div>
      </InfoWindow>
    );
  }
  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";
  return (
    <>
      <GoogleMap mapContainerStyle={mapSize} zoom={13} center={defaultCenter} options={options}>
        {markers}
        {infoWindow}
      </GoogleMap>
    </>
  );
};

export default Map;
