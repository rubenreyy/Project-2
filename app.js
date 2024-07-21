const express = require('express')
const bodyParser = require("body-parser")
const ejs = require('ejs')

// Mock function to fetch stats, replace with actual database or API calls
const fetchStats = (league) => {
  return {
      allTeams: `${league} All Team Stats`,
      topPlayers: `${league} Top Player Stats`,
      team1: `${league} #1 Team Stats`,
      team1Players: `${league} #1 Team Player Stats`
  };
};

/* const fetchRecentNews = async (sport) => {
  try {
      const response = await axios.get(`https://api.example.com/news/${sport}`);
      return response.data;
  } catch (error) {
      console.error(`Error fetching ${sport} news:`, error);
      return [];
  }
}; */

const placeholderNews = [
  { title: "Recent News 1", summary: "Summary for recent news 1." },
  { title: "Recent News 2", summary: "Summary for recent news 2." },
  { title: "Recent News 3", summary: "Summary for recent news 3." }
];


const app = express()
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))
app.use('/public', express.static('public'));

const port = 5500


app.get('/', async (req, res) => {
  /* try {
      const nflNews = await fetchRecentNews('nfl');
      const nbaNews = await fetchRecentNews('nba');
      const mlbNews = await fetchRecentNews('mlb');
      res.render('dashboard', { nflNews, nbaNews, mlbNews });
  } catch (error) {
      res.status(500).send('Error fetching news data');
  }*/

      res.render('home', { 
        nflNews: placeholderNews, 
        nbaNews: placeholderNews, 
        mlbNews: placeholderNews 
    });
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