import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

function Home() {
  return (
    <>
      <h1 className="text-4xl font-bold">Hello World</h1>
      <Link href="/admin" className={buttonVariants()}>
        Open my admin
      </Link>
    </>
  );
}

export default Home;
