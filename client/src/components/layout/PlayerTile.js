import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"

const PlayerTile = ({ player }) => {
  const { id, name, skillLevel, city, state, age, gender, distance } = player;

  let roundedDistance = Math.round(distance)
 

  return (
    <div className="Player cell card small-12 medium-6 large-4">
      <Link to={`/users/${id}`}>
        <div className="card-section grid-x">
          <div className="Player-name cell small-6">
            <h4>{name}</h4>
            <p className="distance">{roundedDistance}Km away</p>
          </div>
          <div className="Player-detail cell small-6">
            <p>
              Skill Level: {skillLevel} &nbsp; Location: {city}, {state} &nbsp; Age: {age} &nbsp; Gender:{" "}
              {gender}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PlayerTile;
