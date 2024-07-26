
// only needs to be done once because the teams won't change but if they ever do just run it again
async function get_all_teams() {
    const [nfl_teams,mlb_teams,nba_teams] = await Promise.all([
        await fetch("http://site.api.espn.com/apis/site/v2/sports/football/nfl/teams").then((response ) => {return response.json()}).then((data) => {return data.sports[0].leagues}),
        await fetch("http://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams").then((response) => { return response.json() }).then((data) => { return data.sports[0].leagues }),
        await fetch("http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams").then((response) => { return response.json() }).then((data) => {return data.sports[0].leagues})
    ])

    let all_nfl = await nfl_teams
    let all_mlb = await mlb_teams
    let all_nba = await nba_teams

    all_teams = [all_nfl,all_mlb,all_nba]
    return all_teams
}
// parses name and id out of fetch
async function get_teams_and_id(){
// let get_teams_and_id = async () => {
    let response = await get_all_teams()
    let sport_id_name = []
    for (let r_items = 0; r_items < response.length; r_items++) {
    let sport_array = []
    for (let index = 0; index < response[r_items][0].teams.length; index++) {
        sport_array.push([response[r_items][0].teams[index].team.id,response[r_items][0].teams[index].team.displayName])
    }
    sport_id_name.push(sport_array)
}    
    return sport_id_name
}




async function main(){
    let all_teams = await get_teams_and_id()
    // console.log(all_teams[0].teams.id)
    console.log(all_teams)
}

if (require.main == module) {
    main()
}

module.exports = {
    get_teams_and_id
}