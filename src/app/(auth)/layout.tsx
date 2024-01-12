import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      {children}
    </div>
  );
};

export default AuthLayout;
