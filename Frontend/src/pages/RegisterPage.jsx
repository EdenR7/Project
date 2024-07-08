import { LockKeyhole } from "lucide-react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SnackBarContext } from "@/context/SnackBarContext";
import { IconInput, Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AUTH_URL } from "@/components/general/AuthLayout";
import api from "@/services/api.service";

function RegisterPage() {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { displaySnackBar } = useContext(SnackBarContext);

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
      await api.post(AUTH_URL + "register", newUser);
      navigate("/auth");
      displaySnackBar({
        label: "You registered successfully",
      });
    } catch (err) {
      console.log(err);
      displaySnackBar({
        label: "Error in register proccess!",
        context:
          err.response.data.error === "User already exists" &&
          "Sorry, username already exists",
        closeManually: true,
        type: "danger",
      });
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
          <Link to={"/auth"} className=" font-semibold text-primary" href="#">
            Sign Up!
          </Link>
        </p>
        <Button className="block w-full">Create Account</Button>
      </form>
    </>
  );
}

export default RegisterPage;
