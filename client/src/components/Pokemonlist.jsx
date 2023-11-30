import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom"
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

const Pokemonlist = () => {
  const [pokemons, setPokemons] = useState(null);
  const [pokemonData, setPokemonData] = useState(null);

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
      .get("http://localhost:3000/pokemon")
      .then((response) => {
        setPokemons(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {!pokemons ? (
        <p>Loading ... </p>
      ) : (
        <div className="PokeCard">
          {pokemons.map((pokemon) => (
            <div key={pokemon.id} className="pokemon-card">
              <img
                className="pokemon-icon"
                src={typeImages[pokemon.type[0]]}
               
                alt="Pokemon Icon"
              />
              <img
                className="pokemon-image"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
                alt={`Image of ${pokemon.name.english}`}
              />
              <h2 className="pokemon-name">{pokemon.name.english}</h2>
              <p className="pokemon-type">{pokemon.type[0]}</p>
              <Link to={`/pokemon/${pokemon.id}`} >
              <button className="view-more-button">View More</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Pokemonlist;
