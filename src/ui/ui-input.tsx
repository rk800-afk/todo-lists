interface UiInputProps {
  placeholder: string;
  name: string;
  defaultValue?: string;
}

export function UiInput({
  placeholder,
  name,
  defaultValue = "",
}: UiInputProps) {
  return (
    <input
      className="px-10 py-5 bg-gray-200 rounded-[30px] block w-full focus:outline-none"
      placeholder={placeholder}
      name={name}
      defaultValue={defaultValue}
      type="text"
    />
  );
}
