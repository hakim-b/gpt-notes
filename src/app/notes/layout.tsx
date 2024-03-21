import Navbar from "~/components/navbar";
import { LayoutProps } from "~/types";

function NotesLayout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main className="m-auto max-w-7xl p-4">{children}</main>
    </>
  );
}

export default NotesLayout;
