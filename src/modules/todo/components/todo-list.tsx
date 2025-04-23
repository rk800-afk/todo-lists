import { FC, useState } from "react";
import { EditIcon } from "../../../ui/icons/edit-icon";
import { DeleteIcon } from "../../../ui/icons/delete-icon";
import { UiInput } from "../../../ui/ui-input";
import { TaskCard } from "./task-card";
import { UiSaveBtn } from "../../../ui/ui-save-btn";

interface TodoListProps {
  title: string;
  tasks: {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    isEditing: boolean;
  }[];
}

export const TodoList: FC<TodoListProps> = ({ title, tasks }) => {
  const [currentTasks, setCurrentTasks] = useState(tasks);
  const [isEditing, setIsEditing] = useState(false);
  const [listTitle, setListTitle] = useState(title);

  function handleAddTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const title = (form.elements.namedItem("title") as HTMLInputElement).value;
    const description = (
      form.elements.namedItem("description") as HTMLInputElement
    ).value;

    setCurrentTasks((prev) => [
      ...prev,
      {
        title,
        description,
        id: crypto.randomUUID(),
        isEditing: false,
        completed: false,
      },
    ]);
    form.reset();
  }

  function handleSaveTitle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const listTitle = (form.elements.namedItem("listTitle") as HTMLInputElement)
      .value;
    setIsEditing(false);
    setListTitle(listTitle);
    form.reset();
  }

  function handleEditTask(id: string) {
    setCurrentTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  }

  function handleIsCompleted(id: string) {
    setCurrentTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function handleSaveTask(id: string, title: string, description: string) {
    setCurrentTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, title, description, isEditing: false }
          : task
      )
    );
  }

  function handleDeleteTask(id: string) {
    setCurrentTasks((prev) => prev.filter((task) => task.id !== id));
  }

  return (
    <div className="w-[500px] bg-white rounded-[10px] p-[20px]">
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setIsEditing((prev) => !prev)}
          className="text-black w-8 h-8 cursor-pointer transition-transform duration-300 transform hover:scale-110"
        >
          <EditIcon />
        </button>
        <button className="text-black w-8 h-8 cursor-pointer transition-transform duration-300 transform hover:scale-110">
          <DeleteIcon />
        </button>
      </div>
      {!isEditing ? (
        <p className="text-2xl text-center font-bold mb-5">{listTitle}</p>
      ) : (
        <form className="flex flex-col gap-3 my-5" onSubmit={handleSaveTitle}>
          <UiInput
            name="listTitle"
            placeholder="Enter new list title"
            defaultValue={listTitle}
          />
          <UiSaveBtn />
        </form>
      )}

      <form
        onSubmit={handleAddTask}
        className="w-full flex flex-col gap-2 items-center"
      >
        <UiInput name="title" placeholder="Add task title" />
        <UiInput name="description" placeholder="Add task description" />
        <button
          type="submit"
          className="w-[60px] h-[60px] rounded-[50%] font-bold bg-green-700 hover:bg-green-600 transition-colors cursor-pointer text-[40px] flex justify-center items-center"
        >
          <p className="-mt-[8px]">+</p>
        </button>
      </form>

      <div className="flex flex-col gap-5 mt-8">
        {currentTasks.map(
          ({ id, description, title, completed, isEditing }) => (
            <TaskCard
              key={id}
              id={id}
              description={description}
              title={title}
              isEditing={isEditing}
              isCompleted={completed}
              handleIsCompleted={() => handleIsCompleted(id)}
              handleEdit={() => handleEditTask(id)}
              handleSave={handleSaveTask}
              handleDeleteTask={() => handleDeleteTask(id)}
            />
          )
        )}
      </div>
    </div>
  );
};
