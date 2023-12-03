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

  const getStatColor = (value) => {
    if (value >= 60) {
      return "red";
    } else if (value >= 80) {
      return "yellow";
    } else {
      return "dodgerblue";
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:3001/pokemon/${id}`).then((response) => {
      console.log(response.data);
      setSelectedPokemon(response.data);
    });

    const randomOpponentId = Math.floor(Math.random() * 809) + 1;

    axios
      .get(`http://localhost:3001/pokemon/${randomOpponentId}`)
      .then((response) => {
        console.log(response.data);
        setOpponentPokemon(response.data);
        setLoading(false);
      });
  }, [id]);

  const calculateAverageStats = (pokemon) => {
    const totalStats =
      pokemon.base.HP +
      pokemon.base.Attack +
      pokemon.base.Defense +
      pokemon.base["Sp. Attack"] +
      pokemon.base["Sp. Defense"] +
      pokemon.base.Speed;

    /* return totalStats / 6; */
    return totalStats / Object.keys(pokemon.base).length;
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
            <div
              className={`myPokemon tipo-${
                selectedPokemon?.type && selectedPokemon.type[0].toLowerCase()
              }`}
            >
              <h2>{selectedPokemon.name.english}</h2>
              <img
                className="pokemon-image"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${selectedPokemon.id}.png`}
                alt={`Image of ${selectedPokemon.name.english}`}
              />
              {/* updated the code logic for the stats with the bar colors */}
              <div>
                <div className="stats">
                  {Object.entries(selectedPokemon.base).map(([key, value]) => (
                    <div key={key}>
                      <strong>{key}:</strong>
                      <div className="stat-bar-container">
                        <div
                          className="stat-bar"
                          style={{
                            width: `${value}%`,
                            backgroundColor: getStatColor(value),
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="btn-results">
              <button className="btn-battle" onClick={handleBattleStart}>
                Start!
              </button>
              {battleResult && <p>{battleResult}</p>}
            </div>
            <div
              className={`randomPokemon tipo-${
                opponentPokemon?.type && opponentPokemon.type[0].toLowerCase()
              }`}
            >
              <h2>{opponentPokemon.name.english}</h2>
              <img
                className="pokemon-image"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${opponentPokemon.id}.png`}
                alt={`Image of ${opponentPokemon.name.english}`}
              />
              {/* updated the code logic for the stats with the bar colors */}
              <div>
                <div className="stats">
                  {Object.entries(opponentPokemon.base).map(([key, value]) => (
                    <div key={key}>
                      <strong>{key}:</strong>
                      <div className="stat-bar-container">
                        <div
                          className="stat-bar"
                          style={{
                            width: `${value}%`,
                            backgroundColor: getStatColor(value),
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PokeFight;
