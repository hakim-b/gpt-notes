import SignUpForm from "@/components/sign-up-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SignUp = () => {
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
