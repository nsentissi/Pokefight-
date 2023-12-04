import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const PokeFight = () => {
  const { id } = useParams();
  const [selectedPokemon, setSelectedPokemon] = useState({});
  const [opponentPokemon, setOpponentPokemon] = useState({});
  const [battleResult, setBattleResult] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response1 = await axios.get(`http://localhost:3001/pokemon/${id}`);
      setSelectedPokemon(response1.data);

      const randomOpponentId = Math.floor(Math.random() * 809) + 1;
      const response2 = await axios.get(`http://localhost:3001/pokemon/${randomOpponentId}`);
      setOpponentPokemon(response2.data);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const calculateAverageStats = (pokemon) => {
    const totalStats =
      pokemon.base.HP +
      pokemon.base.Attack +
      pokemon.base.Defense +
      pokemon.base["Sp. Attack"] +
      pokemon.base["Sp. Defense"] +
      pokemon.base.Speed;

    return totalStats / 6;
  };

  const handleBattleStart = () => {
    const yourAverageStats = calculateAverageStats(selectedPokemon);
    const opponentAverageStats = calculateAverageStats(opponentPokemon);

    if (yourAverageStats > opponentAverageStats) {
      setBattleResult("You won!");
    } else if (yourAverageStats < opponentAverageStats) {
      setBattleResult("You lost!");
    } else {
      setBattleResult("It's a draw!");
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="pokeArena">
            <div className="myPokemon">
                
              <h2>{selectedPokemon.name.english}</h2>
              <img
                className="pokemon-image"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${selectedPokemon.id}.png`}
                alt={`Image of ${selectedPokemon.name.english}`}
              />
              <div>
                <p>HP: {selectedPokemon.base.HP}</p>
                <p>Attack: {selectedPokemon.base.Attack}</p>
                <p>Defense: {selectedPokemon.base.Defense}</p>
                <p>Sp Attack: {selectedPokemon.base["Sp. Attack"]}</p>
                <p>Sp Defense: {selectedPokemon.base["Sp. Defense"]}</p>
                <p>Speed: {selectedPokemon.base.Speed}</p>
              </div>
            </div>
            <div className="randomPokemon">
              <h2>{opponentPokemon.name.english}</h2>
              <img
                className="pokemon-image"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${opponentPokemon.id}.png`}
                alt={`Image of ${opponentPokemon.name.english}`}
              />
              <div>
                <p>HP: {opponentPokemon.base.HP}</p>
                <p>Attack: {opponentPokemon.base.Attack}</p>
                <p>Defense: {opponentPokemon.base.Defense}</p>
                <p>Sp Attack: {opponentPokemon.base["Sp. Attack"]}</p>
                <p>Sp Defense: {opponentPokemon.base["Sp. Defense"]}</p>
                <p>Speed: {opponentPokemon.base.Speed}</p>
              </div>
            </div>
          </div>
          <div>
            <button onClick={handleBattleStart}>Start Battle</button>
            {battleResult && <p>{battleResult}</p>}
          </div>
          <div>
            <button>Rematch</button>
          </div>
        </>
      )}
    </div>
  );
};

export default PokeFight;