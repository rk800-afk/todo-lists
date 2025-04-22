import { FC } from "react";
import { EditIcon } from "../../../ui/icons/edit-icon";
import { DeleteIcon } from "../../../ui/icons/delete-icon";
import { UiInput } from "../../../ui/ui-input";
import { UiSaveBtn } from "../../../ui/ui-save-btn";

interface TaskCardProps {
  id: number;
  title: string;
  description: string;
  isEditing: boolean;
  handleCardSave: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const TaskCard: FC<TaskCardProps> = ({
  id,
  title,
  description,
  isEditing,
  handleCardSave,
}) => {
  return (
    <div className="bg-gray-300 p-5 rounded-[10px]">
      <div className="flex justify-end gap-2">
        <button className="text-black w-5 h-5 cursor-pointer transition-transform duration-300 transform hover:scale-110">
          <EditIcon />
        </button>
        <button className="text-black w-5 h-5 cursor-pointer transition-transform duration-300 transform hover:scale-110">
          <DeleteIcon />
        </button>
      </div>
      {!isEditing ? (
        <>
          <p className="mb-2 text-xl">{title}</p>
          <p>{description}</p>
        </>
      ) : (
        <form className="flex flex-col gap-3 my-5" onSubmit={handleCardSave}>
          <UiInput name="taskTitle" placeholder="Enter task title" />
          <UiInput
            name="taskDescription"
            placeholder="Enter task description"
          />
          <UiSaveBtn />
        </form>
      )}
    </div>
  );
};
