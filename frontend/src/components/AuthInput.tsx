type AuthInputPropType = {
    placeholder: string;
    type?: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


export default function AuthInput({placeholder, type = "text", value, onChange}: AuthInputPropType) {
  return (
    <input 
      className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3"
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
}