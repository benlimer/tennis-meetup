import React from "react";

const CourtTile = ({ court }) => {
  const { address, courtName } = court;

  return (
    <div className="Court cell card small-12 medium-6 large-4">
      <div className="card-section orange grid-x">
        <div className="Court-name cell small-6">
          <h4>{courtName}</h4>
          <p>address: {address}</p>
        </div>
      </div>
    </div>
  );
};

export default CourtTile;
