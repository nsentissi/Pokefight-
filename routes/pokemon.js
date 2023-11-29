const express = require("express");

const {
  getAll,
  getOnePokemon,
  getPokeinfo,
} = require("../controllers/pokemon.js");



const pokemonRouter = express.Router();
pokemonRouter.route("/").get(getAll)
pokemonRouter.route("/:id").get(getOnePokemon)
pokemonRouter.route("/:id/:info").get(getPokeinfo)

module.exports = pokemonRouter;