type DashPopupType = {
    toggle: boolean,
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void,
    input1: InputType,
    input2: InputType,
    input3: InputType,
    input4: InputType,
    btnOnClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
    // input5?: InputType,
}

export type InputType = {
    placeholder: string,
    type: string,
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

export default function DashPopup({toggle,onClick,input1,input2,input3,input4 ,btnOnClick}: DashPopupType) {
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
                        className="grid grid-cols-3 gap-5 mt-6 overflow-auto"
                      >
                        <label
                            className=" w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-1">
                                Due day of the month
                                <input                         
                                className="text-black rounded-lg px-1 py-1"
                                type="number"
                                max={31}
                                // value={input5.value}
                                // onChange={input5.onChange}
                                />
                        </label>


                       <input                         
                        className=" w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-1"
                        placeholder={input1.placeholder}
                        type={input1.type}
                        value={input1.value}
                        onChange={input1.onChange}/>


                        <select
                            className=" w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-1"
                            >
                                <option value={0}>Select category</option>
                                <option value={1}>asdas</option>
                        </select>


                        <input                         
                        className=" w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-1"
                        placeholder={input2.placeholder}
                        type={input2.type}
                        value={input2.value}
                        onChange={input2.onChange}/>


                        <input                         
                        className=" w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-1"
                        placeholder={input3.placeholder}
                        type={input3.type}
                        value={input3.value}
                        onChange={input3.onChange}/>

                        <select
                            className=" w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-1"
                            >
                                <option value={0}>Select the departament</option>
                                <option value={1}>asdas</option>
                        </select>

                        <input                         
                        className=" w-full max-h-16 rounded-lg bg-slate-800 border border-slate-700 px-4 py-1"
                        placeholder={input4.placeholder}
                        type={input4.type}
                        value={input4.value}
                        onChange={input4.onChange}/>

                        <textarea
                         className=" w-full max-h-64 rounded-lg bg-slate-800 border border-slate-700 px-4 py-1 max-h-52" 
                         placeholder="Description"
                         
                         />



                       <button className="w-64 rounded-lg max-h-16 bg-blue-600 px-2 py-2 font-semibold hover:bg-blue-500" onClick={btnOnClick}>Add new subscription</button>
                    </div>

                </div>
            </div>)

    )
}