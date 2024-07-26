const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Top_Players = new Schema({
    offensive: {
        passing: {
            name: String,
            yards: Number
        },
        rushing: {
            name: String,
            yards: Number
        },
        receiving: {
            name: String,
            yards: Number
        }
    },
    defensive: {
        tackles: {
            name:String,
            tackles: Number,
        },
        sacks: {
            name: String,
            sacks: Number
        },
        interceptions: {
            name: String,
            int: Number
        }
    }
})

// feeds in to the nfl page database document

module.exports = mongoose.model("NFL_top_Players",Top_Players)