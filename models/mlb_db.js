const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// saving the top 3 most recent news events per interval
const mlb_news = new Schema({
    recent_three: Array
})

const MLB = new Schema({
    news: Array,
    top_team_stats: Array,
    top_player_stats: Array,
    top_team_player_stats: Array
})

module.exports = mongoose.model("MLB",MLB)