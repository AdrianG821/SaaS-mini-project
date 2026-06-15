type AuthBttnType ={
    name:  string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled: boolean;
}

export default function AuthBtn({name, onClick,disabled}: AuthBttnType) {
    return (
        <button className='w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold hover:bg-blue-500' onClick={onClick} disabled={disabled}>
            {disabled ? "Loading" : name}
        </button>
    )
}