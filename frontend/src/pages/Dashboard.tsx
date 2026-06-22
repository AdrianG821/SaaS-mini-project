import { useEffect, useState } from 'react'
import { api, checkHealth } from '../../api/api.ts'
import DashInput from '../components/DashInput.tsx';
import DashSelect from '../components/DashSelect.tsx';
import DashCheckBox from '../components/DashCheckBox.tsx';
import DashBtn from '../components/DashBtn.tsx';
import DashPopup, { type InputTextarea, type InputType, type OptionType, type SelectInput } from '../components/DashPopup.tsx';
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

type Subscription = {
  name: string,
  licensePrice: string,
  dueDate: number,
  numberOfLicenses: number,
  categoryId: number,
  departmentId: number,
  description: string,
  usagePercent: number
}


function Dashboard() {
  const [backendMessage, setBackendMessage] = useState("");

  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const [popUp,setPopUp] = useState<boolean>(false);

  const [subName,setSubName] = useState("");
  const [statusId, setStatusId] = useState(0);
  const [procent, setProcent] = useState(0);
  const [belowCheckBox,setBelowCheckBox] = useState<boolean>(false);


  const [subscriptions, setSubscriptions] = useState<SubscriptionType[]>([]);
  const [statuses, setStatuses] = useState<StatusType[]>([]);
  const [usage,setUsage] = useState<UsageType[]>([]);


  const [existingId,setExistingId] = useState(0);
  const [popupMode, setPopupMode] = useState("");


  const [newSubName,setNewSubName] = useState("");
  const [newLicensePrice,setNewLicensePrice] = useState("");
  const [newNoLicense,setNewNoLicense] = useState("");
  const [newUsage,setNewUsage] = useState("");
  const [newSubRenewalDate,setNewSubRenewalDate] = useState("");
  const [newDescription,setNewDescription] = useState("");
  const [newCategory,setNewCategory] = useState("");
  const [newDepartment, setNewDepartment] = useState("");

  const [categories, setCategories] = useState<OptionType[]>([])
  const [departments, setDepartments] = useState<OptionType[]>([])


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

  const input5: InputType = {
    placeholder: "",
    value: newSubRenewalDate,
    type: "text",
    onChange: e => setNewSubRenewalDate(e.target.value)
  }

  const input6: InputTextarea = {
    placeholder: "Description",
    value: newDescription,
    onChange: e => setNewDescription(e.target.value)
  }

  const selectCategory: SelectInput = {
    value: newCategory,
    onChange: e => setNewCategory(e.target.value)
  }

  const selectDepartment: SelectInput = {
    value: newDepartment,
    onChange: e => setNewDepartment(e.target.value)
  }

  useEffect(() => {
    FetchSubscriptions()
    FetchDepartments() 
    FetchCatergories()
    FetchStatuses()


    const usageTemp = [{id: 0, name: "0%"},{id: 1, name: "10%"},{id: 2, name: "20%"},{id: 3, name: "30%"},{id: 4, name: "40%"},{id: 5, name: "50%"},{id: 6, name: "60%"},{id: 7, name: "70%"},{id: 8, name: "80%"},{id: 9, name: "90%"},{id: 10, name: "100%"},]

    setUsage(usageTemp)


  }, [])

  function click() {
    FetchSubscriptions()
  }


  async function OpenAddSubPopup() {
    setNewSubName("")
    setNewLicensePrice("")
    setNewUsage("")
    setNewNoLicense("")
    setNewSubRenewalDate("")
    setNewDescription("")
    setNewCategory("")
    setNewDepartment("")

    setPopUp(true)

    setPopupMode("create")
    setExistingId(0)

  }

  async function SubscriptionPopup (id: number) {

    setPopupMode("update")
    setExistingId(id)
     
    setNewSubName("")
    setNewLicensePrice("")
    setNewUsage("")
    setNewNoLicense("")
    setNewSubRenewalDate("")
    setNewDescription("")
    setNewCategory("")
    setNewDepartment("")

    try {
      const { data } = await api.get<Subscription>(`/dashboard/get_subscription/${id}`)

      // console.log(data)
      setNewSubName(data.name ?? "");
      setNewLicensePrice(data.licensePrice)
      setNewUsage(String(data.usagePercent))
      setNewNoLicense(String(data.numberOfLicenses))
      setNewSubRenewalDate(String(data.dueDate))
      setNewDescription(data.description ?? "")
      setNewCategory(String(data.categoryId))
      setNewDepartment(String(data.departmentId))

      setPopUp(true)

    } catch(e: any) {
      if(e?.message?.status === 404) return alert("Subscription not found")
    }
    

  }

  async function AddNewPopup() {
    setSubmitting(true)
    const name = newSubName
    if(name === "" || name.length <= 5) return alert("Please complete a valid name")
    console.log(name);
    const price = newLicensePrice;
    if(isNaN(Number(price)) || price.trim() === "") return alert("Please put a valid price")
    console.log(newLicensePrice);
    const usage = newUsage;
    if(isNaN(Number(usage)) || usage.trim() === "") return alert("Please put a valid usage")
    console.log(newUsage);
    const noLicense = newNoLicense;
    if(isNaN(Number(noLicense)) || noLicense.trim() === "") return alert("Please put a valid number of licenses")
    console.log(newNoLicense);
    const department = newDepartment;
    if(department === "0" || department === "") return alert("Please complete a department")
    console.log(newDepartment);
    const category = newCategory;
    if(category === "0" || category === "") return alert("Please complete a category")
    console.log(newCategory);
    const desc = newDescription;
    console.log(newDescription);
    const due = newSubRenewalDate;
    if(Number(due) > 31 || due.trim() === "") return alert("Please put a valid due date(>31)")
    console.log(newSubRenewalDate);

    const params = {
      name: name,
      dueDate: due,
      categoryId: category,
      licensePrice: price,
      numberOfLicenses: noLicense,
      departmentId: department,
      status: 1,
      usagePercent: usage,
      description: desc,
      userId: 1
    }

    try {
      const { data } = await api.post("/dashboard/create_subscription", params)

    } catch(e: any) {
      if(e?.response.status === 400) return alert("Subscription not created")

    } finally{
      setSubmitting(false)
    }
    setSubmitting(false)
  }

  async function CancelSubscription(id: number) {
    if(!confirm("Are you sure you want to cancel this subscription?")) {
      return;
    } 
    try {
      const { data } = await api.put(`/dashboard/cancel_subscription/${id}`)

      FetchSubscriptions()

    } catch(e: any){
      if (e?.response?.status === 404) return alert("Subscription not found");
    }
  }






  async function FetchSubscriptions(){
    const fname = subName;
    const fstatusId = statusId;
    const fprocent = procent;
    const fbelow = belowCheckBox;

    const params = { 
      name: fname, 
      statusId: fstatusId, 
      procent: fprocent, 
      below: fbelow
    }
    try{
      const { data } = await api.get('/dashboard/fetch_subscriptions', { params });

      // console.log(params)

      setSubscriptions(data)

      // console.log(data);

    }catch(e: any) {
      if(e?.response?.status === 401) return alert("Bad request!")
    }
  }

  async function FetchCatergories() {
    try {
      const { data } = await api.get<OptionType[]>("/dashboard/get_categories")

      setCategories([
        { id: 0, name: "Please select a category" },
        ...data
      ])


    } catch(e: any) {
      if(e?.response?.status === 400) return alert("No categories found")
    }
  }

  async function FetchDepartments() {
    try {
      const { data } = await api.get<OptionType[]>("/dashboard/get_departments")
      
      setDepartments([
        { id: 0, name: "Please select a department" },
        ...data
      ])

    } catch(e: any){
      if(e?.response?.status === 400) return alert("No departments found")

    }
  }

    async function FetchStatuses() {
    try {
      const { data } = await api.get<StatusType[]>("/dashboard/get_statuses")
      
      setStatuses([
        { id: 0, name: "Please select a status" },
        ...data
      ])

    } catch(e: any){
      if(e?.response?.status === 400) return alert("No statuses found")

    }
  }




  return (
    <div className='min-h-screen w-full flex flex-col bg-gray-600 text-white'>
      <DashPopup
       toggle={popUp} 
       onClick={e => setPopUp(false)} 
       input1={input1} 
       input2={input2} 
       input3={input3} 
       input4={input4} 
       btnOnClick={() => AddNewPopup()} 
       input5={input5} 
       input6={input6}
       categorySelect = {selectCategory}
       category={categories}
       departmentSelect= {selectDepartment}
       department={departments}
       disabled={submitting}
       />

        <div className='p-6 text-2xl font-semibold flex justify-center'>
          <h1>Check subscriptions</h1>
        </div>


        <div className='flex items-center justify-center'>
          <div className='w-full justify-center flex gap-2'>
              <DashInput placeholder='Subscriptions name' value={subName} onChange={e => setSubName(e.target.value)} />
              <DashSelect data={statuses} value={statusId} onChange={e => setStatusId(Number(e.target.value))}/>
              <DashSelect data={usage} value={procent} onChange={e => setProcent(Number(e.target.value))}/>
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
                        <DashBtn name={"View details"} width={'w-24'} onClick={() => SubscriptionPopup(w.id)} position=''/>
                        
                      </td>
                      <td className='w-32'>
                        {w.status === "Canceled" ?
                          <DashBtn name={"RENEW"} width={'w-24'} onClick={() => CancelSubscription(w.id)} position=''/>
                            : 
                          <DashBtn name={"Cancel"} width={'w-24'} onClick={() => CancelSubscription(w.id)} position=''/>
                        }
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
