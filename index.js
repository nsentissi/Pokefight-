const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const router = require("./routes/pokemon.js");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(cors());

app.use(express.json());
app.use(cors());
app.use("/pokemon", router);



mongoose.connect(process.env.CONNECTION_STRING).then(()=>{
  
  console.log('database connected')
  
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
  
});


