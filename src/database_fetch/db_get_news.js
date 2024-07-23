const mongoose = require("mongoose")
const news_updates = require("../Espn_apis/get_news")
const NEWS = require("../../models/news_db")

const Schema = mongoose.Schema;

const dburi = "mongodb+srv://cn:12345web@web-dev-db.fhkedej.mongodb.net/?retryWrites=true&w=majority&appName=web-dev-db"

mongoose.connect(dburi).then(() => console.log("connected"))

// TODO: create auto interval for updates and store them to atlas



async function update_news() {
    let updates = await news_updates.new_fetch()
    // console.log(updates.nfl)
    return updates
}
// update_news()
async function add_to_db(){
    let updates = await update_news()
    const updating = await NEWS.create({nfl: updates.nfl,mlb: updates.mlb,nba: updates.nba})
    console.log("update successful")
    console.log(updating)

}
// add_to_db()

async function deletem() {
    const deleting = await NEWS.deleteMany()
    console.log(deleting)
}
// deletem()

module.exports = {
    get_news_db
    
}

