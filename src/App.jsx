import React from 'react'
import {useState} from 'react'
import {Registration ,Home} from './components/index'


function App() {
  const [connectValide, setConnectValide] = useState(()=>{
    const storedConnectValide = localStorage.getItem('connectValide') === 'true'
    return storedConnectValide ? storedConnectValide : false;
  });
  const [username,setUsername] = useState(()=>{
    const storedUsername = localStorage.getItem('username');
    return storedUsername ? storedUsername : '';
  })
  return (
    <div>
      {connectValide? <Home username={username} setConnectValide={setConnectValide}/>: <Registration setConnectValide={setConnectValide} setUsername={setUsername}/>}
    </div>
  )
}

export default App