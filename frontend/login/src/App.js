import './App.css';
import axios from 'axios'
import React, { useState } from 'react'

function App() {

  const [data, setData] = useState('')
  const [text, setText] = useState('')
  const [intel, setIntel] = useState('')

  const auth = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
      Authorization: `Bearer ${data}`
    }
  })

  const textChange = (event) => {
    setText(event.target.value)
    console.log(event.target.value)
  }
  const loginClick = async () => {
    await auth.post('/login', {
      username: text
    }).then((result) => {
      setData(result.data.token)
      console.log(result.data.token)
    })
  }
  const showData = async () => {
    await auth.get('/protected').then(({ data }) => {
      setIntel(data.post[0].username)
      console.log(data.post)
    })
  }

  return (
    <div className="App">
      <input type="text" onChange={textChange} />
      <button onClick={loginClick}>login</button>
      {data}
      <br />
      <button
        onClick={showData}>
        showIntel
      </button>
      {intel}
    </div>
  );
}

export default App;
