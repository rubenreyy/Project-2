
// only needs to be done once because the teams won't change but if they ever do just run it again
async function get_all_teams() {
    const [nfl_teams,mlb_teams,nba_teams] = await Promise.all([
        await fetch("http://site.api.espn.com/apis/site/v2/sports/football/nfl/teams").then((response ) => {return response.json()}).then((data) => {return data.sports[0].leagues}),
        await fetch("http://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams").then((response) => { return response.json() }).then((data) => { return data.sports[0].leagues }),
        await fetch("http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams").then((response) => { return response.json() }).then((data) => { return data.sports[0].leagues})
    ])

    let all_nfl = await nfl_teams
    let all_mlb = await mlb_teams
    let all_nba = await nba_teams

    all_teams = [all_nfl,all_mlb,all_nba]
    // console.log(all_nfl)
    return all_teams
}
let get_teams = async () => {
    let response = await get_all_teams()
    console.log(response[0])
    return response
}

get_teams()

module.exports = {
    get_teams
}