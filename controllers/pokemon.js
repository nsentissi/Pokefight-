const express = require("express");
const PokemonList = require("../data.json");


const getAll = (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 12;

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedPokemon = PokemonList.slice(startIndex, endIndex);

    res.json({
      data: paginatedPokemon,
      currentPage: page,
      totalPages: Math.ceil(PokemonList.length / pageSize),
    });
  } catch (error) {
    console.error('Error fetching paginated Pokémon:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllPokemon = (req, res) => {
  try {
    const allPokemon = PokemonList;

    res.json({
      data: allPokemon,
      totalPages: 1, // Assuming all Pokémon are on a single page
    });
  } catch (error) {
    console.error('Error fetching all Pokémon:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getOnePokemon = (req, res) => {
  const { id } = req.params;

  const singlePokemon = PokemonList.find((pokemon) => {
    if (pokemon.id === +id) {
      return pokemon;
    }
  });

  if (singlePokemon) {
    res.json(singlePokemon);
  } else {
    res.status(404).json({ message: 'Pokemon not found' });
  }
};

const getPokeinfo = (req, res) => {
  const { id, info } = req.params;
  const basePokemon = PokemonList.find((element) => {
    return element.id === +id;
  });

  if (basePokemon) {
    const selectedInfo = basePokemon[info];
    if (selectedInfo) {
      res.json(selectedInfo);
    } else {
      res.status(404).json({ message: 'Info not found' });
    }
  } else {
    res.status(404).json({ message: 'Pokemon not found' });
  }
};

module.exports = { getAll, getAllPokemon, getOnePokemon, getPokeinfo };
