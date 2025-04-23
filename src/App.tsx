import { Outlet } from "react-router";
import "./App.css";
import { useDispatch } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { clearUser, setUser } from "./features/user/userSlice";
import { auth } from "./firebase/firebaseConfig";

function App() {
  const [currentUser, loading] = useAuthState(auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      dispatch(
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
        })
      );
    } else {
      dispatch(clearUser());
    }
  }, [currentUser, dispatch]);

  if (loading) return <div>Loading...</div>;
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
