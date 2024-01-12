import { Card, CardContent } from "@/components/ui/card";
import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Card className="flex justify-center items-center h-screen">
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default AuthLayout;
