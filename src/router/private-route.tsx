import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const isLogined = false;
  return isLogined ? children : <Navigate to="/login" />;
};
