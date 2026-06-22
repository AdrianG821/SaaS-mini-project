type SelectOpt = {
    id: number,
    name: string,
}

type SelectOptType = {
    data: SelectOpt[]
}
 type SelectInput = {
    data: SelectOpt[],
    value: number,
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
}

export default function DashSelect({data,value,onChange}: SelectInput) {
    return(
        <select
        className="w-2/12 rounded-lg bg-slate-800 border border-slate-700 px-4 py-3"
        value={value}
        onChange={onChange}
        >
            {data.map(w => (
                <option key={w.id} value={w.id}>{w.name}</option>
            ))}
        </select>
    )
}