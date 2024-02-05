import Navbar from "~/components/navbar";
import { ReactNode } from "react";

type NotesLayoutProps = {
  children: ReactNode;
};

function NotesLayout({ children }: NotesLayoutProps) {
  return (
    <>
      <Navbar />
      <main className="m-auto max-w-7xl p-4">{children}</main>
    </>
  );
}

export default NotesLayout;
