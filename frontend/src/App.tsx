import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { api, checkHealth } from '../api/api.ts'


function App() {
  const [backendMessage, setBackendMessage] = useState("")



useEffect(() => {
  
  async function loadHealth() {
    const data = await checkHealth()
    setBackendMessage(data.message)
  }

  loadHealth()
}, [])

async function CheckHealth(): Promise<string> {
  const data = await checkHealth();

  return data.message;
}


  return (
    <>
    <div>Salutare  asdasdsa</div>
    <div>Backend response: {backendMessage}</div>
    </>
  )
}

export default App
