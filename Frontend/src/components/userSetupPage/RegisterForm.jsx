import { LockKeyhole } from "lucide-react";
import { Button } from "../ui/button";
import { IconInput, Input } from "../ui/input";
import { useState } from "react";
import axios from "axios";
import { AUTH_URL } from "@/pages/UserSetupPage";
import { useNavigate } from "react-router-dom";

export function RegisterForm(props) {
  const { login, setLogin } = props;
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleInputChange(ev) {
    setNewUser((prev) => {
      return {
        ...prev,
        [ev.target.name]: ev.target.value,
      };
    });
  }

  async function handleCreateNewUser(ev) {
    ev.preventDefault();
    try {
      const res = await axios.post(AUTH_URL + "register", newUser);
      setLogin(true);
      // snackbar
    } catch (err) {
      console.error(err);
      // snackbar
    }
  }

  return (
    <>
      <form className=" flex flex-col gap-3" onSubmit={handleCreateNewUser}>
        <Input
          value={newUser.username}
          onChange={handleInputChange}
          type="text"
          placeholder="Username"
          name="username"
          required
        />
        <Input
          value={newUser.email}
          onChange={handleInputChange}
          type="email"
          placeholder="Email"
          name="email"
          required
        />
        <IconInput
          name="password"
          value={newUser.password}
          onChange={handleInputChange}
          Icon={LockKeyhole}
          placeholder="Password"
          type="password"
          required
        />
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
