type SelectOpt = {
    id: number,
    name: string,
}

type SelectOptType = {
    data: SelectOpt[]
}


export default function DashSelect({data}: SelectOptType) {
    return(
        <select
        className="w-1/12 rounded-lg bg-slate-800 border border-slate-700 px-4 py-3"

        >
            {data.map(w => (
                <option key={w.id} value={w.id}>{w.name}</option>
            ))}
        </select>
    )
}