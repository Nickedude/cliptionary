import React, { useEffect, useState } from "react";
import { Input, InputGroup, Stack } from "@chakra-ui/react";

const PlayerContext = React.createContext({
  current_player: "",
  setCurrentPlayer: () => {},
});

export default function Startup() {
  const [current_player, setCurrentPlayer] = useState("");
  const [all_players, setAllPlayers] = useState([]);

  const fetchAllPlayers = async () => {
    const response = await fetch("http://localhost:8000/players");
    const players = await response.json();
    setAllPlayers(players);
  };

  useEffect(() => {
    fetchAllPlayers();
  }, []);

  return (
    <PlayerContext.Provider value={{ current_player, setCurrentPlayer }}>
      <AddPlayer />
      <Stack spacing={5}>
        {all_players.map((player) => (
          <b key={player}>{player}</b>
        ))}
      </Stack>
    </PlayerContext.Provider>
  );
}

function AddPlayer() {
  const { current_player, setCurrentPlayer } = React.useContext(PlayerContext);

  const handleSubmit = () => {
    const new_player = { player: current_player };
    fetch("http://localhost:8000/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(new_player),
    }).catch((error) => console.log("Failed to add player: " + error));
  };

  const handleInput = (event) => {
    setCurrentPlayer(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type="text"
          placeholder="Add your name"
          aria-label="Add your name"
          onChange={handleInput}
        />
      </InputGroup>
    </form>
  );
}
