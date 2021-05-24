require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())


app.post('/api/login', (req, res) => {
  //auth
  const users = req.body.username
  //const token = jwt.sign(users, process.env.ACCESS_TOKEN_SECRET)
  const accessToken = generateAccessToken(users)
  const refreshToken = jwt.sign(users, process.env.REFRESH_TOKEN_SECRET)
  res.json({ accessToken, refreshToken })
})

app.delete('/api/logout', (req, res) => {
  accessToken = accessToken.filter(token => token !== req.body.token)
  res.sendStatus(204)
})

function generateAccessToken(a) {
  return jwt.sign(
    a,
    process.env.ACCESS_TOKEN_SECRET)
}
app.listen(4000)