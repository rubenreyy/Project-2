const mongoose = require('mongoose');
const mlb_top_players = require("../athletes/mlb_top_players_schema");
const single_team_record_schema = require('../teams/all_teams/single_team_record_schema');
const top_team_players_db = require('../teams/top_team_players_schema');
const Schema = mongoose.Schema;


// const MLB = new Schema({
//     all_team_stats: [single_team_record_schema],
//     top_team_stats: single_team_record_schema,
//     top_player_stats: mlb_top_players,
//     top_team_player_stats: mlb_top_players
// }, {timestamps: true})

// TODO: fix stats api and add to schema per document entry
const MLB = new Schema({
    all_team_stats: [{
        team_id: Number,
        team_name: String,
        team_record: {
            wins: Number,
            losses: Number,
            alt: Number
        }
}],
    top_team_stats: {
        team_id: Number,
        team_name: String,
        team_record: {
            wins: Number,
            losses: Number,
            alt: Number
        }
},
    top_player_stats: {
        offensive: {
            batting_avg: {
                name: String,
                avg: Number
            },
            home_runs: {
                name: String,
                hr: Number
            },
            runs_in: {
                name: String,
                rbi: Number
            }
        },
        defensive: {
            wins: {
                name: String,
                w: Number,
            },
            earned_run_avg: {
                name: String,
                era: Number
            },
            saves: {
                name: String,
                sv: Number
            },
        }
    },
    top_team_player_stats: {
        offense: Array,
        defense: Array
    }
}, {timestamps: true})

module.exports = mongoose.model("MLB",MLB)