import { FC, useEffect } from "react";
import { TodoList } from "./components/todo-list";
import { AddListForm } from "./components/add-list-form";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { fetchUserTodoLists } from "../../features/todo/todoThunks";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { Task } from "../../features/todo/types";

// const TASKS = [
//   {
//     id: "1",
//     title: "task 1",
//     description: "description 1",
//     isEditing: false,
//     completed: false,
//   },
//   {
//     id: "2",
//     title: "task 2",
//     description: "description 2",
//     isEditing: false,
//     completed: false,
//   },
//   {
//     id: "3",
//     title: "task 3",
//     description: "description 3",
//     isEditing: false,
//     completed: false,
//   },
// ];

export const TodoLists: FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const todoLists = useSelector((state: RootState) => state.todo.lists);

  console.log("todoLists", todoLists);

  useEffect(() => {
    if (currentUser?.uid) {
      dispatch(fetchUserTodoLists(currentUser.uid));
    }
  }, [currentUser, dispatch]);

  return (
    <div className="flex flex-col gap-10 p-10">
      <AddListForm />
      <div className="flex justify-center gap-10 flex-wrap">
        {todoLists.map((list) => (
          <TodoList
            listId={list.id}
            key={list.id}
            title={list.title}
            tasks={(list.tasks ?? []).map((task: Task) => ({
              id: task.id,
              title: task.title,
              description: task.description ?? "",
              completed: task.completed ?? false,
              isEditing: false,
            }))}
          />
        ))}
      </div>
    </div>
  );
};
