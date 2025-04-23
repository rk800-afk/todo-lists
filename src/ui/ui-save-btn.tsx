interface UiSaveBtnProps {
  btnText?: string;
  disabled?: boolean;
}

export function UiSaveBtn({
  btnText = "Save",
  disabled = false,
}: UiSaveBtnProps) {
  return (
    <button
      className="px-3 py-2 bg-green-700 hover:bg-green-600 transition-colors cursor-pointer rounded-[10px]"
      type="submit"
      disabled={disabled}
    >
      {btnText}
    </button>
  );
}
