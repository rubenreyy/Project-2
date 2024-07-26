const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EPSN_API = require("../src/Espn_apis/get_news")
const nfl_teams = require("../teams/all_teams/nfl_teams_db")
const nfl_top_players = require("../athletes/nfl_top_players");
//sub documents

// creates the model with id,name,and summary for each team
const single_team_nfl = new Schema({
    single_team_id: nfl_teams.team_id,
    single_team_name: nfl_teams.team_name,
    single_team_WL_record: {
        win: String,
        loss: String,
        tie: String
    }
})


// TODO: fix stats api and add to schema per document entry

// data to be displayed on nfl page
const nfl = new Schema({
    all_team_stats: [single_team_nfl], // gets array of single nfl teams
    top_player_stats: nfl_top_players, // gets top 6 players
    top_team_stats: {
        team_id: Number,
        team_name: String,
        win: Number,
        loss: Number,
        tie: Number
    },
    top_team_player_stats: nfl_top_players,
    
},
    { timestamps : true}
)

/* */

module.exports = mongoose.model("NFL_DB",nfl)