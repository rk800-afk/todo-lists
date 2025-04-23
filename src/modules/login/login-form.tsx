import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { UiSaveBtn } from "../../ui/ui-save-btn";
import { AuthInput } from "../../components/auth/auth-input";
import { AuthFormWrapper } from "../../components/auth/auth-form-wrapper";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const responce = await signInWithEmailAndPassword(auth, email, password);
      setError("");
      alert("Ви успішно увійшли в систему!");
      console.log(responce);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <AuthFormWrapper title="Login" onSubmit={handleSubmit} error={error}>
      <AuthInput label="Email" type="email" value={email} onChange={setEmail} />
      <AuthInput
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
      />
      <UiSaveBtn btnText="Login" />
    </AuthFormWrapper>
  );
}
