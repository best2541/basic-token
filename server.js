
require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

app.get('/api', (req, res)=>{
  res.json({
    text: 'my api'
  })
})

app.post('/api/login',(req,res) =>{
  //auth
  const user = {id:3}
  const token =jwt.sign({user},'my_secret_key')
  res.json({
    token:token
  })
})
app.get('/api/protected', ensureToken, (req, res)=>{
  jwt.verify(req.token, 'my_secret_key',(err,data) =>{
    if(err) {
      res.sendStatus(403)
    } else{
      res.json({
        text: 'this is protected',
        data: data
      })
    }
  })
  res.json({
    text: 'my protected'
  })
})

function ensureToken(req,res,next){
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