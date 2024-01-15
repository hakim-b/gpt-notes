import Navbar from "@/components/navbar";
import { ReactNode } from "react";

type NotesLayoutProps = {
  children: ReactNode;
};

function NotesLayout({ children }: NotesLayoutProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default NotesLayout;
