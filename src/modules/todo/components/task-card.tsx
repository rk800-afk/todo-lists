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
  handleEdit: () => void;
  handleSave: (id: number, title: string, description: string) => void;
  handleDeleteTask: () => void;
}

export const TaskCard: FC<TaskCardProps> = ({
  id,
  title,
  description,
  isEditing,
  handleEdit,
  handleSave,
  handleDeleteTask,
}) => {
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const title = (form.elements.namedItem("taskTitle") as HTMLInputElement)
      .value;
    const description = (
      form.elements.namedItem("taskDescription") as HTMLInputElement
    ).value;
    handleSave(id, title, description);
  };

  return (
    <div className="bg-gray-300 p-5 rounded-[10px]">
      <div className="flex justify-end gap-2">
        <button
          onClick={handleEdit}
          className="text-black w-5 h-5 cursor-pointer transition-transform duration-300 transform hover:scale-110"
        >
          <EditIcon />
        </button>
        <button
          className="text-black w-5 h-5 cursor-pointer transition-transform duration-300 transform hover:scale-110"
          onClick={handleDeleteTask}
        >
          <DeleteIcon />
        </button>
      </div>
      {!isEditing ? (
        <>
          <p className="mb-2 text-xl">{title}</p>
          <p>{description}</p>
        </>
      ) : (
        <form className="flex flex-col gap-3 my-5" onSubmit={handleFormSubmit}>
          <UiInput
            name="taskTitle"
            placeholder="Enter task title"
            defaultValue={title}
          />
          <UiInput
            name="taskDescription"
            placeholder="Enter task description"
            defaultValue={description}
          />
          <UiSaveBtn />
        </form>
      )}
    </div>
  );
};
