import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { auth } from "../../firebase/firebaseConfig";

export function Header() {
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

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
      <h1 className="text-xl font-bold">Hello {currentUser?.email}</h1>
      {currentUser && (
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
