import React, { useState, useEffect } from "react";

const MatchTile = (props) => {
  const { type, result, date } = props.match;
  const { showId } = props;
  const [hostName, setHostName] = useState("");

  const getHostName = async () => {
    try {
      const response = await fetch(`/api/v1/users/${showId}`);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const body = await response.json();
      setHostName(body.user.name);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getHostName();
  }, []);

  return (
    <div className="Match cell card small-12 medium-6 large-4">
      <div className="card-section grid-x">
        <div className="Match-name cell">
          <h3><strong>Vs. {hostName}</strong></h3>
          <p><strong>Type: </strong> {type}</p>
          <p><strong>Date: </strong>{date}</p>
          <p><strong>Result:  </strong>{result}</p>
        </div>
      </div>
    </div>
  );
};

export default MatchTile;
