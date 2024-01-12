import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

async function Admin() {
  const session = await getServerSession(authOptions);
  console.log(session);
  
  return <h1 className="text-4xl font-bold">Welcome to admin!</h1>;
}

export default Admin;
