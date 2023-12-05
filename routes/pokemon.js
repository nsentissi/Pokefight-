const express = require("express");

const {
  getAll,
  getOnePokemon,
  getPokeinfo,
  getAllPokemon
} = require("../controllers/pokemon.js");



const router = express.Router();
router.route('/').get(getAll);

router.route('/all').get(getAllPokemon);

router.route('/:id').get(getOnePokemon);

router.route('/:id/:info').get(getPokeinfo);

module.exports = router;