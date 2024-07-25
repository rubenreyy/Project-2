const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const MLB_teams = new Schema({
    team_id: Number,
    team_name: String
})


module.exports = mongoose.model("MLB_teams",MLB_teams)