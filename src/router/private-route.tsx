import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const [user, loading] = useAuthState(auth);
  if (loading) return <p>Loading...</p>;

  return user ? children : <Navigate to="/login" />;
};
