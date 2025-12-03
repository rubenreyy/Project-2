const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const dburi = "mongodb+srv://cn:12345web@web-dev-db.fhkedej.mongodb.net/?retryWrites=true&w=majority&appName=web-dev-db"



const News = new Schema({
    nfl: Array,
    mlb: Array,
    nba: Array
})


module.exports = mongoose.model("NEWS",News)