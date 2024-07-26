const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Top_Players = new Schema({
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
            name:String,
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
})
// feeds into the mlb page database document

module.exports = mongoose.model("MLB_Top_Players",Top_Players)