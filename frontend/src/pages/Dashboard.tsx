import { useEffect, useState } from 'react'
import { api, checkHealth } from '../../api/api.ts'


function Dashboard() {
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

export default Dashboard
