const express = require("express");
const PokemonList = require("../data.json");

const getAll =
  ("/pokemon",
  (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the page parameter from the query string, default to 1
  const pageSize = parseInt(req.query.pageSize) || 10; // Get the pageSize parameter from the query string, default to 10

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedPokemon = PokemonList.slice(startIndex, endIndex);

  res.json({
    data: paginatedPokemon,
    currentPage: page,
    totalPages: Math.ceil(PokemonList.length / pageSize),
  });
  });

const getOnePokemon =
  ("/pokemon/:id",
  (req, res) => {
    const { id } = req.params;

    const singlePokemon = PokemonList.find((pokemon) => {
      if (pokemon.id === +id) {
        return pokemon;
      }
    });
    if (singlePokemon) {
      res.json(singlePokemon);
    } else {
      res.status(404).json({ message: "Pokemon not found" });
    }
  });

const getPokeinfo =
  ("/pokemon/:id/:info",
  (req, res) => {
    const { id, info } = req.params;
    const basePokemon = PokemonList.find((element) => {
      return element.id === +id;
    });

    if (basePokemon) {
      const selectedInfo = basePokemon[info];
      if (selectedInfo) {
        res.json(selectedInfo);
      } else {
        res.status(404).json({ message: "Info not found" });
      }
    } else {
      res.status(404).json({ message: "Pokemon not found" });
    }
  });

module.exports = { getAll, getOnePokemon, getPokeinfo };
