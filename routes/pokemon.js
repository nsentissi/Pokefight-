const express = require("express");

const {
  getAll,
  getOnePokemon,
  getPokeinfo,
  getAllPokemon,
  createStat, 
  getStats,
} = require("../controllers/pokemon.js");



const router = express.Router();
router.route('/').get(getAll); /* paginated  */

router.route('/all').get(getAllPokemon);

router.route('/:id').get(getOnePokemon);

 router.route('/:id/:info').get(getPokeinfo);

router.route('/leaderboard').get(getStats).post(createStat)

module.exports = router;