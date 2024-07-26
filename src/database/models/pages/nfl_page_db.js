const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const nfl_top_players = require("../athletes/nfl_top_players_schema");
const single_team_record_schema = require("../teams/all_teams/single_team_record_schema");
const top_team_players_db = require("../teams/top_team_players_schema");
//sub documents

// TODO: fix stats api and add to schema per document entry

// data to be displayed on nfl page
const nfl = new Schema({
    all_team_stats: [{
        team_id: Number,
        team_name: String,
        team_record: {
            wins: Number,
            losses: Number,
            ties: Number
        }
    }], // gets array of single nfl teams
    top_player_stats: [{
        offensive: {
            passing: {
                name: String,
                yards: Number
            },
            rushing: {
                name: String,
                yards: Number
            },
            receiving: {
                name: String,
                yards: Number
            }
        },
        defensive: {
            tackles: {
                name:String,
                tackles: Number,
            },
            sacks: {
                name: String,
                sacks: Number
            },
            interceptions: {
                name: String,
                int: Number
            }
        }
    }], // gets top 6 players
    top_team_stats:{
        team_id: Number,
        team_name: String,
        team_record: {
            wins: Number,
            losses: Number,
            ties: Number
        }
    },
    top_team_player_stats: {
        offense: Array,
        defense: Array
    },
    
},
    { timestamps : true}
)

/* */

module.exports = mongoose.model("NFL_DB",nfl)


// data to add if needed to recreate

// console.log(nfl_page)
// let nfl_page = await NFL.create({
//     all_team_stats: [{
//         team_id: 100,
//         team_name: "Temp_name",
//         team_record: {
//             wins: 1,
//             losses: 1,
//             ties: 0
//         }
//     }], // gets array of single nfl teams
//     top_player_stats: {
//         offensive: {
//             passing: {
//                 name: "Temp1",
//                 yards: 100
//             },
//             rushing: {
//                 name: "rtemp1",
//                 yards: 1002
//             },
//             receiving: {
//                 name: "retemp1",
//                 yards: 870
//             }
//         },
//         defensive: {
//             tackles: {
//                 name: "ttemp1",
//                 tackles: 100,
//             },
//             sacks: {
//                 name: "stemp1",
//                 sacks: 20
//             },
//             interceptions: {
//                 name: "itemp1",
//                 int: 10
//             }
//         }
//     }, // gets top 6 players
//     top_team_stats: {
//         team_id: 100,
//         team_name: "Temp_name",
//         team_record: {
//             wins: 1,
//             losses: 1,
//             ties: 0
//         }
//     },
//     top_team_player_stats: {
//         offense: ["tempnameof",100],
//         defense: ["tempnamedef",99]
//     },
//     });