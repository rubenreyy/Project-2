

// fetching stats and saving to db
async function fetch_top_sport_player(sport,league,year) {
    let fetch_top = await fetch(`http://sports.core.api.espn.com/v2/sports/${sport}/leagues/${league}/seasons/${year}/types/2/leaders?lang=en&region=us`).then(response => {return response.json()}).then(data => {return data})
    // // console.log(fetch_top)
    // let top_player_ref = await fetch(fetch_top.athlete['$ref']).then(response => {return response.json()}).then(data => {return data})
    // // console.log(top_player_ref)
    // return top_player_ref

    // let fetch_top = await fetch(`https://sports.core.api.espn.com/v2/sports/${sport}/leagues/${league}/seasons/2023/types/2/teams/${top_team.id}/leaders`).then(response => {return response.json()}).then((data) => {return data})
    let offense_players,defense_player;
    if (sport == "baseball"){
        offense_players = [fetch_top.categories.find((player) => player.name === "avg"),fetch_top.categories.find((player) => player.name === "homeRuns"),fetch_top.categories.find((player) => player.name === "RBIs")]
        defense_player = [fetch_top.categories.find((player) => player.name === "wins"),fetch_top.categories.find((player) => player.name === "ERA"),fetch_top.categories.find((player) => player.name === "saves")]
    }
    else if (sport == "football") {
        offense_players = [fetch_top.categories.find((player) => player.name === "passingYards"),fetch_top.categories.find((player) => player.name === "rushingYards"),fetch_top.categories.find((player) => player.name === "receivingYards")]
        defense_player = [fetch_top.categories.find((player) => player.name === "totalTackles"),fetch_top.categories.find((player) => player.name === "sacks"),fetch_top.categories.find((player) => player.name === "interceptions")]

    }
    else if (sport == "basketball"){
        offense_players = [fetch_top.categories.find((player) => player.name === "pointsPerGame"),fetch_top.categories.find((player) => player.name === "assistsPerGame"),fetch_top.categories.find((player) => player.name === "3PointsMadePerGame")]
        defense_player = [fetch_top.categories.find((player) => player.name === "reboundsPerGame"),fetch_top.categories.find((player) => player.name === "blocksPerGame"),fetch_top.categories.find((player) => player.name === "stealsPerGame")]
    }
    let o_players = []
    let d_players = [];
    for (let index = 0; index < offense_players.length; index++) {
        console.log(offense_players[index])
        let o_name = [await fetch_athlete(offense_players[index]),offense_players[index].leaders[0].value]
        let d_name = [await fetch_athlete(defense_player[index]),defense_player[index].leaders[0].value]
        console.log(o_name)
        console.log(d_name)
        o_players.push(o_name)
        d_players.push(d_name)
    }
    console.log(o_players)
    console.log(d_players)
    // console.log(fetch_top.categories)
    return {
        offense: o_players,
        defense: d_players
    }
}
async function fetch_athlete(ref) {
    console.log(ref)
    let athlete = await fetch(ref.leaders[0].athlete['$ref']).then(response => {return response.json()}).then((data) => {return data.fullName})
    return athlete
}
// gets the top team
async function fetch_top_team(sport,league) {
    // gets the top team from post season but needs to be updated  to reflect weekly standings overall
    let fetch_team = await fetch(`https://sports.core.api.espn.com/v2/sports/${sport}/leagues/${league}/seasons/2023/types/3/groups/9/standings/3?lang=en&region=us`).then(response => {return response.json()}).then(data => {return data.standings[0]})
    let fetch_top = await fetch(fetch_team.team["$ref"]).then(response => {return response.json()}).then(data => {return data})
    return fetch_top
}

// gets the top team players from top team function
async function fetch_top_team_top_player(sport,league) {
    let top_team = await fetch_top_team(sport,league)
    // console.log(top_team)
    let fetch_team_top = await fetch(`https://sports.core.api.espn.com/v2/sports/${sport}/leagues/${league}/seasons/2023/types/2/teams/${top_team.id}/leaders`).then(response => {return response.json()}).then((data) => {return data})
    let offense_player,defense_player;
    if (sport == "baseball"){
        offense_player = fetch_team_top.categories.find((player) => player.name === "avg")
        defense_player = fetch_team_top.categories.find((player) => player.name === "wins")
    }
    else if (sport == "football") {
        offense_player = fetch_team_top.categories.find((player) => player.name === "passingLeader")
        defense_player = fetch_team_top.categories.find((player) => player.name === "totalTackles")

    }
    else if (sport == "basketball"){
        offense_player = fetch_team_top.categories.find((player) => player.name === "pointsPerGame")
        defense_player = fetch_team_top.categories.find((player) => player.name === "reboundsPerGame")
    }
    let o_name = [await fetch(offense_player.leaders[0].athlete["$ref"]).then(response => {return response.json()}).then((data) => {return data.fullName}),offense_player.leaders[0].value]
    let d_name = [await fetch(defense_player.leaders[0].athlete["$ref"]).then(response => {return response.json()}).then((data) => {return data.fullName}),defense_player.leaders[0].value]
    console.log(d_name)
    // console.log(fetch_team_top.categories)
    return {
        offense: o_name,
        defense: d_name
    }
}

// gets the top team record for the league after finding top team
async function fetch_top_team_record(sport,league) {
    let fetch_t_team = await fetch_top_team(sport,league)
    // console.log(fetch_t_team)
    let team_record = await await fetch(`http://sports.core.api.espn.com/v2/sports/${sport}/leagues/${league}/seasons/2023/types/2/teams/${fetch_t_team.id}/record?lang=en&region=us`).then(response => {return response.json()}).then((data) => {return data})
    
    console.log(team_record.items[0].stats)
    let win = team_record.items[0].stats[0].find((win) => {win.name === "OTLosses"})

    console.log(`wins  ${win}`)
    return {
        win: win
    }
}

// fetches all sports and returns list 
async function fetch_all_sports() {
    let sports = [["football","nfl","2023"],["baseball","mlb","2024"],["basketball","nba","2024"]]
    let response = []
    for (let i = 0;i < sports.length;i++) {
        let top_player = await fetch_top_player(sports[i][0],sports[i][1],sports[i][2])
        let top_team = await fetch_top_team(sports[i][0],sports[i][1])
        let top_team_top_player = await fetch_top_team_top_player(sports[i][0],sports[i][1])
        response.push([top_player,top_team,top_team_top_player])
    }
    return response
}
 async function update_sports(sport) {
    let sports = [["football","nfl","2023"],["baseball","mlb","2024"],["basketball","nba","2024"]]
    if (sport == 'nfl'){
        return sports[0]
    }
    else if (sports == 'mlb')
        {
            return sports[1]
        }
        else
        return sports[2]
}

async function main(){
    let sports = [["football","nfl","2023"],["baseball","mlb","2024"],["basketball","nba","2024"]]
    // let sports = await update_sports('nfl')
    // console.log(sports[0])
    // gets top player
    // let top_player = await fetch_top_sport_player(sports[0],sports[1],sports[2])
    // let top_player = await fetch_top_sport_player(sports[0][0],sports[0][1],sports[0][2])
    // let top_teams_player = await fetch_top_team_top_player(sports[1][0],sports[1][1])
    //gets top team
    let top_team = await fetch_top_team_record(sports[0][0],sports[0][1])
    console.log(top_team)
    // let top_team_top_player = await fetch_top_team_top_player()
    console.log("done")
}

if (require.main == module){
    main()
}

module.exports = {
    fetch_all_sports,
    fetch_top_sport_player,
    fetch_top_team,
    fetch_top_team_top_player
}