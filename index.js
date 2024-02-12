require("dotenv/config");
require("./db.js");
const express = require("express");
const cors = require("cors");
const path = require("path");

const router = require("./routes/pokemon.js");

const app = express();
const port = 3001;
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());


app.use("/api/pokemon", router);

/* app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
}); */

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
