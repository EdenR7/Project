import React from "react";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { SnackBarContext } from "@/context/SnackBarContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AUTH_URL } from "@/components/general/AuthLayout";
import api from "@/services/api.service";

function LoginPage() {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
  });
  const { loginUserContext } = useContext(UserContext);
  const navigate = useNavigate();
  const { displaySnackBar } = useContext(SnackBarContext);

  function handleInputChange(ev) {
    setNewUser((prev) => {
      return {
        ...prev,
        [ev.target.name]: ev.target.value,
      };
    });
  }

  async function handleLoginUser(ev) {
    ev.preventDefault();
    try {
      const res = await api.post(AUTH_URL + "login", newUser);
      const { token } = res.data;
      localStorage.setItem("userToken", token);
      loginUserContext(token);
      navigate("/");
      displaySnackBar({
        label: `Welcome ${newUser.username}`,
      });
    } catch (err) {
      displaySnackBar({
        label: "Error in login proccess!",
        context:
          err.response.data.error === "Authentication failed" &&
          "Please check your fields",
        closeManually: true,
        type: "danger",
      });
      console.error(err);
    }
  }
  return (
    <>
      <form
        className=" w-full max-w-80 flex flex-col gap-4"
        onSubmit={handleLoginUser}
      >
        <Input
          value={newUser.username}
          onChange={handleInputChange}
          type="text"
          placeholder="Username"
          name="username"
          required
        />
        <Input
          name="password"
          value={newUser.password}
          onChange={handleInputChange}
          placeholder="Password"
          type="password"
          required
        />
        <p className=" text-xs mx-auto">
          Dont have an account?{" "}
          <Link className=" font-semibold text-primary" to={"register"}>
            Register
          </Link>
        </p>
        <Button className="block w-full">Sign In</Button>
      </form>
    </>
  );
}

export default LoginPage;
