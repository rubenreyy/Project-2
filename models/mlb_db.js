const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: fix stats api and add to schema per document entry
const MLB = new Schema({
    news: Array,
    top_team_stats: Array,
    top_player_stats: Array,
    top_team_player_stats: Array
})

module.exports = mongoose.model("MLB",MLB)