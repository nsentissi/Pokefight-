import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Colorless from "../assets/Colorless.png";
import Dark from "../assets/Dark.png";
import Dragon from "../assets/Dragon.png";
import Electric from "../assets/Electric.png";
import Fairy from "../assets/Fairy.png";
import Fighting from "../assets/Fighting.png";
import Fire from "../assets/Fire.png";
import Grass from "../assets/Grass.png";
import Metal from "../assets/Metal.png";
import Psychic from "../assets/Psychic.png";
import Water from "../assets/Water.png";
import Bug from "../assets/Bug.png";
import Normal from "../assets/Bug.png";
import Poison from "../assets/Poison.png";
import Ground from "../assets/Ground.png";
import Rock from "../assets/Rock.png";
import Ghost from "../assets/Ghost.png";
import Ice from "../assets/Ice.png";

const PokemonDetails = () => {
  const [pokemon, setPokemon] = useState({});

  const { id } = useParams();

  const typeImages = {
    Colorless,
    Dark,
    Dragon,
    Electric,
    Fairy,
    Fighting,
    Fire,
    Grass,
    Metal,
    Psychic,
    Water,
    Bug,
    Normal,
    Poison,
    Ground,
    Rock,
    Ghost,
    Ice,
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/pokemon/${id}`)
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
      <div className="pokemon-img">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`}
          alt={pokemon.name?.english}
        />
      {/*   <img
        className="pokemon-icon"
        src={typeImages[pokemon.type[0]]}
        alt="Pokemon Icon"
      /> */}
      
      </div>
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
               <img src={typeImages[pokemon.type[0]]} alt="" /> 
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
      <Link to={`/pokemon/battle/${pokemon.id}`}>
      <button>Battle ! </button>
      </Link>
    </div>
  );
};

export default PokemonDetails;
