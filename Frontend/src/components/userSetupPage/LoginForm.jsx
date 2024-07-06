import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import axios from "axios";
import { AUTH_URL } from "@/pages/UserSetupPage";
import { UserContext } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import { SnackBarContext } from "@/context/SnackBarContext";

export function LoginForm(props) {
  const { loginMode, setLoginMode } = props;
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
      const res = await axios.post(AUTH_URL + "login", newUser);
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
      console.error(err.response.data.error);
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
          <a
            className=" font-semibold text-primary"
            href="#"
            onClick={() => {
              setLoginMode(false);
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
