
// fetching stats and saving to db
async function fetch_top_player() {
    let fetch_top = await fetch("https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/leaders").then(response => {return response.json()}).then(data => {return data.categories[0].leaders[0]})
    // console.log(fetch_top)
    let top_player_ref = await fetch(fetch_top.athlete['$ref']).then(response => {return response.json()}).then(data => {return data})
    // console.log(top_player_ref)
    return top_player_ref
}

// finds the single team with best record 
async function fetch_top_team() {
    // gets the top team from post season but needs to be updated  to reflect weekly standings overall
    let fetch_team = await fetch("https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2023/types/3/groups/9/standings/3?lang=en&region=us").then(response => {return response.json()}).then(data => {return data.standings[0]})
    let fetch_top = await fetch(fetch_team.team["$ref"]).then(response => {return response.json()}).then(data => {return data})
    console.log(fetch_top)
    return fetch_top
}

// gets the top team player for offense and defense
async function fetch_top_team_top_player() {
    let fetch_team_top = await fetch()
}

async function main(){
    // gets top player
    // let top_player = await fetch_top_player()
    // console.log(top_player)
    //gets top team
    let top_team = await fetch_top_team()
    console.log(top_team.displayName)

    // let top_team_top_player = await fetch_top_team_top_player()
    // console.log(top_team.displayName)

    console.log("done")
}

if (require.main == module){
    main()
}

module.exports = {
    fetch_top_team,
    fetch_top_player
}