type InputProps = {
  label: string;
  name: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

export default function Input({ label, name, type = 'text', value, onChange, required = false }: InputProps) {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={name} className="mb-1">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="px-3 py-2 bg-transparent text-black border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
