type DashPopupType = {
    toggle: boolean,
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void,
    input1: InputType,
    input2: InputType,
    input3: InputType,
    input4: InputType,
    // input5?: InputType,
}

export type InputType = {
    placeholder: string,
    type: string,
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

export default function DashPopup({toggle,onClick,input1,input2,input3,input4}: DashPopupType) {
    return(
        (toggle && 
            <div className="w-full flex min-h-screen absolute items-center justify-center backdrop-blur-sm" onClick={onClick}>
                <div className="bg-blue-500 w-9/12 min-h-[80vh] rounded-2xl p-3" onClick={(e) => e.stopPropagation()}>
                    <div
                     className="float-end text-xl px-5 py-1 font-medium text-yellow-400 hover: cursor-pointer" 
                     onClick={onClick}>
                        [CLOSE]
                    </div>
                    <div
                        className="flex gap-5 translate-y-12 overflow-auto"
                      >
                       <input                         
                        className="w-2/12 rounded-lg bg-slate-800 border border-slate-700 px-4 py-3"
                        placeholder={input1.placeholder}
                        type={input1.type}
                        value={input1.value}
                        onChange={input1.onChange}/>

                        <input                         
                        className="w-2/12 rounded-lg bg-slate-800 border border-slate-700 px-4 py-3"
                        placeholder={input2.placeholder}
                        type={input2.type}
                        value={input2.value}
                        onChange={input2.onChange}/>


                        <input                         
                        className="w-2/12 rounded-lg bg-slate-800 border border-slate-700 px-4 py-3"
                        placeholder={input3.placeholder}
                        type={input3.type}
                        value={input3.value}
                        onChange={input3.onChange}/>

                        <input                         
                        className="w-2/12 rounded-lg bg-slate-800 border border-slate-700 px-4 py-3"
                        placeholder={input4.placeholder}
                        type={input4.type}
                        value={input4.value}
                        onChange={input4.onChange}/>


                        {/* <input                         
                        className="w-2/12 rounded-lg bg-slate-800 border border-slate-700 px-4 py-3"
                        placeholder={input5.placeholder}
                        type={input5.type}
                        value={input5.value}
                        onChange={input5.onChange}/> */}
                        
                       <button className="w-48 rounded-lg bg-blue-600 px-2 py-2 font-semibold hover:bg-blue-500">Add new subscription</button>
                    </div>

                </div>
            </div>)

    )
}