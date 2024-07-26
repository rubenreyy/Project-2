const mongoose = require("mongoose");
const single_team_record_schema = require("../teams/all_teams/single_team_record_schema");
const Schema = mongoose.Schema;


// TODO: fix stats api and add to schema per document entry
// const NBA = new Schema({
//     all_team_stats: [single_team_record_schema], // array of single teams
//     top_team: single_team_record_schema, // only one team(top called)
//     top_players: nba_top_players, // 
//     top_team_players_stats: nba_top_players
// }, {timestamps : true})

const NBA = new Schema({
    all_team_stats: [{
        team_id: Number,
        team_name: String,
        team_record: {
            wins: Number,
            losses: Number,
            alt: Number
        }
    }], // array of single teams
    top_team: {
        team_id: Number,
        team_name: String,
        team_record: {
            wins: Number,
            losses: Number,
            alt: Number
        }
    }, // only one team(top called)
    top_players: {
        offensive: {
            points: {
                name: String,
                pts: Number
            },
            assists: {
                name: String,
                ast: Number
            },
            threepointersmade: {
                name: String,
                threepointers: Number
            }
        },
        defensive: {
            rebounds: {
                name: String,
                reb: Number,
            },
            blocks: {
                name: String,
                blk: Number
            },
            steals: {
                name: String,
                stl: Number
            },
        }
    }, // 
    top_team_players_stats: {
        offense: Array,
        defense: Array
    }
}, {timestamps : true})

module.exports = mongoose.model("NBA", NBA)