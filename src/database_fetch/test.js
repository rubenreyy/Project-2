const test_standings = require("./test.json")
let team_records = async() => {
    let get_team_from_standings = await fetch(test_standings.standings[0].team['$ref']).then(response => {return response.json()}).then(data => {return data})
    console.log(get_team_from_standings.displayName)
    return get_team_from_standings
} 


async function main() {
    // console.log(test_standings.standings[0].records[0])
    // console.log(team_records)
    await team_records()
    for (let index = 0; index < test_standings.length; index++) {
            console.log(test_standings[index])
        }
    // gets team id to transfer to db rather than fetching api
    console.log(test_standings.standings[0].team['$ref'].split('/')[11].split("?")[0])
}

if (require.main == module){
    main()
}