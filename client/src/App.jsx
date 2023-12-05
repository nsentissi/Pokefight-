
import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Pokemonlist from "./components/Pokemonlist";
import PokemonDetails from "./components/PokemonDetails";
import PokeFight from "./components/PokeFight"
import LeaderBoard from "./components/LeaderBoard";

function App() {

  return (
    <>
      <div>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/pokemon" element={<Pokemonlist />} />
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
          <Route path="/pokemon/battle/:id" element={<PokeFight />} />
          <Route path="/pokemon/leaderboard" element={<LeaderBoard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
