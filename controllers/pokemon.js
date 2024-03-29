const express = require("express");
const PokemonList = require("../data.json");
const leader = require("../models/leader");

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
    console.error("Error fetching paginated Pokémon:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllPokemon = (req, res) => {
  try {
    const allPokemon = PokemonList;

    res.json({
      data: allPokemon,
      totalPages: 1,
    });
  } catch (error) {
    console.error("Error fetching all Pokémon:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
    res.status(404).json({ message: "Pokemon not found" });
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
      res.status(404).json({ message: "Info not found" });
    }
  } else {
    res.status(404).json({ message: "Pokemon not found" });
  }
};

const createStat = async (req, res) => {
  try {
    const { name, id,  wins, losses } = req.body;
    const findPokemon = await leader.findOne({ name });
    if (findPokemon) {
      await leader.updateOne({name}, { $inc: { wins, losses } });
    } else {
      const user = await leader.create({ name, wins, losses, id });
    }
    return res.status(201).json({});
  } catch (error) {
    console.log(error);
    return res.status(500).send("Ops... Something Went Wrong");
  }
};

const getStats = async (req, res) => {
  try {
    const stats = await leader.find({});
    res.json(stats);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ops... Something Went Wrong");
  }
};

module.exports = {
  getAll,
  getAllPokemon,
  getOnePokemon,
  getPokeinfo,
  createStat,
  getStats,
};
