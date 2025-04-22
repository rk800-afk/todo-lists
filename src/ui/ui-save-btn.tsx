interface UiSaveBtnProps {
  btnText?: string;
}

export function UiSaveBtn({ btnText = "Save" }: UiSaveBtnProps) {
  return (
    <button
      className="px-3 py-2 bg-green-700 hover:bg-green-600 transition-colors cursor-pointer rounded-[10px]"
      type="submit"
    >
      {btnText}
    </button>
  );
}
