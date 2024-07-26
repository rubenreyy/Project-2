
// fetching stats and saving to db
async function fetch_top_sport_player(sport,league,year) {
    let fetch_top = await fetch(`http://sports.core.api.espn.com/v2/sports/${sport}/leagues/${league}/seasons/${year}/types/2/leaders?lang=en&region=us`).then(response => {return response.json()}).then(data => {return data}) // need to fix year var
    console.log(fetch_top)
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
        // console.log(o_name)
        // console.log(d_name)
        o_players.push(o_name)
        d_players.push(d_name)
    }
    // console.log(o_players)
    // console.log(d_players)
    return {
        offense: o_players,
        defense: d_players
    }
}

// fetches athlete api from sport player function then returns the json of single athlete
async function fetch_athlete(ref) {
    let athlete = await fetch(ref.leaders[0].athlete['$ref']).then(response => {return response.json()}).then((data) => {return data.fullName})
    return athlete
}
// gets the top team 
async function fetch_top_team(sport,league) {
    let fetch_team;
    if (sport == "basketball") {

        fetch_team = await fetch(`https://sports.core.api.espn.com/v2/sports/${sport}/leagues/${league}/seasons/2024/types/2/groups/9/standings/3?lang=en&region=us`).then(response => {return response.json()}).then(data => {return data.standings[0]})
    } else {

        // gets the top team from post season but needs to be updated  to reflect weekly standings overall
        fetch_team = await fetch(`https://sports.core.api.espn.com/v2/sports/${sport}/leagues/${league}/seasons/2023/types/3/groups/9/standings/3?lang=en&region=us`).then(response => {return response.json()}).then(data => {return data.standings[0]})
    }
    let fetch_top = await fetch(fetch_team.team["$ref"]).then(response => {return response.json()}).then(data => {return data})
    return fetch_top
}

// gets the top team players from top team function
async function fetch_top_team_top_player(sport,league) {
    console.log("func reached")
    let top_team = await fetch_top_team(sport,league)
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
    return {
        offense: o_name,
        defense: d_name
    }
}
// gets all team records
async function fetch_all_team_records(sport, league) {
    let all_team_array = []
    let season_teams = await fetch(`https://sports.core.api.espn.com/v2/sports/${sport}/leagues/${league}/seasons/2023/teams`).then((response)  => {return response.json()}).then(data => {return data})
    
    for (let index = 1; index <= season_teams.count + 2; index++) { // goes from 1-34 but skips 32
        if (index == season_teams.count) {
            continue
        }
        if (index == season_teams.count - 1) {
            continue
        }
        if (sport == "basketball"){
            if (index > 30)
            {
                break
            }
        }
        // single
        let single_team = await fetch(`http://sports.core.api.espn.com/v2/sports/${sport}/leagues/${league}/seasons/2023/teams/${index}?lang=en&region=us`).then(response => {return response.json()}).then(data => {return data})
        console.log(single_team.id)
        let team_record = await fetch(`http://sports.core.api.espn.com/v2/sports/${sport}/leagues/${league}/seasons/2023/types/2/teams/${single_team.id}/record?lang=en&region=us`).then(response => { return response.json() }).then((data) => { return data.items })
        if (team_record == 'undefined'){
            continue
        }
        
        if (season_teams === undefined ){
            continue
        }
        console.log(single_team.name)
        let win = team_record[0].stats.find((element) => element.name === "wins")
        let losses = team_record[0].stats.find((element) => element.name === "losses")
        // console.log(`wins  ${win}`)
        if (sport != "football") {
            let winPercent = team_record[0].stats.find((element) => element.name === "winPercent") // going to have to change this for baseball and basketball     
            all_team_array.push({
                team_id: single_team.id,
                team_name: single_team.name,
                team_record: { 
                    wins: win.value,
                    losses: losses.value,
                    alt: winPercent.value
                }
            })
        }
        else {
            let ties = team_record[0].stats.find((element) => element.name === "ties") // for football only ties
            all_team_array.push({
                team_id: single_team.id,
                team_name: single_team.name,
                team_record: {
                    wins: win.value,
                    losses: losses.value,
                    ties: ties.value
                }
            })
        }
    }
    return all_team_array

}

// gets the top team record for the league after finding top team
// gets top team -> then fetchs record
async function fetch_top_team_record(sport,league) {
    let fetch_t_team = await fetch_top_team(sport,league)
    console.log("output")
    let team_record;
    if (sport == "football") {
        team_record = await fetch(`http://sports.core.api.espn.com/v2/sports/${sport}/leagues/${league}/seasons/2023/types/2/teams/${fetch_t_team.id}/record?lang=en&region=us`).then(response => {return response.json()}).then((data) => {return data.items})
        
    } else {

        team_record = await fetch(`http://sports.core.api.espn.com/v2/sports/${sport}/leagues/${league}/seasons/2024/types/2/teams/${fetch_t_team.id}/record?lang=en&region=us`).then(response => {return response.json()}).then((data) => {return data.items})
    }
    
    let win = team_record[0].stats.find((element) => element.name === "wins")
    let losses = team_record[0].stats.find((element) => element.name === "losses")
    console.log(`wins  ${win}`)
    if (sport !=  "football") {
        let winPercent = team_record[0].stats.find((element) => element.name === "winPercent") // going to have to change this for baseball and basketball     
        return {
            team_id: fetch_t_team.id,
            team_name:  fetch_t_team.name,
            team_record: {
                wins: win.value,
                losses : losses.value,
                winPercent: winPercent.value
            }
            
        }
    }
    else {
        let ties = team_record[0].stats.find((element) => element.name === "ties") // going to have to change this for baseball and basketball     
        return {
            team_id: fetch_t_team.id,
            team_name:  fetch_t_team.name,
            team_record: {
                wins: win.value,
                losses : losses.value,
                ties: ties.value
            }
    
        }
    }
}

// fetches all sports and returns list 
async function fetch_all_sports() {
    let sports = [["football","nfl","2023"],["baseball","mlb","2024"],["basketball","nba","2024"]]
    let response = []
    for (let i = 0;i < sports.length;i++) {
        let top_sport_players = 1
        // await fetch_top_sport_player(sports[i][0],sports[i][1],sports[i][2])
        let top_team = await fetch_top_team_record(sports[i][0],sports[i][1])
        let top_team_top_player = await fetch_top_team_top_player(sports[i][0],sports[i][1])
        response.push([top_sport_players,top_team,top_team_top_player])
    }
    return response
}

async function main(){
    console.log("done")
}

if (require.main == module){
    main()
}

module.exports = {
    fetch_top_sport_player, // fetches top players for the sport
    fetch_top_team, // fetches top team
    fetch_top_team_top_player, // fetches top team player
    fetch_top_team_record, // fetches top team record
    fetch_all_team_records
}