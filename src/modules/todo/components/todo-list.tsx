import { FC, useState } from "react";
import { EditIcon } from "../../../ui/icons/edit-icon";
import { DeleteIcon } from "../../../ui/icons/delete-icon";
import { UiInput } from "../../../ui/ui-input";
import { TaskCard } from "./task-card";
import { UiSaveBtn } from "../../../ui/ui-save-btn";

const TASKS = [
  {
    id: 1,
    title: "task 1",
    description: "description 1",
    isEditing: false,
  },
  {
    id: 2,
    title: "task 2",
    description: "description 2",
    isEditing: false,
  },
  {
    id: 3,
    title: "task 3",
    description: "description 3",
    isEditing: false,
  },
];

export const TodoList: FC = () => {
  const [tasks, setTasks] = useState(TASKS);
  const [isEditing, setIsEditing] = useState(false);
  const [listTitle, setListTitle] = useState("ToDo List");

  // Обробник для додавання нової задачі
  function handleAddTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const title = (form.elements.namedItem("title") as HTMLInputElement).value;
    const description = (
      form.elements.namedItem("description") as HTMLInputElement
    ).value;

    setTasks((prev) => [
      ...prev,
      {
        title,
        description,
        id: prev[prev.length - 1].id + 1,
        isEditing: false,
      },
    ]);
    form.reset();
  }

  // Обробник для зміни назви списку
  function handleSaveTitle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const listTitle = (form.elements.namedItem("listTitle") as HTMLInputElement)
      .value;
    setIsEditing(false);
    setListTitle(listTitle);
    form.reset();
  }

  // Обробник для редагування задачі
  function handleEditTask(id: number) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  }

  // Обробник для збереження змін в задачі
  function handleSaveTask(id: number, title: string, description: string) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, title, description, isEditing: false }
          : task
      )
    );
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
          <UiInput name="listTitle" placeholder="Enter new list title" />
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
        {tasks.map(({ id, description, title, isEditing }) => (
          <TaskCard
            key={id}
            id={id}
            description={description}
            title={title}
            isEditing={isEditing}
            handleEdit={() => handleEditTask(id)}
            handleSave={handleSaveTask}
          />
        ))}
      </div>
    </div>
  );
};
