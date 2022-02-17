import React from "react";

const PlayerTile = ({ player }) => {
  const { id, name, skillLevel, location, age, gender } = player;

  return (
    <div className="Player cell card small-12 medium-6 large-4">
        <div className="card-section orange grid-x">
          <div className="Player-name cell small-6">
            <h4>{name}</h4>
          </div>
          <div className="review-count cell small-6">
            <p className="reviewCount">
              Skill Level: {skillLevel} &nbsp; Location: {location} &nbsp; Age: {age} &nbsp; Gender: {gender}
            </p>
          </div>
        </div>
    </div>
  );
};

export default PlayerTile;
