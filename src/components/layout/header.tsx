import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseConfig";

export function Header() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Ви вийшли з акаунта");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="h-[100px] bg-gray-400 flex items-center justify-between px-4">
      <h1 className="text-xl font-bold">ToDo Lists</h1>
      {user && (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 hover:bg-red-600 transition rounded-[10px] cursor-pointer"
        >
          Log out
        </button>
      )}
    </header>
  );
}
