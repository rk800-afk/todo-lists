import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { PrivateRoute } from "./private-route";
import { RestrictedRoute } from "./restricted-route";
import { TodoPage } from "../pages/todo-page";
import { RegisterPage } from "../pages/register-page";
import { NotFoundPage } from "../pages/not-found-page";
import { LoginPage } from "../pages/login-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <TodoPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <RestrictedRoute>
            <RegisterPage />
          </RestrictedRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <RestrictedRoute>
            <LoginPage />
          </RestrictedRoute>
        ),
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
