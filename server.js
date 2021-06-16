
require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')

const posts = [
  {
    username: 'bass',
    de: 'programer'
  }, {
    username: 'boom',
    de: 'lawyer'
  }
]

app.use(express.json())
app.use(cors())

app.get('/api', (req, res) => {
  res.json({
    text: 'my api'
  })
})

app.post('/api/login', (req, res) => {
  //auth
  const username = req.body.username
  console.log('user>',username)
  const token = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: 60
    })
  res.json({
    token,
    username
  })
})

app.get('/api/protected', ensureToken, (req, res) => {
  console.log(req.headers)
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    console.log(data)
    if (err) {
      res.status(403)
      return
    }
    const post = posts.filter(post => post.username === data.username)
    return res.status(200)
      .json({
        text: 'this is protected',
        data: data,
        post
      })
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