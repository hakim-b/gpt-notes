import SignUpForm from "~/components/sign-up-form";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { authOptions } from "~/lib/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign Up",
};

const SignUp = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/notes");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
    </Card>
  );
};

export default SignUp;
