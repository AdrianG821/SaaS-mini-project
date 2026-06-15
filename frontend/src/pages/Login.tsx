import { useEffect, useState } from 'react'
import { api, checkHealth } from '../../api/api.ts'
import AuthInput from '../components/AuthInput.tsx'
import AuthBtn from '../components/AuthBttn.tsx'
import { useNavigate } from 'react-router-dom'


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);


  async function loginAccount() {
    console.log(username);
    console.log(password);
    setSubmitting(true);

    try {

        // navigate("/dashboard" , { replace: true })
    } catch(e: any) {
        confirm("Logging to your was unsuccessful");
    } finally {
        setSubmitting(false);
    }

  }

  
    return(
    <div className='min-h-screen w-full flex flex-col bg-gray-600 text-white'>
        <div className='p-6 text-2xl font-semibold flex justify-center'>
          <h1 className='translate-y-20 text-4xl'>Login to your account</h1>
        </div>
        <div className='flex-1 flex items-center justify-center -translate-y-20'>
          <div className='w-full max-w-md flex flex-col gap-2'>
            <AuthInput 
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <AuthInput 
              placeholder="Password"
              value={password}
              type='password'
              onChange={e => setPassword(e.target.value)}
            />

            <AuthBtn name='Login' onClick={loginAccount} disabled={submitting}/>

          </div>
        </div>
    </div>
    )
}