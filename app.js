const express = require('express')
const bodyParser = require("body-parser")
const ejs = require('ejs')
// const espn_api = require('./src/Espn_apis/get_news')
const get_news_stored = require("./src/database_fetch/db_get_news")
const mongoose = require("mongoose");



// Mock function to fetch stats, replace with actual database or API calls
const fetchStats = (league) => {
  return {
      allTeams: `${league} All Team Stats`,
      topPlayers: `${league} Top Player Stats`,
      team1: `${league} #1 Team Stats`,
      team1Players: `${league} #1 Team Player Stats`
  };
};

// if api fails then falls back on placeholders
const placeholderNews = [
  { title: "Recent News 1", summary: "Summary for recent news 1." },
  { title: "Recent News 2", summary: "Summary for recent news 2." },
  { title: "Recent News 3", summary: "Summary for recent news 3." }
];

//express engine
const app = express()
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))
app.use('/public', express.static('public'));

const port = 5500


app.get('/', async (req, res) => {
  // connects to atlas db and find newest news cycle
  let news = await mongoose.model("NEWS")
  let newest_update = await news.findOne()
  // assigning sports to specific variable
  let nfl = newest_update.nfl;let nba = newest_update.nba;let mlb = newest_update.mlb

  // creating lists and pushing recent 3 news for each sport
  let nfl_news = [];let nba_news = [];let mlb_news = [];
  for (let index = 0; index < 3; index++) {
    nfl_news.push({ title: nfl[index][0], summary: nfl[index][1] })
    nba_news.push({ title: nba[index][0], summary: nba[index][1] })
    mlb_news.push({ title: mlb[index][0], summary: mlb[index][1] })
    
  }
  console.log(nfl_news)
  try {
      const nflNews = nfl_news;
      const nbaNews = nba_news;
      const mlbNews = mlb_news;
      res.render('home', { nflNews, nbaNews, mlbNews });
  } catch (error) {
    res.render('home', { 
        nflNews: placeholderNews, 
        nbaNews: placeholderNews, 
        mlbNews: placeholderNews 
    });
      // res.status(500).send('Error fetching news data');
      console.log(error)
    }

});

app.get('/nfl', (req, res) => {
  const stats = fetchStats('NFL');
  res.render('nfl', { stats });
});

app.get('/nba', (req, res) => {
  const stats = fetchStats('NBA');
  res.render('nba', { stats });
});

app.get('/mlb', (req, res) => {
  const stats = fetchStats('MLB');
  res.render('mlb', { stats });
});

app.get('/search', (req, res) => {
  const query = req.query.q.toLowerCase();
  const results = db.filter(item => item.includes(query));
  res.json({ results });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})