const mongoose = require("mongoose")
const NFL = require("../models/nfl_db")
const MLB = require("../models/mlb_db")
const NBA = require("../models/nba_db")
const NEWS = require("../models/news_db")


const dburi = "mongodb+srv://cn:12345web@web-dev-db.fhkedej.mongodb.net/?retryWrites=true&w=majority&appName=web-dev-db"
mongoose.connect(dburi).then(() => console.log("connected"))
// setInterval(update_data(),5000,repea

// creates an init for first push to db
// update_data()
async function update_data() {
    // const espn_news_fetch = require("../src/Espn_apis/get_news")
    // const news_data = await espn_news_fetch.new_fetch()
    // const nfl = await NFL.create({news: news_data[0]}) // creates and saves nfl 
    // console.log(nfl)
    
}

async function query_db() {
    const news  = await NEWS.findOne()
    console.log(news)
}

async function get_model(model_name){
    console.log(await mongoose.connection.models[model_name]);
    return mongoose.connection.models[model_name]
}

console.log(get_model(NFL))
// for dev testing purposes only
async function delete_documents(model_name) {
    console.log(`${model_name} has been deleted`)
}

// query_db()
// mongoose.connection.close()
// TODO: add schema for db and then auto fetch and save espn data every set interval