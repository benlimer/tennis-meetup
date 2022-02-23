import React, { useState, useEffect } from "react";
import PlayerTile from "./PlayerTile";

const PlayerList = (props) => {
  const [players, setPlayers] = useState([]);

  const userId = props.user.id;
  const getPlayers = async () => {
    try {
      const response = await fetch(`/api/v1/find-players/${userId}`);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const body = await response.json();
      setPlayers(body.players);
    } catch (error) {
      console.log(error);
    }
  };
  
 
  const playerTiles = players.map((player) => {
  
    return <PlayerTile key={player.id} player={player} />;
  });

  useEffect(() => {
    getPlayers();
  }, []);


  return (
    <div>
      <h3>Nearby Players</h3>
      {playerTiles}
    </div>
  );
};

export default PlayerList;
