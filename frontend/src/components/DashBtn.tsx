type DashBtnType ={
    name:  string,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
    width:string,
    disabled?: boolean,
    position?: string
}

export default function DashBtn({name, onClick, width,disabled, position = "px-4 py-3"}: DashBtnType) {
    return (
        <button className={`${width} rounded-lg bg-blue-600 ${position} font-semibold hover:bg-blue-500`} onClick={onClick} disabled={disabled}>
            {disabled ? "Loading" : name}
        </button>
    )
}