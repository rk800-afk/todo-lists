import { ReactNode } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../firebaseConfig";

export const RestrictedRoute = ({ children }: { children: ReactNode }) => {
  const [user, loading] = useAuthState(auth);
  if (loading) return <p>Loading...</p>;

  return !user ? children : <Navigate to="/" />;
};
