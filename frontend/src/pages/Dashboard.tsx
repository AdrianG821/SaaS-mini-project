import { useEffect, useState } from 'react'
import { api, checkHealth } from '../../api/api.ts'
import DashInput from '../components/DashInput.tsx';
import DashSelect from '../components/DashSelect.tsx';
import DashCheckBox from '../components/DashCheckBox.tsx';
import DashBtn from '../components/DashBtn.tsx';
import DashPopup, { type InputType } from '../components/DashPopup.tsx';
import { useNavigate } from 'react-router-dom';

type SubscriptionType = {
  id: number,
  name: string,
  licensePrice: number,
  numberoflicenses: number,
  usagePercent: number,
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

  const navigate = useNavigate();

  const [popUp,setPopUp] = useState<boolean>(true);

  const [subName,setSubName] = useState("");
  const [subscriptions, setSubscriptions] = useState<SubscriptionType[]>([]);
  const [statuses, setStatuses] = useState<StatusType[]>([]);
  const [usage,setUsage] = useState<UsageType[]>([]);
  const [belowCheckBox,setBelowCheckBox] = useState<boolean>(false);


  const [newSubName,setNewSubName] = useState("");
  const [newLicensePrice,setNewLicensePrice] = useState("");
  const [newNoLicense,setNewNoLicense] = useState("");
  const [newUsage,setNewUsage] = useState("");
  // const [newSubName,setNewSubName] = useState("");
  // const [newSubName,setNewSubName] = useState("");


  const input1: InputType = {
    placeholder: "New subscription",
    value: newSubName,
    type: "text",
    onChange: e => setNewSubName(e.target.value)
  }

  const input2: InputType = {
    placeholder: "License price",
    value: newLicensePrice,
    type: "text",
    onChange: e => setNewLicensePrice(e.target.value)
  }

  const input3: InputType = {
    placeholder: "Number o licenses",
    value: newNoLicense,
    type: "text",
    onChange: e => setNewNoLicense(e.target.value)
  }

  const input4: InputType = {
    placeholder: "Usage",
    value: newUsage,
    type: "text",
    onChange: e => setNewUsage(e.target.value)
  }

  // const input5: InputType = {
  //   placeholder: "New subscription",
  //   value: newSubName,
  //   type: "text",
  //   onChange: e => setNewSubName(e.target.value)
  // }

  useEffect(() => {
    // CheckHealth()
    FetchSubscriptions()

    // const temp = [{
    //   id: 1,
    //   name: "ChatGPT",
    //   price: 15,
    //   noLincense: 12,
    //   usage: 60,
    //   status: "IN USE"
    // },{
    //   id: 2,
    //   name: "Claude",
    //   price: 150,
    //   noLincense: 15,
    //   usage: 25,
    //   status: "IN USE"
    // }];

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

    const usageTemp = [{id: 0, name: "0%"},{id: 1, name: "10%"},{id: 2, name: "20%"},{id: 3, name: "30%"},{id: 4, name: "40%"},{id: 5, name: "50%"},{id: 6, name: "60%"},{id: 7, name: "70%"},{id: 8, name: "80%"},{id: 9, name: "90%"},{id: 10, name: "100%"},]

    setUsage(usageTemp)
    setStatuses(statusTemp);
    // setSubscriptions(temp);

  }, [])

  // useEffect(() => {
  //   // console.log(subscriptions);
  //   // console.log(statuses)
  //   // console.log(usage)
  //   CheckHealth()
  // }, [subscriptions])


  // async function CheckHealth(): Promise<string> {
  //   const data = await checkHealth();
  //   setBackendMessage(data.message)
  //   return data.message;
  // }

  function click() {
    // console.log(belowCheckBox)
  }

  async function FetchSubscriptions(){
    try{
      const { data } = await api.get('/dashboard/fetch_subscriptions', { params: { name: "Chat GPT", statusId: 2, procent: 50, below: false } });

      setSubscriptions(data)

      console.log(data);

    }catch(e: any) {
      if(e?.message?.status === 401) return alert("Bad request!")
    }
  }

  function OpenAddSubPopup() {
    setPopUp(true)
  }

  async function SubscriptionPopup () {

  }

  async function AddNewPopup() {
    console.log(newSubName);
    console.log(newLicensePrice);
    console.log(newUsage);
    console.log(newNoLicense);
  }

  async function CancelSubscription() {
    if(!confirm("Are you sure you want to cancel this subscription?")) {
      return;
    } 
    try {

    } catch(e: any){
      if (e?.response?.status === 404) return alert("Subscription not found");
    }
  }


  return (
    <div className='min-h-screen w-full flex flex-col bg-gray-600 text-white'>
      <DashPopup toggle={popUp} onClick={e => setPopUp(false)} input1={input1} input2={input2} input3={input3} input4={input4} btnOnClick={AddNewPopup}/>
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
            <DashBtn name={"Add new subscriptions"} width={'w-56'} onClick={OpenAddSubPopup}/>
          </div>
        </div>

        <div className='flex-1 flex justify-center pt-4'>
          <div className='w-full  flex flex-col p-2 '>
              <table className='w-full '>
                <thead>
                  <tr className='text-left border-b border-slate-800 bg-slate-950/80 '>
                    <th>Name</th>
                    <th className='w-64'>Cost per month</th>
                    <th>Licenses</th>
                    <th>Usage</th>
                    <th>Waste</th>
                    <th>Status</th>
                    <th className='w-32'></th>
                    <th className='w-32'></th>

                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map(w => (
                    <tr key= {w.id} className='hover:bg-slate-900/40 transition cursor-pointer '>
                      <td>{w.name}</td>
                      <td className='w-64'>${w.licensePrice * w.numberoflicenses}</td>
                      <td>{w.numberoflicenses}</td>
                      <td>{w.usagePercent}%</td>
                      <td>${(w.licensePrice * w.numberoflicenses * (100 - w.usagePercent))/100}</td>
                      <td>{w.status}</td>
                      <td className='w-32'> 
                        <DashBtn name={"View details"} width={'w-24'} onClick={OpenAddSubPopup} position=''/>
                        
                      </td>
                      <td className='w-32'>
                        <DashBtn name={"Cancel"} width={'w-24'} onClick={CancelSubscription} position=''/>
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
