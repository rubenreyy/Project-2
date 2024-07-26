const mongoose = require("mongoose")
const get_teams_api = require("../../Espn_apis/get_teams")
const get_stats = require("../../Espn_apis/get_stats")
const NFL_T = require("../../../models/teams/nfl_teams_db")
const MLB_T = require("../../../models/teams/mlb_teams_db")
const NBA_T = require("../../../models/teams/nba_teams_db")
const Schema = mongoose.Schema;

const dburi = "mongodb+srv://cn:12345web@web-dev-db.fhkedej.mongodb.net/?retryWrites=true&w=majority&appName=web-dev-db"

mongoose.connect(dburi).then(() => console.log("connected"))


async function add_nfl_teams(nfl_fetch){
    for (let index = 0; index < nfl_fetch.length; index++) {
        const add_team = await NFL_T.create({team_id: nfl_fetch[index][0],team_name: nfl_fetch[index][1]})
    }
    console.log(await NFL_T.countDocuments())
}
async function add_nba_teams(nba_fetch){
    // console.log(nba_fetch)
    for (let index = 0; index < nba_fetch.length; index++) {
        const add_team = await NBA_T.create({team_id: nba_fetch[index][0],team_name: nba_fetch[index][1]})
    }
    console.log(await NBA_T.countDocuments())
}
async function add_mlb_teams(mlb_fetch){
    for (let index = 0; index < mlb_fetch.length; index++) {
        const add_team = await MLB_T.create({team_id: mlb_fetch[index][0],team_name: mlb_fetch[index][1]})
    }
    console.log(await MLB_T.countDocuments())
}

async function deleteM(){
    // await mongoose.model("NFL_T").deleteMany()
    // await mongoose.model("NBA_T").deleteMany()
    // await mongoose.model("MLB_T").deleteMany()
    let list = await mongoose.connection.listCollections()
    console.log(list)
}

async function add_top_team(){
    let update = await get_stats.fetch_top_team("football","nfl","2023")
    const add_top_team_status = await NFL
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