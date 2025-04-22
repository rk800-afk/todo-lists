import { useState } from "react";
import { auth, firestore } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { UiSaveBtn } from "../../ui/ui-save-btn";
import { AuthInput } from "../../components/auth/auth-input";
import { AuthFormWrapper } from "../../components/auth/auth-form-wrapper";
import { useNavigate } from "react-router";

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(firestore, "users", user.uid), {
        name,
        email,
        createdAt: serverTimestamp(),
      });

      alert("Користувач успішно зареєстрований!");
      navigate("/login");
    } catch (err: any) {
      console.log(err);
      setError(err.message);
    }
  };

  return (
    <AuthFormWrapper title="Registration" onSubmit={handleSubmit} error={error}>
      <AuthInput label="Name" type="text" value={name} onChange={setName} />
      <AuthInput label="Email" type="email" value={email} onChange={setEmail} />
      <AuthInput
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
      />
      <UiSaveBtn btnText="Register" />
    </AuthFormWrapper>
  );
}
