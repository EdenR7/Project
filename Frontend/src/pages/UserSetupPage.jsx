import useToggle from "@/hooks/useToggle";
import { IconInput, Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { LockKeyhole } from "lucide-react";
import { LoginForm } from "@/components/userSetupPage/LoginForm";
import { RegisterForm } from "@/components/userSetupPage/RegisterForm";
export const AUTH_URL = "http://localhost:3000/api/auth/";

function UserSetupPage() {
  const [loginMode, setLoginMode] = useToggle(true);

  return (
    <div
      className=" font-montserrat h-screen w-full flex items-center justify-center px-6"
      style={{
        backgroundImage: "linear-gradient(to top left,#3D7EAA,#FFE47A)",
      }}
    >
      <Card className=" py-6 min-h-96 min-w-80 flex flex-col items-center justify-center gap-4">
        <CardTitle className="text-3xl">
          {loginMode ? "Login" : "Register"}
        </CardTitle>
        <CardContent className="w-full max-w-80 ">
          {loginMode ? (
            <LoginForm loginMode={loginMode} setLoginMode={setLoginMode} />
          ) : (
            <RegisterForm loginMode={loginMode} setLoginMode={setLoginMode} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default UserSetupPage;
