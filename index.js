const express = require("express");
const app = express();
const port = 3000;
const pokemonRouter = require("./routes/pokemon.js");

app.use(express.json());
app.use("/pokemon", pokemonRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
