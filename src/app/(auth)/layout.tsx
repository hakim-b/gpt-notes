import { FC } from "react";
import { LayoutProps } from "~/types";

const AuthLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen items-center justify-center">{children}</div>
  );
};

export default AuthLayout;
