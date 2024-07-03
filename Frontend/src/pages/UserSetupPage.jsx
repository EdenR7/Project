import useToggle from "@/hooks/useToggle";
import { IconInput, Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { LockKeyhole } from "lucide-react";

export function LoginForm(props) {
  const { login, setLogin } = props;
  return (
    <>
      <form className=" w-full max-w-80 flex flex-col gap-4">
        <Input type="text" placeholder="Username" name="userName" />
        <Input type="password" placeholder="Passwrod" name="userName" />
        <p className=" text-xs mx-auto">
          Dont have an account?{" "}
          <a
            className=" font-semibold text-primary"
            href="#"
            onClick={() => {
              setLogin(false);
            }}
          >
            Register
          </a>
        </p>
        <Button className="block w-full">Sign In</Button>
      </form>
    </>
  );
}
export function RegisterForm(props) {
  const { login, setLogin } = props;
  return (
    <>
      <form className=" flex flex-col gap-3">
        <Input type="text" placeholder="Username" name="userName" />
        <Input type="text" placeholder="Username" name="userName" />
        <Input type="text" placeholder="Username" name="userName" />
        <IconInput Icon={LockKeyhole} placeholder="Password" type="password" />
        <p className=" text-xs mx-auto">
          Alredy have an account?{" "}
          <a
            onClick={() => {
              setLogin(true);
            }}
            className=" font-semibold text-primary"
            href="#"
          >
            Sign Up!
          </a>
        </p>
        <Button className="block w-full">Create Account</Button>
      </form>
    </>
  );
}

function UserSetupPage() {
  const [login, setLogin] = useToggle(true);

  return (
    <div
      className=" font-montserrat h-screen w-full flex items-center justify-center px-6"
      style={{
        backgroundImage: "linear-gradient(to top left,#3D7EAA,#FFE47A)",
      }}
    >
      <Card className=" py-6 min-h-96 min-w-80 flex flex-col items-center justify-center gap-4">
        <CardTitle className="text-3xl">
          {login ? "Login" : "Register"}
        </CardTitle>
        <CardContent className="w-full max-w-80 ">
          {login ? (
            <LoginForm login={login} setLogin={setLogin} />
          ) : (
            <RegisterForm login={login} setLogin={setLogin} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default UserSetupPage;
