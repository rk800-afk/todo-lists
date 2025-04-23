import { useAuthState } from "react-firebase-hooks/auth";
import { UiInput } from "../../../ui/ui-input";
import { UiSaveBtn } from "../../../ui/ui-save-btn";
import { auth } from "../../../firebase/firebaseConfig";
import { useState } from "react";
import { createTodoListWithAdmin } from "../../../firebase/api/create-todo-list";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { fetchUserTodoLists } from "../../../features/todo/todoThunks";

export function AddListForm() {
  const [currentUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const todoListTitle = (
      form.elements.namedItem("todoListTitle") as HTMLInputElement
    ).value;

    try {
      setLoading(true);

      const listId = await createTodoListWithAdmin({
        title: todoListTitle,
        owner: {
          id: currentUser!.uid,
          email: currentUser!.email as string,
        },
      });

      console.log("Список створено з ID:", listId);
      form.reset();
      dispatch(fetchUserTodoLists(currentUser!.uid));
    } catch (error) {
      console.error("Помилка створення списку:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-400 w-[500px] p-[30px] mx-auto flex flex-col gap-5 rounded-[10px]"
    >
      <UiInput name="todoListTitle" placeholder="Enter new list title" />
      <UiSaveBtn
        btnText={loading ? "Creating..." : "Create"}
        disabled={loading}
      />
    </form>
  );
}
