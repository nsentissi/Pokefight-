const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const cors = require("cors");
const PokemonList = require("./data.json");

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/pokemon", (req, res) => {
  res.json(data);
});

app.get("/pokemon/:id", (req, res) => {
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

app.get("/pokemon/:id/:info", (req, res) => {
  const { id, type } = req.params;

  const onePokemon = pokemon[type][id];


});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
