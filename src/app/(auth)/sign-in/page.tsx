import SignInForm from "~/components/sign-in-form";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { authOptions } from "~/lib/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignIn = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/notes");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
    </Card>
  );
};

export default SignIn;
