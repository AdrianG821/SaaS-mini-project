type CheckBoxType = {
    label: string,
    value: boolean,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export default function DashCheckBox({label,value,onChange}: CheckBoxType){
return (
    <label
    className=" rounded-lg bg-slate-800 border border-slate-700 px-4 py-3"
    >
        {label}
        <input 
            type="checkbox"
            checked={value}
            onChange={onChange}
            />
    </label>)
}