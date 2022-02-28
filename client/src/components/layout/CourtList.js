import React, { useState, useEffect } from "react";
import CourtTile from "./CourtTile";

const CourtList = (props) => {
  const [courts, setCourts] = useState([]);

  const getCourts = async () => {
    try {
      const response = await fetch(`/api/v1/courts`);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const body = await response.json();
      setCourts(body.courts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourts();
  }, []);

  const courtTiles = courts.map((court) => {
    return <CourtTile key={court.id} court={court} />;
  });

  return (
    <div className="courts-container">
      <h3 className="heading">Nearby Courts</h3>
      {courtTiles}
    </div>
  );
};

export default CourtList;
