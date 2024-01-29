const { Schema, model, Types } = require("mongoose");

const leaderSchema = new Schema({
  name: { type: String, required: true, unique: true  },
  id: { type: Number},
  wins: { type: Number, required: true },
  losses: { type: Number, required: true },
});


const leader = model("leader", leaderSchema);

module.exports = leader;