const mongoose = require("mongoose")
const news_updates = require("../../Espn_apis/fetch_wrapper")
const NEWS = require("../../../models/news_db")
const NFL = require("../../../models/nfl_page_db")
const MLB = require("../../models/mlb_db")
const NBA = require("../../models/nba_db")
const Schema = mongoose.Schema;


const dburi = "mongodb+srv://cn:12345web@web-dev-db.fhkedej.mongodb.net/?retryWrites=true&w=majority&appName=web-dev-db"

mongoose.connect(dburi).then(() => console.log("connected"))

// TODO: create auto interval for updates and store them to atlas
 
async function get_top(){
    let top = await NEWS.find()
    console.log(top)
}
async function update_news() {
    let updates = await news_updates.new_fetch()
    // console.log(updates.nfl)
    return updates
}

async function add_to_db(){
    let updates = await update_news()
    const updating = await NEWS.findOneAndUpdate({nfl: updates.nfl,mlb: updates.mlb,nba: updates.nba})
    console.log("update news successful")
    console.log(updating)
}


async function main_function(){
  
}

if (require.main == module){
    console.log("main node")
    main_function()
}

module.exports = {
    add_to_db
    
}

