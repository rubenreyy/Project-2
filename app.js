const express = require('express')
const bodyParser = require("body-parser")
const ejs = require('ejs')

const app = express()
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

const port = 4000

app.get('/', (req, res) => {
res.render('home', {name: 'no'});
})

app.get('/nfl', (req, res) => {
  res.render('nfl', {name: 'no'});
  })

  app.get('/nba', (req, res) => {
    res.render('nba', {name: 'no'});
    })

app.get('/mlb', (req, res) => {
    res.render('mlb', {name: 'no'});
    })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})