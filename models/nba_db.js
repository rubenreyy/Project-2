const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const NBA = new Schema({
    news: Array,
    team_stats: Array,
    top_team_stats: Array,
    top_team_player_stats: Array
})

module.exports = mongoose.model("NBA", NBA)