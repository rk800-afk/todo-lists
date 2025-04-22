interface UiInputProps {
  placeholder: string;
  name: string;
}

export function UiInput({ placeholder, name }: UiInputProps) {
  return (
    <input
      className="px-10 py-5 bg-gray-200 rounded-[30px] block w-full focus:outline-none"
      placeholder={placeholder}
      name={name}
      type="text"
    />
  );
}
