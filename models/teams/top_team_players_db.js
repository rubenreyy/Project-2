const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const top_team_players = new Schema({
    offense: Array,
    defense: Array
})

module.exports = mongoose.model("TOP_TEAM_P",top_team_players)