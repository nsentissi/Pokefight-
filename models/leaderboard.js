const { Schema, model, Types } = require("mongoose");

const leaderboardSchema = new Schema({
  name: { type: String, required: true, unique: true  },
  wins: { type: Number, required: true },
  losses: { type: Number, required: true  },
});


const leaderboard = model("leaderboard", leaderboardSchema);

module.exports = leaderboard;