import SignInForm from "@/components/sign-in-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SignIn = () => {
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
