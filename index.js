const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const router = require("./routes/pokemon.js");

app.use(cors());

app.use(express.json());
app.use(cors());
app.use("/pokemon", router);
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
