// updates api and waits for responses
async function get_news_updates() {
    console.log("sending requests")
    let nfl_news,mlb_news,nba_news;
    const [nfl_news_response,mlb_news_response,nba_news_response] = await Promise.all([
        await fetch("http://site.api.espn.com/apis/site/v2/sports/football/nfl/news").then(response => {return response.json()}).then(data => { return data.articles}),
        await fetch("http://site.api.espn.com/apis/site/v2/sports/baseball/mlb/news").then(response => { return response.json() }).then(data => { return data.articles}),
        await fetch("http://site.api.espn.com/apis/site/v2/sports/basketball/nba/news").then(response => { return response.json() }).then(data => { return data.articles}),
    ]);
        console.log("successfetch")
        return [nfl_news_response,mlb_news_response,nba_news_response]

    
}
async function parse_update() {
    let response = await get_news_updates()
    const nfl_news = await response[0].slice(0,3)
    const mlb_news = await response[1].slice(0,3)
    const nba_news = await response[2].slice(0,3)
    return [nfl_news,mlb_news,nba_news]
}

let new_fetch = async () => {
    let response = await parse_update()
        // console.log(response[0][0].description)
        let nfl_news_hd = []
        let mlb_news_hd = []
        let nba_news_hd = []
        for (let index = 0; index < 3; index++) {
            // console.log(response[0][index])
            nfl_news_hd.push([response[0][index].headline,response[0][index].description])
            mlb_news_hd.push([response[1][index].headline,response[1][index].description])
            nba_news_hd.push([response[2][index].headline,response[2][index].description])
        }
        const news_hd = {nfl:nfl_news_hd,mlb:mlb_news_hd,nba:nba_news_hd}
        // console.log(news_hd)
        return news_hd;
}

async function test_func() {
    let news_data = await new_fetch()
    console.log(Object.keys(news_data))
    
}
// test_func()

/* working version
// async function get_news_updates() {
// console.log("sending requests")

// const [nfl_news_response,mlb_news_response,nba_news_response] = awaitPromise.all([
//     await fetch("http://site.api.espn.com/apis/site/v2/sports/football/nfl/news").then(response => {return response.json()}).then(data => { return data.articles}),
//     await fetch("http://site.api.espn.com/apis/site/v2/sports/baseball/mlb/news").then(response => { return response.json() }).then(data => { return data.articles}),
//     await fetch("http://site.api.espn.com/apis/site/v2/sports/basketball/nba/news").then(response => { return response.json() }).then(data => { return data.articles}),
// ]);
// // only using the most recent 3 per fetch to show on home page
// const nfl_news = await nfl_news_response.slice(0,3)
// const mlb_news = await mlb_news_response.slice(0,3)
// const nba_news = await nba_news_response.slice(0,3)
// console.log("successfetch")
// return [nfl_news,mlb_news,nba_news]
// };
*/ 

// let new_fetch = async () => {
//     let response = await get_news_updates()
//     // console.log(response[0][0].description)
//     let nfl_news_hd = [], mlb_news_hd = [], nba_news_hd = [];
//     for (let index = 0; index < 3; index++) {
//         // console.log(response[0][index])
//         nfl_news_hd.push([response[0][index].headline,response[0][index].description])
//         mlb_news_hd.push([response[1][index].headline,response[1][index].description])
//         nba_news_hd.push([response[2][index].headline,response[2][index].description])
//     }
//     const news_hd = {nfl:nfl_news_hd,mlb:mlb_news_hd,nba:nba_news_hd}
//     // console.log(news_hd)
//     return news_hd;
// }
// new_fetch()

// // TODO: finish the await promises for reliability

module.exports = {
  new_fetch
}