const mongoose = require("mongoose")
const Schema = mongoose.Schema;

// adding conference id
// const NFL_teams = new Schema({
//     team_id: Number,
//     team_name: String,
//     team_conf: String
// })

const NFL_teams = new Schema({
    team_id: Number,
    team_name: String,
    record : {
        wins : Number,
        losses : Number,
        ties : Number 
    }
})


module.exports = mongoose.model("NFL_teams",NFL_teams)