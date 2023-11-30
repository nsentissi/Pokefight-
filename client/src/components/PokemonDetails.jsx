import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const PokemonDetails = () => {
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3000/pokemon/${6}`)
      .then((response) => {
        console.log(response.data);
        setPokemon(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      <div className="pokemon-img"></div>
      {pokemon ? (
        <div className="status-card">
          <div>
            {pokemon.name && <h1>{pokemon.name.english}</h1>}
            {pokemon.id && (
              <div>
                <strong>ID:</strong> {pokemon.id}
              </div>
            )}

            {pokemon.type && (
              <div>
                <strong>Type:</strong> {pokemon.type.join(", ")}
              </div>
            )}
          </div>
          <div>
            <h3>Stats:</h3>
            {pokemon.base && (
              <div>
                {Object.entries(pokemon.base).map(([key, value]) => (
                  <div key={key}>
                    <strong>{key}:</strong> {value}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        // Render something if data is not available
        <div>No Pokemon available</div>
      )}
    </div>
  );
};

export default PokemonDetails;
