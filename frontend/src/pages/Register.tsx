import { useEffect, useState } from 'react'
import { api, checkHealth } from '../../api/api.ts'
import AuthInput from '../components/AuthInput.tsx'


function Register() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")

  
  async function registerAccount() {
    console.log(username)
  }

useEffect(() => {
  
  async function loadHealth() {
    const data = await checkHealth()
    console.log(data)
  }
  loadHealth()
}, [])

async function CheckHealth(): Promise<string> {
  const data = await checkHealth();

  return data.message;
}


  return (
    <div className='min-h-screen w-full flex flex-col bg-gray-600 text-white'>
        <div className='p-6 text-2xl font-semibold flex justify-center'>
          <h1 className='translate-y-20 text-4xl'>Register your account</h1>
        </div>
        <div className='flex-1 flex items-center justify-center -translate-y-20'>
          <div className='w-full max-w-md flex flex-col gap-2'>
            {/* <input 
                className='w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3'
                placeholder='Username'
            /> */}
            <AuthInput 
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <input 
                className='w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3'
                type='password'
                placeholder='Password'
            />
            <select
             name='Role'
             id='roles'
             className='w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3'
             > 
              <option value="1">ADMIN</option>
            </select>
            <button className='w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold hover:bg-blue-500' onClick={registerAccount}>
              Register
            </button>
          </div>
        </div>
    </div>
  )
}

export default Register
