const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const single_team_records = new Schema({
    team_id: Number,
    team_name: String,
    team_record: {
        wins: Number,
        losses: Number,
        alt: Number
    }
})

module.exports = mongoose.model("STR",single_team_records)