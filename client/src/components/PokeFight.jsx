import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./PokeFight.css";

const PokeFight = () => {
  const { id } = useParams();
  const [selectedPokemon, setSelectedPokemon] = useState({});
  const [opponentPokemon, setOpponentPokemon] = useState({});
  const [battleResult, setBattleResult] = useState("");
  const [loading, setLoading] = useState(true);
  const [battleLoading, setBattleLoading] = useState(false);
  const opponents = [];

  const fetchData = async () => {
    try {
      const response1 = await axios.get(`http://localhost:3001/pokemon/${id}`);
      setSelectedPokemon(response1.data);

      const randomOpponentId = Math.floor(Math.random() * 809) + 1;
      const response2 = await axios.get(
        `http://localhost:3001/pokemon/${randomOpponentId}`
      );
      setOpponentPokemon(response2.data);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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

    /* return totalStats / 6; */
    return totalStats / Object.keys(pokemon.base).length;
  };

  const handleBattleStart = async () => {
    setBattleLoading(true);

    const ran = Math.floor(Math.random() * 5) * 1000;
    console.log(ran);
    new Promise((resolve) => {
      setTimeout(() => {
        const yourAverageStats = calculateAverageStats(selectedPokemon);
        const opponentAverageStats = calculateAverageStats(opponentPokemon);

        if (yourAverageStats > opponentAverageStats) {
          resolve("You won!");
          opponents.push({ ...opponentPokemon, result: "won" });
          // setBattleResult('You won!')
        } else if (yourAverageStats < opponentAverageStats) {
          opponents.push({ ...opponentPokemon, result: "lost" });
          resolve("You lost!");
          // setBattleResult('You lost!')
        } else {
          opponents.push({ ...opponentPokemon, result: "draw" });
          resolve("It's a draw");
        }
      }, ran);
    })
      .then((result) => {
        setBattleResult(result);
        console.log("done", result);
      })
      .finally((result) => {
        setBattleLoading(false);

        console.log("finaly", result);
      });
  };

  const handleRematch = () => {
    fetchData()
    setBattleResult('')
  }    


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
                className={`pokemon-image ${battleLoading ? "spring-box " : ""}`}
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
            <div>
                <button onClick={handleRematch}>Rematch!</button>
            </div>
            <div
              className={`randomPokemon tipo-${
                opponentPokemon?.type && opponentPokemon.type[0].toLowerCase()
              }`}
            >
              <h2>{opponentPokemon.name.english}</h2>
              <img
                className={`pokemon-image ${
                  battleLoading ? "spring-box " : ""
                }`}
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
