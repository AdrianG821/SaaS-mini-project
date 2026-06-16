import { useEffect, useState } from 'react'
import { api, checkHealth } from '../../api/api.ts'
import DashInput from '../components/DashInput.tsx';
import DashSelect from '../components/DashSelect.tsx';
import DashCheckBox from '../components/DashCheckBox.tsx';
import DashBtn from '../components/DashBtn.tsx';

type SubscriptionType = {
  id: number,
  name: string,
  price: number,
  noLincense: number,
  usage: number,
  status: string,
};

type StatusType = {
  id: number,
  name: string,
}

type UsageType ={
  id: number,
  name: string
}


function Dashboard() {
  const [backendMessage, setBackendMessage] = useState("");
  const [subName,setSubName] = useState("");


  const [subscriptions, setSubscriptions] = useState<SubscriptionType[]>([]);
  const [statuses, setStatuses] = useState<StatusType[]>([]);
  const [usage,setUsage] = useState<UsageType[]>([]);
  const [belowCheckBox,setBelowCheckBox] = useState<boolean>(false);

  useEffect(() => {
    // CheckHealth()
    const temp = [{
      id: 1,
      name: "ChatGPT",
      price: 15,
      noLincense: 12,
      usage: 60,
      status: "IN USE"
    },{
      id: 2,
      name: "Claude",
      price: 150,
      noLincense: 15,
      usage: 25,
      status: "IN USE"
    }];

    const statusTemp = [{
      id: 0,
      name: "Select a status"
    },{
      id: 1,
      name: "IN USE"
    },{
      id:2,
      name: "RENEWAL SOON"
    }]

    const usageTemp = [{id: 0, name: "0"},{id: 1, name: "10"},{id: 2, name: "20"},{id: 3, name: "30"},{id: 4, name: "40"},{id: 5, name: "50"},{id: 6, name: "60"},{id: 7, name: "70"},{id: 8, name: "80"},{id: 9, name: "90"},{id: 10, name: "100"},]

    setUsage(usageTemp)
    setStatuses(statusTemp);
    setSubscriptions(temp);

  }, [])

  useEffect(() => {
    console.log(subscriptions);
    console.log(statuses)
    console.log(usage)
  }, [subscriptions])


  async function CheckHealth(): Promise<string> {
    const data = await checkHealth();
    setBackendMessage(data.message)
    return data.message;
  }

  function click() {
    console.log(belowCheckBox)
  }


  return (
    <div className='min-h-screen w-full flex flex-col bg-gray-600 text-white'>
        <div className='p-6 text-2xl font-semibold flex justify-center'>
          <h1>Check subscriptions</h1>
        </div>


        <div className='flex items-center justify-center'>
          <div className='w-full justify-center flex gap-2'>
              <DashInput placeholder='Subscriptions name' value={subName} onChange={e => setSubName(e.target.value)} />
              <DashSelect data={statuses}/>
              <DashSelect data={usage} />
              <DashCheckBox label={"Below"} value={belowCheckBox} onChange={e => setBelowCheckBox(Boolean(e.target.checked))}/>
              <DashBtn name={"Search"} width={'w-32'} onClick={click}/>
          </div>
        </div>

        <div className=''>
          <div className='float-end mr-5'> 
            <DashBtn name={"Add new subscriptions"} width={'w-56'} onClick={click}/>
          </div>
        </div>

        <div className='flex-1 flex justify-center pt-4'>
          <div className='w-full  flex flex-col p-2 '>
              {/* {
                subscriptions.map(w => (
                  <div>{w.name}</div>
                ))
              } */}
              <table className='w-full '>
                <thead>
                  <tr className='text-left border-b border-slate-800 bg-slate-950/80 '>
                    <th>Name</th>
                    <th>Cost per month</th>
                    <th>Licenses</th>
                    <th>Usage</th>
                    <th>Waste</th>
                    <th>Status</th>
                    <th></th>
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
                      <td>
                        <DashBtn name={"View details"} width={'w-24'} onClick={click} position=''/>
                        
                      </td>
                      <td>
                        <DashBtn name={"Cancel"} width={'w-24'} onClick={click} position=''/>
                      </td>
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
