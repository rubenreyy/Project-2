const mongoose = require("mongoose")
const NFL = require("../models/nfl_db")
const MLB = require("../models/mlb_db")
const NBA = require("../models/nba_db")
const NEWS = require("../models/news_db")


const dburi = "mongodb+srv://cn:12345web@web-dev-db.fhkedej.mongodb.net/?retryWrites=true&w=majority&appName=web-dev-db"
mongoose.connect(dburi).then(() => console.log("connected"))



async function get_model(model_name){
    console.log(await mongoose.connection.models[model_name]);
    return mongoose.connection.models[model_name]
}



// TODO: rework (might delete this file and move to another in database folder)