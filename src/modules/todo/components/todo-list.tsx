import { FC, useEffect, useState } from "react";
import { EditIcon } from "../../../ui/icons/edit-icon";
import { DeleteIcon } from "../../../ui/icons/delete-icon";
import { UiInput } from "../../../ui/ui-input";
import { TaskCard } from "./task-card";
import { UiSaveBtn } from "../../../ui/ui-save-btn";
import { getParticipants } from "../../../firebase/api/get-participants";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useTodoHandlers } from "../hooks/use-todo-handlers";

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
  const userId = useSelector((state: RootState) => state.user.currentUser?.uid);
  const [isAdmin, setIsAdmin] = useState(false);

  const {
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
  } = useTodoHandlers({ listId, tasks, title });

  useEffect(() => {
    const fetchParticipants = async () => {
      const participants = await getParticipants(listId);
      if (participants) {
        setMembers(participants);
        const userIsAdmin = participants.some(
          (participant) =>
            participant.userId === userId && participant.role === "admin"
        );
        setIsAdmin(userIsAdmin);
      }
    };

    if (userId) {
      fetchParticipants();
    }
  }, [userId]);

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
          {isAdmin && (
            <>
              <UiInput
                name="addMemberInput"
                placeholder="Enter new member email"
              />
              <UiSaveBtn btnText="Add member" />
            </>
          )}

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
        {isAdmin && (
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
        )}
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

      {isAdmin && (
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
      )}

      <div className="flex flex-col gap-5 mt-8">
        {currentTasks.map(
          ({ id, description, title, completed, isEditing }) => (
            <TaskCard
              key={id}
              id={id}
              description={description}
              isAdmin={isAdmin}
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
