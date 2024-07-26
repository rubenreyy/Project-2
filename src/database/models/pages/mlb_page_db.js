const mongoose = require('mongoose');
const mlb_top_players = require("../athletes/mlb_top_players")
const Schema = mongoose.Schema;

// TODO: fix stats api and add to schema per document entry
const MLB = new Schema({
    all_team_stats: Array,
    top_team_stats: Array,
    top_player_stats: mlb_top_players,
    top_team_player_stats: Array
}, {timestamps: true})

module.exports = mongoose.model("MLB",MLB)