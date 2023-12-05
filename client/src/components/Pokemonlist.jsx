import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
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
import "./pokemonlist.css";
import PokeLoader from "./PokeLoader";

const Pokemonlist = () => {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(true);

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
    setLoading(true);

    const timeoutId = setTimeout(async () => {
      try {
        let endpoint;

        if (searchTerm || selectedType) {
          endpoint = `http://localhost:3001/pokemon/all`;
        } else {
          endpoint = `http://localhost:3001/pokemon?page=${currentPage}`;
        }

        const response = await axios.get(endpoint);
        const { data, totalPages } = response.data;

        setPokemons(data);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
        setPokemons([]);
      } finally {
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [currentPage, selectedType, searchTerm]);

  return (
    <div className="listPoke">
      <div className="pokelist">
        <section className="inputArea">
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            className="inputPoke"
            placeholder="Search for your favorite pokemon!"
          />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Fire">Fire</option>
            <option value="Bug">Bug</option>
            <option value="Colorless">Colorless</option>
            <option value="Dark">Dark</option>
            <option value="Dragon">Dragon</option>
            <option value="Electric">Electric</option>
            <option value="Fairy">Fairy</option>
            <option value="Fighting">Fighting</option>
            <option value="Grass">Grass</option>
            <option value="Ground">Ground</option>
            <option value="Ice">Ice</option>
            <option value="Metal">Metal</option>
            <option value="Normal">Normal</option>
            <option value="Poison">Poison</option>
            <option value="Psychic">Psychic</option>
            <option value="Rock">Rock</option>
            <option value="Water">Water</option>
          </select>
        </section>
        <section className="card-area">
          {loading ? (
            <PokeLoader />
          ) : (
            <div className="PokeCard">
              {pokemons
                .filter((pokemon) =>
                  pokemon.name.english
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                .filter((pokemon) =>
                  selectedType ? pokemon.type[0].includes(selectedType) : true
                )
                .map((pokemon) => (
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
                    <Link to={`/pokemon/${pokemon.id}`}>
                      <button className="view-more-button">View More</button>
                    </Link>
                  </div>
                ))}
            </div>
          )}
        </section>
      </div>
      {totalPages > 1 && (
        <div>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
          >
            Previous Page
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
          >
            Next Page
          </button>
        </div>
      )}
    </div>
  );
};

export default Pokemonlist;
