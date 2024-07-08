import React, { useContext } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { SnackBarContext } from "@/context/SnackBarContext";
import SnackBar from "@/components/ui/SnackBar";
import { Outlet, useLocation, useParams } from "react-router-dom";
export const AUTH_URL = "/auth/";

function AuthLayout() {
  const location = useLocation();
  const { snackBar, setSnackBar, displaySnackBar, closeSnackBar } =
    useContext(SnackBarContext);

  return (
    <>
      <div
        className=" font-montserrat h-screen w-full flex items-center justify-center px-6"
        style={{
          backgroundImage: "linear-gradient(to top left,#3D7EAA,#FFE47A)",
        }}
      >
        <Card className=" py-6 min-h-96 min-w-80 flex flex-col items-center justify-center gap-4">
          <CardTitle className="text-3xl">
            {location.pathname.includes("register") ? "Register" : "Login"}
          </CardTitle>
          <CardContent className="w-full max-w-80 ">
            <Outlet />
          </CardContent>
        </Card>
        {snackBar.display && <SnackBar />}
      </div>
    </>
  );
}

export default AuthLayout;
