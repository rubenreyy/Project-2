const get_all_stats = require("./get/get_stats")
const get_all_news = require("./get/get_news")
const get_all_teams = require("./get/get_teams")
const mongoose = require("mongoose")



const dburi = "mongodb+srv://cn:12345web@web-dev-db.fhkedej.mongodb.net/?retryWrites=true&w=majority&appName=web-dev-db"



// async function update_stats() {
//     let new_stats = await get_all_stats.fetch_top_sport_player()
// }
async function update_news(){
    let new_news = await get_all_news.new_fetch()
    return new_news
}

// input sport and league and gets back the array of teams in the league
async function fetch_update_all_teams(sport,league){
    let new_teams = get_all_teams.get_teams_and_id()
    return new_teams
}
// inputs sport and league and gets the top team record based on season
async function fetch_update_top_team_records(sport,league){
    let new_records = await get_all_stats.fetch_top_team_record(sport,league)
    return new_records
}
async function update_top_team_players(sport,league){
    return await get_all_stats.fetch_top_team_top_player(sport,league)
}
async function fetch_update_all_teams_records(sport,league) {
    return get_all_stats.fetch_all_team_records(sport,league)
}


async function fetch_update_top_sport_players(sport,league,year) {
    let new_top_players = await get_all_stats.fetch_top_sport_player(sport,league,year) 
    return new_top_players
}

//auto updates all api callss 



async function main() {
    
    // await start_auto_update()

    // let news = await update_news()
    // console.log(news)

    // let teams = await fetch_all_teams()
    // console.log(teams)
    let top_team = await fetch_top_team_records("basketball","nba")
    console.log(top_team)

}
if (require.main == module){
    main()
}


module.exports = {
    update_news,
    fetch_update_all_teams,
    fetch_update_top_sport_players,
    fetch_update_all_teams_records,
    fetch_update_top_team_records,
    update_top_team_players

}