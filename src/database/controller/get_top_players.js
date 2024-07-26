const mongoose = require("mongoose");
const TOP_NFL = require("../../../models/athletes/nfl_top_players")
// const TOP_NBA = require("../../models/nba_top_players")
const TOP_MLB = require("../../../models/athletes/mlb_top_players")
const get_new_stats = require("../../Espn_apis/get_stats")

const dburi = "mongodb+srv://cn:12345web@web-dev-db.fhkedej.mongodb.net/?retryWrites=true&w=majority&appName=web-dev-db"

mongoose.connect(dburi).then(() => console.log("connected"))


// top team players

async function add_top_players() {
    let update =  await get_new_stats.fetch_top_sport_player("football","nfl","2023")
    console.log(update.defense[0][0])

    let add_nfl_players = await TOP_NFL.create({
        offensive : { 
            passing : { name: update.offense[0][0], yards : update.offense[0][1] },  
            rushing : { name: update.offense[1][0], yards : update.offense[0][1] },
            receiving : { name: update.offense[2][0], yards: update.offense[2][1] },
        },
        defensive : { 
            tackles : { name: update.defense[0][0], tackles: update.defense[0][1] },
            sacks : { name: update.defense[1][0], sacks: update.defense[1][1] },
            interceptions : { name: update.defense[2][0], int: update.defense[2][1]}
        }
    })
    update = await get_new_stats.fetch_top_sport_player("baseball","mlb","2024")
    let add_mlb_players = await TOP_MLB.create({
        offensive : { 
            batting_avg : { name: update.offense[0][0], yards : update.offense[0][1] },  
            home_runs : { name: update.offense[1][0], yards : update.offense[0][1] },
            runs_in : { name: update.offense[2][0], yards: update.offense[2][1] },
        },
        defensive : { 
            wins : { name: update.defense[0][0], tackles: update.defense[0][1] },
            earned_run_avg : { name: update.defense[1][0], sacks: update.defense[1][1] },
            saves : { name: update.defense[2][0], int: update.defense[2][1]}
        }
    })
    console.log(add_mlb_players)
    
    update = await get_new_stats.fetch_top_sport_player("basketball","nba","2024")
    let add_nba_players = await TOP_MLB.create({
        offensive : { 
            points : { name: update.offense[0][0], yards : update.offense[0][1] },  
            assists : { name: update.offense[1][0], yards : update.offense[0][1] },
            threepointersmade : { name: update.offense[2][0], yards: update.offense[2][1] },
        },
        defensive : { 
            rebounds : { name: update.defense[0][0], tackles: update.defense[0][1] },
            blocks : { name: update.defense[1][0], sacks: update.defense[1][1] },
            steals : { name: update.defense[2][0], int: update.defense[2][1]}
        }
    })
    console.log(add_nba_players)
    // console.log(add_nfl_players)
    console.log("successful")
    // return add_nfl_players
}


async function main() {
    let update = await add_top_players()
    console.log(update)

    mongoose.connection.close()
    console.log("done")
}
if (require.main == module){
    main()
}