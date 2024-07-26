const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EPSN_API = require("../../src/Espn_apis/get_news")

const Top_Players = new Schema({
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
            name:String,
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
})
// feeds into the nba page database document

module.export = mongoose.model("NBA_Top_Players",Top_Players)