import { FC } from "react";
import { TodoLists } from "../modules/todo/todo-lists";
import { Header } from "../components/layout/header";

// interface AuthPageProps {

//   }

export const TodoPage: FC = () => {
  return (
    <>
      <Header />
      <TodoLists />
    </>
  );
};
