interface AuthFormWrapperProps {
  title: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error?: string;
}

export const AuthFormWrapper = ({
  title,
  children,
  onSubmit,
  error,
}: AuthFormWrapperProps) => (
  <div className="flex items-center flex-col gap-5 bg-gray-400 mx-auto w-[300px] p-[30px] rounded-[10px]">
    <h2>{title}</h2>
    <form className="flex items-center flex-col gap-3" onSubmit={onSubmit}>
      {children}
    </form>
    {error && <p style={{ color: "red" }}>{error}</p>}
  </div>
);
