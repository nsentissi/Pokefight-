import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PokemonImage from "./PokemonImage";
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
import Normal from "../assets/Normal.png";
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
    <div className="bg">
      <div className="container">
        <div
          className={`pokemon-card-details tipo-${
            pokemon.type && pokemon.type[0].toLowerCase()
          }`}
        >
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`}
            alt={pokemon.name?.english}
          />
        </div>
        {pokemon ? (
          <div
            className={`status-card tipo-${
              pokemon.type && pokemon.type[0].toLowerCase()
            }`}
          >
            <div className="name-id-type">
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
              {pokemon.base && (
                <div className="stats">
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
          <div>No Pokemon available</div>
        )}
      </div>
    </div>
  );
};

export default PokemonDetails;
