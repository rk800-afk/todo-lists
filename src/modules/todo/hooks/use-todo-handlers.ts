import { useState } from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { addTask } from "../../../firebase/api/add-task";
import { addTaskToList, deleteList, deleteTaskFromList, toggleTaskCompletedInList, updateTaskInList, updateTodoListTitleRedux } from "../../../features/todo/todoSlice";
import { updateTodoListTitle } from "../../../firebase/api/update-todo-list";
import { toggleTaskCompleted } from "../../../firebase/api/toggle-task-completed";
import { updateTask } from "../../../firebase/api/update-task";
import { deleteTask } from "../../../firebase/api/delete-task-from-list";
import { deleteListFromFirestore } from "../../../firebase/api/delete-list";
import { addParticipant } from "../../../firebase/api/add-participant";
import {Participant} from '../../../features/todo/types'

interface useTodoHandlers {
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

export const useTodoHandlers = ({listId, tasks, title}: useTodoHandlers) => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
    const [listTitle, setListTitle] = useState(title);
    const [isEditingMembers, setIsEditingMembers] = useState(false);
      const [currentTasks, setCurrentTasks] = useState(tasks);
      const [isEditing, setIsEditing] = useState(false);
      const [members, setMembers] = useState<Participant[]>([]);

    
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
      setError(null); 
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
  return {
    setMembers,
    members,
    isEditingMembers,
    handleCreateParticipant,
    error,
    success,
    handleEditMembers,
    setIsEditing,
    isEditing,
    handleDeleteList,
    listTitle,
    handleSaveTitle,
    handleAddTask,
    currentTasks,
    handleIsCompleted,
    handleEditTask,
    handleSaveTask,
    handleDeleteTask,
  };
};
