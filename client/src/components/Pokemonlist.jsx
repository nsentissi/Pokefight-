import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Dark from "../assets/Dark.png";
import Dragon from "../assets/Dragon.png";
import Electric from "../assets/Electric.png";
import Fairy from "../assets/Fairy.png";
import Fighting from "../assets/Fighting.png";
import Fire from "../assets/Fire.png";
import Grass from "../assets/Grass.png";
import Steel from "../assets/Steel.png";
import Psychic from "../assets/Psychic.png";
import Water from "../assets/Water.png";
import Bug from "../assets/Bug.png";
import Normal from "../assets/Normal.png";
import Poison from "../assets/Poison.png";
import Ground from "../assets/Ground.png";
import Rock from "../assets/Rock.png";
import Ghost from "../assets/Ghost.png";
import Ice from "../assets/Ice.png";
import "./pokemonlist.css";
import PokeLoader from "./PokeLoader";
import axiosClient from "../../axiosClient";

const Pokemonlist = () => {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(true);

  const typeImages = {
    Dark,
    Dragon,
    Electric,
    Fairy,
    Fighting,
    Fire,
    Grass,
    Steel,
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
        
        let endpoint = searchTerm || selectedType ? `/pokemon/all` : `/pokemon?page=${currentPage}`;
  
        const response = await axiosClient.get(endpoint); 
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
            placeholder="Search for your pokemon!"
          />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="inputPoke"
          >
            <option value="">All Types</option>
            <option value="Fire">Fire</option>
            <option value="Bug">Bug</option>
            <option value="Dark">Dark</option>
            <option value="Dragon">Dragon</option>
            <option value="Electric">Electric</option>
            <option value="Fairy">Fairy</option>
            <option value="Fighting">Fighting</option>
            <option value="Grass">Grass</option>
            <option value="Ground">Ground</option>
            <option value="Ice">Ice</option>
            <option value="Steel">Steel</option>
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
                  <div key={pokemon.id} className={`card-border border-${pokemon.type && pokemon.type[0].toLowerCase()}`}>
                    <div className={`card-bg bg-${pokemon.type && pokemon.type[0].toLowerCase()}`}>
                      {/* <strong id="text-border">{pokemon.name.english}</strong> */}
                      <div id="text-ext">
                        {/* <p className="pokemon-type">{pokemon.type[0]}</p> */}
                      </div>
                      <div className="marquee">
                        <div className="marquee__inner">
                        <h3 className="pokeName">{pokemon.name.english}</h3>
                          <span className="viper">
                            {pokemon.name.english} {pokemon.name.english}{" "}
                            {pokemon.name.english} {pokemon.name.english}{" "}
                            {pokemon.name.english}
                          </span>
                        </div>
                      </div>
                      <div id="blur-area"></div>
                      <div className="viper">
                        <h3 className="pokeName">{pokemon.name.english}</h3>
                      </div>
                      <div className="container-logo">
                        <div className="logo">
                          <div className="logo-inside"></div>
                        </div>
                      </div>
                      <div className="first"></div>
                      <div className="second"></div>
                      <div className="mist-container">
                        <div className="mist"></div>
                      </div>
                      <svg></svg>
                      <div className="card-content">
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
                        {/* <h2 className="pokemon-name">{pokemon.name.english}</h2>
                        <p className="pokemon-type">{pokemon.type[0]}</p> */}
                        <Link to={`/pokemon/${pokemon.id}`}>
                          <button className="view-more-button">
                            Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </section>
      </div>
      {totalPages > 1 && (
        <div className={loading ? "hidden" : "pagination-container"}>
          <button
            className="pagination-button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
          >
            Previous Page
          </button>
          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="pagination-button"
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
