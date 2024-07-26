const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const NBA_teams = new Schema({
    team_id: Number,
    team_name: String
})


module.exports = mongoose.model("NBA_teams",NBA_teams)