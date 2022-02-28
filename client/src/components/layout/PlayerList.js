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

  const addFriend = async (id) => {
    try {
      const response = await fetch(`/api/v1/friends/${id}`, {
        method: "POST",
        headers: new Headers({
          "Content-type": "application/json",
        }),
      });
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const data = await response.json();
      setPlayers((prev) =>
        prev.map((player) =>
          player.id === id ? { ...player, friendship: true } : player
        )
      );
    } catch (error) {
      console.log(`Error in fetch: ${error}`);
    }
  };

  const deleteFriend = async (id) => {
    try {
      const response = await fetch(`/api/v1/friends/${id}`, {
        method: "Delete",
        headers: new Headers({
          "Content-type": "application/json",
        }),
      });
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const data = await response.json();
      setPlayers((prev) =>
        prev.map((player) =>
          player.id === id ? { ...player, friendship: false } : player
        )
      );
    } catch (error) {
      console.log(`Error in fetch: ${error}`);
    }
  };

  const playerTiles = players.map((player) => {
    return <PlayerTile key={player.id} player={player} addFriend={addFriend} deleteFriend={deleteFriend}/>;
  });

  useEffect(() => {
    getPlayers();
  }, []);

  return (
    <div className="players-container">
      <h3 className="heading">Nearby Players</h3>
      {playerTiles}
    </div>
  );
};

export default PlayerList;
