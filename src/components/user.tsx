"use client"

import { useSession } from "next-auth/react";

function User() {
  const { data: session } = useSession();
  return (
    <>
      <pre>{JSON.stringify(session)}</pre>
    </>
  );
}

export default User;
