interface AuthInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
}

export const AuthInput = ({ label, type, value, onChange }: AuthInputProps) => (
  <div className="flex gap-3 items-center justify-between w-full">
    <label>{label}</label>
    <input
      className="bg-white focus:outline-none rounded-[5px] p-1"
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
    />
  </div>
);
