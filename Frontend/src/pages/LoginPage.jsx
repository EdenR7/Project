import React from "react";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { SnackBarContext } from "@/context/SnackBarContext";
import { Button } from "@/components/ui/button";
import { IconInput, Input } from "@/components/ui/input";
import { AUTH_URL } from "@/components/general/AuthLayout";
import api from "@/services/api.service";
import { Eye, EyeOff, LockKeyhole, User } from "lucide-react";

function LoginPage() {
  const [displayPassword, setDisplayPassword] = useState(false);
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
        <IconInput
          Icon={User}
          value={newUser.username}
          onChange={handleInputChange}
          type="text"
          placeholder="Username"
          name="username"
          required
        />
        <div className="relative">
          <IconInput
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
            Icon={LockKeyhole}
            placeholder="Password"
            type={`${displayPassword ? "text" : "password"}`}
            required
          />
          <button
            type="button"
            className=" absolute top-3 right-3 text-gray-400"
            onClick={() => {
              setDisplayPassword((prev) => !prev);
            }}
          >
            {displayPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

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
