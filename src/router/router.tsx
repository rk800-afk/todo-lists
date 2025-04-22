import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { PrivateRoute } from "./private-route";
import { RestrictedRoute } from "./restricted-route";
import { TodoPage } from "../pages/todo-page";
import { AuthPage } from "../pages/auth-page";
import { NotFoundPage } from "../pages/not-found-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          //   <PrivateRoute>
          <TodoPage />
          //   </PrivateRoute>
        ),
      },
      {
        path: "/auth",
        element: (
          //   <RestrictedRoute>
          <AuthPage />
          //   </RestrictedRoute>
        ),
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
