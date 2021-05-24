
require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())


const databases = [
  {
    username: "Kyle",
    title : "dev"
  },{
    username: "2",
    title : "dev2"
  }
]
app.get('/api', (req, res) => {
  res.json({
    text: 'my api'
  })
})
/*/
app.post('/api/login', (req, res) => {
  //auth
  const users = req.body.username
  //const user = { name: users }
  const token = jwt.sign(users, process.env.ACCESS_TOKEN_SECRET)
  res.json({
    users,
    token
  })
})/*/

app.get('/api/protected', ensureToken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) {
      res.sendStatus(403)
    } else {
      //res.json(databases.filter(database => databases.username == data))
      res.json(databases.filter(database =>database.username == data))
    }
  })
  res.json({
    text: 'my protected'
  })
})

function ensureToken(req, res, next) {
  const bearerHeader = req.headers["authorization"]
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ")
    const bearerToken = bearer[1];
    req.token = bearerToken
    next()
  } else {
    res.sendStatus(403)
  }
}
app.listen(3000)