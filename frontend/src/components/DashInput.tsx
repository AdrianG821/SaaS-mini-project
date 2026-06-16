type DashInput = {
    placeholder: string;
    type?: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


export default function DashInput({placeholder, type = "text", value, onChange}: DashInput) {
  return (
    <input 
      className="w-2/12 rounded-lg bg-slate-800 border border-slate-700 px-4 py-3"
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
}