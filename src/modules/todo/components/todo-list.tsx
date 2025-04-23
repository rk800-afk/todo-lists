import { FC, useEffect, useState } from "react";
import { EditIcon } from "../../../ui/icons/edit-icon";
import { DeleteIcon } from "../../../ui/icons/delete-icon";
import { UiInput } from "../../../ui/ui-input";
import { TaskCard } from "./task-card";
import { UiSaveBtn } from "../../../ui/ui-save-btn";
import { updateTodoListTitle } from "../../../firebase/api/update-todo-list";
import {
  addTaskToList,
  deleteList,
  deleteTaskFromList,
  toggleTaskCompletedInList,
  updateTaskInList,
  updateTodoListTitleRedux,
} from "../../../features/todo/todoSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { addTask } from "../../../firebase/api/add-task";
import { updateTask } from "../../../firebase/api/update-task";
import { deleteTask } from "../../../firebase/api/delete-task-from-list";
import { toggleTaskCompleted } from "../../../firebase/api/toggle-task-completed";
import { deleteListFromFirestore } from "../../../firebase/api/delete-list";
import { Participant } from "../../../features/todo/types";
import { getParticipants } from "../../../firebase/api/get-participants";
import { addParticipant } from "../../../firebase/api/add-participant";

interface TodoListProps {
  title: string;
  listId: string;
  tasks: {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    isEditing: boolean;
  }[];
}

export const TodoList: FC<TodoListProps> = ({ title, tasks, listId }) => {
  const [currentTasks, setCurrentTasks] = useState(tasks);
  const [isEditing, setIsEditing] = useState(false);
  const [listTitle, setListTitle] = useState(title);
  const [isEditingMembers, setIsEditingMembers] = useState(false);
  const [members, setMembers] = useState<Participant[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isEditingMembers) return;

    const fetchParticipants = async () => {
      const participants = await getParticipants(listId);
      if (participants) {
        setMembers(participants);
      }
    };

    fetchParticipants();
  }, [isEditingMembers]);

  const dispatch = useAppDispatch();

  async function handleAddTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const title = (form.elements.namedItem("title") as HTMLInputElement).value;
    const description = (
      form.elements.namedItem("description") as HTMLInputElement
    ).value;

    try {
      const task = await addTask({ listId, title, description });

      dispatch(addTaskToList({ listId, task }));

      setCurrentTasks((prev) => [...prev, task]);

      form.reset();
    } catch (error) {
      console.error("Помилка при додаванні завдання:", error);
    }
  }

  const handleSaveTitle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const newTitle = (form.elements.namedItem("listTitle") as HTMLInputElement)
      .value;
    try {
      await updateTodoListTitle(listId, newTitle);
      dispatch(updateTodoListTitleRedux({ listId, newTitle }));
      setListTitle(newTitle);
    } catch (error) {
      console.error("Помилка оновлення назви списку:", error);
    } finally {
      setIsEditing(false);
    }
  };

  function handleEditTask(id: string) {
    setCurrentTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  }

  function handleEditMembers() {
    setIsEditingMembers((prev) => !prev);
  }

  async function handleIsCompleted(taskId: string, currentCompleted: boolean) {
    try {
      await toggleTaskCompleted(listId, taskId, !currentCompleted);
      dispatch(toggleTaskCompletedInList({ listId, taskId }));
      setCurrentTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (err) {
      console.error("Failed to toggle task status:", err);
    }
  }

  async function handleSaveTask(
    id: string,
    title: string,
    description: string
  ) {
    try {
      const updatedTask = await updateTask({
        listId,
        taskId: id,
        title,
        description,
      });

      dispatch(updateTaskInList({ listId, task: updatedTask }));

      setCurrentTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id
            ? { ...task, title, description, isEditing: false }
            : task
        )
      );
    } catch (error) {
      console.error("Error saving task:", error);
    }
  }

  async function handleDeleteTask(taskId: string) {
    try {
      deleteTask(listId, taskId);
      dispatch(deleteTaskFromList({ listId, taskId }));

      setCurrentTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  }

  async function handleDeleteList(listId: string) {
    try {
      await deleteListFromFirestore(listId);

      dispatch(deleteList(listId));
      console.log("List deleted successfully");
    } catch (err) {
      console.error("Failed to delete list:", err);
    }
  }

  const handleCreateParticipant = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const form = e.currentTarget;

    const email = (
      form.elements.namedItem("addMemberInput") as HTMLInputElement
    ).value;

    if (!email) {
      setError("Please enter email");
      return;
    }
    setError(null); // очистити попередні помилки
    try {
      const response = await addParticipant(listId, email);
      if (response.success) {
        setSuccess(true);
        if (response.participant) {
          setMembers((prev) => [...prev, response.participant]);
        }
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError("An error occurred while adding a participant.");
      console.error("Error adding participant:", err);
    }
  };

  return (
    <div className="w-[500px] bg-white rounded-[10px] p-[20px] relative">
      {isEditingMembers && (
        <form
          onSubmit={handleCreateParticipant}
          className="absolute bottom-0 left-0 right-0 bg-white flex flex-col justify-center gap-5 p-8 border-5 border-solid border-black rounded-[10px]"
        >
          {members.map((member) => (
            <div key={member.id}>
              {member.email} - {member.role}
            </div>
          ))}
          <UiInput name="addMemberInput" placeholder="Enter new member email" />
          <UiSaveBtn btnText="Add member" />
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && (
            <p style={{ color: "green" }}>Учасник успішно доданий!</p>
          )}
        </form>
      )}
      <div className="flex justify-between gap-3 items-center">
        <button
          onClick={handleEditMembers}
          className="bg-green-600 px-3 py-1 cursor-pointer rounded-[10px]"
        >
          Members
        </button>
        <div className="flex gap-3">
          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className="text-black w-8 h-8 cursor-pointer transition-transform duration-300 transform hover:scale-110"
          >
            <EditIcon />
          </button>
          <button
            onClick={() => handleDeleteList(listId)}
            className="text-black w-8 h-8 cursor-pointer transition-transform duration-300 transform hover:scale-110"
          >
            <DeleteIcon />
          </button>
        </div>
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
              handleIsCompleted={() => handleIsCompleted(id, completed)}
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
