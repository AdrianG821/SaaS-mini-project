import { useEffect, useState } from 'react'
import { api, checkHealth } from '../../api/api.ts'

type SubscriptionType = {
  id: number,
  name: string,
  price: number,
  noLincense: number,
  usage: number,
  status: string,
};


function Dashboard() {
  const [backendMessage, setBackendMessage] = useState("");
  const [subscriptions, setSubscriptions] = useState<SubscriptionType[]>([]);



  useEffect(() => {
    // CheckHealth()
    const temp = [{
      id: 1,
      name: "ChatGPT",
      price: 15,
      noLincense: 12,
      usage: 60,
      status: "IN USE"
    }];
    setSubscriptions(temp);
    
  }, [])

  useEffect(() => {
    console.log(subscriptions);
  }, [subscriptions])


  async function CheckHealth(): Promise<string> {
    const data = await checkHealth();
    setBackendMessage(data.message)
    return data.message;
  }


  return (
    <div className='min-h-screen w-full flex flex-col bg-gray-600 text-white'>
        <div className='p-6 text-2xl font-semibold flex justify-center'>
          <h1>Check subscriptions</h1>
        </div>


        <div className='flex items-center justify-center'>
          <div className='w-full justify-center flex gap-2'>
              <input />
              <input />
              <input />
              <input />
              <button>Search</button>

          </div>
        </div>


        <div className='flex-1 flex items-center justify-center'>
          <div className='w-full  flex flex-col p-2 '>
              {/* {
                subscriptions.map(w => (
                  <div>{w.name}</div>
                ))
              } */}
              <table className='w-full'>
                <thead>
                  <tr className='text-left border-b border-slate-800 bg-slate-950/80 '>
                    <th>Name</th>
                    <th>Cost per month</th>
                    <th>Licenses</th>
                    <th>Usage</th>
                    <th>Waste</th>
                    <th>Status</th>
                    <th></th>

                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map(w => (
                    <tr key= {w.id} className='hover:bg-slate-900/40 transition cursor-pointer '>
                      <td>{w.name}</td>
                      <td>${w.price * w.noLincense}</td>
                      <td>{w.noLincense}</td>
                      <td>{w.usage}%</td>
                      <td>${(w.price * w.noLincense * (100 - w.usage))/100}</td>
                      <td>{w.status}</td>
                      <td><button className='bg-red-500'>sass</button>
                      <button className='bg-red-500'>sass</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>

          </div>
        </div>
    </div>

  )
}

export default Dashboard
