const get_all_stats = require("./get_stats")
const get_all_news = require("./get_news")
const get_all_teams = require("./get_teams")
const mongoose = require("mongoose")



const dburi = "mongodb+srv://cn:12345web@web-dev-db.fhkedej.mongodb.net/?retryWrites=true&w=majority&appName=web-dev-db"



async function update_stats(){
    // let new_stats = await get_all_stats.fetch_top_sport_player()
}
async function update_news(){
    let new_news = await get_all_news.new_fetch()
    return new_news
}
async function update_teams(){
    let new_teams = get_all_teams.get_teams_and_id()

    // mongoose.model()

}

async function start_auto_update() {
    setInterval(async () => {
    mongoose.connect(dburi).then(() => console.log("connected"))
    let news = await update_news()
    console.log(news)
    }, 30000);
}

async function main() {
    await start_auto_update()
}
if (require.main == module){
    main()
}


module.exports = {
    start_auto_update
}