const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EPSN_API = require("../src/Espn_apis/get_news")

// TODO: connect espn to model and store values then create interval to auto update

const nfl = new Schema({
    news: Array,
    // team_stats: Array,
    // top_team_stats: Array,
    // top_team_player_stats: Array

})


module.exports = mongoose.model("NFL_DB",nfl)