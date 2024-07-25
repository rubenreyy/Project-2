const mongoose = require("mongoose")
const NFL = require("../../models/nfl_db")
const MLB = require("../../models/mlb_db")
const NBA = require("../../models/nba_db")
const NEWS = require("../../models/news_db")


const dburi = "mongodb+srv://cn:12345web@web-dev-db.fhkedej.mongodb.net/?retryWrites=true&w=majority&appName=web-dev-db"
mongoose.connect(dburi).then(() => console.log("connected"))


// TODO: rework (might delete this file and move to another in database folder)
async function add_top_team(){
    let update = await get_stats.fetch_top_team("football","nfl","2023")
    const add_top_team_status = await NFL.create({
        
    })
    console.log(update)
}

async function main() {
    // uncomment to run file
    // let all_team_fetch = await get_teams_api.get_teams_and_id()
    // await add_nfl_teams(all_team_fetch[0])
    // await add_mlb_teams(all_team_fetch[1])
    // await add_nba_teams(all_team_fetch[2])
    // await deleteM()
    await add_top_team()
    mongoose.connection.close()

}

if (require.main == module) {
    main()
}