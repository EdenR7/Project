import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import axios from "axios";
import { AUTH_URL } from "@/pages/UserSetupPage";
import { UserContext } from "@/context/userContext";
import { useNavigate } from "react-router-dom";
// import { UserContext } from "@/context/userContext";

export function LoginForm(props) {
  const { login, setLogin } = props;
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
  });
  const { loginUserContext } = useContext(UserContext);
  const navigate = useNavigate();

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
      // snackbar
    } catch (err) {
      console.error(err);
      // snackbar
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
