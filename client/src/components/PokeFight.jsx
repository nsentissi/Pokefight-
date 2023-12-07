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
  const [leaderboard, setLeaderboard] = useState([]);

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

        setLeaderboard((prevLeaderboard) => {
          const updatedLeaderboard = [...prevLeaderboard];
          const pokemonIndex = updatedLeaderboard.findIndex(
            (element) => element.name === selectedPokemon.name.english
          );

          if (yourAverageStats > opponentAverageStats) {
            if (pokemonIndex !== -1) {
              updatedLeaderboard[pokemonIndex].wins += 1;
            } else {
              updatedLeaderboard.push({
                name: selectedPokemon.name.english,
                wins: 1,
                losses: 0,
              });
            }
            axios
              .post("http://localhost:3001/pokemon/leaderboard", {
                name: selectedPokemon.name.english,
                wins: 1,
                losses: 0,
              })
              .then((response) => {
                console.log(
                  "Leaderboard updated on the server:",
                  response.data
                );
              })
              .catch((error) => {
                console.error(
                  "Error updating leaderboard on the server:",
                  error
                );
              });
            resolve("You won!");
          } else if (yourAverageStats < opponentAverageStats) {
            if (pokemonIndex !== -1) {
              updatedLeaderboard[pokemonIndex].losses += 1;
            } else {
              updatedLeaderboard.push({
                name: selectedPokemon.name.english,
                wins: 0,
                losses: 1,
              });
            }
            axios
              .post(
                "http://localhost:3001/pokemon/leaderboard",
                { name: selectedPokemon.name.english,
                  wins: 0,
                  losses: 1,}
              )
              .then((response) => {
                console.log(
                  "Leaderboard updated on the server:",
                  response.data
                );
              })
              .catch((error) => {
                console.error(
                  "Error updating leaderboard on the server:",
                  error
                );
              });
            resolve("You lost!");
          } else {
            resolve("It's a draw");
          }

          return updatedLeaderboard;
        });
      }, ran);
    })
      .then((result) => {
        setBattleResult(result);
        console.log("done", result);
      })
      .finally(() => {
        setBattleLoading(false);
        console.log(leaderboard);
        console.log("finally");
      });
  };

  const handleRematch = () => {
    fetchData();
    setBattleResult("");
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="pokeArena">
            <div className={`myPokemon`}>
              <h2
                className={`text-${
                  selectedPokemon?.type && selectedPokemon.type[0].toLowerCase()
                }`}
              >
                {selectedPokemon.name.english}
              </h2>
              <img
                className={`pokemon-image ${battleLoading ? "spring-box" : ""}`}
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

            <div className={`randomPokemon`}>
              <h2
                className={`text-style text-${
                  opponentPokemon?.type && opponentPokemon.type[0].toLowerCase()
                }`}
              >
                {opponentPokemon.name.english}
              </h2>

              <div
                className={`randomPokemon tipo-${
                  opponentPokemon?.type && opponentPokemon.type[0].toLowerCase()
                }`}
              >
                <h2>{opponentPokemon.name.english}</h2>
                <img
                  className={`pokemon-image ${
                    battleLoading ? "spring-box" : ""
                  }`}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${opponentPokemon.id}.png`}
                  alt={`Image of ${opponentPokemon.name.english}`}
                />
                {/* updated the code logic for the stats with the bar colors */}
                <div>
                  <div className="stats">
                    {Object.entries(opponentPokemon.base).map(
                      ([key, value]) => (
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
                      )
                    )}
                  </div>
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
