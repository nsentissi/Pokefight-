const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const data = require("./data.json");

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
